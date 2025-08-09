'use client'

import { useState } from 'react'
import { Eye, Download, MessageSquare, Star, Calendar, MapPin, Users } from 'lucide-react'
import { Button, Card, CardContent, Badge, Input, Select } from '@/components/ui'
import { formatCurrency, formatDate } from '@/lib/utils'

interface BookingHistoryProps {
  bookings: any[]
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
]

export default function BookingHistory({ bookings }: BookingHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success'
      case 'completed': return 'secondary'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const renderRating = (rating?: number) => {
    if (!rating) return null
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'fill-gold-400 text-gold-400' : 'text-muted-400'}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-display-lg text-primary-900">Booking History</h2>
        <p className="text-neutral-600">View and manage all your event bookings</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              options={statusOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-elevated transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Event Image */}
                {booking.image && (
                  <img
                    src={booking.image}
                    alt={booking.eventTitle}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                )}

                {/* Event Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-primary-900">
                          {booking.eventTitle}
                        </h3>
                        <Badge variant={getStatusColor(booking.status) as any} className="capitalize">
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600 capitalize">
                        {booking.eventType} Event
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary-900">
                        {formatCurrency(booking.amount)}
                      </p>
                      {booking.depositPaid && (
                        <div className="text-sm">
                          <p className="text-green-600">Paid: {formatCurrency(booking.depositPaid)}</p>
                          {booking.remainingAmount > 0 && (
                            <p className="text-orange-600">Due: {formatCurrency(booking.remainingAmount)}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(booking.date)}</span>
                      {booking.time && <span>• {booking.time}</span>}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Users className="h-4 w-4" />
                      <span>{booking.guests} guests</span>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {booking.creator.avatar && (
                        <img
                          src={booking.creator.avatar}
                          alt={booking.creator.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-primary-900">
                          {booking.creator.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-gold-400 text-gold-400" />
                          <span className="text-xs text-neutral-600">
                            {booking.creator.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Your Rating */}
                    {booking.rating && (
                      <div className="text-right">
                        <p className="text-xs text-neutral-600 mb-1">Your rating:</p>
                        {renderRating(booking.rating)}
                      </div>
                    )}
                  </div>

                  {/* Review */}
                  {booking.review && (
                    <div className="mt-3 p-3 bg-muted-100 rounded-lg">
                      <p className="text-sm text-neutral-700 italic">
                        "{booking.review}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  
                  {booking.status === 'confirmed' && (
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  )}
                  
                  {booking.status === 'completed' && (
                    <>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                      {!booking.rating && (
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Rate
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-neutral-600">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
              <p>No bookings match your current filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
