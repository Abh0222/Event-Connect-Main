'use client'

import { useState } from 'react'
import { Save, Upload, Camera, Bell, Shield, CreditCard } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Switch } from '@/components/ui'

interface ProfileSettingsProps {
  userData: any
}

export default function ProfileSettings({ userData }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    }
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    eventReminders: true,
    weeklyNewsletter: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showBookingHistory: false,
    allowReviews: true
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }))
  }

  const handlePreferenceChange = (field: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: string, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      alert('Profile updated successfully!')
    }, 2000)
  }

  const handleAvatarUpload = () => {
    alert('Avatar upload functionality would be implemented here')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-display-lg text-primary-900">Profile Settings</h2>
        <p className="text-neutral-600">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative inline-block mb-4">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-32 h-32 rounded-full object-cover mx-auto"
              />
              <button
                onClick={handleAvatarUpload}
                className="absolute bottom-0 right-0 w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-white hover:bg-accent-600 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <Button variant="outline" onClick={handleAvatarUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Change Picture
            </Button>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
              />

              <Input
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Address Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Street Address"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              placeholder="Enter your street address"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                value={formData.address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                placeholder="City"
              />

              <Input
                label="State"
                value={formData.address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                placeholder="State"
              />

              <Input
                label="ZIP Code"
                value={formData.address.zipCode}
                onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                placeholder="ZIP Code"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-primary-900">Email Notifications</h4>
                <p className="text-sm text-neutral-600">Receive booking confirmations and updates</p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-primary-900">SMS Notifications</h4>
                <p className="text-sm text-neutral-600">Get text messages for urgent updates</p>
              </div>
              <Switch
                checked={preferences.smsNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('smsNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-primary-900">Marketing Emails</h4>
                <p className="text-sm text-neutral-600">Receive offers and event inspiration</p>
              </div>
              <Switch
                checked={preferences.marketingEmails}
                onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-primary-900">Event Reminders</h4>
                <p className="text-sm text-neutral-600">Get reminded about upcoming events</p>
              </div>
              <Switch
                checked={preferences.eventReminders}
                onCheckedChange={(checked) => handlePreferenceChange('eventReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-primary-900">Weekly Newsletter</h4>
                <p className="text-sm text-neutral-600">Stay updated with event trends</p>
              </div>
              <Switch
                checked={preferences.weeklyNewsletter}
                onCheckedChange={(checked) => handlePreferenceChange('weeklyNewsletter', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-primary-900">Show Booking History</h4>
                <p className="text-sm text-neutral-600">Allow others to see your past events</p>
              </div>
              <Switch
                checked={privacy.showBookingHistory}
                onCheckedChange={(checked) => handlePrivacyChange('showBookingHistory', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-primary-900">Allow Reviews</h4>
                <p className="text-sm text-neutral-600">Let creators review your events</p>
              </div>
              <Switch
                checked={privacy.allowReviews}
                onCheckedChange={(checked) => handlePrivacyChange('allowReviews', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-16 flex-col">
                <CreditCard className="h-5 w-5 mb-2" />
                Payment Methods
              </Button>
              
              <Button variant="outline" className="h-16 flex-col">
                <Shield className="h-5 w-5 mb-2" />
                Security Settings
              </Button>
              
              <Button variant="outline" className="h-16 flex-col text-red-600 border-red-600 hover:bg-red-50">
                <span className="text-lg mb-1">⚠️</span>
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
