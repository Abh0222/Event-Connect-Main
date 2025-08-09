import React from 'react'

type Props = {
  onFiles: (files: File[]) => void
}

export default function Dropzone({ onFiles }: Props){
  const ref = React.useRef<HTMLInputElement>(null)
  const [over,setOver] = React.useState(false)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setOver(false)
    const files = Array.from(e.dataTransfer.files || [])
    onFiles(files)
  }

  return (
    <div
      onDragOver={(e)=>{e.preventDefault(); setOver(true)}}
      onDragLeave={()=>setOver(false)}
      onDrop={onDrop}
      onClick={()=>ref.current?.click()}
      role="button"
      aria-label="Upload files"
      style={{border:'2px dashed #cbd5e1', borderRadius:12, padding:24, textAlign:'center', cursor:'pointer', background: over? '#f8fafc':'transparent'}}
    >
      <p>Drag & drop images here, or click to browse</p>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={(e)=> onFiles(Array.from(e.target.files||[]))} />
    </div>
  )
}

