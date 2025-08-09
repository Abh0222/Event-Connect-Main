import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { startCheckout } from '@/lib/payments'
import { createBookingDoc } from '@/lib/db'

type Step = 1|2|3|4

type BookingDraft = {
  tier: 'basic'|'premium'|'luxe' | ''
  date: string
  time: string
  name: string
  email: string
  phone: string
  guests: number
}

const STORAGE_KEY = 'vibesphere.booking.draft'

export default function Booking(){
  const [step,setStep] = useState<Step>(1)
  const [draft,setDraft] = useState<BookingDraft>({tier:'', date:'', time:'', name:'', email:'', phone:'', guests:120})
  const [errors,setErrors] = useState<Record<string,string>>({})

  // Load/Save draft
  useEffect(()=>{
    try{const raw=localStorage.getItem(STORAGE_KEY); if(raw){setDraft(JSON.parse(raw))}}catch{}
  },[])
  useEffect(()=>{localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))},[draft])

  const validate = (): boolean => {
    const e: Record<string,string> = {}
    if(step===1){ if(!draft.tier) e.tier='Select a package tier' }
    if(step===2){ if(!draft.date) e.date='Select a date'; if(!draft.time) e.time='Select a time' }
    if(step===3){
      if(!draft.name) e.name='Enter your name'
      if(!draft.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) e.email='Enter a valid email'
      if(!draft.phone || draft.phone.replace(/\D/g,'').length<10) e.phone='Enter valid phone'
    }
    setErrors(e)
    return Object.keys(e).length===0
  }

  const next = ()=> { if(validate()) { setStep((s)=> { const nx = Math.min(4, (s+1) as Step); import('@/lib/analytics').then(({track})=> track('booking_step',{ step:nx })) ; return nx }) } }
  const back = ()=> setStep((s)=> Math.max(1, (s-1) as Step))

  const total = useMemo(()=>{
    const base = draft.tier==='basic'?20000: draft.tier==='premium'?45000: draft.tier==='luxe'?100000:0
    const perHead = 200 * (draft.tier==='luxe'? 1.5 : draft.tier==='premium'? 1.2 : 1)
    return Math.round(base + (draft.guests||0)*perHead)
  },[draft.tier,draft.guests])
  const deposit = Math.round(total * (draft.tier==='luxe'?0.4:0.3))

  return (
    <section style={{padding:'24px 0'}}>
      <div className="container" style={{display:'grid',gap:16}}>
        <h2>Book Your Experience</h2>
        <Progress step={step}/>

        {step===1 && (
          <div className="card" style={{padding:16}}>
            <h3>Step 1 — Select Package</h3>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:12}}>
              {(['basic','premium','luxe'] as const).map(t=> (
                <button key={t} className={`btn ${draft.tier===t?'secondary':'ghost'}`} onClick={()=>setDraft({...draft,tier:t})}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
            {errors.tier && <p style={{color:'#dc2626'}}>{errors.tier}</p>}
            <div style={{marginTop:12}}>
              <label>Guests: <input type="number" min={10} max={1000} value={draft.guests} onChange={(e)=>setDraft({...draft,guests:parseInt(e.target.value)||0})} style={{marginLeft:8,padding:'8px 10px',borderRadius:12,border:'1px solid #e5e7eb'}}/></label>
            </div>
            <div style={{marginTop:12,display:'flex',gap:12,alignItems:'center'}}>
              <strong>Total:</strong> ₹{total.toLocaleString()} | <strong>Deposit:</strong> ₹{deposit.toLocaleString()}
            </div>
            <div style={{marginTop:16,display:'flex',gap:8}}>
              <Button onClick={()=>{ import('@/lib/analytics').then(({track})=> track('booking_started',{ tier:draft.tier })); next() }}>Continue</Button>
            </div>
          </div>
        )}

        {step===2 && (
          <div className="card" style={{padding:16}}>
            <h3>Step 2 — Date & Time</h3>
            <div style={{display:'grid',gap:12,maxWidth:420,marginTop:8}}>
              <Input label="Event Date" type="date" value={draft.date} onChange={(e)=>setDraft({...draft,date:e.target.value})} error={errors.date}/>
              <Input label="Preferred Time" type="time" value={draft.time} onChange={(e)=>setDraft({...draft,time:e.target.value})} error={errors.time}/>
            </div>
            <div style={{marginTop:16,display:'flex',gap:8}}>
              <Button variant="ghost" onClick={back}>Back</Button>
              <Button onClick={next}>Continue</Button>
            </div>
          </div>
        )}

        {step===3 && (
          <div className="card" style={{padding:16}}>
            <h3>Step 3 — Your Details</h3>
            <div style={{display:'grid',gap:12,maxWidth:520,marginTop:8}}>
              <Input label="Full Name" value={draft.name} onChange={(e)=>setDraft({...draft,name:e.target.value})} error={errors.name}/>
              <Input label="Email" type="email" value={draft.email} onChange={(e)=>setDraft({...draft,email:e.target.value})} error={errors.email}/>
              <Input label="Phone" type="tel" value={draft.phone} onChange={(e)=>setDraft({...draft,phone:e.target.value})} error={errors.phone}/>
            </div>
            <div style={{marginTop:16,display:'flex',gap:8}}>
              <Button variant="ghost" onClick={back}>Back</Button>
              <Button onClick={next}>Review</Button>
            </div>
          </div>
        )}

        {step===4 && (
          <div className="card" style={{padding:16}}>
            <h3>Step 4 — Confirmation</h3>
            <p style={{marginTop:8}}>Review and confirm your booking details. A secure deposit of <strong>₹{deposit.toLocaleString()}</strong> will be required.</p>
            <ul style={{marginTop:8,lineHeight:1.8}}>
              <li><strong>Package:</strong> {draft.tier.toUpperCase()}</li>
              <li><strong>Date/Time:</strong> {draft.date} {draft.time && `• ${draft.time}`}</li>
              <li><strong>Name:</strong> {draft.name}</li>
              <li><strong>Email:</strong> {draft.email}</li>
              <li><strong>Phone:</strong> {draft.phone}</li>
              <li><strong>Guests:</strong> {draft.guests}</li>
              <li><strong>Total:</strong> ₹{total.toLocaleString()}</li>
              <li><strong>Deposit:</strong> ₹{deposit.toLocaleString()}</li>
            </ul>
            <div style={{marginTop:16,display:'flex',gap:8}}>
              <Button variant="ghost" onClick={back}>Back</Button>
              <Button onClick={async()=>{
                const id = await createBookingDoc({
                  tier:draft.tier, date:draft.date, time:draft.time, name:draft.name, email:draft.email, phone:draft.phone, guests:draft.guests,
                  total, deposit
                })
                await startCheckout(deposit, { bookingId:id, tier:draft.tier, date:draft.date, guests:draft.guests })
              }}>Confirm & Pay Deposit</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Progress({step}:{step:Step}){
  return (
    <div aria-label="progress" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
      {[1,2,3,4].map(n=> (
        <div key={n} style={{height:6, borderRadius:999, background: n<=step? 'var(--accent-500)':'#e5e7eb'}}/>
      ))}
    </div>
  )
}

