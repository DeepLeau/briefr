'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function CTABanner() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(249,115,22,0.12),transparent)]" />
          <h2 className="relative text-4xl font-semibold text-zinc-50 tracking-[-0.025em]">
            Start focusing today
          </h2>
        </div>

        <p className="text-zinc-400 text-base max-w-md">
          Join 2,400+ teams. Free plan available. No credit card required.
        </p>

        <button className="h-10 px-6 rounded-md bg-accent hover:bg-accent-hi text-white text-sm font-medium transition-colors shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center gap-2">
          Get started for free
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </section>
  )
}
