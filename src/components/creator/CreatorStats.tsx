'use client'

import { TrendingUp, TrendingDown, Calendar, Users, Star, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

interface CreatorStatsProps {
  creatorData: any
}

export default function CreatorStats({ creatorData }: CreatorStatsProps) {
  const monthlyData = [
    { month: 'Jan', revenue: 180000, bookings: 8, rating: 4.8 },
    { month: 'Feb', revenue: 220000, bookings: 12, rating: 4.9 },
    { month: 'Mar', revenue: 195000, bookings: 9, rating: 4.9 },
    { month: 'Apr', revenue: 245000, bookings: 14, rating: 4.9 },
    { month: 'May', revenue: 189000, bookings: 10, rating: 4.8 },
    { month: 'Jun', revenue: 245000, bookings: 12, rating: 4.9 },
  ]

  const currentMonth = monthlyData[monthlyData.length - 1]
  const previousMonth = monthlyData[monthlyData.length - 2]

  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100
  const bookingsChange = ((currentMonth.bookings - previousMonth.bookings) / previousMonth.bookings) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent-500" />
            Revenue Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary-900">
                {formatCurrency(currentMonth.revenue)}
              </span>
              <div className={`flex items-center gap-1 ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {revenueChange >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(revenueChange).toFixed(1)}%
                </span>
              </div>
            </div>
            
            {/* Simple bar chart */}
            <div className="space-y-2">
              {monthlyData.slice(-6).map((data, index) => (
                <div key={data.month} className="flex items-center gap-3">
                  <span className="text-sm text-neutral-600 w-8">{data.month}</span>
                  <div className="flex-1 bg-muted-200 rounded-full h-2">
                    <div 
                      className="bg-accent-500 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-primary-900 w-20 text-right">
                    {formatCurrency(data.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-500" />
            Booking Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary-900">
                {currentMonth.bookings}
              </span>
              <div className={`flex items-center gap-1 ${bookingsChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {bookingsChange >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">
                  {Math.abs(bookingsChange).toFixed(1)}%
                </span>
              </div>
            </div>
            
            {/* Simple bar chart */}
            <div className="space-y-2">
              {monthlyData.slice(-6).map((data, index) => (
                <div key={data.month} className="flex items-center gap-3">
                  <span className="text-sm text-neutral-600 w-8">{data.month}</span>
                  <div className="flex-1 bg-muted-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(data.bookings / Math.max(...monthlyData.map(d => d.bookings))) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium text-primary-900 w-12 text-right">
                    {data.bookings}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-900 mb-1">
                {creatorData.rating}
              </div>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(creatorData.rating) ? 'fill-gold-400 text-gold-400' : 'text-muted-400'}`} 
                  />
                ))}
              </div>
              <div className="text-sm text-neutral-600">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-900 mb-1">
                {creatorData.reviews}
              </div>
              <div className="text-sm text-neutral-600">Total Reviews</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-900 mb-1">
                {Math.round((creatorData.activeBookings / creatorData.totalEvents) * 100)}%
              </div>
              <div className="text-sm text-neutral-600">Booking Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-900 mb-1">
                {formatCurrency(creatorData.revenue.total / creatorData.totalEvents)}
              </div>
              <div className="text-sm text-neutral-600">Avg. Event Value</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
