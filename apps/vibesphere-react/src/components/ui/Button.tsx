import clsx from 'clsx'
import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
}

export function Button({ variant='primary', loading, className, children, ...props }: Props){
  return (
    <button {...props} className={clsx('btn', variant, className)} aria-busy={loading}>
      {loading ? 'Loading…' : children}
    </button>
  )
}

