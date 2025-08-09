'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requiredRole?: 'customer' | 'creator' | 'admin'
  redirectTo?: string
}

export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requiredRole,
  redirectTo = '/'
}: ProtectedRouteProps) {
  const { user, userProfile, loading, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    if (loading) return

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo)
      return
    }

    // If specific role is required
    if (requiredRole && userProfile?.role !== requiredRole) {
      // Redirect based on user role
      if (userProfile?.role === 'creator') {
        router.push('/creator/dashboard')
      } else if (userProfile?.role === 'customer') {
        router.push('/dashboard')
      } else {
        router.push('/')
      }
      return
    }

    setIsAuthorized(true)
  }, [user, userProfile, loading, requireAuth, requiredRole, router, redirectTo, isAuthenticated])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}
