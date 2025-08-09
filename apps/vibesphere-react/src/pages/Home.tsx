import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { track, trackPageView } from '@/lib/analytics'
import { Link } from 'react-router-dom'

export default function Home(){
  useEffect(()=>{ trackPageView('home'); track('homepage_loaded') },[])
  return (
    <section style={{padding:'48px 0'}}>
      <div className="container" style={{display:'grid', gap:16}}>
        <h1>Where Every Moment Finds Its Vibe</h1>
        <p>Browse signature experiences and reserve your date.</p>
        <div style={{display:'flex', gap:12}}>
          <Link to="/explore" className="btn primary" onClick={()=>track('hero_cta_click',{cta:'explore'})}>Explore This Style</Link>
          <Link to="/packages" className="btn ghost">View Packages</Link>
        </div>
      </div>
    </section>
  )
}

