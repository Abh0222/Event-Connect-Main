import { auth } from './firebase'

export async function signInWithGoogle(){
  if(!auth){ alert('Auth not configured'); return }
  const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth')
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

export async function signOut(){
  if(!auth) return
  const { signOut: so } = await import('firebase/auth')
  await so(auth)
}

