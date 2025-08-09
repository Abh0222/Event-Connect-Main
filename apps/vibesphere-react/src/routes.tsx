import App from './app'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Booking from './pages/booking/Booking'
import Packages from './pages/Packages'
import EventStory from './pages/EventStory'
import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Creator from './pages/Creator'
import AuthPage from './pages/Auth'
import NewEvent from './pages/creator/NewEvent'
import CreatorEvents from './pages/creator/Events'
import Leads from './pages/creator/Leads'

export const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { index: true, element: <Home /> },
    { path: 'explore', element: <Explore /> },
    { path: 'packages', element: <Packages /> },
    { path: 'booking', element: <Booking /> },
    { path: 'event/:id', element: <EventStory /> },
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'creator', element: <Creator /> },
    { path: 'creator/new', element: <NewEvent /> },
    { path: 'creator/events', element: <CreatorEvents /> },
    { path: 'creator/leads', element: <Leads /> },
    { path: 'auth', element: <AuthPage /> },
  ]}
])

