import { db } from './firebase'

export type Favorite = { id:string; userId:string; eventId:string; createdAt?:any }

const docId = (userId:string, eventId:string)=> `${userId}_${eventId}`

export async function addFavorite(userId:string, eventId:string){
  if(!userId||!eventId) return
  if(db){
    const { setDoc, doc, serverTimestamp } = await import('firebase/firestore')
    await setDoc(doc(db,'favorites', docId(userId,eventId)), { userId, eventId, createdAt: serverTimestamp() })
  }else{
    // fallback localStorage
    const key = 'vibesphere.favorites'
    const arr = JSON.parse(localStorage.getItem(key)||'[]') as string[]
    const id = docId(userId,eventId)
    if(!arr.includes(id)) arr.push(id)
    localStorage.setItem(key, JSON.stringify(arr))
  }
}

export async function removeFavorite(userId:string, eventId:string){
  if(!userId||!eventId) return
  if(db){
    const { deleteDoc, doc } = await import('firebase/firestore')
    await deleteDoc(doc(db,'favorites', docId(userId,eventId)))
  }else{
    const key = 'vibesphere.favorites'
    const arr = JSON.parse(localStorage.getItem(key)||'[]') as string[]
    const id = docId(userId,eventId)
    localStorage.setItem(key, JSON.stringify(arr.filter(x=>x!==id)))
  }
}

export async function isFavorite(userId:string, eventId:string){
  if(!userId||!eventId) return false
  if(db){
    const { getDoc, doc } = await import('firebase/firestore')
    const ref = await getDoc(doc(db,'favorites', docId(userId,eventId)))
    return ref.exists()
  }else{
    const key = 'vibesphere.favorites'
    const arr = JSON.parse(localStorage.getItem(key)||'[]') as string[]
    return arr.includes(docId(userId,eventId))
  }
}

export async function listFavorites(userId:string): Promise<Favorite[]>{
  if(!userId) return []
  if(db){
    const { getDocs, collection, query, where, orderBy, limit } = await import('firebase/firestore')
    const snap = await getDocs(query(collection(db,'favorites'), where('userId','==',userId), orderBy('createdAt','desc'), limit(50)))
    return snap.docs.map(d=>({ id:d.id, ...(d.data() as any) })) as any
  }else{
    const key = 'vibesphere.favorites'
    const arr = JSON.parse(localStorage.getItem(key)||'[]') as string[]
    return arr.filter(id=>id.startsWith(userId+'_')).map(id=>({ id, userId, eventId: id.split('_')[1] })) as any
  }
}

