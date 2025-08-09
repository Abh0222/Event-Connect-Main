// User Types
export interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'creator' | 'admin'
  locale: string
  preferences: {
    language: string
    accessibility: boolean
    notifications: boolean
  }
  createdAt: Date
  updatedAt: Date
}

// Event Types
export interface Event {
  id: string
  title: string
  type: 'wedding' | 'corporate' | 'party' | 'festival' | 'conference'
  dateStart: Date
  dateEnd: Date
  location: {
    city: string
    venue?: string
    geo?: {
      lat: number
      lng: number
    }
  }
  tags: string[]
  heroImage: string
  gallery: string[]
  story: string
  packages: string[] // Package IDs
  creatorId: string
  status: 'draft' | 'published' | 'featured'
  guests: number
  budgetRange: {
    min: number
    max: number
  }
  views: number
  favorites: number
  createdAt: Date
  updatedAt: Date
}

// Package Types
export interface Package {
  id: string
  name: string
  description: string
  priceRange: {
    min: number
    max: number
  }
  inclusions: string[]
  addOns: AddOn[]
  turnaroundDays: number
  depositPercentage: number
  eventTypes: string[]
  isPopular?: boolean
}

export interface AddOn {
  id: string
  name: string
  description: string
  price: number
  category: string
}

// Booking Types
export interface Booking {
  id: string
  userId: string
  eventId: string
  packageId: string
  date: Date
  time?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  customerDetails: {
    name: string
    email: string
    phone: string
    preferences: string
  }
  payment: {
    status: 'pending' | 'paid' | 'failed' | 'refunded'
    amount: number
    depositAmount: number
    currency: string
    stripePaymentIntentId?: string
  }
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// Creator Types
export interface Creator {
  id: string
  userId: string
  profile: {
    businessName: string
    description: string
    specialties: string[]
    experience: number
    location: string
    website?: string
    social?: {
      instagram?: string
      facebook?: string
      linkedin?: string
    }
  }
  portfolio: string[] // Event IDs
  leadScore: number
  isVerified: boolean
  rating: number
  reviewCount: number
  createdAt: Date
  updatedAt: Date
}

// Chat Types
export interface ChatMessage {
  id: string
  sessionId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  metadata?: {
    intent?: string
    entities?: Record<string, any>
    confidence?: number
  }
}

export interface ChatSession {
  id: string
  userId?: string
  status: 'active' | 'ended' | 'transferred'
  messages: ChatMessage[]
  context?: {
    currentEvent?: string
    currentPackage?: string
    bookingDraft?: Partial<Booking>
  }
  createdAt: Date
  updatedAt: Date
}

// Filter Types
export interface EventFilters {
  type?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  budgetRange?: {
    min: number
    max: number
  }
  location?: string[]
  tags?: string[]
  guests?: {
    min: number
    max: number
  }
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// Form Types
export interface ContactForm {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  guestCount: number
  budget: string
  location: string
  message: string
}

export interface BookingForm extends ContactForm {
  packageId: string
  preferredTime: string
  specialRequests: string
}
