import { collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { db } from './config'
import type { Event, Package, Creator, User } from '@/types'

// Sample users data
const sampleUsers: Omit<User, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'customer',
    locale: 'en-US',
    preferences: {
      language: 'en',
      accessibility: false,
      notifications: true,
    },
  },
  {
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    role: 'creator',
    locale: 'en-US',
    preferences: {
      language: 'en',
      accessibility: false,
      notifications: true,
    },
  },
  {
    name: 'Anita Desai',
    email: 'anita@example.com',
    role: 'customer',
    locale: 'en-US',
    preferences: {
      language: 'en',
      accessibility: false,
      notifications: true,
    },
  },
]

// Sample packages data
const samplePackages: Omit<Package, 'id'>[] = [
  {
    name: 'Essential Experience',
    description: 'Perfect for intimate gatherings and smaller celebrations',
    priceRange: { min: 5000, max: 15000 },
    inclusions: [
      'Event planning consultation',
      'Basic decoration setup',
      'Photography (2 hours)',
      'Basic sound system',
      'Coordination on event day',
    ],
    addOns: [
      { id: '1', name: 'Extended Photography', description: 'Additional 2 hours', price: 2000, category: 'photography' },
      { id: '2', name: 'Floral Arrangements', description: 'Premium flower decorations', price: 3000, category: 'decoration' },
    ],
    turnaroundDays: 14,
    depositPercentage: 30,
    eventTypes: ['wedding', 'party', 'corporate'],
  },
  {
    name: 'Premium Celebration',
    description: 'Comprehensive event management for memorable occasions',
    priceRange: { min: 15000, max: 35000 },
    inclusions: [
      'Complete event planning',
      'Premium decoration & lighting',
      'Professional photography (4 hours)',
      'Videography highlights',
      'Premium sound & AV system',
      'Catering coordination',
      'Full-day event management',
    ],
    addOns: [
      { id: '3', name: 'Live Streaming', description: 'Stream your event live', price: 5000, category: 'technology' },
      { id: '4', name: 'Drone Photography', description: 'Aerial shots and videos', price: 4000, category: 'photography' },
    ],
    turnaroundDays: 21,
    depositPercentage: 40,
    eventTypes: ['wedding', 'corporate', 'festival'],
    isPopular: true,
  },
  {
    name: 'Luxe Experience',
    description: 'Ultimate luxury event experience with premium services',
    priceRange: { min: 35000, max: 100000 },
    inclusions: [
      'Luxury event design & planning',
      'Designer decoration & themes',
      'Professional photography (8 hours)',
      'Cinematic videography',
      'Premium AV & lighting systems',
      'Gourmet catering management',
      'Personal event coordinator',
      'Guest experience management',
      'Post-event content delivery',
    ],
    addOns: [
      { id: '5', name: 'Celebrity Host', description: 'Professional event host', price: 15000, category: 'entertainment' },
      { id: '6', name: 'Luxury Transportation', description: 'Premium vehicle arrangements', price: 10000, category: 'logistics' },
    ],
    turnaroundDays: 30,
    depositPercentage: 50,
    eventTypes: ['wedding', 'corporate', 'festival', 'party'],
  },
]

// Sample events data
const sampleEvents: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Enchanted Garden Wedding',
    type: 'wedding',
    dateStart: new Date('2024-06-15'),
    dateEnd: new Date('2024-06-15'),
    location: {
      city: 'Goa',
      venue: 'Sunset Beach Resort',
      geo: { lat: 15.2993, lng: 74.1240 },
    },
    tags: ['beach', 'sunset', 'romantic', 'outdoor'],
    heroImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop',
    ],
    story: 'A magical beachside celebration where love meets the endless horizon. This enchanted garden wedding combined the natural beauty of Goa\'s coastline with elegant floral arrangements and twinkling lights.',
    packages: [], // Will be populated with actual package IDs
    creatorId: '', // Will be populated with actual creator ID
    status: 'published',
    guests: 150,
    budgetRange: { min: 25000, max: 35000 },
    views: 1240,
    favorites: 89,
  },
  {
    title: 'Tech Innovation Summit 2024',
    type: 'corporate',
    dateStart: new Date('2024-09-20'),
    dateEnd: new Date('2024-09-22'),
    location: {
      city: 'Bangalore',
      venue: 'Tech Convention Center',
      geo: { lat: 12.9716, lng: 77.5946 },
    },
    tags: ['technology', 'innovation', 'networking', 'conference'],
    heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
    ],
    story: 'A cutting-edge corporate summit bringing together industry leaders, innovators, and tech enthusiasts. Three days of inspiring keynotes, interactive workshops, and networking opportunities.',
    packages: [],
    creatorId: '',
    status: 'published',
    guests: 500,
    budgetRange: { min: 75000, max: 100000 },
    views: 890,
    favorites: 156,
  },
  {
    title: 'Vibrant Music Festival',
    type: 'festival',
    dateStart: new Date('2024-12-10'),
    dateEnd: new Date('2024-12-12'),
    location: {
      city: 'Delhi',
      venue: 'Festival Grounds',
      geo: { lat: 28.7041, lng: 77.1025 },
    },
    tags: ['music', 'outdoor', 'energetic', 'multi-day'],
    heroImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
    ],
    story: 'An electrifying three-day music festival featuring top artists, food vendors, and immersive experiences. Multiple stages, diverse genres, and unforgettable performances under the stars.',
    packages: [],
    creatorId: '',
    status: 'published',
    guests: 2000,
    budgetRange: { min: 150000, max: 200000 },
    views: 2150,
    favorites: 324,
  },
]

