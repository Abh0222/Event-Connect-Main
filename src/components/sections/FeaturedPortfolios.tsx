'use client'

import { useState } from 'react'
import { Heart, Eye, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const portfolioItems = [
  {
    id: 1,
    title: 'Sunset Beach Wedding',
    type: 'Wedding',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=400&fit=crop',
    guests: 150,
    budget: '$25K - $35K',
    location: 'Goa',
    tags: ['Beach', 'Sunset', 'Romantic'],
    isFavorited: false,
    views: 1240
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    type: 'Corporate',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    guests: 500,
    budget: '$50K+',
    location: 'Bangalore',
    tags: ['Technology', 'Innovation', 'Networking'],
    isFavorited: true,
    views: 890
  },
  {
    id: 3,
    title: 'Garden Party Celebration',
    type: 'Party',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
    guests: 80,
    budget: '$15K - $25K',
    location: 'Mumbai',
    tags: ['Garden', 'Elegant', 'Intimate'],
    isFavorited: false,
    views: 567
  },
  {
    id: 4,
    title: 'Music Festival Vibes',
    type: 'Festival',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    guests: 2000,
    budget: '$100K+',
    location: 'Delhi',
    tags: ['Music', 'Outdoor', 'Energetic'],
    isFavorited: false,
    views: 2150
  }
]

export default function FeaturedPortfolios() {
  const [favorites, setFavorites] = useState<number[]>([2])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  return (
    <section className="py-16 bg-muted-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-display-lg mb-4 text-primary-900">
            Featured Experiences
          </h2>
          <p className="text-body text-neutral-600 max-w-2xl mx-auto">
            Discover our curated collection of extraordinary events that showcase the artistry 
            and attention to detail that defines VibeSphere experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-white shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      favorites.includes(item.id) 
                        ? 'fill-accent-500 text-accent-500' 
                        : 'text-white'
                    }`}
                  />
                </button>

                {/* Quick Stats Overlay */}
                <div className="absolute bottom-3 left-3 right-3 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{item.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-2">
                    Book Similar
                  </Button>
                </div>

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block rounded-full bg-gold-400/90 px-3 py-1 text-xs font-medium text-primary-900">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary-900 mb-2 group-hover:text-accent-500 transition-colors">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-neutral-600 mb-3">
                  <Calendar className="h-4 w-4" />
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{item.budget}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-md bg-muted-200 px-2 py-1 text-xs text-neutral-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button variant="ghost" size="sm" className="w-full">
                  View Story
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Explore All Experiences
          </Button>
        </div>
      </div>
    </section>
  )
}
