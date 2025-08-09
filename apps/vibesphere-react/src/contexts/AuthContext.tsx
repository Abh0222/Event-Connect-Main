import React, { createContext, useContext, useEffect, useState } from 'react'

import { auth } from '@/lib/firebase'

export type UserProfile = { uid:string; email?:string|null; displayName?:string|null; role?:'customer'|'creator'|'admin' }

type Ctx = { user: UserProfile | null; loading: boolean }

const AuthContext = createContext<Ctx>({ user: null, loading: false })

export function useAuth(){ return useContext(AuthContext) }

export function AuthProvider({children}:{children:React.ReactNode}){
  const [user,setUser] = useState<UserProfile|null>(null)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    let unsub: any
    async function run(){
      if(auth){
        const { onAuthStateChanged } = await import('firebase/auth')
        setLoading(true)
        unsub = onAuthStateChanged(auth, (u)=>{
          setUser(u? { uid:u.uid, email:u.email, displayName:u.displayName }: null)
          setLoading(false)
        })
      }
    }
    run()
    return ()=> unsub && unsub()
  },[])

  return (
    <AuthContext.Provider value={{user,loading}}>
      {children}
    </AuthContext.Provider>
  )
}

