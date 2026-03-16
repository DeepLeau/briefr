'use client'
import { useState, useEffect } from 'react'
import { Video, Clock, Users } from 'lucide-react'

const meetings = [
  { title: 'Weekly All-Hands', duration: '45 min', attendees: 24 },
  { title: 'Product Sync', duration: '30 min', attendees: 8 },
  { title: 'Customer Feedback', duration: '60 min', attendees: 12 },
]

export function MeetingWidget() {
  const [active, setActive] = useState(0)
  const [showBrief, setShowBrief] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setShowBrief(false)
      setProgress(0)
      setTimeout(() => {
        setActive((prev) => (prev + 1) % meetings.length)
        setTimeout(() => setShowBrief(true), 300)
      }, 200)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!showBrief) return
    const id = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100))
    }, 50)
    return () => clearInterval(id)
  }, [showBrief])

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#111] p-5 shadow-sm min-h-[240px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Video className="w-4 h-4 text-accent" strokeWidth={1.5} />
        <span className="text-xs text-zinc-500">Meeting Recap</span>
        <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="flex-1">
        <div
          className={`transition-all duration-300 ${
            showBrief ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="rounded-lg bg-zinc-900/80 border border-white/[0.07] p-3 mb-3">
            <p className="text-sm font-medium text-zinc-200 mb-2">{meetings[active].title}</p>
            <div className="flex items-center gap-4 text-[10px] text-zinc-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {meetings[active].duration}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {meetings[active].attendees} attendees
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-accent/10 border border-accent/20 p-3 mb-3">
            <p className="text-[10px] text-accent uppercase tracking-wider mb-2">Transcript Analysis</p>
            <div className="space-y-1.5">
              {['Key insight: Customer churn up 5%', 'Action: Discount strategy review', 'Decision: Weekly customer calls'].map(
                (item, i) => (
                  <p key={i} className="text-xs text-zinc-400 flex items-start gap-2">
                    <span className="text-accent">→</span>
                    {item}
                  </p>
                )
              )}
            </div>
          </div>

          <div className="rounded-lg bg-zinc-900/50 border border-white/[0.05] p-3">
            <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
              <span>AI processing</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
