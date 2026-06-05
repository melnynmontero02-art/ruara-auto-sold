'use client'

import { Car, Mail, BarChart3 } from 'lucide-react'

type Tab = 'vehicles' | 'leads' | 'stats'

interface AdminSidebarProps {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}

const tabs = [
  { id: 'vehicles', label: 'Vehículos', icon: Car },
  { id: 'leads', label: 'Leads', icon: Mail },
  { id: 'stats', label: 'Estadísticas', icon: BarChart3 },
] as const

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  return (
    <div
      className="w-64 border-r p-6 flex flex-col"
      style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
      {/* Logo */}
      <div className="mb-8">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
          style={{ background: 'var(--accent)' }}>
          <span style={{ color: '#fff', fontSize: '20px' }}>🚗</span>
        </div>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
          RUARA
        </h2>
        <p className="text-xs mt-1" style={{ color: 'var(--text-2)' }}>
          Admin Panel
        </p>
      </div>

      {/* Tabs */}
      <nav className="space-y-2 flex-1">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left"
              style={{
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-2)',
              }}>
              <Icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}>
        <p className="text-xs">
          <strong>Panel Admin</strong>
        </p>
        <p className="text-xs mt-2">Gestiona todo desde aquí: vehículos, leads y estadísticas.</p>
      </div>
    </div>
  )
}
