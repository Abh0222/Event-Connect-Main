import { useAuth } from '@/contexts/AuthContext'

export function useUser(){
  const { user, loading } = useAuth()
  return { user, loading, isSignedIn: !!user }
}

