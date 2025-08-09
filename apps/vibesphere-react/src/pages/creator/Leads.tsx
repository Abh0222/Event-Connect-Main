import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'

export default function Leads(){
  const [leads,setLeads] = useState<any[]>([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState('')

  useEffect(()=>{
    (async()=>{
      if(!db){ setLeads([]); return }
      setLoading(true)
      try{
        const { getDocs, collection, orderBy, query, limit, where } = await import('firebase/firestore')
        // MVP: fetch recent pending bookings as leads
        const q = query(collection(db,'bookings'), where('status','==','pending'), orderBy('createdAt','desc'), limit(25))
        const snap = await getDocs(q)
        setLeads(snap.docs.map(d=>({id:d.id, ...d.data()})))
      }catch(err:any){ setError(err.message || 'Failed to load leads') }
      finally{ setLoading(false) }
    })()
  },[])

  async function updateStatus(id:string, status:'confirmed'|'cancelled'){
    if(!db) return
    const { doc, updateDoc } = await import('firebase/firestore')
    await updateDoc(doc(db,'bookings',id), { status })
    setLeads(list=> list.map(l=> l.id===id? {...l, status}: l))
  }

  return (
    <section className="container" style={{padding:'24px 0'}}>
      <h2>Leads Inbox</h2>
      {loading && <p>Loading…</p>}
      {error && <p style={{color:'#dc2626'}}>{error}</p>}
      <div style={{display:'grid', gap:12, marginTop:12}}>
        {leads.length===0 && !loading && (
          <div className="card" style={{padding:16}}>
            <p>No leads at the moment.</p>
          </div>
        )}
        {leads.map(l=> (
          <div key={l.id} className="card" style={{padding:12, display:'grid', gridTemplateColumns:'1fr auto', gap:12}}>
            <div>
              <h3 style={{margin:0}}>{(l.tier||'').toUpperCase()} • {l.date}</h3>
              <p style={{margin:'4px 0', color:'#475569'}}>Guests: {l.guests} • Name: {l.name} • Email: {l.email}</p>
              <p style={{margin:'4px 0'}}>Deposit: ₹{l.deposit?.toLocaleString?.()||l.deposit} • Status: {l.status}</p>
            </div>
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <button className="btn ghost" onClick={()=>updateStatus(l.id,'confirmed')}>Accept</button>
              <button className="btn ghost" onClick={()=>updateStatus(l.id,'cancelled')} style={{color:'#dc2626', borderColor:'#fecaca'}}>Decline</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

