import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useUser } from '@/hooks/useUser'
import { listFavorites } from '@/lib/favorites'
import { getEventById } from '@/lib/data'

export default function Dashboard(){
  const [bookings,setBookings] = useState<any[]>([])
  const [favs,setFavs] = useState<any[]>([])
  const { user } = useUser()

  useEffect(()=>{
    (async()=>{
      try{
        if(db && user){
          const { getDocs, collection, orderBy, query, where, limit } = await import('firebase/firestore')
          const q = query(collection(db,'bookings'), where('email','==', user.email||''), orderBy('createdAt','desc'), limit(10))
          const snap = await getDocs(q)
          setBookings(snap.docs.map(d=>({id:d.id, ...d.data()})))
        }
      }catch(err){ console.warn('No Firestore; using empty bookings') }
    })()
  },[user])

  useEffect(()=>{
    (async()=>{
      if(!user) return setFavs([])
      const f = await listFavorites(user.uid)
      const enriched = [] as any[]
      for(const fav of f){
        const ev = await getEventById(fav.eventId)
        if(ev) enriched.push({ ...fav, event: ev })
      }
      setFavs(enriched)
    })()
  },[user])

  return (
    <section className="container" style={{padding:'24px 0'}}>
      <h2>My Dashboard</h2>

      <div className="card" style={{padding:16, marginTop:12}}>
        <h3>Recent Bookings</h3>
        {bookings.length===0 ? (
          <p>No recent bookings.</p>
        ) : (
          <ul style={{marginTop:8, lineHeight:1.8}}>
            {bookings.map(b=> (
              <li key={b.id}><strong>{(b.tier||'').toUpperCase()}</strong> • {b.date} • Guests: {b.guests} • Status: {b.status} • Deposit: ₹{b.deposit?.toLocaleString?.()||b.deposit}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="card" style={{padding:16, marginTop:12}}>
        <h3>Saved Looks</h3>
        {favs.length===0 ? (
          <p>You have no saved looks yet. Explore and save your favorites.</p>
        ) : (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12}}>
            {favs.map(f=> (
              <a key={f.id} href={`/event/${f.eventId}`} className="card" style={{textDecoration:'none', color:'inherit'}}>
                <img src={f.event.hero} alt={f.event.title} style={{width:'100%', height:120, objectFit:'cover', borderTopLeftRadius:12, borderTopRightRadius:12}}/>
                <div style={{padding:12}}>
                  <div style={{fontWeight:600}}>{f.event.title}</div>
                  <div style={{fontSize:13, color:'#475569'}}>{f.event.type} • {f.event.location}</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

