'use client'
import { Integration } from '@/lib/mock/integrations'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IntegrationCardProps {
  integration: Integration
  onToggle: () => void
}

const logos: Record<string, string> = {
  gmail: 'https://cdn.worldvectorlogo.com/logos/gmail-icon.svg',
  slack: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
  meet: 'https://cdn.worldvectorlogo.com/logos/google-meet-icon.svg',
  notion: 'https://cdn.worldvectorlogo.com/logos/notion-2.svg',
}

export function IntegrationCard({ integration, onToggle }: IntegrationCardProps) {
  return (
    <div className="bg-[#111] border border-white/[0.07] rounded-lg p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center overflow-hidden">
            <img 
              src={logos[integration.id]} 
              alt={integration.name}
              className="w-6 h-6 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-zinc-200">{integration.name}</h3>
            <p className="text-xs text-zinc-500">
              {integration.connected ? 'Connecté' : 'Non connecté'}
            </p>
          </div>
        </div>
        
        <div className={cn(
          'w-2 h-2 rounded-full',
          integration.connected ? 'bg-green-500' : 'bg-zinc-600'
        )} />
      </div>

      <button
        onClick={onToggle}
        className={cn(
          'w-full h-9 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-2',
          integration.connected
            ? 'border border-red-500/25 bg-red-500/[0.06] hover:bg-red-500/10 text-red-400'
            : 'bg-accent hover:bg-accent-hi text-white'
        )}
      >
        {integration.connected ? (
          <>
            <X size={14} />
            Se déconnecter
          </>
        ) : (
          <>
            <Check size={14} />
            Connecter
          </>
        )}
      </button>
    </div>
  )
}
