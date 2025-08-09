// Minimal Firestore wrapper (writes if Firebase configured)
import { db } from './firebase'

export async function createBookingDoc(data: any){
  const payload = { status: 'pending', ...data }
  try{
    if(db){
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')
      const ref = await addDoc(collection(db,'bookings'), { ...payload, createdAt: serverTimestamp() })
      return ref.id
    }
  }catch(err){
    console.warn('[db] Firestore unavailable, using mock:', err)
  }
  console.log('[db] booking draft (mock):', payload)
  return 'mock-booking-id'
}

