import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function ElectrolysisSimulator() {
  const { t } = useTranslation()
  const [running, setRunning] = useState(false)
  const [h2Level, setH2Level] = useState(0)
  const [o2Level, setO2Level] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setH2Level(v => Math.min(v + 2, 100))
        setO2Level(v => Math.min(v + 1, 50))
      }, 300)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const reset = () => {
    setRunning(false)
    setH2Level(0)
    setO2Level(0)
  }

  const bubbles = running
    ? Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: i % 2 === 0 ? 30 + (i % 4) * 5 : 80 + (i % 4) * 5,
        delay: i * 0.25,
      }))
    : []

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center gap-6">
      <h3 className="text-lg font-semibold text-gray-800">Electrolysis of Water Simulator</h3>

      <div className="flex items-start gap-8">
        {/* Main cell */}
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {/* Container */}
            <rect x="10" y="40" width="180" height="150" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />

            {/* Water label */}
            <text x="100" y="130" textAnchor="middle" fill="#0284c7" fontSize="12" fontStyle="italic">Na₂SO₄ solution</text>

            {/* Cathode (left, −) */}
            <rect x="40" y="50" width="12" height="100" rx="3" fill="#374151" />
            <text x="46" y="45" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="bold">−</text>
            <text x="46" y="165" textAnchor="middle" fill="#374151" fontSize="9">Cathode</text>

            {/* Anode (right, +) */}
            <rect x="148" y="50" width="12" height="100" rx="3" fill="#374151" />
            <text x="154" y="45" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="bold">+</text>
            <text x="154" y="165" textAnchor="middle" fill="#374151" fontSize="9">Anode</text>

            {/* Bubbles */}
            {running && (
              <>
                {[0, 1, 2, 3].map(i => (
                  <circle
                    key={`h${i}`}
                    cx={35 + i * 4}
                    cy={50}
                    r="4"
                    fill="white"
                    opacity="0.8"
                    style={{
                      animation: `rise ${1 + i * 0.3}s ease-in ${i * 0.4}s infinite`,
                    }}
                  />
                ))}
                {[0, 1].map(i => (
                  <circle
                    key={`o${i}`}
                    cx={148 + i * 6}
                    cy={50}
                    r="4"
                    fill="white"
                    opacity="0.8"
                    style={{
                      animation: `rise ${1.2 + i * 0.4}s ease-in ${i * 0.6}s infinite`,
                    }}
                  />
                ))}
              </>
            )}

            {/* Wire connections */}
            <line x1="46" y1="40" x2="46" y2="20" stroke="#ef4444" strokeWidth="2" />
            <line x1="154" y1="40" x2="154" y2="20" stroke="#3b82f6" strokeWidth="2" />
            <line x1="46" y1="20" x2="100" y2="20" stroke="#ef4444" strokeWidth="2" />
            <line x1="154" y1="20" x2="100" y2="20" stroke="#3b82f6" strokeWidth="2" />
            {/* Battery */}
            <rect x="85" y="10" width="30" height="14" rx="3" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
            <text x="100" y="21" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">9V</text>
          </svg>
        </div>

        {/* Test tubes */}
        <div className="flex gap-6 items-end">
          {/* H2 tube */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-blue-700">H₂</span>
            <div className="relative w-10 h-32 border-2 border-gray-400 rounded-b-full bg-blue-50 overflow-hidden flex items-end">
              <div
                className="w-full bg-blue-200 transition-all duration-300"
                style={{ height: `${h2Level}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">Hydrogen</span>
            <span className="text-xs text-blue-600 font-semibold">{h2Level}%</span>
          </div>

          {/* O2 tube */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold text-red-700">O₂</span>
            <div className="relative w-10 h-32 border-2 border-gray-400 rounded-b-full bg-red-50 overflow-hidden flex items-end">
              <div
                className="w-full bg-red-200 transition-all duration-300"
                style={{ height: `${o2Level}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">Oxygen</span>
            <span className="text-xs text-red-600 font-semibold">{o2Level}%</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center">
        H₂ : O₂ volume ratio = <strong>2 : 1</strong> (confirming 2H₂O → 2H₂ + O₂)
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => setRunning(r => !r)}
          className={running ? 'btn-outline' : 'btn-primary'}
        >
          {running ? t('lab.stopSimulation') : t('lab.startSimulation')}
        </button>
        <button onClick={reset} className="btn-outline">
          {t('lab.reset')}
        </button>
      </div>
    </div>
  )
}
