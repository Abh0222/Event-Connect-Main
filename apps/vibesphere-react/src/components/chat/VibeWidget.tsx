import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { track } from '@/lib/analytics'

type Msg = { id:string; role:'user'|'assistant'; text:string; ts:number }

const SUGGESTIONS = [
  'Show wedding inspirations in Hyderabad',
  'What’s included in Luxe?',
  'Book Premium package for June 21, 2026',
]

export default function VibeWidget(){
  const [open,setOpen] = useState(false)
  const [msgs,setMsgs] = useState<Msg[]>([{
    id:'m1', role:'assistant', ts:Date.now(),
    text:"Hi — I’m Vibe, your event concierge! Looking to browse styles, book a consultation, or get recommendations?"
  }])
  const [input,setInput] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{ if(open) track('homepage_loaded', { surface:'chat' }) },[open])
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}) },[msgs])

  const send = async (t: string)=>{
    if(!t.trim()) return
    setMsgs(m=>[...m, {id:crypto.randomUUID(), role:'user', text:t, ts:Date.now()}])
    setInput('')
    setTimeout(()=>{
      const response = generateResponse(t)
      setMsgs(m=>[...m, {id:crypto.randomUUID(), role:'assistant', text:response, ts:Date.now()}])
    }, 500)
  }

  return (
    <>
      {/* Bubble */}
      <button aria-label="Open Vibe chat" onClick={()=>setOpen(true)} style={{position:'fixed', right:16, bottom:16, borderRadius:'50%', width:56, height:56, background:'var(--accent-500)', color:'#fff', boxShadow:'var(--shadow-elevated)', border:'none', cursor:'pointer', zIndex:50}}>💬</button>

      {open && (
        <div role="dialog" aria-modal className="card" style={{position:'fixed', right:16, bottom:84, width:360, maxHeight:'70vh', display:'grid', gridTemplateRows:'auto 1fr auto', boxShadow:'var(--shadow-elevated)'}}>
          <header style={{padding:'12px 16px', borderBottom:'1px solid #eee', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <strong>Vibe — Concierge</strong>
            <button className="btn ghost" onClick={()=>setOpen(false)}>Close</button>
          </header>
          <div style={{overflow:'auto', padding:12, display:'grid', gap:8}}>
            {msgs.map(m=> (
              <div key={m.id} style={{justifySelf: m.role==='user'? 'end':'start', maxWidth:'80%'}}>
                <div style={{padding:'8px 12px', borderRadius:12, background: m.role==='user'? 'var(--accent-500)':'#f3f4f6', color: m.role==='user'? '#fff':'#111'}}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef}/>
          </div>
          <footer style={{padding:12, display:'grid', gap:8}}>
            {/* suggestions */}
            <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
              {SUGGESTIONS.map(s=> (
                <button key={s} className="btn ghost" onClick={()=>send(s)}>{s}</button>
              ))}
            </div>
            <div style={{display:'flex', gap:6}}>
              <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Ask me anything…" style={{flex:1, padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}}/>
              <Button onClick={()=>send(input)}>Send</Button>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}

function generateResponse(t: string){
  const msg = t.toLowerCase()
  if(msg.includes('luxe')) return '💎 Luxe includes end-to-end planning, luxury decor, live acts, cinematography, concierge. Budget range typically ₹75K–₹150K (base).'
  if(msg.includes('book')||msg.includes('reserve')) return 'I can prefill your booking. Opening the booking flow…';
  if(msg.includes('wedding')) return 'Here are some wedding inspirations in Hyderabad: Rustic lights, warm florals, sunset ceremonies. Want me to open Explore with filters?'
  return "I didn’t get that. Would you like me to connect you to a human?"
}

