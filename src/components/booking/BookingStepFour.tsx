'use client'

import { useState } from 'react'
import { CreditCard, Shield, Lock, ArrowLeft, Check, AlertCircle } from 'lucide-react'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { BookingData } from '@/app/booking/page'
import { formatCurrency } from '@/lib/utils'

interface BookingStepFourProps {
  data: BookingData
  onUpdate: (updates: Partial<BookingData>) => void
  onComplete: () => void
  onPrev: () => void
}

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, RuPay',
    icon: CreditCard,
    popular: true
  },
  {
    id: 'upi',
    name: 'UPI Payment',
    description: 'PhonePe, Google Pay, Paytm',
    icon: CreditCard,
    popular: true
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    description: 'All major banks supported',
    icon: CreditCard,
    popular: false
  }
]

export default function BookingStepFour({ data, onUpdate, onComplete, onPrev }: BookingStepFourProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(data.paymentMethod || 'card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })
  const [agreedToTerms, setAgreedToTerms] = useState(data.agreedToTerms)
  const [marketingConsent, setMarketingConsent] = useState(data.marketingConsent)
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method)
    onUpdate({ paymentMethod: method })
  }

  const handleCardDetailsChange = (field: string, value: string) => {
    setCardDetails(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validatePayment = () => {
    const newErrors: Record<string, string> = {}

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions'
    }

    if (selectedPaymentMethod === 'card') {
      if (!cardDetails.number.replace(/\s/g, '')) {
        newErrors.number = 'Card number is required'
      } else if (cardDetails.number.replace(/\s/g, '').length < 16) {
        newErrors.number = 'Please enter a valid card number'
      }

      if (!cardDetails.expiry) {
        newErrors.expiry = 'Expiry date is required'
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
        newErrors.expiry = 'Please enter a valid expiry date (MM/YY)'
      }

      if (!cardDetails.cvv) {
        newErrors.cvv = 'CVV is required'
      } else if (cardDetails.cvv.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV'
      }

      if (!cardDetails.name.trim()) {
        newErrors.name = 'Cardholder name is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePayment = async () => {
    if (!validatePayment()) return

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      onUpdate({
        paymentMethod: selectedPaymentMethod,
        agreedToTerms,
        marketingConsent
      })
      onComplete()
    }, 3000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-display-md text-primary-900 mb-2">Secure Payment</h2>
        <p className="text-neutral-600">
          Complete your booking with a secure deposit payment of {formatCurrency(data.depositAmount)}.
        </p>
      </div>

      {/* Order Summary */}
      <Card className="bg-muted-50 border-muted-300">
        <CardContent className="p-6">
          <h3 className="font-semibold text-primary-900 mb-4">Booking Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-700">Event Type</span>
              <span className="font-medium capitalize">{data.eventType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">Date & Time</span>
              <span className="font-medium">{data.eventDate} • {data.eventTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">Guests</span>
              <span className="font-medium">{data.guestCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-700">Location</span>
              <span className="font-medium">{data.location.venue}, {data.location.city}</span>
            </div>
            <div className="border-t border-muted-300 pt-3 mt-4">
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-primary-900">Total Amount</span>
                <span className="font-bold text-primary-900">{formatCurrency(data.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-accent-600 font-semibold mt-1">
                <span>Deposit Due Today</span>
                <span>{formatCurrency(data.depositAmount)}</span>
              </div>
              <div className="text-sm text-neutral-600 mt-2">
                Remaining balance: {formatCurrency(data.totalAmount - data.depositAmount)} (due before event)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-primary-900 mb-4">Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {paymentMethods.map(method => {
              const Icon = method.icon
              const isSelected = selectedPaymentMethod === method.id

              return (
                <div
                  key={method.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-accent-500 bg-accent-50' 
                      : 'border-muted-300 hover:border-accent-300'
                  }`}
                  onClick={() => handlePaymentMethodChange(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-accent-500" />
                    <div className="flex-1">
                      <div className="font-medium text-primary-900">{method.name}</div>
                      <div className="text-sm text-neutral-600">{method.description}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      isSelected ? 'border-accent-500 bg-accent-500' : 'border-muted-400'
                    }`}>
                      {isSelected && <Check className="h-2 w-2 text-white m-0.5" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Card Details Form */}
          {selectedPaymentMethod === 'card' && (
            <div className="space-y-4 p-4 bg-muted-50 rounded-lg">
              <h4 className="font-medium text-primary-900">Card Details</h4>
              
              <Input
                label="Card Number"
                value={cardDetails.number}
                onChange={(e) => handleCardDetailsChange('number', formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                error={errors.number}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  value={cardDetails.expiry}
                  onChange={(e) => handleCardDetailsChange('expiry', formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  error={errors.expiry}
                />

                <Input
                  label="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => handleCardDetailsChange('cvv', e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  maxLength={4}
                  error={errors.cvv}
                />
              </div>

              <Input
                label="Cardholder Name"
                value={cardDetails.name}
                onChange={(e) => handleCardDetailsChange('name', e.target.value)}
                placeholder="Name as on card"
                error={errors.name}
              />
            </div>
          )}

          {/* UPI/Other Payment Methods */}
          {selectedPaymentMethod !== 'card' && (
            <div className="p-4 bg-muted-50 rounded-lg text-center">
              <p className="text-neutral-600">
                You will be redirected to complete your payment securely.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => {
                  setAgreedToTerms(e.target.checked)
                  onUpdate({ agreedToTerms: e.target.checked })
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: '' }))
                  }
                }}
                className="w-4 h-4 text-accent-500 focus:ring-accent-500/20 mt-1"
              />
              <label htmlFor="terms" className="text-sm text-neutral-700">
                I agree to the{' '}
                <a href="/terms" className="text-accent-500 hover:underline" target="_blank">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-accent-500 hover:underline" target="_blank">
                  Privacy Policy
                </a>
                . I understand that a 30% deposit is required to secure my booking. *
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.terms}
              </p>
            )}

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="marketing"
                checked={marketingConsent}
                onChange={(e) => {
                  setMarketingConsent(e.target.checked)
                  onUpdate({ marketingConsent: e.target.checked })
                }}
                className="w-4 h-4 text-accent-500 focus:ring-accent-500/20 mt-1"
              />
              <label htmlFor="marketing" className="text-sm text-neutral-700">
                I would like to receive updates about new packages, special offers, and event inspiration from VibeSphere. (Optional)
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-900">Secure Payment</h4>
              <p className="text-sm text-green-700 mt-1">
                Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect your data.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={isProcessing}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button 
          onClick={handlePayment} 
          disabled={isProcessing}
          size="lg"
          className="min-w-[200px]"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Pay {formatCurrency(data.depositAmount)}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
