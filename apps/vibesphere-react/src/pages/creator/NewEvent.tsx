import React, { useState } from 'react'
import Dropzone from '@/components/uploader/Dropzone'
import { storage, db } from '@/lib/firebase'
import { useUser } from '@/hooks/useUser'
import { Link, useNavigate } from 'react-router-dom'

const TYPES = ['wedding','corporate','party','festival'] as const
const STATUSES = ['draft','published','featured'] as const

type Form = {
  title: string
  type: typeof TYPES[number]
  location: string
  dateStart: string
  dateEnd: string
  guests: number
  budgetMin: number
  budgetMax: number
  tags: string
  status: typeof STATUSES[number]
  heroFile?: File
  galleryFiles: File[]
}

export default function NewEvent(){
  const { user } = useUser()
  const navigate = useNavigate()
  const [form,setForm] = useState<Form>({
    title:'', type:'wedding', location:'', dateStart:'', dateEnd:'', guests:120,
    budgetMin:1500000, budgetMax:2500000, tags:'', status:'draft', galleryFiles:[]
  })
  const [submitting,setSubmitting] = useState(false)
  const [error,setError] = useState('')

  function update<K extends keyof Form>(k:K,v:Form[K]){ setForm(s=>({...s,[k]:v})) }

  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setError('')
    if(!user){ setError('Please sign in to create an event.'); return }
    if(!db || !storage){ setError('Firebase not configured.'); return }
    if(!form.title || !form.location || !form.dateStart){ setError('Please fill required fields.'); return }
    if(!form.heroFile){ setError('Please upload a hero image.'); return }

    setSubmitting(true)
    try{
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage')
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore')
      // Upload hero
      const heroKey = `events/${user.uid}/${Date.now()}-hero-${form.heroFile.name}`
      const heroRef = ref(storage, heroKey)
      await uploadBytes(heroRef, form.heroFile)
      const heroUrl = await getDownloadURL(heroRef)
      // Upload gallery
      const galleryUrls: string[] = []
      for(const f of form.galleryFiles){
        const gKey = `events/${user.uid}/${Date.now()}-g-${f.name}`
        const gRef = ref(storage, gKey)
        await uploadBytes(gRef, f)
        const url = await getDownloadURL(gRef)
        galleryUrls.push(url)
      }
      const tags = form.tags.split(',').map(t=>t.trim()).filter(Boolean)
      const doc = {
        title: form.title,
        type: form.type,
        location: form.location,
        date: form.dateStart, // single date for MVP
        dateStart: form.dateStart,
        dateEnd: form.dateEnd || form.dateStart,
        guests: form.guests,
        budgetRange: [form.budgetMin, form.budgetMax],
        hero: heroUrl,
        gallery: galleryUrls,
        story: [],
        before: undefined,
        after: undefined,
        tags,
        status: form.status,
        ownerId: user.uid,
        createdAt: serverTimestamp()
      }
      const evId = (await addDoc(collection(db,'events'), doc)).id
      alert('Event created!')
      navigate(`/event/${evId}`)
    }catch(err:any){
      console.error(err); setError(err.message || 'Failed to create event')
    }finally{ setSubmitting(false) }
  }

  return (
    <section className="container" style={{padding:'24px 0'}}>
      <h2>New Event</h2>
      <p style={{marginTop:8}}>Create and publish a new portfolio event.</p>

      <form onSubmit={onSubmit} className="card" style={{padding:16, marginTop:12, display:'grid', gap:12}}>
        {error && <div style={{color:'#dc2626'}}>{error}</div>}

        <div style={{display:'grid', gap:8}}>
          <label>Title*<br/>
            <input value={form.title} onChange={(e)=>update('title', e.target.value)} required
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          </label>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <label>Type<br/>
            <select value={form.type} onChange={(e)=>update('type', e.target.value as any)}
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}}>
              {TYPES.map(t=> <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label>Status<br/>
            <select value={form.status} onChange={(e)=>update('status', e.target.value as any)}
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}}>
              {STATUSES.map(s=> <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <label>Location*<br/>
            <input value={form.location} onChange={(e)=>update('location', e.target.value)} required
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          </label>
          <label>Guests<br/>
            <input type="number" min={10} max={2000} value={form.guests} onChange={(e)=>update('guests', parseInt(e.target.value)||0)}
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          </label>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <label>Date start*<br/>
            <input type="date" value={form.dateStart} onChange={(e)=>update('dateStart', e.target.value)} required
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          </label>
          <label>Date end<br/>
            <input type="date" value={form.dateEnd} onChange={(e)=>update('dateEnd', e.target.value)}
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          </label>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
          <label>Budget min (₹)<br/>
            <input type="number" min={0} value={form.budgetMin} onChange={(e)=>update('budgetMin', parseInt(e.target.value)||0)}
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          </label>
          <label>Budget max (₹)<br/>
            <input type="number" min={0} value={form.budgetMax} onChange={(e)=>update('budgetMax', parseInt(e.target.value)||0)}
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          </label>
        </div>

        <div>
          <label>Tags (comma-separated)<br/>
            <input value={form.tags} onChange={(e)=>update('tags', e.target.value)}
              style={{width:'100%', padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
          </label>
        </div>

        <div className="card" style={{padding:12}}>
          <h4>Hero image*</h4>
          <input type="file" accept="image/*" onChange={(e)=> update('heroFile', (e.target.files?.[0] as File))} />
        </div>

        <div className="card" style={{padding:12}}>
          <h4>Gallery images</h4>
          <Dropzone onFiles={(files)=> update('galleryFiles', files)} />
          {form.galleryFiles.length>0 && (
            <p style={{marginTop:8}}>{form.galleryFiles.length} file(s) selected</p>
          )}
        </div>

        <div style={{display:'flex', gap:8}}>
          <button type="button" className="btn ghost" onClick={()=> history.back()}>Cancel</button>
          <button type="submit" className="btn primary" aria-busy={submitting} disabled={submitting}>
            {submitting? 'Saving…' : 'Create Event'}
          </button>
        </div>
      </form>

      <div style={{marginTop:12}}>
        <Link to="/creator" className="btn ghost">Back to Creator Admin</Link>
      </div>
    </section>
  )
}

