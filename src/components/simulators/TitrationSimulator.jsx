import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function TitrationSimulator() {
  const { t } = useTranslation()
  const [volume, setVolume] = useState(0)
  const [dripping, setDripping] = useState(false)

  const addDrop = () => {
    setVolume(v => parseFloat((v + 0.5).toFixed(1)))
    setDripping(true)
    setTimeout(() => setDripping(false), 600)
  }

  const reset = () => setVolume(0)

  const getFlaskColor = () => {
    if (volume < 24) return 'transparent'
    if (volume < 25) return 'rgba(255, 182, 193, 0.4)'
    if (volume <= 27) return 'rgba(255, 105, 180, 0.6)'
    return 'rgba(199, 21, 133, 0.8)'
  }

  const getStatus = () => {
    if (volume >= 27) return { msg: 'Past endpoint — overshot!', color: 'text-red-600' }
    if (volume >= 25) return { msg: 'Endpoint Reached! ✓', color: 'text-green-600' }
    if (volume >= 24.5) return { msg: 'Near endpoint...', color: 'text-yellow-600' }
    return null
  }

  const pH = Math.max(2, Math.round(12 - (volume / 25) * 10))
  const status = getStatus()
  const liquidHeight = Math.max(10, 160 - (volume / 50) * 140)

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-6">
      <h3 className="text-lg font-semibold text-gray-800">Acid-Base Titration Simulator</h3>

      <div className="flex items-end gap-12">
        {/* Burette */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-500 font-medium">NaOH (0.1 M)</span>
          <svg width="60" height="200" viewBox="0 0 60 200">
            {/* Burette body */}
            <rect x="20" y="0" width="20" height="160" rx="3" fill="#e8f0fe" stroke="#1a73e8" strokeWidth="2" />
            {/* NaOH liquid */}
            <rect x="22" y={160 - liquidHeight} width="16" height={liquidHeight} rx="1" fill="#1a73e8" opacity="0.6" />
            {/* Tip */}
            <rect x="28" y="160" width="4" height="30" fill="#666" />
            {/* Drip */}
            {dripping && (
              <circle cx="30" cy="196" r="3" fill="#1a73e8" opacity="0.8" className="animate-drip" />
            )}
            {/* Scale marks */}
            {[0, 25, 50, 75, 100].map(p => (
              <line key={p} x1="18" y1={p * 1.6} x2="22" y2={p * 1.6} stroke="#1a73e8" strokeWidth="1" />
            ))}
          </svg>
          <span className="text-xs text-gray-500">{volume.toFixed(1)} mL added</span>
        </div>

        {/* Flask */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs text-gray-500 font-medium">HCl + Phenolphthalein</span>
          <svg width="120" height="140" viewBox="0 0 120 140">
            {/* Flask shape */}
            <path
              d="M40 10 L40 60 L5 130 Q5 138 15 138 L105 138 Q115 138 115 130 L80 60 L80 10 Z"
              fill="white"
              stroke="#666"
              strokeWidth="2"
            />
            {/* Solution color */}
            <clipPath id="flask-clip">
              <path d="M40 10 L40 60 L5 130 Q5 138 15 138 L105 138 Q115 138 115 130 L80 60 L80 10 Z" />
            </clipPath>
            <rect
              x="0" y="70" width="120" height="80"
              clipPath="url(#flask-clip)"
              fill={getFlaskColor()}
              style={{ transition: 'fill 1s ease' }}
            />
            {/* Neck */}
            <rect x="39" y="4" width="42" height="10" fill="white" stroke="#666" strokeWidth="2" />
          </svg>

          {/* pH display */}
          <div className="bg-gray-100 rounded-lg px-4 py-2 text-center">
            <div className="text-xs text-gray-500">pH</div>
            <div className="text-2xl font-bold text-primary" style={{ transition: 'all 0.5s' }}>{pH}</div>
          </div>
        </div>
      </div>

      {status && (
        <div className={`text-base font-semibold ${status.color} bg-gray-50 rounded-xl px-6 py-3`}>
          {status.msg}
        </div>
      )}

      <div className="flex gap-3 mt-2">
        <button onClick={addDrop} disabled={volume >= 30} className="btn-primary disabled:opacity-40">
          Add NaOH (drop)
        </button>
        <button onClick={reset} className="btn-outline">
          {t('lab.reset')}
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Each click adds 0.5 mL. Endpoint at 25.0 mL. Pink = equivalence point.
      </p>
    </div>
  )
}
