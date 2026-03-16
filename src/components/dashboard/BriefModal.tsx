'use client'
import { useEffect } from 'react'
import { Brief } from '@/lib/mock/briefs'
import { X, Mail, MessageSquare, Video, Clock, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BriefModalProps {
  brief: Brief
  onClose: () => void
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

export function BriefModal({ brief, onClose }: BriefModalProps) {
  const Icon = sourceIcons[brief.source]
  const dateStr = new Date(brief.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-testid="brief-modal">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#111] border border-white/[0.09] rounded-xl shadow-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-9 h-9 rounded-lg border flex items-center justify-center',
              sourceColors[brief.source]
            )}>
              <Icon size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">{brief.title}</h2>
              <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {dateStr}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {brief.timeSaved} min
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="mb-4">
            <span className={cn(
              'text-[10px] px-2 py-0.5 rounded border mb-3 inline-block',
              sourceColors[brief.source]
            )}>
              {brief.source}
            </span>
            <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Résumé</h3>
            <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
              {brief.fullSummary}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-white/[0.06] shrink-0">
          <button 
            onClick={onClose}
            className="h-8 px-4 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-zinc-300 text-xs font-medium transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
