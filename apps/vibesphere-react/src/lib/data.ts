type EventItem = {
  id:string; title:string; type:'wedding'|'corporate'|'party'|'festival';
  location:string; date:string; guests:number; budgetRange:[number,number];
  hero:string; gallery:string[]; story:{img:string;text:string}[]; before?:string; after?:string
}

const MOCK_EVENTS: EventItem[] = Array.from({length:9}).map((_,i)=>({
  id:`event-${i+1}`,
  title:`Cinematic Event ${i+1}`,
  type: (['wedding','corporate','party'] as const)[i%3],
  location:['Hyderabad','Mumbai','Bangalore'][i%3],
  date:`2025-0${(i%6)+1}-15`,
  guests: 100 + i*20,
  budgetRange:[1500000 + i*50000, 2500000 + i*60000],
  hero:`https://picsum.photos/seed/hero-${i}/1200/700`,
  before:`https://picsum.photos/seed/before-${i}/1200/700`,
  after:`https://picsum.photos/seed/after-${i}/1200/700`,
  gallery: Array.from({length:6}).map((_,k)=>`https://picsum.photos/seed/g-${i}-${k}/900/600`),
  story:[
    { img:`https://picsum.photos/seed/s-${i}-1/900/600`, text:'An intimate sunset ceremony with warm lights and florals.'},
    { img:`https://picsum.photos/seed/s-${i}-2/900/600`, text:'A reception featuring live music and curated dining.'},
  ]
}))

import { db } from './firebase'

export async function getEvents(): Promise<EventItem[]> {
  try{
    if(db){
      const { getDocs, collection } = await import('firebase/firestore')
      const snap = await getDocs(collection(db,'events'))
      return snap.docs.map(d=>({id:d.id, ...(d.data() as any)})) as any
    }
  }catch(err){
    console.warn('[data] Firestore unavailable, using mocks', err)
  }
  return MOCK_EVENTS
}

export async function getEventById(id:string): Promise<EventItem | null> {
  try{
    if(db){
      const { getDoc, doc } = await import('firebase/firestore')
      const ref = await getDoc(doc(db,'events',id))
      return ref.exists()? ({id:ref.id, ...(ref.data() as any)} as any) : null
    }
  }catch(err){
    console.warn('[data] Firestore unavailable, using mocks', err)
  }
  return MOCK_EVENTS.find(e=>e.id===id) || null
}

export function buildEventSchema(e: EventItem){
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.title,
    startDate: e.date,
    location: { '@type':'Place', name: e.location },
    image: [e.hero, ...e.gallery].slice(0,5),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled'
  }
}

