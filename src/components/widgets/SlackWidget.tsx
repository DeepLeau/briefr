'use client'
import { useState, useEffect } from 'react'
import { MessageSquare, Hash, User } from 'lucide-react'

const threads = [
  { channel: 'product', title: 'Launch checklist for v2.4', messages: 12 },
  { channel: 'engineering', title: 'API performance issues', messages: 8 },
  { channel: 'design', title: 'New component library', messages: 15 },
]

export function SlackWidget() {
  const [active, setActive] = useState(0)
  const [showBrief, setShowBrief] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setShowBrief(false)
      setTimeout(() => {
        setActive((prev) => (prev + 1) % threads.length)
        setTimeout(() => setShowBrief(true), 300)
      }, 200)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111] p-5 shadow-sm min-h-[240px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-4 h-4 text-accent" strokeWidth={1.5} />
        <span className="text-xs text-zinc-500">Slack Thread</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="flex-1">
        <div
          className={`transition-all duration-300 ${
            showBrief ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-3 h-3 text-zinc-500" />
            <span className="text-xs text-zinc-400">{threads[active].channel}</span>
            <span className="text-[10px] text-zinc-600">•</span>
            <span className="text-[10px] text-zinc-600">{threads[active].messages} messages</span>
          </div>

          <div className="rounded-lg bg-zinc-900/80 border border-white/[0.07] p-3 mb-3">
            <p className="text-sm font-medium text-zinc-200 mb-2">{threads[active].title}</p>
            <div className="space-y-1.5">
              <div className="flex items-start gap-2">
                <User className="w-3 h-3 text-zinc-500 mt-0.5" />
                <p className="text-xs text-zinc-400">@sarah: We should finalize the checklist today</p>
              </div>
              <div className="flex items-start gap-2">
                <User className="w-3 h-3 text-zinc-500 mt-0.5" />
                <p className="text-xs text-zinc-400">@mike: Agreed, I&apos;ll prepare the docs</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-accent/10 border border-accent/20 p-3">
            <p className="text-[10px] text-accent uppercase tracking-wider mb-1">AI Brief</p>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Action items: Finalize launch checklist (Sarah), prepare documentation (Mike). Timeline: EOD Friday for review.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-600">
        <span>Thread analyzed</span>
        <span className="text-accent">2 decisions found</span>
      </div>
    </div>
  )
}
