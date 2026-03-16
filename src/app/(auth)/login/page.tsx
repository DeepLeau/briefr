'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    setLoading(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <span className="text-lg font-semibold text-zinc-100 tracking-tight">Briefr</span>
        </div>

        <div className="bg-[#111] border border-white/[0.07] rounded-xl p-6">
          <h1 className="text-xl font-semibold text-zinc-100 mb-2">Connexion</h1>
          <p className="text-sm text-zinc-500 mb-6">Connectez-vous pour accéder à votre dashboard</p>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  placeholder="vous@entreprise.com"
                  className="w-full h-10 pl-10 pr-3 rounded-md text-sm text-zinc-100 bg-[#1a1a1a] border border-white/[0.08] placeholder:text-zinc-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-400 mb-1.5 block">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-10 pl-10 pr-3 rounded-md text-sm text-zinc-100 bg-[#1a1a1a] border border-white/[0.08] placeholder:text-zinc-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full h-10 rounded-md bg-accent hover:bg-accent-hi text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-zinc-600 text-center mt-6">
            Demo — cliquez simplement sur &quot;Se connecter&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
