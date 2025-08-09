import Hero from '@/components/sections/Hero'
import QuickFilters from '@/components/sections/QuickFilters'
import FeaturedPortfolios from '@/components/sections/FeaturedPortfolios'
import SocialProof from '@/components/sections/SocialProof'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <QuickFilters />
      <FeaturedPortfolios />
      <SocialProof />
    </main>
  )
}
