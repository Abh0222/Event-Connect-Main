'use client'

import { useState } from 'react'
import { X, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { Button, Input, Modal, Card, CardContent, Badge } from '@/components/ui'
import { signIn, signUp, signInWithGoogle, resetPassword } from '@/lib/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'signin' | 'signup'
  defaultRole?: 'customer' | 'creator'
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signin', defaultRole = 'customer' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(defaultMode)
  const [role, setRole] = useState<'customer' | 'creator'>(defaultRole)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required')
      return false
    }
    
    if (mode !== 'reset' && !formData.password) {
      setError('Password is required')
      return false
    }

    if (mode === 'signup') {
      if (!formData.displayName) {
        setError('Name is required')
        return false
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return false
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      if (mode === 'signin') {
        await signIn(formData.email, formData.password)
        onClose()
      } else if (mode === 'signup') {
        await signUp(formData.email, formData.password, formData.displayName, role)
        onClose()
      } else if (mode === 'reset') {
        await resetPassword(formData.email)
        setError('')
        alert('Password reset email sent! Check your inbox.')
        setMode('signin')
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')

    try {
      await signInWithGoogle(role)
      onClose()
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ email: '', password: '', confirmPassword: '', displayName: '' })
    setError('')
  }

  const switchMode = (newMode: 'signin' | 'signup' | 'reset') => {
    setMode(newMode)
    resetForm()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary-900">
              {mode === 'signin' && 'Welcome Back'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'reset' && 'Reset Password'}
            </h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Role Selection for Signup */}
          {mode === 'signup' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-primary-900 mb-3">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    role === 'customer'
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-muted-300 hover:border-accent-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">🎉</div>
                    <div className="font-medium text-primary-900">Customer</div>
                    <div className="text-xs text-neutral-600">Book events</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    role === 'creator'
                      ? 'border-accent-500 bg-accent-50'
                      : 'border-muted-300 hover:border-accent-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">✨</div>
                    <div className="font-medium text-primary-900">Creator</div>
                    <div className="text-xs text-neutral-600">Create events</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <Input
                label="Full Name"
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
                placeholder="Enter your full name"
                disabled={loading}
              />
            )}

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />

            {mode !== 'reset' && (
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}

            {mode === 'signup' && (
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                disabled={loading}
              />
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  {mode === 'signin' && 'Signing In...'}
                  {mode === 'signup' && 'Creating Account...'}
                  {mode === 'reset' && 'Sending Email...'}
                </>
              ) : (
                <>
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'reset' && 'Send Reset Email'}
                </>
              )}
            </Button>
          </form>

          {mode !== 'reset' && (
            <>
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-muted-300" />
                <span className="px-3 text-sm text-neutral-600">or</span>
                <div className="flex-1 border-t border-muted-300" />
              </div>

              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full"
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </>
          )}

          <div className="mt-6 text-center text-sm">
            {mode === 'signin' && (
              <>
                <button
                  type="button"
                  onClick={() => switchMode('reset')}
                  className="text-accent-500 hover:underline mr-4"
                >
                  Forgot password?
                </button>
                <span className="text-neutral-600">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="text-accent-500 hover:underline"
                >
                  Sign up
                </button>
              </>
            )}

            {mode === 'signup' && (
              <>
                <span className="text-neutral-600">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="text-accent-500 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}

            {mode === 'reset' && (
              <>
                <span className="text-neutral-600">Remember your password? </span>
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="text-accent-500 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          {mode === 'signup' && (
            <div className="mt-4 text-xs text-neutral-600 text-center">
              By creating an account, you agree to our{' '}
              <a href="/terms" className="text-accent-500 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-accent-500 hover:underline">Privacy Policy</a>
            </div>
          )}
        </CardContent>
      </Card>
    </Modal>
  )
}
