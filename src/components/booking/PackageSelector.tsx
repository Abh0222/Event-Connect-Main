'use client'

import { useState } from 'react'
import { Check, Star, ArrowRight } from 'lucide-react'
import { Button, Card, CardContent, Badge } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

interface Package {
  id: string
  name: string
  price: number
  description: string
  inclusions: string[]
  isPopular?: boolean
}

interface PackageSelectorProps {
  packages: Package[]
  selectedPackage: string | null
  onPackageSelect: (packageId: string) => void
  onBookNow: () => void
}

export default function PackageSelector({
  packages,
  selectedPackage,
  onPackageSelect,
  onBookNow
}: PackageSelectorProps) {
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null)

  const handlePackageSelect = (packageId: string) => {
    onPackageSelect(packageId)
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'package_selected', {
        event_category: 'conversion',
        event_label: 'event_detail',
        package_id: packageId
      })
    }
  }

  const togglePackageDetails = (packageId: string) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold text-primary-900 mb-4">Choose Your Package</h3>
        
        <div className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative border-2 rounded-lg transition-all cursor-pointer ${
                selectedPackage === pkg.id
                  ? 'border-accent-500 bg-accent-50'
                  : 'border-muted-300 hover:border-accent-300'
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              {/* Popular Badge */}
              {pkg.isPopular && (
                <div className="absolute -top-2 left-4">
                  <Badge variant="accent" className="text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-900">{pkg.name}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{pkg.description}</p>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-xl font-bold text-primary-900">
                      {formatCurrency(pkg.price)}
                    </div>
                    <div className="text-xs text-neutral-600">starting from</div>
                  </div>
                </div>

                {/* Selection Indicator */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      togglePackageDetails(pkg.id)
                    }}
                    className="text-sm text-accent-500 hover:text-accent-600 font-medium"
                  >
                    {expandedPackage === pkg.id ? 'Hide details' : 'View details'}
                  </button>
                  
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-accent-500 bg-accent-500'
                      : 'border-muted-400'
                  }`}>
                    {selectedPackage === pkg.id && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                </div>

                {/* Package Details */}
                {expandedPackage === pkg.id && (
                  <div className="mt-4 pt-4 border-t border-muted-300">
                    <h5 className="font-medium text-primary-900 mb-2">What's included:</h5>
                    <ul className="space-y-1">
                      {pkg.inclusions.map((inclusion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
                          <Check className="h-4 w-4 text-accent-500 mt-0.5 flex-shrink-0" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Book Now Button */}
        <div className="mt-6 pt-6 border-t border-muted-300">
          <Button
            onClick={onBookNow}
            disabled={!selectedPackage}
            className="w-full group"
            size="lg"
          >
            {selectedPackage ? (
              <>
                Book {packages.find(p => p.id === selectedPackage)?.name}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              'Select a package to continue'
            )}
          </Button>
          
          {selectedPackage && (
            <p className="text-xs text-neutral-600 text-center mt-2">
              You'll be able to customize your package in the next step
            </p>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-4 p-3 bg-muted-100 rounded-lg">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
            <div className="text-sm text-neutral-700">
              <p className="font-medium mb-1">Flexible booking</p>
              <p>Free cancellation up to 48 hours before your event. Secure payment with 30% deposit required.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
