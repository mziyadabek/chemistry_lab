import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function LabPageTemplate({ labId, color, bgLight, emoji, simulator, youtubeId, nextRoute }) {
  const { t } = useTranslation()
  const [tab, setTab] = useState('theory')

  const tabs = [
    { id: 'theory', label: t('lab.tabs.theory') },
    { id: 'simulator', label: t('lab.tabs.simulator') },
    { id: 'video', label: t('lab.tabs.video') },
  ]

  const objective = t(`labs.${labId}.objective`)
  const materials = t(`labs.${labId}.materials`, { returnObjects: true })
  const methodology = t(`labs.${labId}.methodology`, { returnObjects: true })
  const safety = t(`labs.${labId}.safety`)
  const results = t(`labs.${labId}.results`)
  const conclusion = t(`labs.${labId}.conclusion`)
  const takeaways = t(`labs.${labId}.takeaways`, { returnObjects: true })
  const title = t(`labs.${labId}.title`)

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumb + header */}
      <div className="px-4 py-6 border-b bg-white">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-400 flex items-center gap-1 mb-3">
            <Link to="/" className="hover:text-primary">{t('lab.breadcrumbHome')}</Link>
            <ChevronRight size={14} />
            <Link to="/labs" className="hover:text-primary">{t('lab.breadcrumbLabs')}</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium">{title}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{emoji}</span>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-[57px] z-10 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex">
          {tabs.map(t2 => (
            <button
              key={t2.id}
              onClick={() => setTab(t2.id)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t2.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {t2.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            {tab === 'theory' && (
              <div className="space-y-8">
                <Section title={t('lab.objective')}>
                  <p className="text-gray-700 leading-relaxed">{objective}</p>
                </Section>

                <Section title={t('lab.materials')}>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {Array.isArray(materials) && materials.map((m, i) => <li key={i}>{m}</li>)}
                  </ul>
                </Section>

                <Section title={t('lab.methodology')}>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    {Array.isArray(methodology) && methodology.map((s, i) => <li key={i} className="leading-relaxed">{s}</li>)}
                  </ol>
                </Section>

                <Section title={t('lab.safety')}>
                  <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-4 leading-relaxed">{safety}</p>
                </Section>

                <Section title={t('lab.results')}>
                  <p className="text-gray-700 leading-relaxed">{results}</p>
                </Section>

                <Section title={t('lab.conclusions')}>
                  <p className="text-gray-700 leading-relaxed">{conclusion}</p>
                </Section>

                <Section title={t('lab.keyTakeaways')}>
                  <ul className="space-y-2">
                    {Array.isArray(takeaways) && takeaways.map((tk, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="mt-1 text-secondary font-bold">✓</span>
                        {tk}
                      </li>
                    ))}
                  </ul>
                </Section>
              </div>
            )}

            {tab === 'simulator' && (
              <div>
                <p className="text-gray-500 text-sm mb-6">{t('lab.startSimulation')}</p>
                {simulator}
              </div>
            )}

            {tab === 'video' && (
              <div className="space-y-6">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="text-gray-500 text-sm">
                  Watch the demonstration video above to see how this experiment is performed in a real laboratory setting.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {nextRoute && (
          <div className="mt-12 flex justify-end">
            <Link to={nextRoute} className="btn-primary">
              {t('lab.nextLab')} →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-3 border-l-4 border-primary pl-3">{title}</h2>
      {children}
    </div>
  )
}
