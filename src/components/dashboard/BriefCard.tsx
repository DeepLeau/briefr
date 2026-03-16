import { cn } from '@/lib/utils'
import { Brief } from '@/lib/mock/briefs'
import { Mail, MessageSquare, Video, Clock, ChevronRight } from 'lucide-react'

interface BriefCardProps {
  brief: Brief
  showDate?: boolean
  onView?: () => void
}

const sourceIcons = {
  Email: Mail,
  Slack: MessageSquare,
  Meeting: Video,
}

const sourceColors = {
  Email: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  Slack: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  Meeting: 'text-green-400 bg-green-500/10 border-green-500/20',
}

export function BriefCard({ brief, showDate, onView }: BriefCardProps) {
  const Icon = sourceIcons[brief.source]
  const dateStr = new Date(brief.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className={cn(
      'flex items-center gap-4 p-4 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors cursor-pointer',
      onView && 'group'
    )}>
      <div className={cn(
        'w-10 h-10 rounded-lg border flex items-center justify-center shrink-0',
        sourceColors[brief.source]
      )}>
        <Icon size={18} strokeWidth={1.5} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-zinc-200 truncate">{brief.title}</h3>
          <span className={cn(
            'text-[10px] px-1.5 py-0.5 rounded border shrink-0',
            sourceColors[brief.source]
          )}>
            {brief.source}
          </span>
        </div>
        <p className="text-xs text-zinc-500 line-clamp-1">{brief.shortSummary}</p>
        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-zinc-600">
          {showDate && <span>{dateStr}</span>}
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {brief.timeSaved} min économisés
          </span>
        </div>
      </div>

      {onView && (
        <button 
          onClick={(e) => { e.stopPropagation(); onView() }}
          className="shrink-0 h-8 px-3 rounded-md border border-white/10 bg-white/[0.03] text-zinc-400 text-xs opacity-0 group-hover:opacity-100 hover:bg-white/[0.06] hover:text-zinc-200 transition-all flex items-center gap-1"
        >
          Voir
          <ChevronRight size={12} />
        </button>
      )}
    </div>
  )
}
