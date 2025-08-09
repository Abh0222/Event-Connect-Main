'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Eye, Users, MapPin, Star, Calendar, ArrowRight } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

interface Event {
  id: string
  title: string
  type: string
  image: string
  location: string
  guests: number
  budget: { min: number; max: number }
  tags: string[]
  rating: number
  reviews: number
  isFavorited: boolean
  views: number
  createdAt: Date
}

interface EventCardProps {
  event: Event
  layout?: 'grid' | 'list'
}

export default function EventCard({ event, layout = 'grid' }: EventCardProps) {
  const [isFavorited, setIsFavorited] = useState(event.isFavorited)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(!isFavorited)
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', isFavorited ? 'unfavorite' : 'favorite', {
        event_category: 'engagement',
        event_label: 'event_card',
        event_id: event.id
      })
    }
  }

  const handleCardClick = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'event_card_click', {
        event_category: 'navigation',
        event_label: 'explore_page',
        event_id: event.id,
        event_type: event.type
      })
    }
  }

  if (layout === 'list') {
    return (
      <Link href={`/events/${event.id}`} onClick={handleCardClick}>
        <div className="group bg-white rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="relative md:w-80 h-48 md:h-auto overflow-hidden">
              <div className={`absolute inset-0 bg-muted-300 animate-pulse ${isImageLoaded ? 'hidden' : 'block'}`} />
              <img
                src={event.image}
                alt={event.title}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImageLoaded(true)}
              />
              
              {/* Favorite Button */}
              <button
                onClick={handleFavoriteToggle}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    isFavorited ? 'fill-accent-500 text-accent-500' : 'text-neutral-600'
                  }`}
                />
              </button>

              {/* Type Badge */}
              <div className="absolute top-4 left-4">
                <Badge variant="gold" className="capitalize">
                  {event.type}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-primary-900 group-hover:text-accent-500 transition-colors line-clamp-2">
                  {event.title}
                </h3>
                <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-accent-500 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
              </div>

              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{event.guests} guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  <span>{event.rating} ({event.reviews})</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" size="sm" className="capitalize">
                    {tag}
                  </Badge>
                ))}
                {event.tags.length > 3 && (
                  <Badge variant="secondary" size="sm">
                    +{event.tags.length - 3} more
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Starting from</p>
                  <p className="text-lg font-semibold text-primary-900">
                    {formatCurrency(event.budget.min)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Eye className="h-4 w-4" />
                  <span>{event.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // Grid layout (default)
  return (
    <Link href={`/events/${event.id}`} onClick={handleCardClick}>
      <div className="group bg-white rounded-xl shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className={`absolute inset-0 bg-muted-300 animate-pulse ${isImageLoaded ? 'hidden' : 'block'}`} />
          <img
            src={event.image}
            alt={event.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorited ? 'fill-accent-500 text-accent-500' : 'text-white'
              }`}
            />
          </button>

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="gold" className="capitalize">
              {event.type}
            </Badge>
          </div>

          {/* Quick Stats Overlay */}
          <div className="absolute bottom-3 left-3 right-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <div className="flex items-center justify-between text-white text-sm mb-3">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{event.guests} guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{event.views}</span>
              </div>
            </div>
            <Button size="sm" className="w-full">
              View Details
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-accent-500 transition-colors line-clamp-2">
            {event.title}
          </h3>
          
          <div className="flex items-center gap-3 text-sm text-neutral-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
              <span>{event.rating}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" size="sm" className="capitalize">
                {tag}
              </Badge>
            ))}
            {event.tags.length > 2 && (
              <Badge variant="secondary" size="sm">
                +{event.tags.length - 2}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-600">Starting from</p>
              <p className="font-semibold text-primary-900">
                {formatCurrency(event.budget.min)}
              </p>
            </div>
            <Button variant="ghost" size="sm">
              View Story
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
