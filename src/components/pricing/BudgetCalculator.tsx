'use client'

import { useState } from 'react'
import { X, Calculator, TrendingUp, Users, Calendar, MapPin } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Select, Input, Badge } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

interface BudgetCalculatorProps {
  onClose: () => void
}

const eventTypes = [
  { value: 'wedding', label: 'Wedding', multiplier: 1.2 },
  { value: 'corporate', label: 'Corporate Event', multiplier: 1.0 },
  { value: 'party', label: 'Private Party', multiplier: 0.9 },
  { value: 'festival', label: 'Festival/Concert', multiplier: 1.1 },
]

const locations = [
  { value: 'mumbai', label: 'Mumbai', multiplier: 1.3 },
  { value: 'delhi', label: 'Delhi', multiplier: 1.2 },
  { value: 'bangalore', label: 'Bangalore', multiplier: 1.1 },
  { value: 'goa', label: 'Goa', multiplier: 1.4 },
  { value: 'rajasthan', label: 'Rajasthan', multiplier: 1.0 },
  { value: 'kerala', label: 'Kerala', multiplier: 0.9 },
]

const durations = [
  { value: '4', label: '4 hours', multiplier: 0.7 },
  { value: '6', label: '6 hours', multiplier: 0.9 },
  { value: '8', label: '8 hours (Full day)', multiplier: 1.0 },
  { value: '12', label: '12 hours', multiplier: 1.3 },
  { value: '24', label: '2 days', multiplier: 1.8 },
]

const basePrice = 25000 // Base price for calculation

export default function BudgetCalculator({ onClose }: BudgetCalculatorProps) {
  const [formData, setFormData] = useState({
    eventType: '',
    guests: '',
    location: '',
    duration: '',
    date: '',
    premium: false,
  })

  const [result, setResult] = useState<{
    estimated: number
    range: { min: number; max: number }
    breakdown: Array<{ item: string; amount: number }>
  } | null>(null)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateBudget = () => {
    if (!formData.eventType || !formData.guests || !formData.location || !formData.duration) {
      return
    }

    const guests = parseInt(formData.guests)
    const eventType = eventTypes.find(t => t.value === formData.eventType)
    const location = locations.find(l => l.value === formData.location)
    const duration = durations.find(d => d.value === formData.duration)

    if (!eventType || !location || !duration) return

    // Base calculation
    let estimated = basePrice
    
    // Guest multiplier (per 50 guests)
    const guestMultiplier = Math.max(1, guests / 50)
    estimated *= guestMultiplier

    // Apply multipliers
    estimated *= eventType.multiplier
    estimated *= location.multiplier
    estimated *= duration.multiplier

    // Premium services
    if (formData.premium) {
      estimated *= 1.5
    }

    // Date premium (peak season)
    if (formData.date) {
      const eventDate = new Date(formData.date)
      const month = eventDate.getMonth()
      // Peak season: Oct-Mar (wedding season in India)
      if (month >= 9 || month <= 2) {
        estimated *= 1.2
      }
    }

    // Create range (±25%)
    const range = {
      min: Math.round(estimated * 0.75),
      max: Math.round(estimated * 1.25)
    }

    // Breakdown
    const breakdown = [
      { item: 'Base Event Services', amount: Math.round(basePrice * guestMultiplier) },
      { item: `${eventType.label} Premium`, amount: Math.round(basePrice * guestMultiplier * (eventType.multiplier - 1)) },
      { item: `${location.label} Location`, amount: Math.round(basePrice * guestMultiplier * (location.multiplier - 1)) },
      { item: `${duration.label} Duration`, amount: Math.round(basePrice * guestMultiplier * (duration.multiplier - 1)) },
    ]

    if (formData.premium) {
      breakdown.push({ item: 'Premium Services', amount: Math.round(estimated * 0.3) })
    }

    setResult({
      estimated: Math.round(estimated),
      range,
      breakdown: breakdown.filter(item => item.amount > 0)
    })

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'budget_calculated', {
        event_category: 'engagement',
        event_label: 'budget_calculator',
        estimated_budget: Math.round(estimated),
        event_type: formData.eventType,
        guest_count: guests
      })
    }
  }

  const resetCalculator = () => {
    setFormData({
      eventType: '',
      guests: '',
      location: '',
      duration: '',
      date: '',
      premium: false,
    })
    setResult(null)
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Calculator className="h-6 w-6 text-accent-500" />
          <CardTitle>Budget Calculator</CardTitle>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary-900 mb-2">
              Event Type *
            </label>
            <Select
              value={formData.eventType}
              onChange={(e) => handleInputChange('eventType', e.target.value)}
              options={eventTypes.map(type => ({ value: type.value, label: type.label }))}
              placeholder="Select event type"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-2">
              Number of Guests *
            </label>
            <Input
              type="number"
              value={formData.guests}
              onChange={(e) => handleInputChange('guests', e.target.value)}
              placeholder="e.g., 150"
              min="1"
              max="2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-2">
              Location *
            </label>
            <Select
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              options={locations.map(loc => ({ value: loc.value, label: loc.label }))}
              placeholder="Select location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-2">
              Event Duration *
            </label>
            <Select
              value={formData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
              options={durations.map(dur => ({ value: dur.value, label: dur.label }))}
              placeholder="Select duration"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-2">
              Event Date (Optional)
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="premium"
              checked={formData.premium}
              onChange={(e) => handleInputChange('premium', e.target.checked)}
              className="w-4 h-4 text-accent-500 focus:ring-accent-500/20"
            />
            <label htmlFor="premium" className="text-sm text-primary-900">
              Include premium services (luxury upgrades, premium vendors)
            </label>
          </div>

          <div className="flex gap-3">
            <Button onClick={calculateBudget} className="flex-1">
              Calculate Budget
            </Button>
            <Button variant="outline" onClick={resetCalculator}>
              Reset
            </Button>
          </div>
        </div>

        {/* Results */}
        <div>
          {result ? (
            <div className="space-y-6">
              <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-gold-50 rounded-xl border border-accent-200">
                <TrendingUp className="h-8 w-8 text-accent-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Estimated Budget
                </h3>
                <div className="text-3xl font-bold text-accent-500 mb-2">
                  {formatCurrency(result.estimated)}
                </div>
                <div className="text-sm text-neutral-600">
                  Range: {formatCurrency(result.range.min)} - {formatCurrency(result.range.max)}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-primary-900 mb-3">Cost Breakdown</h4>
                <div className="space-y-2">
                  {result.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-muted-200">
                      <span className="text-sm text-neutral-700">{item.item}</span>
                      <span className="font-medium text-primary-900">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-muted-100 rounded-lg">
                <h4 className="font-semibold text-primary-900 mb-2">What's Next?</h4>
                <p className="text-sm text-neutral-700 mb-3">
                  This is an estimated budget based on your requirements. 
                  For a detailed quote, book a consultation with our team.
                </p>
                <Button size="sm" className="w-full">
                  Book Free Consultation
                </Button>
              </div>

              <div className="text-xs text-neutral-500">
                * Estimates are based on average market rates and may vary based on specific requirements, 
                vendor availability, and seasonal demand.
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <Calculator className="h-16 w-16 text-muted-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  Get Your Budget Estimate
                </h3>
                <p className="text-neutral-600">
                  Fill in the details on the left to get a personalized budget estimate for your event.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
