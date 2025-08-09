import { useAuth } from '@/contexts/AuthContext'
import { signInWithGoogle, signOut } from '@/lib/auth'

export default function AuthPage(){
  const { user } = useAuth()
  return (
    <section className="container" style={{padding:'24px 0'}}>
      <h2>Authentication</h2>
      {!user ? (
        <div className="card" style={{padding:16, marginTop:12}}>
          <button className="btn primary" onClick={signInWithGoogle}>Continue with Google</button>
        </div>
      ) : (
        <div className="card" style={{padding:16, marginTop:12}}>
          <p>Signed in as {user.displayName || user.email}</p>
          <button className="btn ghost" onClick={signOut}>Sign out</button>
        </div>
      )}
    </section>
  )
}

