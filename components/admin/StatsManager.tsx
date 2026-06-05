'use client'

import { useState } from 'react'
import { updateStat } from '@/lib/db'
import { TrendingUp } from 'lucide-react'

interface StatsManagerProps {
  stats: Record<string, number>
  onRefresh: () => Promise<void>
}

const STAT_LABELS: Record<string, { label: string; description: string }> = {
  total_sold: { label: 'Total Vendidos', description: 'Número total de vehículos vendidos' },
  partner_banks: { label: 'Bancos Aliados', description: 'Cantidad de bancos asociados' },
  approval_rate: { label: 'Tasa de Aprobación (%)', description: 'Porcentaje de aprobaciones' },
  years_experience: { label: 'Años de Experiencia', description: 'Años en el negocio' },
}

export default function StatsManager({ stats, onRefresh }: StatsManagerProps) {
  const [values, setValues] = useState<Record<string, number>>(stats)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleUpdate = (key: string, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      for (const [key, value] of Object.entries(values)) {
        await updateStat(key, value)
      }
      await onRefresh()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error saving stats:', error)
      alert('Error al guardar')
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(STAT_LABELS).map(([key, { label, description }]) => (
          <div
            key={key}
            className="p-6 rounded-2xl border"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
                  {label}
                </label>
                <p className="text-xs" style={{ color: 'var(--text-2)' }}>
                  {description}
                </p>
              </div>
              <div
                className="p-2 rounded-lg"
                style={{ background: 'var(--accent)', color: '#fff' }}>
                <TrendingUp size={20} />
              </div>
            </div>

            <input
              type="number"
              value={values[key] || 0}
              onChange={e => handleUpdate(key, parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-lg border text-lg font-bold"
              style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--accent)' }}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between">
        <p style={{ color: 'var(--text-2)' }}>
          {saved ? '✅ Cambios guardados' : ''}
        </p>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
          style={{ background: 'var(--accent)' }}>
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      {/* Info */}
      <div
        className="p-4 rounded-lg border"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text-2)' }}>
        <p className="text-sm">
          <strong>📌 Nota:</strong> Estos valores se muestran en la página principal del sitio. Actualiza cuando sea necesario.
        </p>
      </div>
    </div>
  )
}
