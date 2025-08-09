'use client'

import { useState, useEffect } from 'react'
import { Check, Plus, Minus, Star, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button, Card, CardContent, Badge, Textarea } from '@/components/ui'
import { BookingData } from '@/app/booking/page'
import { formatCurrency } from '@/lib/utils'

interface BookingStepTwoProps {
  data: BookingData
  onUpdate: (updates: Partial<BookingData>) => void
  onNext: () => void
  onPrev: () => void
}

const packages = [
  {
    id: 'essential',
    name: 'Essential Experience',
    price: { min: 15000, max: 25000 },
    description: 'Perfect for intimate celebrations',
    features: [
      'Event planning consultation (2 hours)',
      'Basic decoration setup',
      'Photography coverage (3 hours)',
      'Basic sound system',
      'Day-of coordination',
      'Digital photo gallery'
    ],
    maxGuests: 100,
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Celebration',
    price: { min: 35000, max: 60000 },
    description: 'Comprehensive event management',
    features: [
      'Complete event planning',
      'Premium decoration & theming',
      'Professional photography (6 hours)',
      'Videography with highlights',
      'Premium sound & lighting',
      'Catering coordination',
      'Full-day event management'
    ],
    maxGuests: 300,
    popular: true
  },
  {
    id: 'luxe',
    name: 'Luxe Experience',
    price: { min: 75000, max: 150000 },
    description: 'Ultimate luxury event experience',
    features: [
      'Luxury event design & planning',
      'Designer decoration & themes',
      'Professional photography (8+ hours)',
      'Cinematic videography',
      'Premium AV & lighting',
      'Personal event coordinator',
      'VIP guest experience'
    ],
    maxGuests: 1000,
    popular: false
  }
]

const addOns = [
  {
    id: 'extended-photo',
    name: 'Extended Photography',
    description: 'Additional 2 hours of professional photography',
    price: 3000,
    category: 'Photography'
  },
  {
    id: 'videography',
    name: 'Videography Highlights',
    description: '3-minute cinematic highlight reel',
    price: 8000,
    category: 'Videography'
  },
  {
    id: 'drone-photo',
    name: 'Drone Photography',
    description: 'Aerial shots and videos',
    price: 8000,
    category: 'Photography'
  },
  {
    id: 'live-stream',
    name: 'Live Streaming',
    description: 'Professional live stream setup',
    price: 12000,
    category: 'Technology'
  },
  {
    id: 'photo-booth',
    name: 'Photo Booth',
    description: 'Interactive photo booth with props',
    price: 15000,
    category: 'Entertainment'
  },
  {
    id: 'premium-flowers',
    name: 'Premium Floral Arrangements',
    description: 'Upgraded luxury flower decorations',
    price: 10000,
    category: 'Decoration'
  },
  {
    id: 'live-music',
    name: 'Live Music Performance',
    description: 'Professional musicians for 3 hours',
    price: 20000,
    category: 'Entertainment'
  },
  {
    id: 'premium-bar',
    name: 'Premium Bar Service',
    description: 'Professional bartender with premium drinks',
    price: 25000,
    category: 'Catering'
  }
]

