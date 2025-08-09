'use client'

import { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      color: {
        primary: 'text-primary-900',
        accent: 'text-accent-500',
        white: 'text-white',
        muted: 'text-neutral-600',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
)

interface SpinnerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string
}

export function Spinner({ className, size, color, label = 'Loading...', ...props }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size, color }), className)}
      {...props}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}

// Loading overlay component
interface LoadingOverlayProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  spinnerSize?: VariantProps<typeof spinnerVariants>['size']
  message?: string
}

export function LoadingOverlay({
  isLoading,
  children,
  className,
  spinnerSize = 'lg',
  message = 'Loading...',
}: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <Spinner size={spinnerSize} color="accent" />
            <p className="text-sm text-neutral-600">{message}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Skeleton loading component
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number
  className?: string
}

export function Skeleton({ lines = 1, className, ...props }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-muted-300 rounded',
            i > 0 && 'mt-2',
            i === lines - 1 && lines > 1 && 'w-3/4'
          )}
        />
      ))}
    </div>
  )
}

// Page loading component
export function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" color="accent" />
        <div className="text-center">
          <h2 className="text-lg font-semibold text-primary-900">Loading VibeSphere</h2>
          <p className="text-sm text-neutral-600">Preparing your experience...</p>
        </div>
      </div>
    </div>
  )
}
