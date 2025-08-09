'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Copy, MoreHorizontal } from 'lucide-react'
import { Button, Card, CardContent, Badge, Input, Select } from '@/components/ui'
import { formatCurrency, formatDate } from '@/lib/utils'

const mockEvents = [
  {
    id: '1',
    title: 'Enchanted Garden Wedding',
    type: 'wedding',
    status: 'published',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=300&h=200&fit=crop',
    views: 1240,
    favorites: 89,
    bookings: 5,
    revenue: 125000,
    createdAt: new Date('2024-01-15'),
    lastUpdated: new Date('2024-03-10')
  },
  {
    id: '2',
    title: 'Corporate Summit Experience',
    type: 'corporate',
    status: 'published',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop',
    views: 890,
    favorites: 156,
    bookings: 8,
    revenue: 680000,
    createdAt: new Date('2024-02-20'),
    lastUpdated: new Date('2024-03-15')
  },
  {
    id: '3',
    title: 'Luxury Birthday Celebration',
    type: 'party',
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop',
    views: 0,
    favorites: 0,
    bookings: 0,
    revenue: 0,
    createdAt: new Date('2024-03-20'),
    lastUpdated: new Date('2024-03-20')
  }
]

const eventTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'party', label: 'Party' },
  { value: 'festival', label: 'Festival' }
]

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' }
]

export default function EventManagement() {
  const [events, setEvents] = useState(mockEvents)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || event.type === filterType
    const matchesStatus = filterStatus === 'all' || event.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success'
      case 'draft': return 'warning'
      case 'archived': return 'secondary'
      default: return 'default'
    }
  }

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId))
    }
  }

  const handleDuplicateEvent = (eventId: string) => {
    const eventToDuplicate = events.find(event => event.id === eventId)
    if (eventToDuplicate) {
      const duplicatedEvent = {
        ...eventToDuplicate,
        id: Date.now().toString(),
        title: `${eventToDuplicate.title} (Copy)`,
        status: 'draft',
        views: 0,
        favorites: 0,
        bookings: 0,
        revenue: 0,
        createdAt: new Date(),
        lastUpdated: new Date()
      }
      setEvents(prev => [duplicatedEvent, ...prev])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display-lg text-primary-900">Event Management</h2>
          <p className="text-neutral-600">Create and manage your event portfolio</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              options={eventTypes}
            />
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={statusOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-elevated transition-shadow">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant={getStatusColor(event.status) as any} className="capitalize">
                  {event.status}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-primary-900 mb-1 line-clamp-2">{event.title}</h3>
                <Badge variant="secondary" size="sm" className="capitalize">
                  {event.type}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm text-neutral-600 mb-4">
                <div className="text-center">
                  <div className="font-semibold text-primary-900">{event.views}</div>
                  <div>Views</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-primary-900">{event.favorites}</div>
                  <div>Favorites</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-primary-900">{event.bookings}</div>
                  <div>Bookings</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-neutral-600">Revenue Generated</div>
                <div className="font-semibold text-primary-900">
                  {formatCurrency(event.revenue)}
                </div>
              </div>

              <div className="text-xs text-neutral-500 mb-4">
                <div>Created: {formatDate(event.createdAt)}</div>
                <div>Updated: {formatDate(event.lastUpdated)}</div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDuplicateEvent(event.id)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-neutral-600 mb-4">
              <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No events found</h3>
              <p>Create your first event to start building your portfolio.</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Event
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
