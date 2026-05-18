import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const SALTS = [
  { id: 'li', label: 'LiCl', metal: 'Lithium', ion: 'Li⁺', color: '#DC143C', colorName: 'Crimson Red' },
  { id: 'na', label: 'NaCl', metal: 'Sodium', ion: 'Na⁺', color: '#FFD700', colorName: 'Bright Yellow' },
  { id: 'k',  label: 'KCl',  metal: 'Potassium', ion: 'K⁺',  color: '#C8A2C8', colorName: 'Lilac / Purple' },
  { id: 'cu', label: 'CuCl₂', metal: 'Copper', ion: 'Cu²⁺', color: '#00C851', colorName: 'Blue-Green' },
  { id: 'ca', label: 'CaCl₂', metal: 'Calcium', ion: 'Ca²⁺', color: '#FF4500', colorName: 'Brick Red' },
]

export default function FlameTestSimulator() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(null)

  const flameColor = selected ? selected.color : '#FF8C00'
  const innerFlame = selected ? selected.color : '#FFD700'

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-6">
      <h3 className="text-lg font-semibold text-gray-800">Flame Test Simulator</h3>

      {/* Flame visualization */}
      <div className="flex flex-col items-center">
        <svg width="120" height="160" viewBox="0 0 120 160" className="overflow-visible">
          {/* Outer flame */}
          <ellipse
            cx="60" cy="80" rx="30" ry="50"
            fill={flameColor}
            opacity="0.85"
            style={{ transition: 'fill 0.6s ease', animation: 'flicker 0.15s ease-in-out infinite alternate' }}
          />
          {/* Inner flame */}
          <ellipse
            cx="60" cy="90" rx="16" ry="30"
            fill={innerFlame}
            opacity="0.9"
            style={{ transition: 'fill 0.6s ease' }}
          />
          {/* Burner */}
          <rect x="40" y="128" width="40" height="30" rx="4" fill="#6b7280" />
          <rect x="48" y="124" width="24" height="8" rx="2" fill="#4b5563" />
          {/* Base */}
          <rect x="30" y="155" width="60" height="8" rx="3" fill="#374151" />

          {/* Wire loop */}
          {selected && (
            <g style={{ animation: 'none' }}>
              <line x1="100" y1="80" x2="72" y2="92" stroke="#9ca3af" strokeWidth="2" />
              <circle cx="72" cy="92" r="6" fill="none" stroke="#9ca3af" strokeWidth="2" />
            </g>
          )}
        </svg>

        {selected && (
          <div className="mt-2 text-center bg-gray-50 rounded-xl px-6 py-3">
            <div className="text-sm text-gray-500">Metal: <strong>{selected.metal}</strong></div>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span
                className="inline-block w-4 h-4 rounded-full border"
                style={{ backgroundColor: selected.color }}
              />
              <span className="font-semibold text-gray-800">{selected.colorName}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Ion: {selected.ion}</div>
          </div>
        )}
      </div>

      {/* Salt buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        {SALTS.map(salt => (
          <button
            key={salt.id}
            onClick={() => setSelected(salt)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
              selected?.id === salt.id
                ? 'text-white scale-105'
                : 'bg-white text-gray-700 hover:scale-105'
            }`}
            style={
              selected?.id === salt.id
                ? { backgroundColor: salt.color, borderColor: salt.color }
                : { borderColor: salt.color, color: salt.color }
            }
          >
            {salt.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => setSelected(null)}
        className="btn-outline text-sm"
      >
        {t('lab.reset')}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Click a salt to see its characteristic flame colour.
      </p>

      <style>{`
        @keyframes flicker {
          0%   { transform: scaleY(1) scaleX(1); }
          100% { transform: scaleY(1.06) scaleX(0.97); }
        }
      `}</style>
    </div>
  )
}
