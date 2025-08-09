import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import BeforeAfterSlider from '@/components/media/BeforeAfterSlider'
import { Button } from '@/components/ui/Button'
import { getEventById, buildEventSchema } from '@/lib/data'

export default function EventStory(){
  const { id } = useParams()
  const [data,setData] = useState<any>(null)
  useEffect(()=>{ if(id) getEventById(id).then((d)=>{ setData(d); import('@/lib/analytics').then(({track,trackPageView})=>{ trackPageView('event_story',{ id }); if(d) track('event_view',{ id, title:d.title }) }) }) },[id])

  const jsonLd = useMemo(()=> data? buildEventSchema(data) : null, [data])

  if(!data) return <div className="container" style={{padding:'24px 0'}}>Loading…</div>
  return (
    <article>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      )}
      <section style={{position:'relative'}}>
        <img src={data.hero} alt={data.title} style={{width:'100%', maxHeight:520, objectFit:'cover'}} />
        <div className="container" style={{position:'relative', marginTop:-80}}>
          <div className="card" style={{padding:16}}>
            <h1 style={{margin:0}}>{data.title}</h1>
            <p style={{marginTop:6}}>{data.date} • {data.location} • {data.guests} guests • ₹{data.budgetRange[0].toLocaleString()}–₹{data.budgetRange[1].toLocaleString()}</p>
            <div style={{marginTop:12,display:'flex',gap:8}}>
              <Button onClick={()=>location.assign('/booking')}>Book This</Button>
              <Link to="/explore" className="btn ghost">Explore Similar</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{padding:'24px 0', display:'grid', gap:24}}>
        <h2>Story</h2>
        <div style={{display:'grid', gap:24}}>
          {data.story.map((s:any,i:number)=> (
            <div key={i} style={{display:'grid', gap:16, gridTemplateColumns:'1fr 1fr'}}>
              <img src={s.img} alt="Story detail" style={{width:'100%', borderRadius:12, boxShadow:'var(--shadow-card)'}} />
              <p style={{alignSelf:'center'}}>{s.text}</p>
            </div>
          ))}
        </div>

        {data.before && data.after && (
          <>
            <h2>Before & After</h2>
            <BeforeAfterSlider beforeSrc={data.before} afterSrc={data.after} />
          </>
        )}

        <h2>Gallery</h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
          {data.gallery.map((g:string,i:number)=> (
            <img key={i} src={g} alt={`Gallery ${i+1}`} style={{width:'100%', borderRadius:12}} />
          ))}
        </div>
      </section>
    </article>
  )
}

