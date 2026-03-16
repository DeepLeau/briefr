'use client'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Save, Loader2, Bell, BellOff, Check } from 'lucide-react'

interface SettingsFormProps {
  saving: boolean
  onSave: () => void
}

export function SettingsForm({ saving, onSave }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    name: 'Jean Dupont',
    email: 'jean@demo.fr',
    language: 'fr',
    notifications: true,
    briefLength: '3lines',
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Profile section */}
      <div>
        <h2 className="text-sm font-medium text-zinc-200 mb-4">Profil</h2>
        <div className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div>
              <p className="text-sm font-medium text-zinc-200">Nom</p>
              <p className="text-xs text-zinc-500">Votre nom affiché dans l&apos;application</p>
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="h-9 px-3 rounded-md text-sm text-zinc-100 bg-[#1a1a1a] border border-white/[0.08] focus:outline-none focus:border-accent/50 w-48 text-right"
            />
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-zinc-200">Email</p>
              <p className="text-xs text-zinc-500">Votre adresse email</p>
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="h-9 px-3 rounded-md text-sm text-zinc-100 bg-[#1a1a1a] border border-white/[0.08] focus:outline-none focus:border-accent/50 w-48 text-right"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div>
        <h2 className="text-sm font-medium text-zinc-200 mb-4">Préférences</h2>
        <div className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div>
              <p className="text-sm font-medium text-zinc-200">Langue</p>
              <p className="text-xs text-zinc-500">Langue de l&apos;interface</p>
            </div>
            <select
              value={formData.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="h-9 px-3 rounded-md text-sm text-zinc-100 bg-[#1a1a1a] border border-white/[0.08] focus:outline-none focus:border-accent/50 appearance-none pr-8 cursor-pointer"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-sm font-medium text-zinc-200">Longueur des briefs</p>
              <p className="text-xs text-zinc-500">Nombre de lignes par défaut</p>
            </div>
            <select
              value={formData.briefLength}
              onChange={(e) => handleChange('briefLength', e.target.value)}
              className="h-9 px-3 rounded-md text-sm text-zinc-100 bg-[#1a1a1a] border border-white/[0.08] focus:outline-none focus:border-accent/50 appearance-none pr-8 cursor-pointer"
            >
              <option value="3lines">3 lignes</option>
              <option value="5lines">5 lignes</option>
              <option value="paragraph">Paragraphe</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-sm font-medium text-zinc-200 mb-4">Notifications</h2>
        <div className="bg-[#111] border border-white/[0.07] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              {formData.notifications ? (
                <Bell size={18} className="text-accent" />
              ) : (
                <BellOff size={18} className="text-zinc-500" />
              )}
              <div>
                <p className="text-sm font-medium text-zinc-200">Notifications email</p>
                <p className="text-xs text-zinc-500">Recevoir un email quand un nouveau brief est prêt</p>
              </div>
            </div>
            <button
              onClick={() => handleChange('notifications', !formData.notifications)}
              className={cn(
                'relative w-11 h-6 rounded-full transition-colors duration-200',
                formData.notifications ? 'bg-accent' : 'bg-zinc-700'
              )}
            >
              <div className={cn(
                'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
                formData.notifications ? 'translate-x-5' : 'translate-x-0.5'
              )} />
            </button>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={saving}
          className="h-10 px-6 rounded-md bg-accent hover:bg-accent-hi text-white text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save size={14} />
              Enregistrer
            </>
          )}
        </button>
      </div>
    </div>
  )
}
