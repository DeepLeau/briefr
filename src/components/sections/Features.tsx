'use client'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Video, Zap, Shield, Brain } from 'lucide-react'
import { EmailWidget } from '@/components/widgets/EmailWidget'
import { SlackWidget } from '@/components/widgets/SlackWidget'
import { MeetingWidget } from '@/components/widgets/MeetingWidget'

const features = [
  {
    icon: Mail,
    title: 'Summarize Long Emails',
    description:
      'Paste any email thread and get a 3-line brief with key decisions, action items, and deadlines. No more scrolling through 50+ replies.',
    widget: EmailWidget,
  },
  {
    icon: MessageSquare,
    title: 'Digest Slack Channels',
    description:
      'Turn chaotic channel discussions into clear summaries. Briefr identifies decisions, action items, and key stakeholders automatically.',
    widget: SlackWidget,
  },
  {
    icon: Video,
    title: 'Recap Meetings Instantly',
    description:
      'Upload meeting recordings or paste transcripts. Get instant summaries with key insights, decisions, and follow-up tasks.',
    widget: MeetingWidget,
  },
]

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-24"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium uppercase tracking-widest mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-50 mb-4">
            Everything you need to stay focused
          </h2>
          <p className="text-base text-zinc-500 leading-relaxed">
            Briefr connects with your existing tools to automatically distill
            information into what actually matters.
          </p>
        </motion.div>

        <div className="space-y-24 sm:space-y-32">
          {features.map((feature, idx) => {
            const Widget = feature.widget
            const isReversed = idx % 2 === 1

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-24 ${
                  isReversed ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-6">
                  <div className="w-12 h-12 rounded-xl border border-accent/20 bg-accent/[0.06] flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-base text-zinc-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {[
                      'AI-powered extraction',
                      'Actionable insights',
                      'Export to your tools',
                    ].map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-zinc-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 w-full">
                  <Widget />
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'Summaries in under 1 second' },
            { icon: Shield, title: 'Enterprise Secure', desc: 'SOC 2 compliant, encrypted' },
            { icon: Brain, title: 'Context Aware', desc: 'Understands your team&apos;s jargon' },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-xl border border-white/[0.07] bg-[#111] text-center"
            >
              <item.icon className="w-5 h-5 text-accent mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-sm font-medium text-zinc-200">{item.title}</p>
              <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
