'use client'
import { useState, useEffect } from 'react'
import { Mail } from 'lucide-react'

const emails = [
  { from: 'Sarah Chen', subject: 'Q4 Product Roadmap Review', preview: 'Hi team, wanted to share the updated roadmap...' },
  { from: 'Mike Rodriguez', subject: 'Budget Approval Needed', preview: 'Please review the attached budget proposal...' },
  { from: 'Engineering Team', subject: 'Sprint 47 Completed', preview: 'Sprint retrospective summary and metrics...' },
]

export function EmailWidget() {
  const [active, setActive] = useState(0)
  const [showBrief, setShowBrief] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setShowBrief(false)
      setTimeout(() => {
        setActive((prev) => (prev + 1) % emails.length)
        setTimeout(() => setShowBrief(true), 300)
      }, 200)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111] p-5 shadow-sm min-h-[240px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-4 h-4 text-accent" strokeWidth={1.5} />
        <span className="text-xs text-zinc-500">Email Summary</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="flex-1">
        <div
          className={`transition-all duration-300 ${
            showBrief ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="rounded-lg bg-zinc-900/80 border border-white/[0.07] p-3 mb-3">
            <p className="text-xs text-zinc-500 mb-1">From: {emails[active].from}</p>
            <p className="text-sm font-medium text-zinc-200 mb-1">{emails[active].subject}</p>
            <p className="text-xs text-zinc-500 line-clamp-2">{emails[active].preview}</p>
          </div>

          <div className="rounded-lg bg-accent/10 border border-accent/20 p-3">
            <p className="text-[10px] text-accent uppercase tracking-wider mb-1">AI Brief</p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Key decision: Q4 roadmap approved with 3 priority shifts. Budget review scheduled for Thursday. Action needed from engineering leads by EOD Wednesday.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-600">
        <span>Summarized in 0.3s</span>
        <span className="text-accent">96% accuracy</span>
      </div>
    </div>
  )
}
