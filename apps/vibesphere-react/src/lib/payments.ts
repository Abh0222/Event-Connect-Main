import { loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<any> | null = null
export function getStripe(){
  if(!stripePromise){
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    stripePromise = loadStripe(key || '')
  }
  return stripePromise
}

export async function startCheckout(amount:number, metadata:Record<string,any>){
  const stripe = await getStripe()
  if(!stripe){
    alert('Payments not configured. Please set VITE_STRIPE_PUBLISHABLE_KEY and backend /create-checkout-session.')
    return
  }
  try{
    const base = (import.meta as any).env.VITE_API_BASE_URL || ''
    const url = base ? `${base.replace(/\/$/, '')}/api/create-checkout-session` : '/api/create-checkout-session'
    const res = await fetch(url,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ amount, metadata })
    })
    if(!res.ok) throw new Error('Failed to create session')
    const { id } = await res.json()
    await stripe.redirectToCheckout({ sessionId:id })
  }catch(err:any){
    alert(err.message || 'Payment error')
  }
}

