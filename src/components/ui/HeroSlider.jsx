import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FlaskConical, Zap, Globe } from 'lucide-react'

const slides = [
  {
    bg: 'from-blue-600 to-cyan-500',
    icon: <FlaskConical size={64} className="text-white opacity-90" />,
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
    cta: true,
  },
  {
    bg: 'from-green-600 to-teal-500',
    icon: <Zap size={64} className="text-white opacity-90" />,
    title: 'Learn by Doing',
    subtitle: 'Interactive simulations bring chemistry to life.',
    cta: false,
  },
  {
    bg: 'from-purple-600 to-indigo-500',
    icon: <Globe size={64} className="text-white opacity-90" />,
    title: 'Safe, Free & Accessible',
    subtitle: 'No chemicals. No cost. No boundaries.',
    cta: false,
  },
]

export default function HeroSlider() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <section className={`relative bg-gradient-to-br ${slide.bg} transition-all duration-700 overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            {slide.icon}
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              {slide.titleKey ? t(slide.titleKey) : slide.title}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              {slide.subtitleKey ? t(slide.subtitleKey) : slide.subtitle}
            </p>
            {slide.cta && (
              <Link to="/labs" className="btn-primary bg-white !text-primary hover:bg-gray-100 mt-2">
                {t('hero.cta')}
              </Link>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? 'bg-white scale-125' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
