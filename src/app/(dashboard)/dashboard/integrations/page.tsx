'use client'
import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { IntegrationCard } from '@/components/dashboard/IntegrationCard'
import { Integration, getIntegrations, toggleIntegration } from '@/lib/mock/integrations'

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIntegrations(getIntegrations())
    setLoading(false)
  }, [])

  const handleToggle = (id: string) => {
    setIntegrations(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, connected: !item.connected }
          : item
      )
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        <PageHeader 
          title="Intégrations" 
          description="Connectez vos outils pour automatiser la création de briefs"
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-[#111] border border-white/[0.07] rounded-lg p-5 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/[0.06] rounded-lg" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-white/[0.06] rounded" />
                    <div className="h-3 w-16 bg-white/[0.05] rounded" />
                  </div>
                </div>
                <div className="h-8 w-full bg-white/[0.05] rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onToggle={() => handleToggle(integration.id)}
              />
            ))}
          </div>
        )}

        <p className="text-xs text-zinc-600 mt-6 text-center">
          D&apos;autres intégrations arrivent bientôt — Slack, Notion, Google Drive...
        </p>
      </div>
    </div>
  )
}
