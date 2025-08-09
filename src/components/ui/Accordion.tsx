'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionContextType {
  openItems: string[]
  toggleItem: (value: string) => void
  type: 'single' | 'multiple'
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined)

function useAccordionContext() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion component')
  }
  return context
}

interface AccordionProps {
  type?: 'single' | 'multiple'
  defaultValue?: string | string[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: ReactNode
  className?: string
}

export function Accordion({ 
  type = 'single', 
  defaultValue, 
  value, 
  onValueChange, 
  children, 
  className 
}: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    }
    return []
  })

  const openItems = value 
    ? (Array.isArray(value) ? value : [value])
    : internalValue

  const toggleItem = (itemValue: string) => {
    let newValue: string[]

    if (type === 'single') {
      newValue = openItems.includes(itemValue) ? [] : [itemValue]
    } else {
      newValue = openItems.includes(itemValue)
        ? openItems.filter(item => item !== itemValue)
        : [...openItems, itemValue]
    }

    if (value === undefined) {
      setInternalValue(newValue)
    }

    if (onValueChange) {
      onValueChange(type === 'single' ? newValue[0] || '' : newValue)
    }
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('w-full', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  children: ReactNode
  className?: string
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn('border-b border-muted-300', className)} data-value={value}>
      {children}
    </div>
  )
}

interface AccordionTriggerProps {
  children: ReactNode
  className?: string
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordionContext()
  
  // Get the value from the parent AccordionItem
  const value = (children as any)?.props?.value || 
    document.querySelector(`[data-value]`)?.getAttribute('data-value') || ''

  const isOpen = openItems.includes(value)

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:ring-offset-2',
        className
      )}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${value}`}
      id={`accordion-trigger-${value}`}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  )
}

interface AccordionContentProps {
  children: ReactNode
  className?: string
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { openItems } = useAccordionContext()
  
  // Get the value from the parent AccordionItem
  const value = (children as any)?.props?.value || 
    document.querySelector(`[data-value]`)?.getAttribute('data-value') || ''

  const isOpen = openItems.includes(value)

  return (
    <div
      id={`accordion-content-${value}`}
      role="region"
      aria-labelledby={`accordion-trigger-${value}`}
      className={cn(
        'overflow-hidden transition-all duration-200',
        isOpen ? 'animate-slide-down' : 'animate-slide-up'
      )}
      style={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className={cn('pb-4 pt-0', className)}>
        {children}
      </div>
    </div>
  )
}

// Convenience component for simple FAQ-style accordions
interface FAQAccordionProps {
  items: Array<{
    question: string
    answer: string
    value: string
  }>
  className?: string
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion type="single" className={className}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="text-left">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-neutral-600 leading-relaxed">
              {item.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
