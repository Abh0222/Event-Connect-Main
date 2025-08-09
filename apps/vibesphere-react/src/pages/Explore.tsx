import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { getEvents } from '@/lib/data'
import { Link } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { addFavorite, removeFavorite, isFavorite } from '@/lib/favorites'

export default function Explore(){
  const [events,setEvents] = useState<any[]>([])
  const [favMap,setFavMap] = useState<Record<string,boolean>>({})
  const { user } = useUser()

  useEffect(()=>{ getEvents().then((e)=>{ setEvents(e); import('@/lib/analytics').then(({track,trackPageView})=>{ trackPageView('explore'); track('explore_open',{count:e.length}) }) }) },[])
  useEffect(()=>{
    (async()=>{
      if(!user) return setFavMap({})
      const map: Record<string,boolean> = {}
      for(const e of events){ map[e.id] = await isFavorite(user.uid, e.id) }
      setFavMap(map)
    })()
  },[user,events])

  async function toggleFav(eventId:string){
    if(!user){ alert('Sign in to save favorites'); return }
    if(favMap[eventId]){ await removeFavorite(user.uid, eventId); (await import('@/lib/analytics')).track('favorite_remove',{ eventId }) }
    else { await addFavorite(user.uid, eventId); (await import('@/lib/analytics')).track('favorite_add',{ eventId }) }
    setFavMap(m=> ({...m, [eventId]: !m[eventId]}))
  }

  return (
    <section style={{padding:'32px 0'}}>
      <div className="container" style={{display:'grid',gap:16}}>
        <h2>Explore Cinematic Stories</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:16}}>
          {events.map(card=> (
            <Card key={card.id}>
              <img src={card.hero} alt={card.title} style={{width:'100%',height:180,objectFit:'cover',borderTopLeftRadius:12,borderTopRightRadius:12}} />
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <div style={{display:'flex',gap:6,marginTop:8,flexWrap:'wrap'}}>
                  <span style={{fontSize:12,background:'#eef2ff',padding:'4px 8px',borderRadius:999}}>{card.type}</span>
                  <span style={{fontSize:12,background:'#eef2ff',padding:'4px 8px',borderRadius:999}}>{card.location}</span>
                </div>
                <div style={{marginTop:8, display:'flex', gap:8}}>
                  <Link to={`/event/${card.id}`} className="btn ghost">View Story</Link>
                  <button className="btn ghost" onClick={()=>toggleFav(card.id)} aria-pressed={!!favMap[card.id]}>
                    {favMap[card.id]? '★ Saved' : '☆ Save'}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

