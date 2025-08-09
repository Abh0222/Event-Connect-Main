'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void
}

const suggestedQuestions = [
  "What's included in your packages?",
  "How much does a wedding cost?",
  "Can you help me choose a venue?",
  "What are your most popular themes?",
  "Do you handle destination events?",
  "How far in advance should I book?",
  "Can I customize my package?",
  "What's your cancellation policy?",
  "Do you provide catering services?",
  "Can you help with vendor selection?"
]

export default function SuggestedQuestions({ onQuestionClick }: SuggestedQuestionsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Suggested Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestedQuestions.slice(0, 6).map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="w-full text-left p-2 rounded-lg hover:bg-muted-100 transition-colors text-sm text-neutral-700 hover:text-primary-900"
          >
            {question}
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
