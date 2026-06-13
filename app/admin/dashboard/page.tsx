'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getVehicles, getLeads, getStats, type Vehicle, type Lead } from '@/lib/db'
import AdminSidebar from '@/components/admin/AdminSidebar'
import VehiclesManager from '@/components/admin/VehiclesManager'
import LeadsManager from '@/components/admin/LeadsManager'
import StatsManager from '@/components/admin/StatsManager'
import { LogOut } from 'lucide-react'

type Tab = 'vehicles' | 'leads' | 'stats'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('vehicles')
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem('admin_session')
    if (!session) {
      router.push('/admin')
      return
    }
    setIsAuthenticated(true)
    loadData()
  }, [router])

  const loadData = async () => {
    setLoading(true)
    const [vehiclesData, leadsData, statsData] = await Promise.all([getVehicles(), getLeads(), getStats()])
    setVehicles(vehiclesData)
    setLeads(leadsData)
    setStats(statsData)
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/admin')
  }

  if (!isAuthenticated) return null

  return (
    <div className="flex h-screen" style={{ background: 'var(--background)' }}>
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="border-b p-6 flex justify-between items-center"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {activeTab === 'vehicles' && '🚗 Vehículos'}
              {activeTab === 'leads' && '📧 Leads'}
              {activeTab === 'stats' && '📊 Estadísticas'}
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-2)' }}>
              {activeTab === 'vehicles' && `${vehicles.length} vehículos activos`}
              {activeTab === 'leads' && `${leads.length} consultas`}
              {activeTab === 'stats' && 'Gestiona las estadísticas del sitio'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
            <LogOut size={18} />
            Salir
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-current border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p style={{ color: 'var(--text-2)' }}>Cargando...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'vehicles' && <VehiclesManager vehicles={vehicles} onRefresh={loadData} />}
              {activeTab === 'leads' && <LeadsManager leads={leads} onRefresh={loadData} />}
              {activeTab === 'stats' && <StatsManager stats={stats} onRefresh={loadData} />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
