import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// Initialize Firebase Admin
admin.initializeApp()

// Import function modules
import { onBookingCreate, onBookingUpdate } from './booking'

// Booking-related functions
export const onBookingCreated = onBookingCreate
export const onBookingUpdated = onBookingUpdate

// Health check function
export const healthCheck = functions.https.onRequest((req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})
