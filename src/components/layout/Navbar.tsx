'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Changelog', href: '#changelog' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 h-14 flex items-center transition-all duration-200',
        scrolled
          ? 'border-b border-white/[0.07] bg-[#0a0a0a]/90 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-5xl mx-auto w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span className="text-sm font-semibold text-zinc-100 tracking-tight">Briefr</span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 h-8 flex items-center text-sm text-zinc-500 hover:text-zinc-200 rounded-md hover:bg-white/[0.04] transition-colors duration-150"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#"
            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors px-3 hidden sm:block"
          >
            Log in
          </a>
          <button className="h-8 px-4 rounded-md bg-accent hover:bg-accent-hi text-white text-sm font-medium transition-colors duration-150">
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
