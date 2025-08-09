import React from 'react'

type Props = {
  beforeSrc: string
  afterSrc: string
  alt?: string
}

export default function BeforeAfterSlider({ beforeSrc, afterSrc, alt='Before and after comparison' }: Props){
  const [value, setValue] = React.useState(50)
  const id = React.useId()
  return (
    <div className="before-after" aria-label={alt} style={{position:'relative', width:'100%', maxWidth:800, aspectRatio:'16/9', borderRadius:12, overflow:'hidden', boxShadow:'var(--shadow-card)'}}>
      <img src={beforeSrc} alt={`${alt} — before`} style={{position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover'}}/>
      <div style={{position:'absolute', inset:0, width:`${value}%`, overflow:'hidden'}} aria-hidden>
        <img src={afterSrc} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}}/>
      </div>
      <input 
        type="range" 
        aria-label="Reveal after image"
        id={id}
        min={0} max={100} value={value} onChange={(e)=>setValue(parseInt(e.target.value))}
        style={{position:'absolute', inset:0, width:'100%', height:'100%', opacity:0}}
      />
      <div aria-hidden style={{position:'absolute', top:0, bottom:0, left:`calc(${value}% - 1px)`, width:2, background:'white', boxShadow:'0 0 0 1px rgba(0,0,0,.2)'}}/>
      <div aria-hidden style={{position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', background:'rgba(0,0,0,.5)', color:'#fff', padding:'6px 10px', borderRadius:999}}>Slide to compare</div>
    </div>
  )
}

