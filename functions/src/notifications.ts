import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransporter({
  host: functions.config().smtp?.host || 'smtp.gmail.com',
  port: parseInt(functions.config().smtp?.port || '587'),
  secure: false,
  auth: {
    user: functions.config().smtp?.user,
    pass: functions.config().smtp?.pass,
  },
})

interface EmailData {
  to: string
  subject: string
  template: string
  data: Record<string, any>
}

// Email templates
const emailTemplates = {
  'booking-confirmation': (data: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0F1230 0%, #FF6F61 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmed!</h1>
        <p style="color: #FFD166; margin: 10px 0 0 0; font-size: 16px;">VibeSphere - Where Every Moment Finds Its Vibe</p>
      </div>
      
      <div style="padding: 40px 20px; background: #F6F7FB;">
        <h2 style="color: #0F1230; margin-bottom: 20px;">Hello ${data.customerName},</h2>
        
        <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
          Thank you for choosing VibeSphere! Your booking has been confirmed and we're excited to help create your perfect event.
        </p>
        
        <div style="background: white; padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #FF6F61;">
          <h3 style="color: #0F1230; margin-top: 0;">Booking Details</h3>
          <p><strong>Event:</strong> ${data.eventTitle}</p>
          <p><strong>Date:</strong> ${data.bookingDate}</p>
          <p><strong>Booking ID:</strong> ${data.bookingId}</p>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <img src="${data.qrCodeUrl}" alt="Booking QR Code" style="max-width: 200px; border-radius: 8px;">
          <p style="color: #6B7280; font-size: 14px; margin-top: 10px;">Save this QR code for easy check-in</p>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings" 
             style="background: #FF6F61; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            View Booking Details
          </a>
        </div>
        
        <p style="color: #6B7280; line-height: 1.6; margin-top: 30px;">
          If you have any questions, feel free to reach out to our support team or chat with our AI assistant Vibe.
        </p>
        
        <p style="color: #6B7280; line-height: 1.6;">
          Best regards,<br>
          The VibeSphere Team
        </p>
      </div>
      
      <div style="background: #0F1230; padding: 20px; text-align: center;">
        <p style="color: #6B7280; margin: 0; font-size: 14px;">
          © 2024 VibeSphere. All rights reserved.
        </p>
      </div>
    </div>
  `,

  'new-booking-creator': (data: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0F1230 0%, #FFD166 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Booking Received!</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">VibeSphere Creator Dashboard</p>
      </div>
      
      <div style="padding: 40px 20px; background: #F6F7FB;">
        <h2 style="color: #0F1230; margin-bottom: 20px;">Hello ${data.creatorName},</h2>
        
        <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
          Great news! You've received a new booking through VibeSphere.
        </p>
        
        <div style="background: white; padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #FFD166;">
          <h3 style="color: #0F1230; margin-top: 0;">Booking Details</h3>
          <p><strong>Customer:</strong> ${data.customerName}</p>
          <p><strong>Event:</strong> ${data.eventTitle}</p>
          <p><strong>Date:</strong> ${data.bookingDate}</p>
          <p><strong>Booking ID:</strong> ${data.bookingId}</p>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/creator/bookings" 
             style="background: #FFD166; color: #0F1230; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Manage Booking
          </a>
        </div>
        
        <p style="color: #6B7280; line-height: 1.6;">
          Please review the booking details and confirm or contact the customer if you need more information.
        </p>
        
        <p style="color: #6B7280; line-height: 1.6;">
          Best regards,<br>
          The VibeSphere Team
        </p>
      </div>
      
      <div style="background: #0F1230; padding: 20px; text-align: center;">
        <p style="color: #6B7280; margin: 0; font-size: 14px;">
          © 2024 VibeSphere. All rights reserved.
        </p>
      </div>
    </div>
  `,

  'booking-confirmed': (data: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #0F1230 0%, #10b981 100%); padding: 40px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Booking Confirmed!</h1>
        <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px;">Your event is all set</p>
      </div>
      
      <div style="padding: 40px 20px; background: #F6F7FB;">
        <h2 style="color: #0F1230; margin-bottom: 20px;">Hello ${data.customerName},</h2>
        
        <p style="color: #6B7280; line-height: 1.6; margin-bottom: 20px;">
          Excellent news! Your booking (ID: ${data.bookingId}) has been confirmed by our event creator.
        </p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/bookings/${data.bookingId}" 
             style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            View Booking Details
          </a>
        </div>
        
        <p style="color: #6B7280; line-height: 1.6;">
          We're excited to help make your event unforgettable!
        </p>
      </div>
    </div>
  `,
}

export const sendNotificationEmail = async (emailData: EmailData) => {
  try {
    const template = emailTemplates[emailData.template as keyof typeof emailTemplates]
    
    if (!template) {
      throw new Error(`Email template '${emailData.template}' not found`)
    }

    const htmlContent = template(emailData.data)

    const mailOptions = {
      from: `"VibeSphere" <${functions.config().smtp?.user}>`,
      to: emailData.to,
      subject: emailData.subject,
      html: htmlContent,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

// HTTP function to send emails (for testing)
export const sendEmail = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated')
  }

  try {
    const result = await sendNotificationEmail(data)
    return result
  } catch (error) {
    console.error('Error in sendEmail function:', error)
    throw new functions.https.HttpsError('internal', 'Failed to send email')
  }
})
