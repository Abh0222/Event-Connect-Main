'use client'

import { useState } from 'react'
import { Calendar, MapPin, Users, Clock, MessageSquare } from 'lucide-react'
import { Button, Input, Select, Textarea, Card, CardContent } from '@/components/ui'
import { BookingData } from '@/app/booking/page'

interface BookingStepOneProps {
  data: BookingData
  onUpdate: (updates: Partial<BookingData>) => void
  onNext: () => void
}

const eventTypes = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate Event' },
  { value: 'party', label: 'Private Party' },
  { value: 'festival', label: 'Festival/Concert' },
  { value: 'other', label: 'Other' },
]

const cities = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'goa', label: 'Goa' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'other', label: 'Other' },
]

const timeSlots = [
  { value: 'morning', label: 'Morning (6 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 6 PM)' },
  { value: 'evening', label: 'Evening (6 PM - 12 AM)' },
  { value: 'full-day', label: 'Full Day' },
  { value: 'custom', label: 'Custom Time' },
]

export default function BookingStepOne({ data, onUpdate, onNext }: BookingStepOneProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleLocationChange = (field: string, value: string) => {
    onUpdate({
      location: {
        ...data.location,
        [field]: value
      }
    })
    if (errors[`location.${field}`]) {
      setErrors(prev => ({ ...prev, [`location.${field}`]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!data.eventType) {
      newErrors.eventType = 'Please select an event type'
    }
    if (!data.eventDate) {
      newErrors.eventDate = 'Please select an event date'
    } else {
      const selectedDate = new Date(data.eventDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.eventDate = 'Event date cannot be in the past'
      }
    }
    if (!data.eventTime) {
      newErrors.eventTime = 'Please select an event time'
    }
    if (!data.guestCount || data.guestCount < 1) {
      newErrors.guestCount = 'Please enter a valid guest count'
    }
    if (!data.location.city) {
      newErrors['location.city'] = 'Please select a city'
    }
    if (!data.location.venue) {
      newErrors['location.venue'] = 'Please enter a venue name'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-display-md text-primary-900 mb-2">Tell Us About Your Event</h2>
        <p className="text-neutral-600">
          Share the details of your special occasion so we can create the perfect experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Type */}
        <div>
          <Select
            label="Event Type *"
            value={data.eventType}
            onChange={(e) => handleInputChange('eventType', e.target.value)}
            options={eventTypes}
            placeholder="Select event type"
            error={errors.eventType}
          />
        </div>

        {/* Guest Count */}
        <div>
          <Input
            label="Number of Guests *"
            type="number"
            value={data.guestCount || ''}
            onChange={(e) => handleInputChange('guestCount', parseInt(e.target.value) || 0)}
            placeholder="e.g., 150"
            min="1"
            max="2000"
            error={errors.guestCount}
          />
        </div>

        {/* Event Date */}
        <div>
          <Input
            label="Event Date *"
            type="date"
            value={data.eventDate}
            onChange={(e) => handleInputChange('eventDate', e.target.value)}
            min={minDate}
            error={errors.eventDate}
          />
        </div>

        {/* Event Time */}
        <div>
          <Select
            label="Event Time *"
            value={data.eventTime}
            onChange={(e) => handleInputChange('eventTime', e.target.value)}
            options={timeSlots}
            placeholder="Select time slot"
            error={errors.eventTime}
          />
        </div>
      </div>

      {/* Location Details */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-accent-500" />
            <h3 className="text-lg font-semibold text-primary-900">Event Location</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                label="City *"
                value={data.location.city}
                onChange={(e) => handleLocationChange('city', e.target.value)}
                options={cities}
                placeholder="Select city"
                error={errors['location.city']}
              />
            </div>
            
            <div>
              <Input
                label="Venue Name *"
                value={data.location.venue}
                onChange={(e) => handleLocationChange('venue', e.target.value)}
                placeholder="e.g., Grand Ballroom, Beach Resort"
                error={errors['location.venue']}
              />
            </div>
            
            <div className="md:col-span-2">
              <Input
                label="Full Address (Optional)"
                value={data.location.address}
                onChange={(e) => handleLocationChange('address', e.target.value)}
                placeholder="Complete venue address"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Requests */}
      <div>
        <Textarea
          label="Special Requests or Notes (Optional)"
          value={data.specialRequests}
          onChange={(e) => handleInputChange('specialRequests', e.target.value)}
          placeholder="Tell us about any specific requirements, themes, or special considerations for your event..."
          maxLength={1000}
          showCharCount
          rows={4}
        />
      </div>

      {/* Quick Tips */}
      <Card className="bg-accent-50 border-accent-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <MessageSquare className="h-5 w-5 text-accent-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-primary-900 mb-2">💡 Pro Tips</h4>
              <ul className="text-sm text-neutral-700 space-y-1">
                <li>• Book at least 2-3 months in advance for better availability</li>
                <li>• Consider seasonal factors that might affect your event</li>
                <li>• Mention any accessibility requirements in special requests</li>
                <li>• Include dietary restrictions or cultural preferences</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg" className="min-w-[120px]">
          Continue
        </Button>
      </div>
    </div>
  )
}
