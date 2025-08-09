'use client'

import { Bot, User, Copy, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui'
import { formatTime } from '@/lib/utils'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
  suggestions?: string[]
  attachments?: Array<{ name: string; url: string; type: string }>
}

interface ChatMessageProps {
  message: Message
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user'

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content)
  }

  const handleFeedback = (type: 'positive' | 'negative') => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'chat_feedback', {
        event_category: 'engagement',
        event_label: 'ai_chat',
        feedback_type: type,
        message_id: message.id
      })
    }
  }

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-primary-100' 
          : 'bg-gradient-to-br from-accent-500 to-accent-400'
      }`}>
        {isUser ? (
          <User className="h-4 w-4 text-primary-600" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div className={`rounded-lg p-3 ${
          isUser 
            ? 'bg-accent-500 text-white ml-auto' 
            : 'bg-muted-100 text-neutral-800'
        }`}>
          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-3 space-y-2">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-white/10 rounded">
                  {attachment.type.startsWith('image/') ? (
                    <img 
                      src={attachment.url} 
                      alt={attachment.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                      📄
                    </div>
                  )}
                  <span className="text-sm">{attachment.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Message Text */}
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: formatMessageContent(message.content) 
            }}
          />
        </div>

        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  // Trigger suggestion click
                  const event = new CustomEvent('suggestionClick', { detail: suggestion })
                  window.dispatchEvent(event)
                }}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        {/* Message Actions */}
        <div className={`flex items-center gap-2 mt-2 text-xs text-neutral-500 ${
          isUser ? 'justify-end' : 'justify-start'
        }`}>
          <span>{formatTime(message.timestamp)}</span>
          
          {!isUser && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyMessage}
                className="p-1 h-auto text-neutral-500 hover:text-neutral-700"
              >
                <Copy className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback('positive')}
                className="p-1 h-auto text-neutral-500 hover:text-green-600"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFeedback('negative')}
                className="p-1 h-auto text-neutral-500 hover:text-red-600"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
