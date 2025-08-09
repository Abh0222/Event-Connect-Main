'use client'

import { useEffect } from 'react'
import { Check, Calendar, MapPin, Users, Download, Share2, MessageCircle } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { BookingData } from '@/app/booking/page'
import { formatCurrency, formatDate } from '@/lib/utils'

interface BookingConfirmationProps {
  bookingData: BookingData
}

export default function BookingConfirmation({ bookingData }: BookingConfirmationProps) {
  const bookingId = `VB${Date.now().toString().slice(-6)}`

  useEffect(() => {
    // Track successful booking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: bookingId,
        value: bookingData.totalAmount,
        currency: 'INR',
        items: [{
          item_id: bookingData.packageId,
          item_name: 'Event Package',
          category: bookingData.eventType,
          quantity: 1,
          price: bookingData.totalAmount
        }]
      })
    }
  }, [bookingId, bookingData])

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    alert('Receipt download would start here')
  }

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My VibeSphere Booking',
        text: `I just booked my ${bookingData.eventType} with VibeSphere! Booking ID: ${bookingId}`,
        url: window.location.href
      })
    }
  }

  const handleChatSupport = () => {
    // Navigate to chat or open chat widget
    window.location.href = '/chat'
  }

  return (
    <div className="min-h-screen bg-muted-100">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-display-xl text-primary-900 mb-4">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-xl text-neutral-600 mb-6">
              Thank you for choosing VibeSphere. Your dream event is now in motion!
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-neutral-600">Booking ID:</span>
              <Badge variant="accent" className="text-lg px-4 py-2">
                {bookingId}
              </Badge>
            </div>
            <p className="text-neutral-600">
              A confirmation email has been sent to {bookingData.customerDetails.email}
            </p>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Event Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-6">Event Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-accent-500" />
                    <div>
                      <div className="font-medium text-primary-900">
                        {formatDate(new Date(bookingData.eventDate))}
                      </div>
                      <div className="text-sm text-neutral-600 capitalize">
                        {bookingData.eventTime}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-accent-500" />
                    <div>
                      <div className="font-medium text-primary-900">
                        {bookingData.location.venue}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {bookingData.location.city}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-accent-500" />
                    <div>
                      <div className="font-medium text-primary-900">
                        {bookingData.guestCount} Guests
                      </div>
                      <div className="text-sm text-neutral-600 capitalize">
                        {bookingData.eventType} Event
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-6">Payment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-700">Package Total</span>
                    <span className="font-medium">{formatCurrency(bookingData.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Deposit Paid</span>
                    <span className="font-semibold">{formatCurrency(bookingData.depositAmount)}</span>
                  </div>
                  <div className="border-t border-muted-300 pt-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-primary-900">Remaining Balance</span>
                      <span className="font-bold text-primary-900">
                        {formatCurrency(bookingData.totalAmount - bookingData.depositAmount)}
                      </span>
                    </div>
                    <div className="text-sm text-neutral-600 mt-1">
                      Due 7 days before your event
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-primary-900 mb-6">What Happens Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-accent-600 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Consultation Call</h4>
                  <p className="text-sm text-neutral-600">
                    Our team will contact you within 24 hours to schedule a detailed planning consultation.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-accent-600 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Planning Phase</h4>
                  <p className="text-sm text-neutral-600">
                    We'll work together to finalize all details, vendors, and timeline for your perfect event.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-accent-600 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Event Day</h4>
                  <p className="text-sm text-neutral-600">
                    Relax and enjoy your special day while we handle every detail flawlessly.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button onClick={handleDownloadReceipt} variant="outline" size="lg">
              <Download className="h-5 w-5 mr-2" />
              Download Receipt
            </Button>
            
            <Button onClick={handleShareBooking} variant="outline" size="lg">
              <Share2 className="h-5 w-5 mr-2" />
              Share Booking
            </Button>
            
            <Button onClick={handleChatSupport} size="lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat with Support
            </Button>
          </div>

          {/* Important Information */}
          <Card className="bg-accent-50 border-accent-200">
            <CardContent className="p-6">
              <h4 className="font-semibold text-primary-900 mb-4">Important Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-700">
                <div>
                  <h5 className="font-medium text-primary-900 mb-2">Cancellation Policy</h5>
                  <p>Free cancellation up to 30 days before your event. See our terms for details.</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-primary-900 mb-2">Changes & Modifications</h5>
                  <p>Event details can be modified up to 14 days before your event date.</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-primary-900 mb-2">Final Payment</h5>
                  <p>Remaining balance is due 7 days before your event. We'll send you a reminder.</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-primary-900 mb-2">Contact Information</h5>
                  <p>Your dedicated event coordinator will be assigned within 24 hours.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="text-center mt-12">
            <div className="space-y-4">
              <Button 
                onClick={() => window.location.href = '/dashboard'}
                size="lg"
                className="mr-4"
              >
                View My Dashboard
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/'}
                size="lg"
              >
                Back to Home
              </Button>
            </div>
            
            <p className="text-sm text-neutral-600 mt-6">
              Need help? Contact us at{' '}
              <a href="mailto:support@vibesphere.com" className="text-accent-500 hover:underline">
                support@vibesphere.com
              </a>{' '}
              or call{' '}
              <a href="tel:+911234567890" className="text-accent-500 hover:underline">
                +91 12345 67890
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
