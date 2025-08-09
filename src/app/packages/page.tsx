'use client'

import { useState } from 'react'
import { Check, Star, Download, Calculator, ArrowRight, Sparkles } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import BudgetCalculator from '@/components/pricing/BudgetCalculator'
import PackageComparison from '@/components/pricing/PackageComparison'

const packages = [
  {
    id: 'essential',
    name: 'Essential Experience',
    tagline: 'Perfect for intimate celebrations',
    price: { min: 15000, max: 25000 },
    deposit: 30,
    turnaround: 14,
    description: 'Ideal for smaller gatherings and intimate celebrations with essential services to make your event memorable.',
    features: [
      'Event planning consultation (2 hours)',
      'Basic decoration setup',
      'Photography coverage (3 hours)',
      'Basic sound system',
      'Day-of coordination',
      'Digital photo gallery',
      'Basic lighting setup',
      'Vendor coordination'
    ],
    addOns: [
      { name: 'Extended Photography', price: 3000, description: 'Additional 2 hours of coverage' },
      { name: 'Videography Highlights', price: 8000, description: '3-minute highlight reel' },
      { name: 'Premium Flowers', price: 5000, description: 'Upgraded floral arrangements' },
      { name: 'Live Music', price: 10000, description: 'Acoustic duo for 2 hours' }
    ],
    eventTypes: ['wedding', 'party', 'corporate'],
    maxGuests: 100,
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Celebration',
    tagline: 'Comprehensive event management',
    price: { min: 35000, max: 60000 },
    deposit: 40,
    turnaround: 21,
    description: 'Complete event management with premium services for a truly memorable celebration.',
    features: [
      'Complete event planning (unlimited consultations)',
      'Premium decoration & theming',
      'Professional photography (6 hours)',
      'Videography with highlights',
      'Premium sound & lighting system',
      'Catering coordination',
      'Full-day event management',
      'Guest management services',
      'Custom signage & branding',
      'Backup equipment & staff',
      'Post-event cleanup'
    ],
    addOns: [
      { name: 'Drone Photography', price: 8000, description: 'Aerial shots and videos' },
      { name: 'Live Streaming', price: 12000, description: 'Professional live stream setup' },
      { name: 'Photo Booth', price: 15000, description: 'Interactive photo booth with props' },
      { name: 'Premium Bar Service', price: 20000, description: 'Professional bartender with premium drinks' }
    ],
    eventTypes: ['wedding', 'corporate', 'festival'],
    maxGuests: 300,
    popular: true
  },
  {
    id: 'luxe',
    name: 'Luxe Experience',
    tagline: 'Ultimate luxury event experience',
    price: { min: 75000, max: 150000 },
    deposit: 50,
    turnaround: 30,
    description: 'The ultimate luxury experience with white-glove service and premium amenities.',
    features: [
      'Luxury event design & planning',
      'Designer decoration & custom themes',
      'Professional photography (8+ hours)',
      'Cinematic videography with same-day edit',
      'Premium AV & intelligent lighting',
      'Gourmet catering management',
      'Personal event coordinator',
      'VIP guest experience management',
      'Custom entertainment booking',
      'Luxury transportation coordination',
      'Post-event content delivery',
      'Dedicated planning app access',
      '24/7 support hotline'
    ],
    addOns: [
      { name: 'Celebrity Host/DJ', price: 50000, description: 'Professional celebrity host or DJ' },
      { name: 'Fireworks Display', price: 25000, description: 'Professional fireworks show' },
      { name: 'Luxury Lounge Setup', price: 30000, description: 'VIP lounge area with premium furniture' },
      { name: 'Multi-Camera Live Production', price: 40000, description: 'Professional multi-camera live streaming' }
    ],
    eventTypes: ['wedding', 'corporate', 'festival', 'party'],
    maxGuests: 1000,
    popular: false
  }
]

