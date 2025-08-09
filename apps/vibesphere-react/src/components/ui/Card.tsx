import React from 'react'

export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>){
  return <div className={`card ${className||''}`} {...props}>{children}</div>
}
export function CardHeader({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>){
  return <div className={className} style={{padding:'16px 16px 0'}} {...props}>{children}</div>
}
export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>){
  return <div className={className} style={{padding:16}} {...props}>{children}</div>
}
export function CardTitle({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>){
  return <h3 className={className} {...props}>{children}</h3>
}

