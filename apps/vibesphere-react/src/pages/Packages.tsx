import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'

const TIERS = [
  { id:'basic', name:'Basic', priceRange:[15000,25000], includes:['Planning session','Basic decor','Coordinator (event day)'], deposit:0.3 },
  { id:'premium', name:'Premium', priceRange:[35000,60000], includes:['Full planning','Premium decor','Entertainment','Photography'], deposit:0.3 },
  { id:'luxe', name:'Luxe', priceRange:[75000,150000], includes:['End-to-end planning','Luxury decor','Live acts','Cinematography','Concierge'], deposit:0.4 },
]

export default function Packages(){
  const [guests, setGuests] = useState(120)
  const [tier, setTier] = useState('premium')

  const estimate = useMemo(()=>{
    const t = TIERS.find(t=>t.id===tier)!;
    const base = (t.priceRange[0] + t.priceRange[1]) / 2
    const perHead = 200 // simple heuristic for demo
    const total = Math.round(base + guests*perHead)
    const deposit = Math.round(total * (t.deposit))
    return { total, deposit }
  },[guests,tier])

  return (
    <section style={{padding:'32px 0'}}>
      <div className="container" style={{display:'grid', gap:24}}>
        <h2>Packages & Pricing</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16}}>
          {TIERS.map(t=> (
            <Card key={t.id}>
              <CardContent>
                <CardTitle>{t.name}</CardTitle>
                <p style={{marginTop:8}}>₹{t.priceRange[0].toLocaleString()} – ₹{t.priceRange[1].toLocaleString()}</p>
                <ul style={{marginTop:8}}>
                  {t.includes.map(i=> <li key={i}>• {i}</li>)}
                </ul>
                <Button variant={tier===t.id? 'secondary': 'ghost'} style={{marginTop:12}} onClick={()=>setTier(t.id)}>
                  {tier===t.id? 'Selected' : 'Choose'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="card" style={{padding:16}}>
          <h3>Mini Budget Estimator</h3>
          <div style={{display:'flex', gap:16, alignItems:'center', marginTop:12, flexWrap:'wrap'}}>
            <label>
              Guests:
              <input type="number" min={10} max={1000} value={guests} onChange={(e)=>setGuests(parseInt(e.target.value)||0)} style={{marginLeft:8, padding:'8px 10px', borderRadius:12, border:'1px solid #e5e7eb'}} />
            </label>
            <div>
              <div><strong>Estimated Total:</strong> ₹{estimate.total.toLocaleString()}</div>
              <div><strong>Deposit Due:</strong> ₹{estimate.deposit.toLocaleString()}</div>
            </div>
            <Button onClick={()=>location.assign('/booking')}>Start Booking</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

