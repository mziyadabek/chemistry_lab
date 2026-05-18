import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const step = target / (duration / 16)
        let current = 0
        const timer = setInterval(() => {
          current = Math.min(current + step, target)
          setCount(Math.floor(current))
          if (current >= target) clearInterval(timer)
        }, 16)
      }
    })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} className="text-4xl font-bold text-primary">
      {count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const { t } = useTranslation()

  const stats = [
    { target: 500, suffix: '+', label: t('home.statsStudents') },
    { target: 3, suffix: '', label: t('home.statsLabs') },
    { target: 100, suffix: '%', label: t('home.statsFree') },
  ]

  return (
    <section className="bg-primary-light py-16 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map(stat => (
          <div key={stat.label} className="flex flex-col items-center gap-2">
            <Counter target={stat.target} suffix={stat.suffix} />
            <span className="text-gray-600 font-medium">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
