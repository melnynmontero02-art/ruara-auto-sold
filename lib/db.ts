import { supabase } from './supabase'
import type { Database } from './supabase'

export type Vehicle = Database['public']['Tables']['vehicles']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type Stat = Database['public']['Tables']['stats']['Row']
export type VehicleNew = Omit<Vehicle, 'id' | 'created_at'>
export type VehiclePatch = Partial<VehicleNew>
export type LeadNew = Omit<Lead, 'id' | 'created_at' | 'is_read'> & { is_read?: boolean }

/* ──── VEHICLES ──── */

export async function getVehicles(filters?: { tag?: string; type?: string; brand?: string }) {
  let query = supabase.from('vehicles').select('*').eq('is_active', true)

  if (filters?.tag) query = query.eq('tag', filters.tag)
  if (filters?.type) query = query.eq('type', filters.type)
  if (filters?.brand) query = query.eq('brand', filters.brand)

  const { data, error } = await query
  if (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }
  return data || []
}

export async function getVehicleById(id: number) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching vehicle:', error)
    return null
  }
  return data
}

export async function createVehicle(vehicle: VehicleNew) {
  const { data, error } = await supabase
    .from('vehicles')
    .insert([vehicle])
    .select()
    .single()

  if (error) {
    console.error('Error creating vehicle:', error)
    return null
  }
  return data
}

export async function updateVehicle(id: number, updates: VehiclePatch) {
  const { data, error } = await supabase
    .from('vehicles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating vehicle:', error)
    return null
  }
  return data
}

export async function deleteVehicle(id: number) {
  const { error } = await supabase.from('vehicles').update({ is_active: false }).eq('id', id)
  if (error) {
    console.error('Error deleting vehicle:', error)
    return false
  }
  return true
}

/* ──── LEADS ──── */

export async function getLeads(unreadOnly = false) {
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false })
  if (unreadOnly) query = query.eq('is_read', false)

  const { data, error } = await query
  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }
  return data || []
}

export async function createLead(lead: LeadNew) {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
    .single()

  if (error) {
    console.error('Error creating lead:', error)
    return null
  }
  return data
}

export async function markLeadAsRead(id: number) {
  const { error } = await supabase.from('leads').update({ is_read: true }).eq('id', id)
  if (error) {
    console.error('Error marking lead as read:', error)
    return false
  }
  return true
}

/* ──── STATS ──── */

export async function getStats() {
  const { data, error } = await supabase.from('stats').select('*')
  if (error) {
    console.error('Error fetching stats:', error)
    return {}
  }

  const stats: Record<string, number> = {}
  data?.forEach(stat => {
    stats[stat.key] = stat.value
  })
  return stats
}

export async function updateStat(key: string, value: number) {
  const { error } = await supabase
    .from('stats')
    .upsert({ key, value }, { onConflict: 'key' })

  if (error) {
    console.error('Error updating stat:', error)
    return false
  }
  return true
}
