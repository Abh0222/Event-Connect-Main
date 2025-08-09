import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useUser } from '@/hooks/useUser'
import { Link } from 'react-router-dom'

export default function CreatorEvents(){
  const { user } = useUser()
  const [events,setEvents] = useState<any[]>([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  useEffect(()=>{
    (async()=>{
      if(!db){ setEvents([]); return }
      setLoading(true)
      try{
        const { getDocs, collection, query, where, orderBy } = await import('firebase/firestore')
        const col = collection(db,'events')
        const q = user? query(col, where('ownerId','==', user.uid), orderBy('createdAt','desc')) : query(col, orderBy('createdAt','desc'))
        const snap = await getDocs(q)
        setEvents(snap.docs.map(d=>({id:d.id, ...d.data()})))
      }catch(err:any){ setError(err.message || 'Failed to load events') }
      finally{ setLoading(false) }
    })()
  },[user])

  async function setStatus(id:string, status:'draft'|'published'|'featured'){
    if(!db) return
    const { doc, updateDoc } = await import('firebase/firestore')
    await updateDoc(doc(db,'events',id), { status })
    setEvents(list=> list.map(e=> e.id===id? {...e, status}: e))
  }

  async function removeEvent(id:string){
    if(!db) return
    if(!confirm('Delete this event?')) return
    const { doc, deleteDoc } = await import('firebase/firestore')
    await deleteDoc(doc(db,'events',id))
    setEvents(list=> list.filter(e=> e.id!==id))
  }

  return (
    <section className="container" style={{padding:'24px 0'}}>
      <h2>My Events</h2>
      <div style={{marginTop:8}}>
        <Link to="/creator/new" className="btn primary">New Event</Link>
      </div>

      {loading && <p style={{marginTop:12}}>Loading…</p>}
      {error && <p style={{marginTop:12, color:'#dc2626'}}>{error}</p>}

      <div style={{display:'grid', gap:12, marginTop:12}}>
        {events.length===0 && !loading && (
          <div className="card" style={{padding:16}}>
            <p>No events yet. Create your first event.</p>
          </div>
        )}
        {events.map(ev=> (
          <div key={ev.id} className="card" style={{padding:12, display:'grid', gridTemplateColumns:'120px 1fr auto', gap:12, alignItems:'center'}}>
            <img src={ev.hero} alt={ev.title} style={{width:120, height:80, objectFit:'cover', borderRadius:8}}/>
            <div>
              <h3 style={{margin:'0 0 4px 0'}}>{ev.title}</h3>
              <p style={{margin:0, color:'#475569'}}>{ev.type} • {ev.location} • {ev.date}</p>
              <div style={{marginTop:8, display:'flex', gap:6, flexWrap:'wrap'}}>
                <span className="btn ghost" aria-disabled>Status: {ev.status||'draft'}</span>
                <button className="btn ghost" onClick={()=>setStatus(ev.id,'draft')}>Draft</button>
                <button className="btn ghost" onClick={()=>setStatus(ev.id,'published')}>Publish</button>
                <button className="btn ghost" onClick={()=>setStatus(ev.id,'featured')}>Feature</button>
                <Link to={`/event/${ev.id}`} className="btn ghost">View</Link>
              </div>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:6}}>
              <button className="btn ghost" onClick={()=>removeEvent(ev.id)} style={{color:'#dc2626', borderColor:'#fecaca'}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

