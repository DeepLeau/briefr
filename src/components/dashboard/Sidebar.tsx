'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  FileText, 
  Puzzle, 
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react'

const navItems = [
  { label: 'Vue d\'ensemble', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Mes Briefs', href: '/dashboard/briefs', icon: FileText },
  { label: 'Intégrations', href: '/dashboard/integrations', icon: Puzzle },
  { label: 'Paramètres', href: '/dashboard/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-[240px] h-screen flex flex-col bg-[#0a0a0a] border-r border-white/[0.06] px-3 py-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 mb-6">
        <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
          <span className="text-white text-xs font-bold">B</span>
        </div>
        <span className="text-sm font-semibold text-zinc-100 tracking-tight">Briefr</span>
      </div>

      {/* Workspace switcher */}
      <button className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-white/[0.04] transition-colors mb-4 w-full text-left border border-white/[0.06]">
        <div className="w-6 h-6 rounded bg-gradient-to-br from-accent to-orange-600 shrink-0" />
        <span className="text-xs text-zinc-300 truncate flex-1">Équipe Demo</span>
        <ChevronRight size={12} className="text-zinc-600 rotate-90" />
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2.5 px-2.5 h-9 rounded-md text-sm transition-colors duration-150',
                active 
                  ? 'bg-white/[0.06] text-zinc-100' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]'
              )}
            >
              <item.icon size={16} strokeWidth={1.5} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-white/[0.04] cursor-pointer transition-colors border-t border-white/[0.05] pt-3">
        <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] text-zinc-300 font-medium">
          JD
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-xs font-medium text-zinc-200 truncate">Jean Dupont</span>
          <span className="text-[11px] text-zinc-500 truncate">jean@demo.fr</span>
        </div>
        <LogOut size={14} className="text-zinc-600 hover:text-zinc-400 transition-colors" />
      </div>
    </aside>
  )
}
