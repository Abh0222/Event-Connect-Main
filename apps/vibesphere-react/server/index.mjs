import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const stripeKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeKey ? new Stripe(stripeKey, { apiVersion: '2024-06-20' }) : null

app.post('/api/create-checkout-session', async (req, res) => {
  if(!stripe){
    return res.status(500).json({ error: 'Stripe not configured' })
  }
  try{
    const { amount, metadata } = req.body
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: { name: 'VibeSphere Booking Deposit' },
          unit_amount: Math.max(50, Math.round(amount))*100,
        },
        quantity: 1,
      }],
      metadata: metadata || {},
      success_url: process.env.SUCCESS_URL || 'http://localhost:5173/booking?status=success',
      cancel_url: process.env.CANCEL_URL || 'http://localhost:5173/booking?status=cancel',
    })
    res.json({ id: session.id })
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

const port = process.env.PORT || 8787
app.listen(port, () => console.log(`Stripe server listening on :${port}`))