// Function to seed the database with sample data
export async function seedDatabase() {
  try {
    console.log('Starting database seeding...')

    // 1. Create sample users
    const userIds: string[] = []
    for (const userData of sampleUsers) {
      const docRef = await addDoc(collection(db, 'users'), {
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      userIds.push(docRef.id)
      console.log(`Created user: ${userData.name} (${docRef.id})`)
    }

    // 2. Create sample packages
    const packageIds: string[] = []
    for (const packageData of samplePackages) {
      const docRef = await addDoc(collection(db, 'packages'), packageData)
      packageIds.push(docRef.id)
      console.log(`Created package: ${packageData.name} (${docRef.id})`)
    }

    // 3. Create creator profile for the creator user
    const creatorUserId = userIds[1] // Rajesh Kumar
    const creatorData: Omit<Creator, 'id' | 'createdAt' | 'updatedAt'> = {
      userId: creatorUserId,
      profile: {
        businessName: 'Elite Events by Rajesh',
        description: 'Specializing in luxury weddings and corporate events with over 10 years of experience.',
        specialties: ['weddings', 'corporate events', 'luxury celebrations'],
        experience: 10,
        location: 'Mumbai, India',
        website: 'https://eliteevents.example.com',
        social: {
          instagram: '@eliteeventsrajesh',
          facebook: 'EliteEventsByRajesh',
          linkedin: 'rajesh-kumar-events',
        },
      },
      portfolio: [], // Will be populated with event IDs
      leadScore: 95,
      isVerified: true,
      rating: 4.9,
      reviewCount: 127,
    }

    const creatorDocRef = await setDoc(doc(db, 'creators', creatorUserId), {
      ...creatorData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    console.log(`Created creator profile for: ${creatorUserId}`)

    // 4. Create sample events
    const eventIds: string[] = []
    for (const eventData of sampleEvents) {
      const docRef = await addDoc(collection(db, 'events'), {
        ...eventData,
        packages: packageIds, // Link to all packages
        creatorId: creatorUserId, // Assign to our sample creator
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      eventIds.push(docRef.id)
      console.log(`Created event: ${eventData.title} (${docRef.id})`)
    }

    // 5. Update creator portfolio with event IDs
    await setDoc(doc(db, 'creators', creatorUserId), {
      ...creatorData,
      portfolio: eventIds,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // 6. Create sample FAQs
    const faqs = [
      {
        question: 'How far in advance should I book my event?',
        answer: 'We recommend booking at least 2-3 months in advance for weddings and 1-2 months for other events to ensure availability and proper planning time.',
        category: 'booking',
        order: 1,
      },
      {
        question: 'What is included in the package pricing?',
        answer: 'Each package includes different services. Please check the detailed inclusions list for each package. Additional services can be added as add-ons.',
        category: 'pricing',
        order: 2,
      },
      {
        question: 'Can I customize my event package?',
        answer: 'Absolutely! We work closely with you to customize packages according to your specific needs and preferences.',
        category: 'customization',
        order: 3,
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellations made 30+ days before the event receive a full refund minus processing fees. Please see our terms for detailed policy.',
        category: 'policy',
        order: 4,
      },
    ]

    for (const faq of faqs) {
      await addDoc(collection(db, 'faqs'), faq)
    }

    console.log('Database seeding completed successfully!')
    console.log(`Created ${userIds.length} users, ${packageIds.length} packages, ${eventIds.length} events, and ${faqs.length} FAQs`)

    return {
      success: true,
      data: {
        userIds,
        packageIds,
        eventIds,
        creatorId: creatorUserId,
      },
    }
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}

// Function to clear all sample data (for testing)
export async function clearSampleData() {
  console.log('This function should be implemented to clear sample data when needed')
  // Implementation would involve querying and deleting documents
  // Should be used carefully and only in development
}
