'use client'
import { useState, useEffect } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { BriefCard } from '@/components/dashboard/BriefCard'
import { FilterTabs } from '@/components/dashboard/FilterTabs'
import { BriefModal } from '@/components/dashboard/BriefModal'
import { Brief, getBriefs, getBriefsFiltered } from '@/lib/mock/briefs'

export default function BriefsPage() {
  const [briefs, setBriefs] = useState<Brief[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [selectedBrief, setSelectedBrief] = useState<Brief | null>(null)
  const limit = 10

  useEffect(() => {
    setLoading(true)
    const filtered = filter === 'all' 
      ? getBriefs() 
      : getBriefsFiltered(filter as 'Email' | 'Slack' | 'Meeting')
    setBriefs(filtered)
    setLoading(false)
  }, [filter])

  const total = briefs.length
  const totalPages = Math.ceil(total / limit)
  const paginatedBriefs = briefs.slice((page - 1) * limit, page * limit)

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-5xl mx-auto">
        <PageHeader title="Mes Briefs" />

        {/* Filters */}
        <FilterTabs active={filter} onChange={setFilter} />

        {/* Briefs list */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-[#111] border border-white/[0.07] rounded-lg p-4 animate-pulse">
                <div className="h-4 w-1/3 bg-white/[0.06] rounded mb-3" />
                <div className="h-3 w-2/3 bg-white/[0.05] rounded mb-2" />
                <div className="h-3 w-1/2 bg-white/[0.05] rounded" />
              </div>
            ))}
          </div>
        ) : paginatedBriefs.length === 0 ? (
          <div className="bg-[#111] border border-white/[0.07] rounded-lg p-12 text-center">
            <p className="text-sm text-zinc-500">Aucun brief trouvé pour cette source</p>
          </div>
        ) : (
          <div className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
            {paginatedBriefs.map((brief) => (
              <BriefCard 
                key={brief.id} 
                brief={brief} 
                onView={() => setSelectedBrief(brief)} 
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 px-3 rounded-md border border-white/10 bg-white/[0.03] text-zinc-400 text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/[0.06] transition-colors"
            >
              Précédent
            </button>
            <span className="text-xs text-zinc-500 px-3">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-8 px-3 rounded-md border border-white/10 bg-white/[0.03] text-zinc-400 text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/[0.06] transition-colors"
            >
              Suivant
            </button>
          </div>
        )}

        {/* Modal */}
        {selectedBrief && (
          <BriefModal brief={selectedBrief} onClose={() => setSelectedBrief(null)} />
        )}
      </div>
    </div>
  )
}
