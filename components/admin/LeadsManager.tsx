'use client'

import { markLeadAsRead } from '@/lib/db'
import { Mail, MessageSquare } from 'lucide-react'
import type { Lead } from '@/lib/db'

interface LeadsManagerProps {
  leads: Lead[]
  onRefresh: () => Promise<void>
}

export default function LeadsManager({ leads, onRefresh }: LeadsManagerProps) {
  const handleMarkAsRead = async (id: number) => {
    await markLeadAsRead(id)
    await onRefresh()
  }

  const unreadCount = leads.filter(l => !l.is_read).length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div
          className="p-6 rounded-lg border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <p className="text-sm mb-2" style={{ color: 'var(--text-2)' }}>
            Total Leads
          </p>
          <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
            {leads.length}
          </p>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <p className="text-sm mb-2" style={{ color: 'var(--text-2)' }}>
            No leídos
          </p>
          <p className="text-3xl font-bold" style={{ color: '#ef4444' }}>
            {unreadCount}
          </p>
        </div>
        <div
          className="p-6 rounded-lg border"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <p className="text-sm mb-2" style={{ color: 'var(--text-2)' }}>
            Leídos
          </p>
          <p className="text-3xl font-bold" style={{ color: '#4ade80' }}>
            {leads.length - unreadCount}
          </p>
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Nombre
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Teléfono
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Vehículo de interés
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Mensaje
              </th>
              <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-2)' }}>
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr
                key={lead.id}
                style={{
                  borderBottom: '1px solid var(--border)',
                  background: !lead.is_read ? 'rgba(59,130,246,0.05)' : 'transparent',
                }}>
                <td className="px-4 py-3 font-semibold" style={{ color: 'var(--text)' }}>
                  {lead.name}
                </td>
                <td className="px-4 py-3">
                  <a href={`tel:${lead.phone}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    {lead.phone}
                  </a>
                </td>
                <td className="px-4 py-3">
                  {lead.email ? (
                    <a href={`mailto:${lead.email}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                      {lead.email}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-2)' }}>—</span>
                  )}
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text)' }}>
                  {lead.vehicle_interest || '—'}
                </td>
                <td className="px-4 py-3 max-w-xs truncate" style={{ color: 'var(--text)' }}>
                  {lead.message ? (
                    <span title={lead.message}>{lead.message}</span>
                  ) : (
                    <span style={{ color: 'var(--text-2)' }}>—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {lead.is_read ? (
                    <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: 'bold' }}>LEÍDO</span>
                  ) : (
                    <button
                      onClick={() => handleMarkAsRead(lead.id)}
                      className="px-3 py-1 rounded text-xs font-semibold transition-all"
                      style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                      Marcar como leído
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <div className="text-center py-12">
          <Mail size={48} style={{ color: 'var(--text-2)', margin: '0 auto', marginBottom: '16px', opacity: 0.5 }} />
          <p style={{ color: 'var(--text-2)' }}>No hay leads todavía</p>
        </div>
      )}
    </div>
  )
}
