'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  Heart, 
  Share2, 
  MapPin, 
  Users, 
  Calendar, 
  Star, 
  Play,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock
} from 'lucide-react'
import { Button, Badge, Card, CardContent, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { formatCurrency, formatDate } from '@/lib/utils'
import ImageGallery from '@/components/media/ImageGallery'
import BeforeAfterSlider from '@/components/media/BeforeAfterSlider'
import PackageSelector from '@/components/booking/PackageSelector'
import SimilarEvents from '@/components/sections/SimilarEvents'
import SocialShare from '@/components/ui/SocialShare'

// Mock event data - in real app, this would come from Firebase
const mockEvent = {
  id: '1',
  title: 'Enchanted Garden Wedding',
  type: 'wedding',
  heroImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1920&h=1080&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop',
  ],
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  location: {
    city: 'Goa',
    venue: 'Sunset Beach Resort',
    address: '123 Beach Road, Calangute, Goa 403516',
  },
  dateStart: new Date('2024-06-15'),
  dateEnd: new Date('2024-06-15'),
  guests: 150,
  budgetRange: { min: 25000, max: 35000 },
  tags: ['beach', 'sunset', 'romantic', 'outdoor'],
  rating: 4.9,
  reviews: 127,
  views: 1240,
  story: `A magical beachside celebration where love meets the endless horizon. This enchanted garden wedding combined the natural beauty of Goa's coastline with elegant floral arrangements and twinkling lights.

The ceremony took place during golden hour, with the couple exchanging vows as the sun painted the sky in shades of coral and gold. Guests were seated on vintage wooden chairs adorned with flowing white fabric and tropical blooms.

The reception featured a stunning mandap decorated with cascading jasmine and marigolds, creating an intimate atmosphere under the stars. Local musicians provided traditional melodies that blended seamlessly with the sound of gentle waves.

Every detail was carefully curated to reflect the couple's love story - from the handwritten vows to the personalized favors made from local seashells. The evening concluded with a spectacular fireworks display over the Arabian Sea.`,
  
  highlights: [
    'Beachfront ceremony at sunset',
    'Traditional mandap with tropical flowers',
    'Live acoustic music throughout',
    'Fireworks display over the ocean',
    'Gourmet seafood dinner',
    'Professional photography & videography'
  ],
  
  beforeAfter: {
    before: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    after: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop'
  },
  
  packages: [
    {
      id: '1',
      name: 'Essential Beach Wedding',
      price: 25000,
      description: 'Perfect for intimate beachside ceremonies',
      inclusions: [
        'Ceremony setup with mandap',
        'Floral decorations',
        'Basic photography (4 hours)',
        'Sound system',
        'Coordination'
      ]
    },
    {
      id: '2',
      name: 'Premium Beach Celebration',
      price: 35000,
      description: 'Complete wedding experience with luxury touches',
      inclusions: [
        'Full ceremony & reception setup',
        'Premium floral arrangements',
        'Professional photography (8 hours)',
        'Videography highlights',
        'Live music',
        'Catering coordination',
        'Fireworks display'
      ],
      isPopular: true
    }
  ],
  
  creator: {
    id: 'creator1',
    name: 'Elite Events by Rajesh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 4.9,
    reviews: 127,
    experience: '10+ years',
    specialties: ['Beach Weddings', 'Destination Events', 'Luxury Celebrations']
  },
  
  testimonials: [
    {
      id: '1',
      name: 'Priya & Arjun',
      rating: 5,
      comment: 'Our dream wedding came to life! Every detail was perfect, from the sunset ceremony to the magical fireworks. Highly recommended!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face',
      date: new Date('2024-01-15')
    }
  ]
}

