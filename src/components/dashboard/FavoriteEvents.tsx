'use client'

import { useState } from 'react'
import { Heart, Eye, Share2, Trash2, Calendar, Users, MapPin, Star } from 'lucide-react'
import { Button, Card, CardContent, Badge, Input, Select } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

const mockFavorites = [
  {
    id: '1',
    title: 'Enchanted Garden Wedding',
    type: 'wedding',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop',
    location: 'Goa',
    guests: 150,
    budget: { min: 25000, max: 35000 },
    tags: ['beach', 'sunset', 'romantic'],
    rating: 4.9,
    reviews: 127,
    creator: {
      name: 'Elite Events by Rajesh',
      rating: 4.9
    },
    savedAt: new Date('2024-03-10')
  },
  {
    id: '2',
    title: 'Corporate Summit Experience',
    type: 'corporate',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    location: 'Bangalore',
    guests: 500,
    budget: { min: 75000, max: 100000 },
    tags: ['technology', 'innovation', 'networking'],
    rating: 4.8,
    reviews: 89,
    creator: {
      name: 'Corporate Events Pro',
      rating: 4.8
    },
    savedAt: new Date('2024-03-15')
  },
  {
    id: '3',
    title: 'Luxury Birthday Celebration',
    type: 'party',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop',
    location: 'Mumbai',
    guests: 80,
    budget: { min: 15000, max: 25000 },
    tags: ['luxury', 'elegant', 'intimate'],
    rating: 4.9,
    reviews: 156,
    creator: {
      name: 'Luxury Celebrations',
      rating: 4.9
    },
    savedAt: new Date('2024-02-28')
  }
]

const eventTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'party', label: 'Party' },
  { value: 'festival', label: 'Festival' }
]

export default function FavoriteEvents() {
  const [favorites, setFavorites] = useState(mockFavorites)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredFavorites = favorites.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || event.type === filterType
    return matchesSearch && matchesType
  })

  const handleRemoveFavorite = (eventId: string) => {
    if (confirm('Remove this event from your favorites?')) {
      setFavorites(prev => prev.filter(event => event.id !== eventId))
    }
  }

  const handleBookEvent = (eventId: string) => {
    window.location.href = `/events/${eventId}`
  }

  const handleShareEvent = (event: any) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this amazing ${event.type} event!`,
        url: `${window.location.origin}/events/${event.id}`
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-display-lg text-primary-900">Favorite Events</h2>
        <p className="text-neutral-600">Events you've saved for future reference</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              options={eventTypes}
            />
          </div>
        </CardContent>
      </Card>

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFavorites.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-elevated transition-all duration-300 group">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => window.open(`/events/${event.id}`, '_blank')}
                    className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleBookEvent(event.id)}
                    className="bg-accent-500 hover:bg-accent-400"
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Type Badge */}
              <div className="absolute top-3 left-3">
                <Badge variant="gold" className="capitalize">
                  {event.type}
                </Badge>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => handleRemoveFavorite(event.id)}
                className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all group"
                title="Remove from favorites"
              >
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              </button>
            </div>

            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-primary-900 mb-2 line-clamp-2">
                {event.title}
              </h3>
              
              <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{event.guests}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                <span className="font-medium">{event.rating}</span>
                <span className="text-neutral-600">({event.reviews})</span>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {event.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" size="sm" className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mb-4">
                <p className="text-sm text-neutral-600">Starting from</p>
                <p className="text-lg font-semibold text-primary-900">
                  {formatCurrency(event.budget.min)}
                </p>
              </div>

              <div className="text-xs text-neutral-500 mb-4">
                Saved on {event.savedAt.toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => window.open(`/events/${event.id}`, '_blank')}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShareEvent(event)}
                >
                  <Share2 className="h-3 w-3" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFavorite(event.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFavorites.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-neutral-600">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No favorites found</h3>
              <p className="mb-4">
                {searchQuery || filterType !== 'all' 
                  ? 'No favorites match your current filters.'
                  : 'Start exploring events and save your favorites here.'
                }
              </p>
              <Button onClick={() => window.location.href = '/explore'}>
                Explore Events
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
