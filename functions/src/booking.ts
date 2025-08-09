import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as QRCode from 'qrcode'
import { sendNotificationEmail } from './notifications'

const db = admin.firestore()
const storage = admin.storage()

// Trigger when a new booking is created
export const onBookingCreate = functions.firestore
  .document('bookings/{bookingId}')
  .onCreate(async (snap, context) => {
    const booking = snap.data()
    const bookingId = context.params.bookingId

    try {
      // Generate QR code for the booking
      const qrCodeData = JSON.stringify({
        bookingId,
        eventId: booking.eventId,
        userId: booking.userId,
        date: booking.date,
      })

      const qrCodeBuffer = await QRCode.toBuffer(qrCodeData, {
        type: 'png',
        width: 300,
        margin: 2,
      })

      // Upload QR code to Storage
      const qrCodePath = `qr-codes/bookings/${bookingId}.png`
      const file = storage.bucket().file(qrCodePath)
      
      await file.save(qrCodeBuffer, {
        metadata: {
          contentType: 'image/png',
          metadata: {
            bookingId,
            generatedAt: new Date().toISOString(),
          },
        },
      })

      // Get the download URL
      const [url] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491', // Far future date
      })

      // Update booking with QR code URL
      await snap.ref.update({
        qrCodeUrl: url,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })

      // Get user and event details for email
      const [userDoc, eventDoc] = await Promise.all([
        db.collection('users').doc(booking.userId).get(),
        db.collection('events').doc(booking.eventId).get(),
      ])

      if (userDoc.exists && eventDoc.exists) {
        const user = userDoc.data()
        const event = eventDoc.data()

        // Send confirmation email to customer
        await sendNotificationEmail({
          to: user?.email,
          subject: 'Booking Confirmation - VibeSphere',
          template: 'booking-confirmation',
          data: {
            customerName: user?.name,
            eventTitle: event?.title,
            bookingDate: booking.date.toDate().toLocaleDateString(),
            bookingId,
            qrCodeUrl: url,
          },
        })

        // Notify event creator
        if (event?.creatorId) {
          const creatorDoc = await db.collection('users').doc(event.creatorId).get()
          if (creatorDoc.exists) {
            const creator = creatorDoc.data()
            await sendNotificationEmail({
              to: creator?.email,
              subject: 'New Booking Received - VibeSphere',
              template: 'new-booking-creator',
              data: {
                creatorName: creator?.name,
                customerName: user?.name,
                eventTitle: event?.title,
                bookingDate: booking.date.toDate().toLocaleDateString(),
                bookingId,
              },
            })
          }
        }
      }

      // Log analytics event
      await db.collection('analytics_events').add({
        eventType: 'booking_created',
        bookingId,
        userId: booking.userId,
        eventId: booking.eventId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        metadata: {
          packageId: booking.packageId,
          amount: booking.payment.amount,
        },
      })

      console.log(`Booking ${bookingId} processed successfully`)
    } catch (error) {
      console.error(`Error processing booking ${bookingId}:`, error)
      
      // Update booking with error status
      await snap.ref.update({
        processingError: error.message,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      })
    }
  })

// Trigger when a booking is updated
export const onBookingUpdate = functions.firestore
  .document('bookings/{bookingId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data()
    const after = change.after.data()
    const bookingId = context.params.bookingId

    // Check if status changed
    if (before.status !== after.status) {
      try {
        // Get user details
        const userDoc = await db.collection('users').doc(after.userId).get()
        
        if (userDoc.exists) {
          const user = userDoc.data()
          let emailTemplate = ''
          let subject = ''

          switch (after.status) {
            case 'confirmed':
              emailTemplate = 'booking-confirmed'
              subject = 'Booking Confirmed - VibeSphere'
              break
            case 'cancelled':
              emailTemplate = 'booking-cancelled'
              subject = 'Booking Cancelled - VibeSphere'
              break
            case 'completed':
              emailTemplate = 'booking-completed'
              subject = 'Event Completed - VibeSphere'
              break
          }

          if (emailTemplate) {
            await sendNotificationEmail({
              to: user?.email,
              subject,
              template: emailTemplate,
              data: {
                customerName: user?.name,
                bookingId,
                status: after.status,
              },
            })
          }
        }

        // Log analytics event
        await db.collection('analytics_events').add({
          eventType: 'booking_status_changed',
          bookingId,
          userId: after.userId,
          eventId: after.eventId,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          metadata: {
            oldStatus: before.status,
            newStatus: after.status,
          },
        })

        console.log(`Booking ${bookingId} status updated: ${before.status} -> ${after.status}`)
      } catch (error) {
        console.error(`Error processing booking update ${bookingId}:`, error)
      }
    }
  })
