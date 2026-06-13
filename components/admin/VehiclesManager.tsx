'use client'

import { useState } from 'react'
import { createVehicle, updateVehicle, deleteVehicle } from '@/lib/db'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import type { Vehicle, VehicleNew, VehiclePatch } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'

interface VehiclesManagerProps {
  vehicles: Vehicle[]
  onRefresh: () => Promise<void>
}

const VEHICLE_TYPES = ['SUV', 'Sedán', 'Pickup', 'Hatchback', 'Van']
const TAGS = ['DISPONIBLE', 'NUEVO', 'PREMIUM', 'OFERTA', 'VENDIDO']
const BRANDS = ['Toyota', 'Honda', 'Nissan', 'Hyundai', 'Ford', 'Mazda', 'Chevrolet', 'Kia', 'BMW', 'Mercedes', 'Otro']

interface FormData {
  brand: string
  model: string
  year: number
  price: number
  initial: number
  fuel: string
  transmission: string
  mileage: string
  type: string
  image: string
  fallback: string
  tag: string
  color: string
  seats: string
  verified: boolean
}

const emptyForm: FormData = {
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  initial: 0,
  fuel: 'Gasolina',
  transmission: 'Automático',
  mileage: '',
  type: 'SUV',
  image: '',
  fallback: '',
  tag: 'DISPONIBLE',
  color: '',
  seats: '',
  verified: true,
}

export default function VehiclesManager({ vehicles, onRefresh }: VehiclesManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [loading, setLoading] = useState(false)

  const handleOpenForm = (vehicle?: Vehicle) => {
    if (vehicle) {
      setFormData(vehicle as FormData)
      setEditingId(vehicle.id)
    } else {
      setFormData(emptyForm)
      setEditingId(null)
    }
    setShowForm(true)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      if (editingId) {
        await updateVehicle(editingId, formData as VehiclePatch)
      } else {
        await createVehicle(formData as VehicleNew)
      }
      await onRefresh()
      setShowForm(false)
      setFormData(emptyForm)
      setEditingId(null)
    } catch (error) {
      console.error('Error saving vehicle:', error)
      alert('Error al guardar')
    }
    setLoading(false)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este vehículo?')) return
    setLoading(true)
    try {
      await deleteVehicle(id)
      await onRefresh()
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      alert('Error al eliminar')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <button
        onClick={() => handleOpenForm()}
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all"
        style={{ background: 'var(--accent)' }}>
        <Plus size={18} />
        Agregar vehículo
      </button>

      {/* Vehicles Table */}
      <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'var(--border)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Vehículo
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Tipo
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Precio
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Inicial
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--text-2)' }}>
                Tag
              </th>
              <th className="px-4 py-3 text-center font-semibold" style={{ color: 'var(--text-2)' }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold" style={{ color: 'var(--text)' }}>
                      {vehicle.brand} {vehicle.model}
                    </p>
                    <p style={{ color: 'var(--text-2)', fontSize: '12px' }}>{vehicle.year}</p>
                  </div>
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text)' }}>
                  {vehicle.type}
                </td>
                <td className="px-4 py-3 font-semibold" style={{ color: 'var(--accent)' }}>
                  {formatCurrency(vehicle.price)}
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--text)' }}>
                  {formatCurrency(vehicle.initial)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-1 rounded text-xs font-semibold"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
                    {vehicle.tag}
                  </span>
                </td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleOpenForm(vehicle)}
                    className="p-2 rounded hover:opacity-70 transition"
                    style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="p-2 rounded hover:opacity-70 transition"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(6,7,10,0.85)' }}
          onClick={() => setShowForm(false)}>
          <div
            className="w-full max-w-2xl rounded-2xl p-8 border max-h-[90vh] overflow-y-auto"
            style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {editingId ? 'Editar vehículo' : 'Nuevo vehículo'}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={24} style={{ color: 'var(--text-2)' }} />
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Brand */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  Marca
                </label>
                <select
                  value={formData.brand}
                  onChange={e => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                  <option value="">Selecciona marca</option>
                  {BRANDS.map(brand => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  Modelo
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={e => setFormData({ ...formData, model: e.target.value })}
                  placeholder="CR-V EXL"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  Año
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={e => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  placeholder="2024"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  Tipo
                </label>
                <select
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                  {VEHICLE_TYPES.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  Precio (RD$)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })}
                  placeholder="1500000"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
              </div>

              {/* Initial */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  Inicial (RD$)
                </label>
                <input
                  type="number"
                  value={formData.initial}
                  onChange={e => setFormData({ ...formData, initial: parseInt(e.target.value) })}
                  placeholder="300000"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  Kilometraje
                </label>
                <input
                  type="text"
                  value={formData.mileage}
                  onChange={e => setFormData({ ...formData, mileage: e.target.value })}
                  placeholder="45,000 km"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
              </div>

              {/* Tag */}
              <div>
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  Tag
                </label>
                <select
                  value={formData.tag}
                  onChange={e => setFormData({ ...formData, tag: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}>
                  {TAGS.map(tag => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div className="col-span-2">
                <label className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
                  URL Imagen
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/cars/car-01.jpg"
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={loading || !formData.brand || !formData.model}
              className="w-full py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50"
              style={{ background: 'var(--accent)' }}>
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
