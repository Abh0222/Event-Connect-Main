'use client'

import { useState } from 'react'
import { Check, X, Star, Users, Clock, CreditCard } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

interface Package {
  id: string
  name: string
  price: { min: number; max: number }
  deposit: number
  turnaround: number
  features: string[]
  maxGuests: number
  popular: boolean
}

interface PackageComparisonProps {
  packages: Package[]
}

// All possible features across packages for comparison
const allFeatures = [
  'Event planning consultation',
  'Complete event planning',
  'Luxury event design & planning',
  'Basic decoration setup',
  'Premium decoration & theming',
  'Designer decoration & custom themes',
  'Photography coverage (3 hours)',
  'Professional photography (6 hours)',
  'Professional photography (8+ hours)',
  'Basic sound system',
  'Premium sound & lighting system',
  'Premium AV & intelligent lighting',
  'Day-of coordination',
  'Full-day event management',
  'Personal event coordinator',
  'Digital photo gallery',
  'Videography with highlights',
  'Cinematic videography with same-day edit',
  'Basic lighting setup',
  'Vendor coordination',
  'Catering coordination',
  'Gourmet catering management',
  'Guest management services',
  'VIP guest experience management',
  'Custom signage & branding',
  'Custom entertainment booking',
  'Backup equipment & staff',
  'Luxury transportation coordination',
  'Post-event cleanup',
  'Post-event content delivery',
  'Dedicated planning app access',
  '24/7 support hotline'
]

export default function PackageComparison({ packages }: PackageComparisonProps) {
  const [selectedPackages, setSelectedPackages] = useState<string[]>(
    packages.slice(0, 3).map(p => p.id)
  )

  const togglePackageSelection = (packageId: string) => {
    setSelectedPackages(prev => {
      if (prev.includes(packageId)) {
        return prev.filter(id => id !== packageId)
      } else if (prev.length < 3) {
        return [...prev, packageId]
      } else {
        // Replace the first selected package
        return [prev[1], prev[2], packageId]
      }
    })
  }

  const selectedPackageData = packages.filter(pkg => selectedPackages.includes(pkg.id))

  const hasFeature = (packageFeatures: string[], feature: string) => {
    return packageFeatures.some(f => 
      f.toLowerCase().includes(feature.toLowerCase()) ||
      feature.toLowerCase().includes(f.toLowerCase())
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-display-lg text-primary-900 mb-4">
          Compare Packages
        </h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-6">
          Select up to 3 packages to compare features, pricing, and what's included.
        </p>
        
        {/* Package Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {packages.map(pkg => (
            <Button
              key={pkg.id}
              variant={selectedPackages.includes(pkg.id) ? 'primary' : 'outline'}
              size="sm"
              onClick={() => togglePackageSelection(pkg.id)}
              disabled={!selectedPackages.includes(pkg.id) && selectedPackages.length >= 3}
              className="relative"
            >
              {pkg.name}
              {pkg.popular && (
                <Star className="h-3 w-3 ml-1 fill-current" />
              )}
            </Button>
          ))}
        </div>
      </div>

      {selectedPackageData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-muted-300">
                    <th className="text-left py-4 px-2 font-medium text-primary-900 min-w-[200px]">
                      Features
                    </th>
                    {selectedPackageData.map(pkg => (
                      <th key={pkg.id} className="text-center py-4 px-4 min-w-[150px]">
                        <div className="space-y-2">
                          <div className="font-semibold text-primary-900">{pkg.name}</div>
                          {pkg.popular && (
                            <Badge variant="accent" size="sm">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Pricing Row */}
                  <tr className="border-b border-muted-200 bg-muted-50">
                    <td className="py-4 px-2 font-medium text-primary-900">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Starting Price
                      </div>
                    </td>
                    {selectedPackageData.map(pkg => (
                      <td key={pkg.id} className="text-center py-4 px-4">
                        <div className="font-bold text-lg text-primary-900">
                          {formatCurrency(pkg.price.min)}
                        </div>
                        <div className="text-xs text-neutral-600">
                          up to {formatCurrency(pkg.price.max)}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Max Guests Row */}
                  <tr className="border-b border-muted-200">
                    <td className="py-4 px-2 font-medium text-primary-900">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Maximum Guests
                      </div>
                    </td>
                    {selectedPackageData.map(pkg => (
                      <td key={pkg.id} className="text-center py-4 px-4">
                        <div className="font-semibold text-primary-900">
                          {pkg.maxGuests.toLocaleString()}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Turnaround Row */}
                  <tr className="border-b border-muted-200 bg-muted-50">
                    <td className="py-4 px-2 font-medium text-primary-900">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Planning Time
                      </div>
                    </td>
                    {selectedPackageData.map(pkg => (
                      <td key={pkg.id} className="text-center py-4 px-4">
                        <div className="font-semibold text-primary-900">
                          {pkg.turnaround} days
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Deposit Row */}
                  <tr className="border-b border-muted-200">
                    <td className="py-4 px-2 font-medium text-primary-900">
                      Deposit Required
                    </td>
                    {selectedPackageData.map(pkg => (
                      <td key={pkg.id} className="text-center py-4 px-4">
                        <div className="font-semibold text-primary-900">
                          {pkg.deposit}%
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Features Rows */}
                  {allFeatures.map((feature, index) => {
                    // Only show features that at least one selected package has
                    const hasAnyPackage = selectedPackageData.some(pkg => 
                      hasFeature(pkg.features, feature)
                    )
                    
                    if (!hasAnyPackage) return null

                    return (
                      <tr 
                        key={feature} 
                        className={`border-b border-muted-200 ${index % 2 === 0 ? 'bg-muted-50' : ''}`}
                      >
                        <td className="py-3 px-2 text-sm text-neutral-700">
                          {feature}
                        </td>
                        {selectedPackageData.map(pkg => (
                          <td key={pkg.id} className="text-center py-3 px-4">
                            {hasFeature(pkg.features, feature) ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-neutral-400 mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {selectedPackageData.map(pkg => (
                <Button
                  key={pkg.id}
                  variant={pkg.popular ? 'primary' : 'outline'}
                  onClick={() => {
                    window.location.href = `/booking?package=${pkg.id}`
                  }}
                >
                  Book {pkg.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPackageData.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-neutral-600 mb-4">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Select Packages to Compare</h3>
              <p>Choose up to 3 packages from above to see a detailed feature comparison.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
