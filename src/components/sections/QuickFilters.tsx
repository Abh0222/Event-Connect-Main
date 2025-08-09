'use client'

import { useState } from 'react'
import { Calendar, MapPin, DollarSign, Users } from 'lucide-react'

const eventTypes = [
  'All Events',
  'Weddings',
  'Corporate',
  'Parties',
  'Festivals',
  'Conferences'
]

const budgetRanges = [
  'Any Budget',
  '$5K - $15K',
  '$15K - $30K',
  '$30K - $50K',
  '$50K+'
]

const locations = [
  'Any Location',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Pune'
]

export default function QuickFilters() {
  const [selectedType, setSelectedType] = useState('All Events')
  const [selectedBudget, setSelectedBudget] = useState('Any Budget')
  const [selectedLocation, setSelectedLocation] = useState('Any Location')
  const [dateRange, setDateRange] = useState('')

  return (
    <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-muted-300 py-4">
      <div className="container-custom">
        <div className="flex flex-wrap items-center gap-4">
          {/* Event Type Filter */}
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-neutral-600" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border border-muted-400 bg-white px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
              aria-label="Select event type"
            >
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-neutral-600" />
            <input
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="rounded-lg border border-muted-400 bg-white px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
              aria-label="Select date range"
            />
          </div>

          {/* Budget Filter */}
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-neutral-600" />
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="rounded-lg border border-muted-400 bg-white px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
              aria-label="Select budget range"
            >
              {budgetRanges.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-neutral-600" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-lg border border-muted-400 bg-white px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
              aria-label="Select location"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button className="ml-auto rounded-lg bg-accent-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20">
            Search Events
          </button>
        </div>
      </div>
    </section>
  )
}
