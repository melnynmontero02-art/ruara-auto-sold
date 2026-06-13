import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''
  return createClient(supabaseUrl, supabaseServiceKey)
}

export type Database = {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: number
          created_at: string
          brand: string
          model: string
          year: number
          price: number
          initial: number
          fuel: string
          transmission: string
          mileage: string
          type: 'SUV' | 'Sedán' | 'Pickup' | 'Hatchback' | 'Van'
          image: string
          fallback: string | null
          tag: 'PREMIUM' | 'NUEVO' | 'DISPONIBLE' | 'OFERTA' | 'VENDIDO'
          color: string | null
          seats: string | null
          verified: boolean
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['vehicles']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['vehicles']['Insert']>
      }
      leads: {
        Row: {
          id: number
          created_at: string
          name: string
          phone: string
          email: string | null
          vehicle_interest: string | null
          message: string | null
          is_read: boolean
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'is_read'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      stats: {
        Row: {
          id: number
          key: string
          value: number
        }
        Insert: Omit<Database['public']['Tables']['stats']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['stats']['Insert']>
      }
    }
  }
}
