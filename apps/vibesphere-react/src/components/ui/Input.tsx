import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  description?: string
  error?: string
  id?: string
}

export function Input({ label, description, error, id, ...props }: Props){
  const inputId = id || React.useId()
  const describedBy = [description ? `${inputId}-desc` : null, error ? `${inputId}-err` : null]
    .filter(Boolean).join(' ')
  return (
    <div style={{display:'grid', gap:6}}>
      {label && <label htmlFor={inputId} style={{fontWeight:600}}>{label}</label>}
      <input id={inputId} aria-describedby={describedBy || undefined} aria-invalid={!!error} {...props}
        style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e5e7eb'}} />
      {description && <div id={`${inputId}-desc`} style={{fontSize:12, color:'#4b5563'}}>{description}</div>}
      {error && <div id={`${inputId}-err`} style={{fontSize:12, color:'#dc2626'}}>{error}</div>}
    </div>
  )
}

