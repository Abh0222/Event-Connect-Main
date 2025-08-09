'use client'

import { useState, useRef, useEffect } from 'react'
import { Move } from 'lucide-react'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = ''
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    updateSliderPosition(e.clientX)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    updateSliderPosition(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    updateSliderPosition(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging])

  const handleImageLoad = (type: 'before' | 'after') => {
    setImagesLoaded(prev => ({ ...prev, [type]: true }))
  }

  return (
    <div className={`relative w-full aspect-[16/10] overflow-hidden rounded-xl ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full h-full cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Before Image (Right side) */}
        <div className="absolute inset-0">
          {!imagesLoaded.before && (
            <div className="absolute inset-0 bg-muted-300 animate-pulse" />
          )}
          <img
            src={beforeImage}
            alt={beforeLabel}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imagesLoaded.before ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad('before')}
            draggable={false}
          />
          
          {/* Before Label */}
          <div className="absolute top-4 right-4 bg-primary-900/80 text-white px-3 py-1 rounded-full text-sm font-medium">
            {beforeLabel}
          </div>
        </div>

        {/* After Image (Left side) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {!imagesLoaded.after && (
            <div className="absolute inset-0 bg-muted-300 animate-pulse" />
          )}
          <img
            src={afterImage}
            alt={afterLabel}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imagesLoaded.after ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => handleImageLoad('after')}
            draggable={false}
          />
          
          {/* After Label */}
          <div className="absolute top-4 left-4 bg-accent-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            {afterLabel}
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10 transition-all duration-100"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Slider Handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-elevated flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
            <Move className="h-5 w-5 text-primary-900" />
          </div>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary-900/80 text-white px-4 py-2 rounded-full text-sm font-medium pointer-events-none">
          <span className="hidden sm:inline">Drag to compare</span>
          <span className="sm:hidden">Swipe to compare</span>
        </div>
      </div>
    </div>
  )
}
