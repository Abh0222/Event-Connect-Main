'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

interface QuickAction {
  id: string
  label: string
  icon: string
}

interface QuickActionsProps {
  actions: QuickAction[]
  onActionClick: (actionId: string) => void
}

export default function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action.id)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted-100 transition-colors text-left"
          >
            <span className="text-lg">{action.icon}</span>
            <span className="text-sm font-medium text-primary-900">{action.label}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
