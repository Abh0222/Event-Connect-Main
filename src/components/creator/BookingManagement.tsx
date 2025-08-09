'use client'

import { useState } from 'react'
import { Eye, MessageSquare, Check, X, Calendar, Phone, Mail } from 'lucide-react'
import { Button, Card, CardContent, Badge, Input, Select } from '@/components/ui'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Booking {
  id: string
  eventTitle: string
  customerName: string
  date: Date
  status: string
  amount: number
  guests: number
}

interface BookingManagementProps {
  bookings: Booking[]
}

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
]

const extendedBookings = [
  {
    id: 'booking1',
    eventTitle: 'Sharma Wedding',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@email.com',
    customerPhone: '+91 98765 43210',
    date: new Date('2024-06-15'),
    status: 'confirmed',
    amount: 45000,
    guests: 150,
    depositPaid: 13500,
    remainingAmount: 31500,
    eventType: 'wedding',
    location: 'Mumbai',
    createdAt: new Date('2024-03-15')
  },
  {
    id: 'booking2',
    eventTitle: 'Tech Corp Annual Meet',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh@techcorp.com',
    customerPhone: '+91 87654 32109',
    date: new Date('2024-07-20'),
    status: 'pending',
    amount: 85000,
    guests: 300,
    depositPaid: 0,
    remainingAmount: 85000,
    eventType: 'corporate',
    location: 'Bangalore',
    createdAt: new Date('2024-03-20')
  },
  {
    id: 'booking3',
    eventTitle: 'Birthday Celebration',
    customerName: 'Amit Patel',
    customerEmail: 'amit.patel@email.com',
    customerPhone: '+91 76543 21098',
    date: new Date('2024-05-30'),
    status: 'completed',
    amount: 25000,
    guests: 80,
    depositPaid: 25000,
    remainingAmount: 0,
    eventType: 'party',
    location: 'Pune',
    createdAt: new Date('2024-02-28')
  },
  {
    id: 'booking4',
    eventTitle: 'Product Launch Event',
    customerName: 'StartupXYZ',
    customerEmail: 'events@startupxyz.com',
    customerPhone: '+91 65432 10987',
    date: new Date('2024-08-15'),
    status: 'pending',
    amount: 65000,
    guests: 200,
    depositPaid: 0,
    remainingAmount: 65000,
    eventType: 'corporate',
    location: 'Delhi',
    createdAt: new Date('2024-03-25')
  }
]

export default function BookingManagement({ bookings }: BookingManagementProps) {
  const [allBookings, setAllBookings] = useState(extendedBookings)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState<any>(null)

  const filteredBookings = allBookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success'
      case 'pending': return 'warning'
      case 'completed': return 'secondary'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    setAllBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      )
    )
  }

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-display-lg text-primary-900">Booking Management</h2>
          <p className="text-neutral-600">Manage your event bookings and customer communications</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by customer name or event title..."
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
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-primary-900">{booking.eventTitle}</h3>
                    <Badge variant={getStatusColor(booking.status) as any} className="capitalize">
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600">
                    <div>
                      <div className="font-medium text-primary-900">{booking.customerName}</div>
                      <div>{booking.customerEmail}</div>
                      <div>{booking.customerPhone}</div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div>{booking.guests} guests</div>
                      <div className="capitalize">{booking.eventType} • {booking.location}</div>
                    </div>
                    
                    <div>
                      <div className="font-semibold text-primary-900 text-lg">
                        {formatCurrency(booking.amount)}
                      </div>
                      <div className="text-green-600">
                        Paid: {formatCurrency(booking.depositPaid)}
                      </div>
                      <div className="text-orange-600">
                        Remaining: {formatCurrency(booking.remainingAmount)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {booking.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </>
                  )}
                  
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(booking)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
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

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-primary-900">Booking Details</h3>
                <Button variant="ghost" onClick={() => setSelectedBooking(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-primary-900 mb-3">Event Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-600">Event Title:</span>
                      <div className="font-medium">{selectedBooking.eventTitle}</div>
                    </div>
                    <div>
                      <span className="text-neutral-600">Event Type:</span>
                      <div className="font-medium capitalize">{selectedBooking.eventType}</div>
                    </div>
                    <div>
                      <span className="text-neutral-600">Date:</span>
                      <div className="font-medium">{formatDate(selectedBooking.date)}</div>
                    </div>
                    <div>
                      <span className="text-neutral-600">Location:</span>
                      <div className="font-medium">{selectedBooking.location}</div>
                    </div>
                    <div>
                      <span className="text-neutral-600">Guests:</span>
                      <div className="font-medium">{selectedBooking.guests}</div>
                    </div>
                    <div>
                      <span className="text-neutral-600">Status:</span>
                      <Badge variant={getStatusColor(selectedBooking.status) as any} className="capitalize">
                        {selectedBooking.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary-900 mb-3">Customer Information</h4>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-600">Name:</span>
                      <div className="font-medium">{selectedBooking.customerName}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-neutral-600" />
                      <a href={`mailto:${selectedBooking.customerEmail}`} className="text-accent-500 hover:underline">
                        {selectedBooking.customerEmail}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-neutral-600" />
                      <a href={`tel:${selectedBooking.customerPhone}`} className="text-accent-500 hover:underline">
                        {selectedBooking.customerPhone}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary-900 mb-3">Payment Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-600">Total Amount:</span>
                      <div className="font-semibold text-lg">{formatCurrency(selectedBooking.amount)}</div>
                    </div>
                    <div>
                      <span className="text-neutral-600">Deposit Paid:</span>
                      <div className="font-medium text-green-600">{formatCurrency(selectedBooking.depositPaid)}</div>
                    </div>
                    <div>
                      <span className="text-neutral-600">Remaining Balance:</span>
                      <div className="font-medium text-orange-600">{formatCurrency(selectedBooking.remainingAmount)}</div>
                    </div>
                    <div>
                      <span className="text-neutral-600">Booking Date:</span>
                      <div className="font-medium">{formatDate(selectedBooking.createdAt)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
