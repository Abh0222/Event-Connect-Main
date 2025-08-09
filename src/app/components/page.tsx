'use client'

import { useState } from 'react'
import {
  Button,
  Input,
  Select,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  FAQAccordion,
  ToastProvider,
  useSuccessToast,
  useErrorToast,
  Spinner,
  LoadingOverlay,
  VibeSphereLogo,
  WeddingIcon,
  CorporateIcon,
  PartyIcon,
  FestivalIcon,
} from '@/components/ui'

function ComponentShowcase() {
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  
  const successToast = useSuccessToast()
  const errorToast = useErrorToast()

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  const faqItems = [
    {
      value: 'item-1',
      question: 'What is VibeSphere?',
      answer: 'VibeSphere is a premium event creation and booking platform that connects customers with professional event creators.'
    },
    {
      value: 'item-2',
      question: 'How do I book an event?',
      answer: 'Simply browse our curated events, select your preferred style, and follow our easy booking process.'
    },
    {
      value: 'item-3',
      question: 'Can I customize my event?',
      answer: 'Absolutely! Our creators work with you to customize every aspect of your event to match your vision.'
    }
  ]

  return (
    <div className="min-h-screen bg-muted-100 py-12">
      <div className="container-custom max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <VibeSphereLogo size={40} className="text-accent-500" />
            <h1 className="text-display-xl text-primary-900">VibeSphere Components</h1>
          </div>
          <p className="text-body text-neutral-600 max-w-2xl mx-auto">
            A comprehensive showcase of all UI components in the VibeSphere design system.
          </p>
        </div>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="ghost">Ghost Button</Button>
                  <Button variant="outline">Outline Button</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button disabled>Disabled</Button>
                  <Button onClick={() => successToast('Button clicked!', 'This is a success message')}>
                    Show Success Toast
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => errorToast('Error occurred!', 'This is an error message')}
                  >
                    Show Error Toast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  label="Name"
                  placeholder="Enter your name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  helperText="This is a helper text"
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  error="Please enter a valid email address"
                />

                <Select
                  label="Event Type"
                  placeholder="Select event type"
                  value={selectValue}
                  onChange={(e) => setSelectValue(e.target.value)}
                  options={[
                    { value: 'wedding', label: 'Wedding' },
                    { value: 'corporate', label: 'Corporate Event' },
                    { value: 'party', label: 'Party' },
                    { value: 'festival', label: 'Festival' },
                  ]}
                />

                <Textarea
                  label="Message"
                  placeholder="Tell us about your event..."
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  maxLength={500}
                  showCharCount
                  helperText="Describe your event requirements"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">This is a default card with shadow.</p>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Elevated Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">This card has an elevated shadow.</p>
                </CardContent>
              </Card>

              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Outline Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-600">This card has a border instead of shadow.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="gold">Gold</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loading States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
                
                <Button onClick={handleLoadingDemo}>
                  Demo Loading Overlay
                </Button>

                <LoadingOverlay isLoading={loading} message="Loading demo...">
                  <div className="h-32 bg-muted-200 rounded-lg flex items-center justify-center">
                    <p className="text-neutral-600">Content that will be overlaid</p>
                  </div>
                </LoadingOverlay>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQ Accordion</CardTitle>
              </CardHeader>
              <CardContent>
                <FAQAccordion items={faqItems} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="icons" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Event Type Icons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <WeddingIcon size={32} className="text-accent-500" />
                    <span className="text-sm">Wedding</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <CorporateIcon size={32} className="text-primary-900" />
                    <span className="text-sm">Corporate</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <PartyIcon size={32} className="text-gold-400" />
                    <span className="text-sm">Party</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <FestivalIcon size={32} className="text-accent-500" />
                    <span className="text-sm">Festival</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-display-xl">Display XL - 48px</div>
                <div className="text-display-lg">Display Large - 34px</div>
                <div className="text-display-md">Display Medium - 24px</div>
                <div className="text-body">Body Text - 16px</div>
                <div className="text-small">Small Text - 14px</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Palette</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="h-16 bg-primary-900 rounded-lg"></div>
                    <p className="text-sm">Primary 900</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-accent-500 rounded-lg"></div>
                    <p className="text-sm">Accent 500</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-gold-400 rounded-lg"></div>
                    <p className="text-sm">Gold 400</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-muted-100 border rounded-lg"></div>
                    <p className="text-sm">Muted 100</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <ToastProvider>
      <ComponentShowcase />
    </ToastProvider>
  )
}
