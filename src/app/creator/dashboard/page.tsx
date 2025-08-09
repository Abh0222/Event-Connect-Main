'use client'

import { useState } from 'react'
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Star,
  MessageSquare,
  Settings
} from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'
import CreatorStats from '@/components/creator/CreatorStats'
import EventManagement from '@/components/creator/EventManagement'
import BookingManagement from '@/components/creator/BookingManagement'
import ProfileSettings from '@/components/creator/ProfileSettings'

// Mock creator data
const creatorData = {
  id: 'creator1',
  name: 'Elite Events by Rajesh',
  email: 'rajesh@eliteevents.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  rating: 4.9,
  reviews: 127,
  totalEvents: 89,
  activeBookings: 12,
  revenue: {
    thisMonth: 245000,
    lastMonth: 189000,
    total: 2450000
  },
  profile: {
    businessName: 'Elite Events by Rajesh',
    description: 'Specializing in luxury weddings and corporate events with over 10 years of experience.',
    specialties: ['Weddings', 'Corporate Events', 'Luxury Celebrations'],
    experience: 10,
    location: 'Mumbai, India',
    website: 'https://eliteevents.example.com',
    social: {
      instagram: '@eliteeventsrajesh',
      facebook: 'EliteEventsByRajesh',
      linkedin: 'rajesh-kumar-events',
    },
  },
  isVerified: true,
  joinedDate: new Date('2020-01-15'),
}

const recentBookings = [
  {
    id: 'booking1',
    eventTitle: 'Sharma Wedding',
    customerName: 'Priya Sharma',
    date: new Date('2024-06-15'),
    status: 'confirmed',
    amount: 45000,
    guests: 150
  },
  {
    id: 'booking2',
    eventTitle: 'Tech Corp Annual Meet',
    customerName: 'Tech Corp Ltd',
    date: new Date('2024-07-20'),
    status: 'pending',
    amount: 85000,
    guests: 300
  },
  {
    id: 'booking3',
    eventTitle: 'Birthday Celebration',
    customerName: 'Amit Patel',
    date: new Date('2024-05-30'),
    status: 'completed',
    amount: 25000,
    guests: 80
  }
]

export default function CreatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success'
      case 'pending': return 'warning'
      case 'completed': return 'secondary'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  return (
    <div className="min-h-screen bg-muted-100">
      {/* Header */}
      <div className="bg-white border-b border-muted-300">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={creatorData.avatar}
                alt={creatorData.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-display-lg text-primary-900">{creatorData.name}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                    <span className="font-medium">{creatorData.rating}</span>
                    <span className="text-neutral-600">({creatorData.reviews} reviews)</span>
                  </div>
                  {creatorData.isVerified && (
                    <Badge variant="success" size="sm">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">This Month Revenue</p>
                      <p className="text-2xl font-bold text-primary-900">
                        {formatCurrency(creatorData.revenue.thisMonth)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600">
                      +{Math.round(((creatorData.revenue.thisMonth - creatorData.revenue.lastMonth) / creatorData.revenue.lastMonth) * 100)}%
                    </span>
                    <span className="text-neutral-600 ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Active Bookings</p>
                      <p className="text-2xl font-bold text-primary-900">{creatorData.activeBookings}</p>
                    </div>
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-accent-600" />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    {recentBookings.filter(b => b.status === 'pending').length} pending approval
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Total Events</p>
                      <p className="text-2xl font-bold text-primary-900">{creatorData.totalEvents}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    Since {creatorData.joinedDate.getFullYear()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Rating</p>
                      <p className="text-2xl font-bold text-primary-900">{creatorData.rating}</p>
                    </div>
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-gold-600" />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    From {creatorData.reviews} reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-muted-300 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary-900">{booking.eventTitle}</h4>
                        <p className="text-sm text-neutral-600">{booking.customerName}</p>
                        <p className="text-sm text-neutral-600">
                          {booking.date.toLocaleDateString()} • {booking.guests} guests
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary-900">{formatCurrency(booking.amount)}</p>
                        <Badge variant={getStatusColor(booking.status) as any} size="sm" className="mt-1">
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button variant="outline">View All Bookings</Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <CreatorStats creatorData={creatorData} />
          </TabsContent>

          <TabsContent value="events">
            <EventManagement />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingManagement bookings={recentBookings} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings creatorData={creatorData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
