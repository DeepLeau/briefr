import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  delta?: number
  deltaLabel?: string
}

export function StatCard({ label, value, delta, deltaLabel }: StatCardProps) {
  const isPositive = delta && delta > 0

  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-lg p-4">
      <p className="text-xs text-zinc-500 mb-1.5">{label}</p>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-semibold text-zinc-100 tracking-tight">{value}</p>
        {delta !== undefined && (
          <div className={cn(
            'flex items-center gap-0.5 text-xs mb-1',
            isPositive ? 'text-green-500' : 'text-red-400'
          )}>
            {isPositive ? (
              <TrendingUp size={12} />
            ) : (
              <TrendingDown size={12} />
            )}
            <span>{Math.abs(delta)}{isPositive ? '+' : ''}{typeof delta === 'number' && delta < 0 ? '' : '%'}</span>
          </div>
        )}
      </div>
      {deltaLabel && (
        <p className="text-[11px] text-zinc-600 mt-1">{deltaLabel}</p>
      )}
    </div>
  )
}
