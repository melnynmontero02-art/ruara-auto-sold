'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'

const ADMIN_CREDENTIALS = {
  email: 'admin@ruara.com',
  password: 'Ruara2024!Admin',
}

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('admin_session', JSON.stringify({ email, loggedIn: true, timestamp: Date.now() }))
      router.push('/admin/dashboard')
    } else {
      setError('Email o contraseña inválidos')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--background)' }}>
      <div
        className="w-full max-w-md rounded-2xl p-8 border"
        style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent)' }}>
            <LogIn size={24} style={{ color: '#fff' }} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-2" style={{ color: 'var(--text)' }}>
          Panel Admin RUARA
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: 'var(--text-2)' }}>
          Gestiona vehículos, leads y estadísticas
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@ruara.com"
              className="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold mb-2 uppercase" style={{ color: 'var(--text-2)' }}>
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border text-sm transition-colors"
                style={{
                  background: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5"
                style={{ color: 'var(--text-2)' }}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white transition-all mt-6 disabled:opacity-50"
            style={{ background: 'var(--accent)' }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-4 rounded-lg text-xs" style={{ background: 'var(--surface)', color: 'var(--text-2)' }}>
          <p className="font-semibold mb-1">Demo:</p>
          <p>Email: {ADMIN_CREDENTIALS.email}</p>
          <p>Contraseña: {ADMIN_CREDENTIALS.password}</p>
        </div>
      </div>
    </div>
  )
}
