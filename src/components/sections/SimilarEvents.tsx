'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui'
import EventCard from '@/components/cards/EventCard'

interface SimilarEventsProps {
  currentEventId: string
  eventType: string
}

// Mock similar events data
const mockSimilarEvents = [
  {
    id: '2',
    title: 'Sunset Beach Ceremony',
    type: 'wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
    location: 'Goa',
    guests: 120,
    budget: { min: 30000, max: 45000 },
    tags: ['beach', 'ceremony', 'romantic'],
    rating: 4.9,
    reviews: 203,
    isFavorited: false,
    views: 1890,
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '3',
    title: 'Garden Paradise Wedding',
    type: 'wedding',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop',
    location: 'Mumbai',
    guests: 200,
    budget: { min: 40000, max: 60000 },
    tags: ['garden', 'elegant', 'flowers'],
    rating: 4.8,
    reviews: 156,
    isFavorited: true,
    views: 2340,
    createdAt: new Date('2024-02-28'),
  },
  {
    id: '4',
    title: 'Royal Palace Wedding',
    type: 'wedding',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&h=400&fit=crop',
    location: 'Rajasthan',
    guests: 300,
    budget: { min: 80000, max: 120000 },
    tags: ['luxury', 'traditional', 'palace'],
    rating: 4.9,
    reviews: 89,
    isFavorited: false,
    views: 3456,
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '5',
    title: 'Intimate Beach Celebration',
    type: 'wedding',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=400&fit=crop',
    location: 'Kerala',
    guests: 80,
    budget: { min: 20000, max: 30000 },
    tags: ['intimate', 'beach', 'sunset'],
    rating: 4.7,
    reviews: 134,
    isFavorited: false,
    views: 1567,
    createdAt: new Date('2024-03-05'),
  },
]

export default function SimilarEvents({ currentEventId, eventType }: SimilarEventsProps) {
  const [events, setEvents] = useState(mockSimilarEvents)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Filter out current event and get similar events
  const similarEvents = events.filter(event => 
    event.id !== currentEventId && event.type === eventType
  )

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < similarEvents.length - itemsPerView

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  if (similarEvents.length === 0) {
    return null
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-display-md text-primary-900 mb-2">Similar Experiences</h2>
          <p className="text-neutral-600">Discover more {eventType} inspirations</p>
        </div>
        
        {similarEvents.length > itemsPerView && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className="p-2"
              aria-label="Previous events"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollRight}
              disabled={!canScrollRight}
              className="p-2"
              aria-label="Next events"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Events Carousel */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-out gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            width: `${(similarEvents.length / itemsPerView) * 100}%`
          }}
        >
          {similarEvents.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0"
              style={{ width: `${100 / similarEvents.length}%` }}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {similarEvents.length > itemsPerView && (
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: Math.ceil(similarEvents.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(currentIndex / itemsPerView) === index
                  ? 'bg-accent-500 w-8'
                  : 'bg-muted-400 hover:bg-muted-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          onClick={() => {
            window.location.href = `/explore?type=${eventType}`
          }}
        >
          View All {eventType.charAt(0).toUpperCase() + eventType.slice(1)} Events
        </Button>
      </div>
    </section>
  )
}
