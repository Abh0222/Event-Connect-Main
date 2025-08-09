'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button, Input, Select, Badge, Card, CardContent, LoadingOverlay } from '@/components/ui'
import EventCard from '@/components/cards/EventCard'
import FilterSidebar from '@/components/sections/FilterSidebar'
import { useDebounce } from '@/hooks/useDebounce'

// Mock data - in real app, this would come from Firebase
const mockEvents = [
  {
    id: '1',
    title: 'Enchanted Garden Wedding',
    type: 'wedding',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=600&h=400&fit=crop',
    location: 'Goa',
    guests: 150,
    budget: { min: 25000, max: 35000 },
    tags: ['beach', 'sunset', 'romantic', 'outdoor'],
    rating: 4.9,
    reviews: 127,
    isFavorited: false,
    views: 1240,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Tech Innovation Summit',
    type: 'corporate',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    location: 'Bangalore',
    guests: 500,
    budget: { min: 75000, max: 100000 },
    tags: ['technology', 'innovation', 'networking'],
    rating: 4.8,
    reviews: 89,
    isFavorited: true,
    views: 890,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    title: 'Vibrant Music Festival',
    type: 'festival',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    location: 'Delhi',
    guests: 2000,
    budget: { min: 150000, max: 200000 },
    tags: ['music', 'outdoor', 'energetic'],
    rating: 4.7,
    reviews: 234,
    isFavorited: false,
    views: 2150,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    title: 'Intimate Garden Party',
    type: 'party',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop',
    location: 'Mumbai',
    guests: 80,
    budget: { min: 15000, max: 25000 },
    tags: ['garden', 'elegant', 'intimate'],
    rating: 4.9,
    reviews: 156,
    isFavorited: false,
    views: 567,
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '5',
    title: 'Luxury Corporate Gala',
    type: 'corporate',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
    location: 'Mumbai',
    guests: 300,
    budget: { min: 50000, max: 75000 },
    tags: ['luxury', 'formal', 'networking'],
    rating: 4.8,
    reviews: 98,
    isFavorited: true,
    views: 1456,
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '6',
    title: 'Beach Wedding Ceremony',
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
]

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'budget-low', label: 'Budget: Low to High' },
  { value: 'budget-high', label: 'Budget: High to Low' },
]

export default function ExplorePage() {
  const [events, setEvents] = useState(mockEvents)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    budgetRange: { min: 0, max: 200000 },
    guests: { min: 0, max: 5000 },
    tags: [] as string[],
  })

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    let filtered = events.filter(event => {
      // Search filter
      if (debouncedSearchQuery) {
        const query = debouncedSearchQuery.toLowerCase()
        const matchesSearch = 
          event.title.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.tags.some(tag => tag.toLowerCase().includes(query))
        
        if (!matchesSearch) return false
      }

      // Type filter
      if (filters.type && event.type !== filters.type) return false

      // Location filter
      if (filters.location && event.location !== filters.location) return false

      // Budget filter
      if (event.budget.min > filters.budgetRange.max || event.budget.max < filters.budgetRange.min) {
        return false
      }

      // Guests filter
      if (event.guests < filters.guests.min || event.guests > filters.guests.max) {
        return false
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          event.tags.includes(tag.toLowerCase())
        )
        if (!hasMatchingTag) return false
      }

      return true
    })

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime()
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime()
        case 'popular':
          return b.views - a.views
        case 'rating':
          return b.rating - a.rating
        case 'budget-low':
          return a.budget.min - b.budget.min
        case 'budget-high':
          return b.budget.max - a.budget.max
        default:
          return 0
      }
    })

    return filtered
  }, [events, debouncedSearchQuery, filters, sortBy])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'filter_applied', {
        event_category: 'search',
        event_label: 'explore_page',
        filters: JSON.stringify(newFilters)
      })
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'search', {
        event_category: 'search',
        event_label: 'explore_page',
        search_term: query
      })
    }
  }

  return (
    <div className="min-h-screen bg-muted-100">
      {/* Header */}
      <div className="bg-white border-b border-muted-300">
        <div className="container-custom py-8">
          <div className="text-center mb-8">
            <h1 className="text-display-lg text-primary-900 mb-4">
              Explore Experiences
            </h1>
            <p className="text-body text-neutral-600 max-w-2xl mx-auto">
              Discover our curated collection of extraordinary events and find the perfect inspiration for your celebration.
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-600" />
                <Input
                  placeholder="Search events, locations, or tags..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={sortOptions}
                className="min-w-[180px]"
              />

              <div className="flex items-center border border-muted-400 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.type || filters.location || filters.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.type && (
                <Badge variant="secondary" className="capitalize">
                  {filters.type}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, type: '' }))}
                    className="ml-2 hover:text-red-600"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary">
                  {filters.location}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, location: '' }))}
                    className="ml-2 hover:text-red-600"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                  <button
                    onClick={() => setFilters(prev => ({ 
                      ...prev, 
                      tags: prev.tags.filter(t => t !== tag) 
                    }))}
                    className="ml-2 hover:text-red-600"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFilterChange}
              events={events}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-neutral-600">
                {filteredAndSortedEvents.length} events found
                {debouncedSearchQuery && ` for "${debouncedSearchQuery}"`}
              </p>
            </div>

            <LoadingOverlay isLoading={loading}>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedEvents.map((event) => (
                    <EventCard key={event.id} event={event} layout="list" />
                  ))}
                </div>
              )}
            </LoadingOverlay>

            {filteredAndSortedEvents.length === 0 && !loading && (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-neutral-600 mb-4">
                    <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No events found</h3>
                    <p>Try adjusting your filters or search terms to find more events.</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('')
                      setFilters({
                        type: '',
                        location: '',
                        budgetRange: { min: 0, max: 200000 },
                        guests: { min: 0, max: 5000 },
                        tags: [],
                      })
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
