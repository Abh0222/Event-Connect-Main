'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Sparkles, Mic, MicOff, Paperclip, X } from 'lucide-react'
import { Button, Input, Card, CardContent, Badge } from '@/components/ui'
import ChatMessage from '@/components/chat/ChatMessage'
import QuickActions from '@/components/chat/QuickActions'
import SuggestedQuestions from '@/components/chat/SuggestedQuestions'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
  suggestions?: string[]
  attachments?: Array<{ name: string; url: string; type: string }>
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: "Hi there! I'm Vibe, your AI event planning assistant. I'm here to help you create the perfect event experience. Whether you're planning a wedding, corporate event, or celebration, I can help you with ideas, budgeting, vendor recommendations, and more. What kind of event are you planning?",
    timestamp: new Date(),
    suggestions: [
      "I'm planning a wedding",
      "Corporate event ideas",
      "Birthday party planning",
      "Help me choose a package"
    ]
  }
]

const quickActions = [
  { id: 'budget', label: 'Budget Calculator', icon: '💰' },
  { id: 'packages', label: 'View Packages', icon: '📦' },
  { id: 'gallery', label: 'Event Gallery', icon: '🖼️' },
  { id: 'booking', label: 'Start Booking', icon: '📅' }
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI response based on keywords
    const message = userMessage.toLowerCase()
    
    if (message.includes('wedding')) {
      return "Wonderful! Weddings are such special occasions. I can help you plan every detail from venue selection to catering. What's your vision for the big day? Are you thinking of a traditional ceremony, beach wedding, or something more contemporary? Also, do you have a guest count and budget range in mind?"
    }
    
    if (message.includes('corporate')) {
      return "Great choice! Corporate events are fantastic for team building and networking. What type of corporate event are you planning? A conference, team retreat, product launch, or company celebration? I can help you with venue recommendations, catering options, and entertainment that will impress your colleagues and clients."
    }
    
    if (message.includes('budget')) {
      return "Let's talk budget! Event costs can vary widely based on your requirements. For a rough estimate: Small events (50 guests) start around ₹15,000, Medium events (150 guests) around ₹35,000, and Large events (300+ guests) from ₹75,000. Would you like me to create a detailed budget breakdown based on your specific needs?"
    }
    
    if (message.includes('package')) {
      return "We have three amazing packages to choose from:\n\n🌟 **Essential Experience** (₹15K-25K) - Perfect for intimate celebrations\n✨ **Premium Celebration** (₹35K-60K) - Comprehensive event management\n💎 **Luxe Experience** (₹75K-150K) - Ultimate luxury experience\n\nEach package can be customized to your needs. Which one sounds interesting to you?"
    }
    
    if (message.includes('venue') || message.includes('location')) {
      return "Venue selection is crucial for your event's success! I can recommend venues based on your location, guest count, and event type. Popular options include:\n\n🏖️ Beach resorts (Goa, Kerala)\n🏰 Heritage properties (Rajasthan, Delhi)\n🌆 Urban venues (Mumbai, Bangalore)\n🌿 Garden venues (Pune, Chandigarh)\n\nWhat location are you considering, and what's your preferred ambiance?"
    }
    
    if (message.includes('food') || message.includes('catering')) {
      return "Food is the heart of any celebration! We work with top caterers who specialize in various cuisines:\n\n🍛 Traditional Indian (North & South)\n🌍 International cuisine\n🥗 Fusion & contemporary\n🎂 Custom dessert stations\n\nDo you have any dietary preferences or cultural requirements I should know about?"
    }
    
    // Default response
    return "That's a great question! I'm here to help you with all aspects of event planning. Whether you need help with budgeting, venue selection, package recommendations, or creative ideas, I've got you covered. Could you tell me more about what you're looking for?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() && attachments.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      attachments: attachments.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }))
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setAttachments([])
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(async () => {
      const response = await generateResponse(userMessage.content)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)

    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chat_message_sent', {
        event_category: 'engagement',
        event_label: 'ai_chat',
        message_length: inputValue.length
      })
    }
  }

  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'budget':
        setInputValue('Help me calculate my event budget')
        break
      case 'packages':
        setInputValue('Show me your event packages')
        break
      case 'gallery':
        window.open('/explore', '_blank')
        break
      case 'booking':
        window.open('/booking', '_blank')
        break
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setAttachments(prev => [...prev, ...files])
  }

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      if (!isListening) {
        setIsListening(true)
        recognition.start()

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInputValue(prev => prev + transcript)
          setIsListening(false)
        }

        recognition.onerror = () => {
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-muted-100">
      {/* Header */}
      <div className="bg-white border-b border-muted-300 sticky top-0 z-10">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-primary-900">Vibe AI Assistant</h1>
                <p className="text-sm text-neutral-600">Your personal event planning companion</p>
              </div>
            </div>
            <Badge variant="accent" className="animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full mr-2" />
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="container-custom py-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
              <SuggestedQuestions onQuestionClick={handleSuggestionClick} />
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-3">
              <Card className="h-[70vh] flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-accent-600" />
                      </div>
                      <div className="bg-muted-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-accent-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-muted-300 p-4">
                  {/* Attachments */}
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 bg-muted-100 rounded-lg px-3 py-2">
                          <span className="text-sm text-neutral-700">{file.name}</span>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="text-neutral-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about event planning..."
                        className="resize-none"
                        multiline
                        rows={1}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2"
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleVoiceInput}
                        className={`p-2 ${isListening ? 'text-red-500' : ''}`}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() && attachments.length === 0}
                        size="sm"
                        className="p-2"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </Card>

              {/* Disclaimer */}
              <p className="text-xs text-neutral-500 text-center mt-4">
                Vibe AI can make mistakes. Please verify important information and consult with our human experts for final decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
