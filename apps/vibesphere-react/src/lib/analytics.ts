export type EventName =
  | 'homepage_loaded'
  | 'hero_cta_click'
  | 'explore_open'
  | 'event_view'
  | 'favorite_add'
  | 'favorite_remove'
  | 'booking_started'
  | 'booking_step'
  | 'booking_payment_started'
  | 'booking_completed'
  | 'booking_abandoned'
  | 'chat_initiated'
  | 'chat_message_sent'
  | 'chat_quick_reply'
  | 'event_published'
  | 'event_status_changed'
  | 'asset_uploaded'

export function track(event: EventName, params: Record<string,any> = {}){
  // GA4 if present
  if(typeof window !== 'undefined' && (window as any).gtag){
    ;(window as any).gtag('event', event, params)
    return
  }
  // Fallback: console
  console.log('[analytics]', event, params)
}

export function trackPageView(name: string, params: Record<string,any> = {}){
  if(typeof window !== 'undefined' && (window as any).gtag){
    ;(window as any).gtag('event', 'page_view', { page_title: name, ...params })
    return
  }
  console.log('[analytics] page_view', name, params)
}

