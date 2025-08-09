'use client'

import { useState } from 'react'
import { Save, Upload, Camera, MapPin, Globe, Instagram, Facebook, Linkedin } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Input, Textarea, Badge } from '@/components/ui'

interface ProfileSettingsProps {
  creatorData: any
}

export default function ProfileSettings({ creatorData }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    businessName: creatorData.profile.businessName,
    description: creatorData.profile.description,
    specialties: creatorData.profile.specialties,
    experience: creatorData.profile.experience,
    location: creatorData.profile.location,
    website: creatorData.profile.website,
    instagram: creatorData.profile.social.instagram,
    facebook: creatorData.profile.social.facebook,
    linkedin: creatorData.profile.social.linkedin,
    email: creatorData.email,
    phone: creatorData.phone,
  })

  const [newSpecialty, setNewSpecialty] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, newSpecialty.trim()]
      }))
      setNewSpecialty('')
    }
  }

  const handleRemoveSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }))
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
    // In a real app, this would open file picker and upload image
    alert('Avatar upload functionality would be implemented here')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-display-lg text-primary-900">Profile Settings</h2>
        <p className="text-neutral-600">Manage your business profile and contact information</p>
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
                src={creatorData.avatar}
                alt={creatorData.name}
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
            <p className="text-xs text-neutral-600 mt-2">
              Recommended: Square image, at least 400x400px
            </p>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Business Name"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Your business name"
            />

            <Textarea
              label="Business Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your business and services..."
              rows={4}
              maxLength={500}
              showCharCount
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Years of Experience"
                type="number"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 0)}
                min="0"
                max="50"
              />

              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
              />
            </div>

            {/* Specialties */}
            <div>
              <label className="block text-sm font-medium text-primary-900 mb-2">
                Specialties
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.specialties.map((specialty, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => handleRemoveSpecialty(specialty)}
                  >
                    {specialty} ×
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  placeholder="Add a specialty"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSpecialty()}
                />
                <Button variant="outline" onClick={handleAddSpecialty}>
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
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

                <Input
                  label="Website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-primary-900">Social Media</h4>
                
                <Input
                  label="Instagram"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  placeholder="@yourusername"
                />

                <Input
                  label="Facebook"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  placeholder="YourPageName"
                />

                <Input
                  label="LinkedIn"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  placeholder="your-profile-name"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Account Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Badge variant="success" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                    ✓
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900">Verified Creator</h4>
                  <p className="text-sm text-green-700">
                    Your account has been verified. This helps build trust with customers.
                  </p>
                </div>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>

            <div className="mt-4 text-sm text-neutral-600">
              <h5 className="font-medium text-primary-900 mb-2">Verification includes:</h5>
              <ul className="space-y-1">
                <li>• Identity verification</li>
                <li>• Business registration documents</li>
                <li>• Portfolio review and approval</li>
                <li>• Customer review verification</li>
              </ul>
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
