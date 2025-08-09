'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    title: 'Enchanted Garden Wedding',
    subtitle: 'Where fairy tales come to life',
    description: 'Immerse yourself in a magical outdoor celebration with cascading florals and twinkling lights.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop',
    cta: 'Explore This Style',
    type: 'Wedding'
  },
  {
    id: 2,
    title: 'Corporate Excellence Summit',
    subtitle: 'Professional events that inspire',
    description: 'Elevate your corporate gatherings with sophisticated design and seamless execution.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&h=1080&fit=crop',
    cta: 'View Corporate Packages',
    type: 'Corporate'
  },
  {
    id: 3,
    title: 'Vibrant Festival Experience',
    subtitle: 'Celebrate life in full color',
    description: 'Create unforgettable moments with dynamic entertainment and immersive experiences.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop',
    cta: 'Discover Festival Vibes',
    type: 'Festival'
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_navigation', {
        event_category: 'engagement',
        event_label: 'next_slide',
        slide_index: (currentSlide + 1) % heroSlides.length
      })
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_navigation', {
        event_category: 'engagement',
        event_label: 'prev_slide',
        slide_index: (currentSlide - 1 + heroSlides.length) % heroSlides.length
      })
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_navigation', {
        event_category: 'engagement',
        event_label: 'dot_navigation',
        slide_index: index
      })
    }
  }

  const handleCTAClick = (cta: string, slideType: string) => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'hero_cta_click', {
        event_category: 'conversion',
        event_label: cta,
        slide_type: slideType,
        slide_index: currentSlide
      })
    }
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 10s ease-out',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/70 via-primary-900/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-gold-400/20 px-4 py-2 text-sm font-medium text-gold-400">
                {heroSlides[currentSlide].type}
              </span>
            </div>
            
            <h1 className="text-display-xl mb-4 text-white animate-fade-in">
              {heroSlides[currentSlide].title}
            </h1>
            
            <h2 className="text-display-md mb-6 text-muted-100 animate-fade-in">
              {heroSlides[currentSlide].subtitle}
            </h2>
            
            <p className="text-body mb-8 text-muted-200 animate-fade-in">
              {heroSlides[currentSlide].description}
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in">
              <Button
                size="lg"
                className="group"
                onClick={() => handleCTAClick(heroSlides[currentSlide].cta, heroSlides[currentSlide].type)}
              >
                {heroSlides[currentSlide].cta}
                <Play className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => handleCTAClick('View All Experiences', 'general')}
              >
                View All Experiences
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 w-8 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-ring"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-all hover:bg-white/20 focus-ring"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  )
}