export default function PackagesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showCalculator, setShowCalculator] = useState(false)
  const [selectedEventType, setSelectedEventType] = useState('wedding')

  const handleDownloadBrochure = (packageId: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'brochure_download', {
        event_category: 'conversion',
        event_label: 'packages_page',
        package_id: packageId
      })
    }
    
    // In a real app, this would trigger a PDF download
    alert('Brochure download would start here')
  }

  const handleBookPackage = (packageId: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'package_book_click', {
        event_category: 'conversion',
        event_label: 'packages_page',
        package_id: packageId
      })
    }
    
    window.location.href = `/booking?package=${packageId}`
  }

  const filteredPackages = packages.filter(pkg => 
    pkg.eventTypes.includes(selectedEventType)
  )

  return (
    <div className="min-h-screen bg-muted-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="container-custom py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-display-xl mb-6">
              Choose Your Perfect Package
            </h1>
            <p className="text-xl text-white/90 mb-8">
              From intimate gatherings to grand celebrations, we have the perfect package to bring your vision to life.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                variant={showCalculator ? 'outline' : 'secondary'}
                size="lg"
                onClick={() => setShowCalculator(!showCalculator)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Budget Calculator
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Compare Packages
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Calculator */}
      {showCalculator && (
        <div className="bg-white border-b border-muted-300">
          <div className="container-custom py-8">
            <BudgetCalculator onClose={() => setShowCalculator(false)} />
          </div>
        </div>
      )}

      {/* Event Type Filter */}
      <div className="bg-white border-b border-muted-300">
        <div className="container-custom py-6">
          <Tabs value={selectedEventType} onValueChange={setSelectedEventType}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="wedding">Weddings</TabsTrigger>
              <TabsTrigger value="corporate">Corporate</TabsTrigger>
              <TabsTrigger value="party">Parties</TabsTrigger>
              <TabsTrigger value="festival">Festivals</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${
                pkg.popular ? 'ring-2 ring-accent-500 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent-500 to-accent-400 text-white text-center py-2 text-sm font-semibold">
                  <Sparkles className="inline h-4 w-4 mr-1" />
                  Most Popular Choice
                </div>
              )}

              <CardHeader className={`text-center ${pkg.popular ? 'pt-12' : 'pt-6'}`}>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">{pkg.name}</h3>
                  <p className="text-neutral-600">{pkg.tagline}</p>
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-primary-900 mb-2">
                    {formatCurrency(pkg.price.min)}
                    <span className="text-lg font-normal text-neutral-600">
                      - {formatCurrency(pkg.price.max)}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">Starting price range</p>
                </div>

                <p className="text-neutral-700 leading-relaxed">{pkg.description}</p>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted-100 rounded-lg">
                  <div className="text-center">
                    <div className="font-semibold text-primary-900">{pkg.deposit}%</div>
                    <div className="text-xs text-neutral-600">Deposit</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary-900">{pkg.turnaround}</div>
                    <div className="text-xs text-neutral-600">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary-900">{pkg.maxGuests}</div>
                    <div className="text-xs text-neutral-600">Max Guests</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-primary-900 mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {pkg.features.slice(0, 6).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent-500 mt-0.5 flex-shrink-0" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                    {pkg.features.length > 6 && (
                      <li className="text-sm text-accent-500 font-medium">
                        + {pkg.features.length - 6} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Popular Add-ons */}
                <div className="mb-6">
                  <h4 className="font-semibold text-primary-900 mb-3">Popular Add-ons:</h4>
                  <div className="space-y-2">
                    {pkg.addOns.slice(0, 2).map((addon, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-neutral-700">{addon.name}</span>
                        <span className="font-medium text-primary-900">
                          +{formatCurrency(addon.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    onClick={() => handleBookPackage(pkg.id)}
                    className="w-full group"
                    variant={pkg.popular ? 'primary' : 'secondary'}
                  >
                    Book {pkg.name}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => handleDownloadBrochure(pkg.id)}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Package Comparison */}
        <div id="comparison">
          <PackageComparison packages={filteredPackages} />
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-display-lg text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Everything you need to know about our packages and pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Can I customize my package?</h3>
                <p className="text-neutral-700">
                  Absolutely! All our packages can be customized to fit your specific needs. 
                  We'll work with you to add or modify services to create your perfect event.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary-900 mb-3">What's the booking process?</h3>
                <p className="text-neutral-700">
                  Simply select your package, provide event details, and secure with a deposit. 
                  We'll then schedule a consultation to finalize all the details.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary-900 mb-3">What's your cancellation policy?</h3>
                <p className="text-neutral-700">
                  We offer flexible cancellation up to 30 days before your event for a full refund. 
                  Cancellations within 30 days are subject to our terms and conditions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary-900 mb-3">Do you travel for events?</h3>
                <p className="text-neutral-700">
                  Yes! We provide services across India. Travel costs may apply for events 
                  outside our primary service areas. Contact us for a detailed quote.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary-900 to-primary-700 rounded-2xl p-12 text-white">
          <h2 className="text-display-lg mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your vision and create a custom package that brings your dream event to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent-500 hover:bg-accent-400">
              Schedule Consultation
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Chat with Vibe AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
