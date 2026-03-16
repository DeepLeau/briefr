'use client'
import { useState } from 'react'
import { PageHeader } from '@/components/dashboard/PageHeader'
import { SettingsForm } from '@/components/dashboard/SettingsForm'

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto">
        <PageHeader title="Paramètres" />

        <SettingsForm saving={saving} onSave={handleSave} />
      </div>
    </div>
  )
}
