'use client'

import { useState } from 'react'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Select } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

interface FilterSidebarProps {
  filters: {
    type: string
    location: string
    budgetRange: { min: number; max: number }
    guests: { min: number; max: number }
    tags: string[]
  }
  onFiltersChange: (filters: any) => void
  events: any[]
}

export default function FilterSidebar({ filters, onFiltersChange, events }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    location: true,
    budget: true,
    guests: false,
    tags: false,
  })

  // Extract unique values from events
  const eventTypes = [...new Set(events.map(e => e.type))]
  const locations = [...new Set(events.map(e => e.location))]
  const allTags = [...new Set(events.flatMap(e => e.tags))]

  const budgetRanges = [
    { label: 'Under ₹15K', min: 0, max: 15000 },
    { label: '₹15K - ₹30K', min: 15000, max: 30000 },
    { label: '₹30K - ₹50K', min: 30000, max: 50000 },
    { label: '₹50K - ₹100K', min: 50000, max: 100000 },
    { label: 'Above ₹100K', min: 100000, max: 500000 },
  ]

  const guestRanges = [
    { label: 'Under 50', min: 0, max: 50 },
    { label: '50 - 100', min: 50, max: 100 },
    { label: '100 - 300', min: 100, max: 300 },
    { label: '300 - 500', min: 300, max: 500 },
    { label: 'Above 500', min: 500, max: 5000 },
  ]

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const updateFilters = (updates: Partial<typeof filters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      type: '',
      location: '',
      budgetRange: { min: 0, max: 200000 },
      guests: { min: 0, max: 5000 },
      tags: [],
    })
  }

  const hasActiveFilters = filters.type || filters.location || filters.tags.length > 0 ||
    filters.budgetRange.min > 0 || filters.budgetRange.max < 200000 ||
    filters.guests.min > 0 || filters.guests.max < 5000

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-accent-500 hover:text-accent-600"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Event Type */}
        <div>
          <button
            onClick={() => toggleSection('type')}
            className="flex items-center justify-between w-full text-left font-medium text-primary-900 mb-3"
          >
            <span>Event Type</span>
            {expandedSections.type ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.type && (
            <div className="space-y-2">
              {eventTypes.map(type => (
                <label key={type} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="eventType"
                    value={type}
                    checked={filters.type === type}
                    onChange={(e) => updateFilters({ type: e.target.value })}
                    className="w-4 h-4 text-accent-500 focus:ring-accent-500/20"
                  />
                  <span className="text-sm capitalize">{type}</span>
                  <span className="text-xs text-neutral-500 ml-auto">
                    ({events.filter(e => e.type === type).length})
                  </span>
                </label>
              ))}
              {filters.type && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateFilters({ type: '' })}
                  className="text-xs text-accent-500"
                >
                  Clear selection
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <button
            onClick={() => toggleSection('location')}
            className="flex items-center justify-between w-full text-left font-medium text-primary-900 mb-3"
          >
            <span>Location</span>
            {expandedSections.location ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.location && (
            <div className="space-y-2">
              {locations.map(location => (
                <label key={location} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="location"
                    value={location}
                    checked={filters.location === location}
                    onChange={(e) => updateFilters({ location: e.target.value })}
                    className="w-4 h-4 text-accent-500 focus:ring-accent-500/20"
                  />
                  <span className="text-sm">{location}</span>
                  <span className="text-xs text-neutral-500 ml-auto">
                    ({events.filter(e => e.location === location).length})
                  </span>
                </label>
              ))}
              {filters.location && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateFilters({ location: '' })}
                  className="text-xs text-accent-500"
                >
                  Clear selection
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Budget Range */}
        <div>
          <button
            onClick={() => toggleSection('budget')}
            className="flex items-center justify-between w-full text-left font-medium text-primary-900 mb-3"
          >
            <span>Budget Range</span>
            {expandedSections.budget ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.budget && (
            <div className="space-y-2">
              {budgetRanges.map(range => {
                const isSelected = filters.budgetRange.min === range.min && filters.budgetRange.max === range.max
                return (
                  <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="budgetRange"
                      checked={isSelected}
                      onChange={() => updateFilters({ budgetRange: { min: range.min, max: range.max } })}
                      className="w-4 h-4 text-accent-500 focus:ring-accent-500/20"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                )
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilters({ budgetRange: { min: 0, max: 200000 } })}
                className="text-xs text-accent-500"
              >
                Clear selection
              </Button>
            </div>
          )}
        </div>

        {/* Guest Count */}
        <div>
          <button
            onClick={() => toggleSection('guests')}
            className="flex items-center justify-between w-full text-left font-medium text-primary-900 mb-3"
          >
            <span>Guest Count</span>
            {expandedSections.guests ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.guests && (
            <div className="space-y-2">
              {guestRanges.map(range => {
                const isSelected = filters.guests.min === range.min && filters.guests.max === range.max
                return (
                  <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="guestRange"
                      checked={isSelected}
                      onChange={() => updateFilters({ guests: { min: range.min, max: range.max } })}
                      className="w-4 h-4 text-accent-500 focus:ring-accent-500/20"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                )
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateFilters({ guests: { min: 0, max: 5000 } })}
                className="text-xs text-accent-500"
              >
                Clear selection
              </Button>
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <button
            onClick={() => toggleSection('tags')}
            className="flex items-center justify-between w-full text-left font-medium text-primary-900 mb-3"
          >
            <span>Tags</span>
            {expandedSections.tags ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.tags && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {allTags.slice(0, 20).map(tag => (
                <label key={tag} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={(e) => {
                      const newTags = e.target.checked
                        ? [...filters.tags, tag]
                        : filters.tags.filter(t => t !== tag)
                      updateFilters({ tags: newTags })
                    }}
                    className="w-4 h-4 text-accent-500 focus:ring-accent-500/20"
                  />
                  <span className="text-sm capitalize">{tag}</span>
                  <span className="text-xs text-neutral-500 ml-auto">
                    ({events.filter(e => e.tags.includes(tag)).length})
                  </span>
                </label>
              ))}
              {filters.tags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updateFilters({ tags: [] })}
                  className="text-xs text-accent-500"
                >
                  Clear all tags
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
