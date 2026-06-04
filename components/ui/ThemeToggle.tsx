'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDay, setIsDay] = useState(false)

  // Persist theme across page loads
  useEffect(() => {
    const saved = localStorage.getItem('ruara-theme')
    if (saved === 'light') {
      setIsDay(true)
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }, [])

  const toggle = (checked: boolean) => {
    setIsDay(checked)
    if (checked) {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('ruara-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('ruara-theme', 'dark')
    }
  }

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Moon icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke={isDay ? 'rgba(255,255,255,0.3)' : '#C9A352'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: 'stroke 0.3s', flexShrink: 0 }}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>

      {/* Toggle */}
      <div className="toggle-container" style={{ fontSize: '11px' }}>
        <input
          type="checkbox"
          className="toggle-input"
          checked={isDay}
          onChange={e => toggle(e.target.checked)}
          aria-label="Cambiar modo día/noche"
        />
        <div className="toggle-handle-wrapper">
          <div className="toggle-handle">
            <div className="toggle-handle-knob" />
            <div className="toggle-handle-bar-wrapper">
              <div className="toggle-handle-bar" />
            </div>
          </div>
        </div>
        <div className="toggle-base">
          <div className="toggle-base-inside" />
        </div>
      </div>

      {/* Sun icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke={isDay ? '#C9A352' : 'rgba(255,255,255,0.3)'}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ transition: 'stroke 0.3s', flexShrink: 0 }}>
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1"  x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1"  y1="12" x2="3"  y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
        <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
      </svg>
    </div>
  )
}
