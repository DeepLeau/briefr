'use client'
import { cn } from '@/lib/utils'

interface FilterTabsProps {
  active: string
  onChange: (value: string) => void
}

const filters = [
  { value: 'all', label: 'Tous' },
  { value: 'Email', label: 'Email' },
  { value: 'Slack', label: 'Slack' },
  { value: 'Meeting', label: 'Meeting' },
]

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-1 mb-4 p-1 bg-[#111] border border-white/[0.07] rounded-lg w-fit">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={cn(
            'px-3 h-8 rounded-md text-xs font-medium transition-colors',
            active === filter.value
              ? 'bg-white/[0.06] text-zinc-100'
              : 'text-zinc-500 hover:text-zinc-300'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
