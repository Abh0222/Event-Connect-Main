import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp 
} from 'firebase/firestore'
import { db } from './config'
import type { User, Event, Package, Booking, Creator, ChatSession } from '@/types'

// Collection References
export const collections = {
  users: 'users',
  events: 'events',
  packages: 'packages',
  bookings: 'bookings',
  creators: 'creators',
  chatSessions: 'chat_sessions',
  faqs: 'faqs',
  supportThreads: 'support_threads',
  analyticsEvents: 'analytics_events',
} as const

// Helper function to convert Firestore timestamp to Date
export const timestampToDate = (timestamp: Timestamp): Date => {
  return timestamp.toDate()
}

// Helper function to convert Date to Firestore timestamp
export const dateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date)
}

// Users Collection
export const usersCollection = {
  // Create a new user
  create: async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const docRef = await addDoc(collection(db, collections.users), {
      ...userData,
      createdAt: dateToTimestamp(now),
      updatedAt: dateToTimestamp(now),
    })
    return docRef.id
  },

  // Get user by ID
  getById: async (id: string): Promise<User | null> => {
    const docRef = doc(db, collections.users, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as User
    }
    return null
  },

  // Update user
  update: async (id: string, updates: Partial<User>) => {
    const docRef = doc(db, collections.users, id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: dateToTimestamp(new Date()),
    })
  },

  // Get user by email
  getByEmail: async (email: string): Promise<User | null> => {
    const q = query(collection(db, collections.users), where('email', '==', email))
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as User
    }
    return null
  },
}

// Events Collection
export const eventsCollection = {
  // Create a new event
  create: async (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const docRef = await addDoc(collection(db, collections.events), {
      ...eventData,
      dateStart: dateToTimestamp(eventData.dateStart),
      dateEnd: dateToTimestamp(eventData.dateEnd),
      createdAt: dateToTimestamp(now),
      updatedAt: dateToTimestamp(now),
    })
    return docRef.id
  },

  // Get event by ID
  getById: async (id: string): Promise<Event | null> => {
    const docRef = doc(db, collections.events, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        dateStart: timestampToDate(data.dateStart),
        dateEnd: timestampToDate(data.dateEnd),
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Event
    }
    return null
  },

  // Get published events with pagination
  getPublished: async (pageSize: number = 12, lastDoc?: QueryDocumentSnapshot<DocumentData>) => {
    let q = query(
      collection(db, collections.events),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )

    if (lastDoc) {
      q = query(q, startAfter(lastDoc))
    }

    const querySnapshot = await getDocs(q)
    const events = querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        dateStart: timestampToDate(data.dateStart),
        dateEnd: timestampToDate(data.dateEnd),
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Event
    })

    return {
      events,
      lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
      hasMore: querySnapshot.docs.length === pageSize,
    }
  },

  // Get events by type
  getByType: async (type: string, pageSize: number = 12) => {
    const q = query(
      collection(db, collections.events),
      where('type', '==', type),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        dateStart: timestampToDate(data.dateStart),
        dateEnd: timestampToDate(data.dateEnd),
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Event
    })
  },

  // Update event
  update: async (id: string, updates: Partial<Event>) => {
    const docRef = doc(db, collections.events, id)
    const updateData: any = {
      ...updates,
      updatedAt: dateToTimestamp(new Date()),
    }

    // Convert dates to timestamps if they exist in updates
    if (updates.dateStart) {
      updateData.dateStart = dateToTimestamp(updates.dateStart)
    }
    if (updates.dateEnd) {
      updateData.dateEnd = dateToTimestamp(updates.dateEnd)
    }

    await updateDoc(docRef, updateData)
  },

  // Increment view count
  incrementViews: async (id: string) => {
    const docRef = doc(db, collections.events, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const currentViews = docSnap.data().views || 0
      await updateDoc(docRef, {
        views: currentViews + 1,
        updatedAt: dateToTimestamp(new Date()),
      })
    }
  },
}

// Packages Collection
export const packagesCollection = {
  // Create a new package
  create: async (packageData: Omit<Package, 'id'>) => {
    const docRef = await addDoc(collection(db, collections.packages), packageData)
    return docRef.id
  },

  // Get all packages
  getAll: async (): Promise<Package[]> => {
    const querySnapshot = await getDocs(collection(db, collections.packages))
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Package))
  },

  // Get package by ID
  getById: async (id: string): Promise<Package | null> => {
    const docRef = doc(db, collections.packages, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Package
    }
    return null
  },

  // Get packages by event type
  getByEventType: async (eventType: string): Promise<Package[]> => {
    const q = query(
      collection(db, collections.packages),
      where('eventTypes', 'array-contains', eventType)
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Package))
  },
}

// Bookings Collection
export const bookingsCollection = {
  // Create a new booking
  create: async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date()
    const docRef = await addDoc(collection(db, collections.bookings), {
      ...bookingData,
      date: dateToTimestamp(bookingData.date),
      createdAt: dateToTimestamp(now),
      updatedAt: dateToTimestamp(now),
    })
    return docRef.id
  },

  // Get booking by ID
  getById: async (id: string): Promise<Booking | null> => {
    const docRef = doc(db, collections.bookings, id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        date: timestampToDate(data.date),
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Booking
    }
    return null
  },

  // Get bookings by user ID
  getByUserId: async (userId: string): Promise<Booking[]> => {
    const q = query(
      collection(db, collections.bookings),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        date: timestampToDate(data.date),
        createdAt: timestampToDate(data.createdAt),
        updatedAt: timestampToDate(data.updatedAt),
      } as Booking
    })
  },

  // Update booking status
  updateStatus: async (id: string, status: Booking['status']) => {
    const docRef = doc(db, collections.bookings, id)
    await updateDoc(docRef, {
      status,
      updatedAt: dateToTimestamp(new Date()),
    })
  },
}
