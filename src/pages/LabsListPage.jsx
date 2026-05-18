import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import LabCard from '../components/ui/LabCard'
import { labs } from '../data/labs'

export default function LabsListPage() {
  const { t } = useTranslation()

  return (
    <div className="py-16 px-4 bg-surface min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="section-title">{t('labs.pageTitle')}</h1>
          <p className="section-subtitle">{t('labs.pageSubtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <LabCard lab={lab} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
