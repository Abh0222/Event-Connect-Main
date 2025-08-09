import { Outlet, Link } from 'react-router-dom'

import VibeWidget from '@/components/chat/VibeWidget'

export default function App(){
  return (
    <div style={{minHeight:'100%'}}>
      <header style={{padding:16, position:'sticky', top:0, background:'var(--muted-000)', boxShadow:'var(--shadow-card)', zIndex:20}}>
        <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link to="/" aria-label="VibeSphere Home" style={{textDecoration:'none',color:'var(--primary-900)'}}>
            <strong>VibeSphere</strong>
          </Link>
          <nav style={{display:'flex',gap:16}}>
            <Link to="/explore">Explore</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/booking">Book</Link>
            <Link to="/auth">Sign in</Link>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer style={{padding:16, marginTop:40}}>
        <div className="container">© {new Date().getFullYear()} VibeSphere</div>
      </footer>
      <VibeWidget />
    </div>
  )
}

