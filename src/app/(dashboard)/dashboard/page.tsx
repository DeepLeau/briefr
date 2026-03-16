import { Suspense } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { BriefCard } from '@/components/dashboard/BriefCard'
import { getStats } from '@/lib/mock/stats'
import { getBriefs } from '@/lib/mock/briefs'

export default function DashboardPage() {
  const stats = getStats()
  const recentBriefs = getBriefs().slice(0, 5)

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        <PageHeader title="Vue d'ensemble" />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <StatCard
            label="Briefs ce mois"
            value={stats.briefsThisMonth}
            delta={stats.briefsDelta}
            deltaLabel="vs mois dernier"
          />
          <StatCard
            label="Temps économisé"
            value={`${stats.timeSavedHours}h`}
            delta={stats.timeSavedDelta}
            deltaLabel="vs semaine dernière"
          />
          <StatCard
            label="Sources connectées"
            value={stats.connectedSources}
          />
          <StatCard
            label="Taux de précision"
            value={`${stats.accuracyRate}%`}
          />
        </div>

        {/* Recent briefs */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-zinc-300">Briefs récents</h2>
            <a href="/dashboard/briefs" className="text-xs text-accent hover:text-accent-hi transition-colors">
              Voir tout →
            </a>
          </div>

          <div className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
            {recentBriefs.map((brief, idx) => (
              <BriefCard key={brief.id} brief={brief} showDate />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