export default function EventPage() {
  const params = useParams()
  const [event, setEvent] = useState(mockEvent)
  const [isFavorited, setIsFavorited] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showVideoModal, setShowVideoModal] = useState(false)

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        event_category: 'event_detail',
        event_label: event.id,
        event_type: event.type
      })
    }
  }, [event.id, event.type])

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited)
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', isFavorited ? 'unfavorite' : 'favorite', {
        event_category: 'engagement',
        event_label: 'event_detail',
        event_id: event.id
      })
    }
  }

  const handleBookNow = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'book_now_click', {
        event_category: 'conversion',
        event_label: 'event_detail',
        event_id: event.id,
        package_id: selectedPackage
      })
    }
    // Navigate to booking flow
    window.location.href = `/booking/${event.id}${selectedPackage ? `?package=${selectedPackage}` : ''}`
  }

  return (
    <div className="min-h-screen bg-muted-100">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={event.heroImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/40 to-transparent" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="gold" className="capitalize">
                  {event.type}
                </Badge>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <Eye className="h-4 w-4" />
                  <span>{event.views.toLocaleString()} views</span>
                </div>
              </div>
              
              <h1 className="text-display-xl text-white mb-4">
                {event.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location.venue}, {event.location.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{event.guests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{formatDate(event.dateStart)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-gold-400 text-gold-400" />
                  <span>{event.rating} ({event.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="capitalize bg-white/20 text-white border-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <Button size="lg" onClick={handleBookNow}>
                  Book This Experience
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleFavoriteToggle}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Saved' : 'Save'}
                </Button>
                <SocialShare
                  url={`${window.location.origin}/events/${event.id}`}
                  title={event.title}
                  description={event.story.substring(0, 150) + '...'}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Play Button */}
        {event.videoUrl && (
          <button
            onClick={() => setShowVideoModal(true)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all group"
          >
            <Play className="h-12 w-12 text-white group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Story Section */}
            <section>
              <h2 className="text-display-md text-primary-900 mb-6">The Story</h2>
              <div className="prose prose-lg max-w-none">
                {event.story.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-neutral-700 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Highlights */}
            <section>
              <h2 className="text-display-md text-primary-900 mb-6">Event Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-card">
                    <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0" />
                    <span className="text-neutral-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Media Gallery */}
            <section>
              <h2 className="text-display-md text-primary-900 mb-6">Gallery</h2>
              <ImageGallery images={event.gallery} />
            </section>

            {/* Before/After */}
            <section>
              <h2 className="text-display-md text-primary-900 mb-6">Transformation</h2>
              <BeforeAfterSlider
                beforeImage={event.beforeAfter.before}
                afterImage={event.beforeAfter.after}
                beforeLabel="Before Setup"
                afterLabel="Final Result"
              />
            </section>

            {/* Testimonials */}
            <section>
              <h2 className="text-display-md text-primary-900 mb-6">Client Reviews</h2>
              <div className="space-y-6">
                {event.testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-primary-900">{testimonial.name}</h4>
                            <div className="flex items-center">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-neutral-700 leading-relaxed">{testimonial.comment}</p>
                          <p className="text-sm text-neutral-500 mt-2">
                            {formatDate(testimonial.date)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Creator Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={event.creator.avatar}
                    alt={event.creator.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-primary-900">{event.creator.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-neutral-600">
                      <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                      <span>{event.creator.rating} ({event.creator.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-neutral-600">{event.creator.experience}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-primary-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {event.creator.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" size="sm">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Package Selection */}
            <PackageSelector
              packages={event.packages}
              selectedPackage={selectedPackage}
              onPackageSelect={setSelectedPackage}
              onBookNow={handleBookNow}
            />

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-primary-900 mb-4">Event Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Location</span>
                    <span className="font-medium">{event.location.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Venue</span>
                    <span className="font-medium">{event.location.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Guests</span>
                    <span className="font-medium">{event.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Budget Range</span>
                    <span className="font-medium">
                      {formatCurrency(event.budgetRange.min)} - {formatCurrency(event.budgetRange.max)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Events */}
        <div className="mt-16">
          <SimilarEvents currentEventId={event.id} eventType={event.type} />
        </div>
      </div>
    </div>
  )
}
