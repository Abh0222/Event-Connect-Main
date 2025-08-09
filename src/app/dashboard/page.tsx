'use client'

import { useState } from 'react'
import { Calendar, Heart, MessageSquare, Settings, Plus, Eye, Download } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui'
import { formatCurrency, formatDate } from '@/lib/utils'
import BookingHistory from '@/components/dashboard/BookingHistory'
import FavoriteEvents from '@/components/dashboard/FavoriteEvents'
import ProfileSettings from '@/components/dashboard/ProfileSettings'

// Mock user data
const userData = {
  id: 'user1',
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
  joinedDate: new Date('2023-08-15'),
  totalBookings: 3,
  totalSpent: 95000,
  upcomingEvents: 1,
  completedEvents: 2
}

const upcomingBookings = [
  {
    id: 'booking1',
    eventTitle: 'Sharma Wedding',
    eventType: 'wedding',
    date: new Date('2024-06-15'),
    time: 'evening',
    status: 'confirmed',
    amount: 45000,
    depositPaid: 13500,
    remainingAmount: 31500,
    guests: 150,
    location: 'Mumbai',
    creator: {
      name: 'Elite Events by Rajesh',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      rating: 4.9
    },
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=300&fit=crop'
  }
]

const recentBookings = [
  {
    id: 'booking2',
    eventTitle: 'Anniversary Celebration',
    eventType: 'party',
    date: new Date('2024-02-14'),
    status: 'completed',
    amount: 25000,
    guests: 50,
    location: 'Mumbai',
    creator: {
      name: 'Elegant Occasions',
      rating: 4.8
    },
    rating: 5,
    review: 'Absolutely wonderful experience! Everything was perfect.'
  },
  {
    id: 'booking3',
    eventTitle: 'Birthday Party',
    eventType: 'party',
    date: new Date('2023-12-10'),
    status: 'completed',
    amount: 25000,
    guests: 80,
    location: 'Pune',
    creator: {
      name: 'Party Planners Pro',
      rating: 4.7
    },
    rating: 4,
    review: 'Great service, very professional team.'
  }
]

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-muted-100">
      {/* Header */}
      <div className="bg-white border-b border-muted-300">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h1 className="text-display-lg text-primary-900">Welcome back, {userData.name}!</h1>
                <p className="text-neutral-600">
                  Member since {formatDate(userData.joinedDate)}
                </p>
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
                Book New Event
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
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Total Bookings</p>
                      <p className="text-2xl font-bold text-primary-900">{userData.totalBookings}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    {userData.upcomingEvents} upcoming
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Total Spent</p>
                      <p className="text-2xl font-bold text-primary-900">
                        {formatCurrency(userData.totalSpent)}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    Across all events
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Completed Events</p>
                      <p className="text-2xl font-bold text-primary-900">{userData.completedEvents}</p>
                    </div>
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-accent-600" />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    Successfully executed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600">Saved Events</p>
                      <p className="text-2xl font-bold text-primary-900">12</p>
                    </div>
                    <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-gold-600" />
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2">
                    In your favorites
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events */}
            {upcomingBookings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 p-4 border border-muted-300 rounded-lg">
                        <img
                          src={booking.image}
                          alt={booking.eventTitle}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-primary-900">{booking.eventTitle}</h4>
                            <Badge variant="success" size="sm">
                              {booking.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-600 mb-1">
                            {formatDate(booking.date)} • {booking.guests} guests • {booking.location}
                          </p>
                          <p className="text-sm text-neutral-600">
                            by {booking.creator.name}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-primary-900 mb-1">
                            {formatCurrency(booking.amount)}
                          </p>
                          <p className="text-sm text-green-600">
                            Paid: {formatCurrency(booking.depositPaid)}
                          </p>
                          <p className="text-sm text-orange-600">
                            Due: {formatCurrency(booking.remainingAmount)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border border-muted-300 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary-900">{booking.eventTitle}</h4>
                        <p className="text-sm text-neutral-600">
                          {formatDate(booking.date)} • {booking.guests} guests • {booking.location}
                        </p>
                        <p className="text-sm text-neutral-600">
                          by {booking.creator.name}
                        </p>
                        {booking.review && (
                          <p className="text-sm text-neutral-700 mt-2 italic">
                            "{booking.review}"
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary-900">{formatCurrency(booking.amount)}</p>
                        <Badge variant="secondary" size="sm" className="mt-1">
                          {booking.status}
                        </Badge>
                        {booking.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm">Your rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < booking.rating! ? 'text-gold-400' : 'text-muted-400'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button variant="outline">View All Activity</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    Book New Event
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Heart className="h-6 w-6 mb-2" />
                    Browse Favorites
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MessageSquare className="h-6 w-6 mb-2" />
                    Chat with Vibe AI
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <BookingHistory bookings={[...upcomingBookings, ...recentBookings]} />
          </TabsContent>

          <TabsContent value="favorites">
            <FavoriteEvents />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileSettings userData={userData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
