'use client'

import { useState } from 'react'
import { User, Mail, Phone, MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button, Input, Card, CardContent } from '@/components/ui'
import { BookingData } from '@/app/booking/page'

interface BookingStepThreeProps {
  data: BookingData
  onUpdate: (updates: Partial<BookingData>) => void
  onNext: () => void
  onPrev: () => void
}

export default function BookingStepThree({ data, onUpdate, onNext, onPrev }: BookingStepThreeProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleCustomerDetailsChange = (field: string, value: string) => {
    onUpdate({
      customerDetails: {
        ...data.customerDetails,
        [field]: value
      }
    })
    if (errors[`customerDetails.${field}`]) {
      setErrors(prev => ({ ...prev, [`customerDetails.${field}`]: '' }))
    }
  }

  const handleBillingAddressChange = (field: string, value: string) => {
    onUpdate({
      billingAddress: {
        ...data.billingAddress,
        [field]: value
      }
    })
    if (errors[`billingAddress.${field}`]) {
      setErrors(prev => ({ ...prev, [`billingAddress.${field}`]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Customer Details Validation
    if (!data.customerDetails.firstName.trim()) {
      newErrors['customerDetails.firstName'] = 'First name is required'
    }
    if (!data.customerDetails.lastName.trim()) {
      newErrors['customerDetails.lastName'] = 'Last name is required'
    }
    if (!data.customerDetails.email.trim()) {
      newErrors['customerDetails.email'] = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerDetails.email)) {
      newErrors['customerDetails.email'] = 'Please enter a valid email address'
    }
    if (!data.customerDetails.phone.trim()) {
      newErrors['customerDetails.phone'] = 'Phone number is required'
    } else if (!/^[+]?[\d\s\-\(\)]{10,}$/.test(data.customerDetails.phone)) {
      newErrors['customerDetails.phone'] = 'Please enter a valid phone number'
    }

    // Billing Address Validation
    if (!data.billingAddress.street.trim()) {
      newErrors['billingAddress.street'] = 'Street address is required'
    }
    if (!data.billingAddress.city.trim()) {
      newErrors['billingAddress.city'] = 'City is required'
    }
    if (!data.billingAddress.state.trim()) {
      newErrors['billingAddress.state'] = 'State is required'
    }
    if (!data.billingAddress.zipCode.trim()) {
      newErrors['billingAddress.zipCode'] = 'ZIP code is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-display-md text-primary-900 mb-2">Personal Details</h2>
        <p className="text-neutral-600">
          We need your contact information to finalize your booking and keep you updated.
        </p>
      </div>

      {/* Customer Details */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="h-5 w-5 text-accent-500" />
            <h3 className="text-lg font-semibold text-primary-900">Contact Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name *"
              value={data.customerDetails.firstName}
              onChange={(e) => handleCustomerDetailsChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              error={errors['customerDetails.firstName']}
            />

            <Input
              label="Last Name *"
              value={data.customerDetails.lastName}
              onChange={(e) => handleCustomerDetailsChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              error={errors['customerDetails.lastName']}
            />

            <Input
              label="Email Address *"
              type="email"
              value={data.customerDetails.email}
              onChange={(e) => handleCustomerDetailsChange('email', e.target.value)}
              placeholder="your.email@example.com"
              error={errors['customerDetails.email']}
            />

            <Input
              label="Phone Number *"
              type="tel"
              value={data.customerDetails.phone}
              onChange={(e) => handleCustomerDetailsChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              error={errors['customerDetails.phone']}
            />

            <div className="md:col-span-2">
              <Input
                label="Alternate Phone (Optional)"
                type="tel"
                value={data.customerDetails.alternatePhone || ''}
                onChange={(e) => handleCustomerDetailsChange('alternatePhone', e.target.value)}
                placeholder="Alternate contact number"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="h-5 w-5 text-accent-500" />
            <h3 className="text-lg font-semibold text-primary-900">Billing Address</h3>
          </div>

          <div className="space-y-4">
            <Input
              label="Street Address *"
              value={data.billingAddress.street}
              onChange={(e) => handleBillingAddressChange('street', e.target.value)}
              placeholder="Enter your street address"
              error={errors['billingAddress.street']}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City *"
                value={data.billingAddress.city}
                onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                placeholder="Enter city"
                error={errors['billingAddress.city']}
              />

              <Input
                label="State *"
                value={data.billingAddress.state}
                onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                placeholder="Enter state"
                error={errors['billingAddress.state']}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="ZIP Code *"
                value={data.billingAddress.zipCode}
                onChange={(e) => handleBillingAddressChange('zipCode', e.target.value)}
                placeholder="Enter ZIP code"
                error={errors['billingAddress.zipCode']}
              />

              <Input
                label="Country"
                value={data.billingAddress.country}
                onChange={(e) => handleBillingAddressChange('country', e.target.value)}
                placeholder="Country"
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="bg-muted-50 border-muted-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
            <div className="text-sm text-neutral-700">
              <h4 className="font-semibold text-primary-900 mb-2">Privacy & Data Protection</h4>
              <p className="mb-2">
                Your personal information is secure with us. We use your details only for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Processing your booking and payment</li>
                <li>Communicating about your event</li>
                <li>Providing customer support</li>
                <li>Sending booking confirmations and updates</li>
              </ul>
              <p className="mt-2">
                We never share your information with third parties without your consent.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext} size="lg">
          Continue to Payment
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
