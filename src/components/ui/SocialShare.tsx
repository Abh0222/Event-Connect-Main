'use client'

import { useState } from 'react'
import { Share2, Facebook, Twitter, Linkedin, Link, Check } from 'lucide-react'
import { Button } from '@/components/ui'

interface SocialShareProps {
  url: string
  title: string
  description?: string
  className?: string
}

export default function SocialShare({ url, title, description, className = '' }: SocialShareProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
    setShowDropdown(false)
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        event_category: 'engagement',
        event_label: platform,
        content_type: 'event',
        item_id: url
      })
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setShowDropdown(false)
      
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'share', {
          event_category: 'engagement',
          event_label: 'copy_link',
          content_type: 'event',
          item_id: url
        })
      }
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
        
        // Analytics tracking
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'share', {
            event_category: 'engagement',
            event_label: 'native_share',
            content_type: 'event',
            item_id: url
          })
        }
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', err)
      }
    } else {
      setShowDropdown(!showDropdown)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="lg"
        onClick={handleNativeShare}
        className="bg-white/10 border-white/30 text-white hover:bg-white/20"
      >
        <Share2 className="h-5 w-5 mr-2" />
        Share
      </Button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-elevated border border-muted-300 z-50 overflow-hidden">
            <div className="p-4 border-b border-muted-300">
              <h3 className="font-semibold text-primary-900 mb-1">Share this event</h3>
              <p className="text-sm text-neutral-600 line-clamp-2">{title}</p>
            </div>
            
            <div className="p-2">
              {/* Social Media Options */}
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Facebook className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-primary-900">Facebook</span>
              </button>
              
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted-100 transition-colors"
              >
                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                  <Twitter className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-primary-900">Twitter</span>
              </button>
              
              <button
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <Linkedin className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-primary-900">LinkedIn</span>
              </button>
              
              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted-100 transition-colors"
              >
                <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
                  {copied ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <Link className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="font-medium text-primary-900">
                  {copied ? 'Link copied!' : 'Copy link'}
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
