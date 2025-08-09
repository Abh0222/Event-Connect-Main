'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, Calendar, Users, MapPin, CreditCard } from 'lucide-react'
import { Button, Card, CardContent, Progress } from '@/components/ui'
import BookingStepOne from '@/components/booking/BookingStepOne'
import BookingStepTwo from '@/components/booking/BookingStepTwo'
import BookingStepThree from '@/components/booking/BookingStepThree'
import BookingStepFour from '@/components/booking/BookingStepFour'
import BookingConfirmation from '@/components/booking/BookingConfirmation'

const steps = [
  { id: 1, title: 'Event Details', icon: Calendar, description: 'Tell us about your event' },
  { id: 2, title: 'Package & Add-ons', icon: Users, description: 'Choose your perfect package' },
  { id: 3, title: 'Personal Details', icon: MapPin, description: 'Your contact information' },
  { id: 4, title: 'Payment', icon: CreditCard, description: 'Secure payment processing' },
]

export interface BookingData {
  // Step 1: Event Details
  eventType: string
  eventDate: string
  eventTime: string
  guestCount: number
  location: {
    city: string
    venue: string
    address: string
  }
  specialRequests: string

  // Step 2: Package & Add-ons
  packageId: string
  addOns: string[]
  customizations: string

  // Step 3: Personal Details
  customerDetails: {
    firstName: string
    lastName: string
    email: string
    phone: string
    alternatePhone?: string
  }
  billingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }

  // Step 4: Payment
  paymentMethod: string
  agreedToTerms: boolean
  marketingConsent: boolean

  // Calculated fields
  totalAmount: number
  depositAmount: number
}

export default function BookingPage() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({
    eventType: '',
    eventDate: '',
    eventTime: '',
    guestCount: 0,
    location: { city: '', venue: '', address: '' },
    specialRequests: '',
    packageId: searchParams?.get('package') || '',
    addOns: [],
    customizations: '',
    customerDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
    },
    paymentMethod: '',
    agreedToTerms: false,
    marketingConsent: false,
    totalAmount: 0,
    depositAmount: 0,
  })

  useEffect(() => {
    // Track booking flow start
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'booking_started', {
        event_category: 'conversion',
        event_label: 'booking_flow',
        package_id: bookingData.packageId
      })
    }
  }, [])

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
      
      // Track step completion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'booking_step_completed', {
          event_category: 'conversion',
          event_label: 'booking_flow',
          step: currentStep
        })
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const completeBooking = () => {
    setIsCompleted(true)
    
    // Track booking completion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'booking_completed', {
        event_category: 'conversion',
        event_label: 'booking_flow',
        value: bookingData.totalAmount,
        currency: 'INR'
      })
    }
  }

  const progress = (currentStep / steps.length) * 100

  if (isCompleted) {
    return <BookingConfirmation bookingData={bookingData} />
  }

  return (
    <div className="min-h-screen bg-muted-100">
      {/* Header */}
      <div className="bg-white border-b border-muted-300">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-display-lg text-primary-900">Book Your Experience</h1>
              <p className="text-neutral-600">Let's create something extraordinary together</p>
            </div>
            <Button variant="ghost" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary-900">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm text-neutral-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              const Icon = step.icon

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-accent-500 border-accent-500 text-white'
                          : isActive
                          ? 'bg-white border-accent-500 text-accent-500'
                          : 'bg-white border-muted-400 text-muted-600'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className={`text-sm font-medium ${
                          isActive ? 'text-accent-500' : 'text-neutral-600'
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-neutral-500 hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-accent-500' : 'bg-muted-300'
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              {currentStep === 1 && (
                <BookingStepOne
                  data={bookingData}
                  onUpdate={updateBookingData}
                  onNext={nextStep}
                />
              )}
              {currentStep === 2 && (
                <BookingStepTwo
                  data={bookingData}
                  onUpdate={updateBookingData}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              {currentStep === 3 && (
                <BookingStepThree
                  data={bookingData}
                  onUpdate={updateBookingData}
                  onNext={nextStep}
                  onPrev={prevStep}
                />
              )}
              {currentStep === 4 && (
                <BookingStepFour
                  data={bookingData}
                  onUpdate={updateBookingData}
                  onComplete={completeBooking}
                  onPrev={prevStep}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
