'use client'
import { AnimatedCanopy } from '@/components/ui/AnimatedCanopy'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "Briefr saved me 2 hours every day. I finally know what's happening without reading 500 Slack messages.",
    name: 'Sarah Chen',
    role: 'Product Manager at Stripe',
  },
  {
    quote: "Our team went from information overload to real focus. The 3-line briefs are genius.",
    name: 'Mike Rodriguez',
    role: 'Engineering Lead at Notion',
  },
  {
    quote: "The meeting recaps are incredible. I don't need to take notes anymore.",
    name: 'Jessica Wu',
    role: 'CEO at Figma',
  },
  {
    quote: "Briefr pays for itself in the first week. Pure productivity multiplier.",
    name: 'Alex K.',
    role: 'Founder at Linear',
  },
  {
    quote: "Finally, an AI tool that actually delivers. No hype, just results.",
    name: 'David Park',
    role: 'CTO at Vercel',
  },
  {
    quote: "My team loves it. We reduced meeting time by 40% in one month.",
    name: 'Emily Zhang',
    role: 'Head of Operations at Raycast',
  },
]

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string
  name: string
  role: string
}) {
  return (
    <div className="flex-shrink-0 w-80 p-5 rounded-xl border border-white/[0.07] bg-[#111] flex flex-col gap-3">
      <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">"{quote}"</p>
      <div className="mt-auto">
        <p className="text-xs font-medium text-zinc-200">{name}</p>
        <p className="text-[11px] text-zinc-500">{role}</p>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 px-6"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-100 tracking-tight">
          Loved by remote teams
        </h2>
      </motion.div>

      <div className="relative flex flex-col gap-4 marquee-root">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        <AnimatedCanopy reverse={false}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={`t1-${i}`} {...t} />
          ))}
        </AnimatedCanopy>

        <AnimatedCanopy reverse={true}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={`t2-${i}`} {...t} />
          ))}
        </AnimatedCanopy>

        <AnimatedCanopy reverse={false}>
          {testimonials.map((t, i) => (
            <TestimonialCard key={`t3-${i}`} {...t} />
          ))}
        </AnimatedCanopy>
      </div>
    </section>
  )
}