export default function BookingStepTwo({ data, onUpdate, onNext, onPrev }: BookingStepTwoProps) {
  const [selectedPackage, setSelectedPackage] = useState(data.packageId)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(data.addOns)
  const [customizations, setCustomizations] = useState(data.customizations)

  const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage)

  useEffect(() => {
    // Calculate total amount
    let basePrice = selectedPackageData?.price.min || 0
    const addOnTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId)
      return total + (addOn?.price || 0)
    }, 0)

    const totalAmount = basePrice + addOnTotal
    const depositAmount = Math.round(totalAmount * 0.3) // 30% deposit

    onUpdate({
      packageId: selectedPackage,
      addOns: selectedAddOns,
      customizations,
      totalAmount,
      depositAmount
    })
  }, [selectedPackage, selectedAddOns, customizations, selectedPackageData, onUpdate])

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
  }

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    )
  }

  const handleNext = () => {
    if (selectedPackage) {
      onNext()
    }
  }

  const getAddOnsByCategory = () => {
    const categories: Record<string, typeof addOns> = {}
    addOns.forEach(addOn => {
      if (!categories[addOn.category]) {
        categories[addOn.category] = []
      }
      categories[addOn.category].push(addOn)
    })
    return categories
  }

  const addOnsByCategory = getAddOnsByCategory()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-display-md text-primary-900 mb-2">Choose Your Package</h2>
        <p className="text-neutral-600">
          Select the perfect package for your {data.eventType} with {data.guestCount} guests.
        </p>
      </div>

      {/* Package Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {packages.map(pkg => {
          const isSelected = selectedPackage === pkg.id
          const isWithinGuestLimit = data.guestCount <= pkg.maxGuests

          return (
            <Card
              key={pkg.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-accent-500 shadow-elevated' 
                  : 'hover:shadow-elevated hover:-translate-y-1'
              } ${!isWithinGuestLimit ? 'opacity-60' : ''}`}
              onClick={() => isWithinGuestLimit && handlePackageSelect(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge variant="accent" className="px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-primary-900 mb-2">{pkg.name}</h3>
                  <p className="text-neutral-600 text-sm mb-4">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-primary-900">
                      {formatCurrency(pkg.price.min)}
                    </div>
                    <div className="text-sm text-neutral-600">
                      starting from
                    </div>
                  </div>

                  <div className="text-sm text-neutral-600 mb-4">
                    Up to {pkg.maxGuests} guests
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {pkg.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent-500 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                  {pkg.features.length > 4 && (
                    <div className="text-sm text-accent-500 font-medium">
                      + {pkg.features.length - 4} more features
                    </div>
                  )}
                </div>

                {!isWithinGuestLimit && (
                  <div className="text-center text-sm text-red-600 mb-4">
                    This package supports up to {pkg.maxGuests} guests
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'border-accent-500 bg-accent-500'
                      : 'border-muted-400'
                  }`}>
                    {isSelected && <Check className="h-3 w-3 text-white" />}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add-ons Section */}
      {selectedPackage && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-primary-900 mb-2">Enhance Your Experience</h3>
            <p className="text-neutral-600">Add optional services to make your event even more special.</p>
          </div>

          {Object.entries(addOnsByCategory).map(([category, categoryAddOns]) => (
            <Card key={category}>
              <CardContent className="p-6">
                <h4 className="font-semibold text-primary-900 mb-4">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryAddOns.map(addOn => {
                    const isSelected = selectedAddOns.includes(addOn.id)
                    
                    return (
                      <div
                        key={addOn.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-accent-500 bg-accent-50' 
                            : 'border-muted-300 hover:border-accent-300'
                        }`}
                        onClick={() => toggleAddOn(addOn.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-primary-900">{addOn.name}</h5>
                            <p className="text-sm text-neutral-600 mt-1">{addOn.description}</p>
                          </div>
                          <div className="ml-4 text-right">
                            <div className="font-semibold text-primary-900">
                              {formatCurrency(addOn.price)}
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-2 ${
                              isSelected
                                ? 'border-accent-500 bg-accent-500'
                                : 'border-muted-400'
                            }`}>
                              {isSelected && <Check className="h-3 w-3 text-white" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Custom Requests */}
          <div>
            <Textarea
              label="Custom Requests (Optional)"
              value={customizations}
              onChange={(e) => setCustomizations(e.target.value)}
              placeholder="Any specific customizations or special requests for your package..."
              maxLength={500}
              showCharCount
              rows={3}
            />
          </div>
        </div>
      )}

      {/* Price Summary */}
      {selectedPackage && (
        <Card className="bg-muted-50 border-muted-300">
          <CardContent className="p-6">
            <h4 className="font-semibold text-primary-900 mb-4">Price Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-700">{selectedPackageData?.name}</span>
                <span className="font-medium">{formatCurrency(selectedPackageData?.price.min || 0)}</span>
              </div>
              
              {selectedAddOns.map(addOnId => {
                const addOn = addOns.find(a => a.id === addOnId)
                if (!addOn) return null
                
                return (
                  <div key={addOnId} className="flex justify-between">
                    <span className="text-neutral-700">{addOn.name}</span>
                    <span className="font-medium">{formatCurrency(addOn.price)}</span>
                  </div>
                )
              })}
              
              <div className="border-t border-muted-300 pt-2 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-primary-900">Total Amount</span>
                  <span className="text-primary-900">{formatCurrency(data.totalAmount)}</span>
                </div>
                <div className="flex justify-between text-sm text-neutral-600 mt-1">
                  <span>Deposit Required (30%)</span>
                  <span>{formatCurrency(data.depositAmount)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={handleNext} 
          disabled={!selectedPackage}
          size="lg"
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
