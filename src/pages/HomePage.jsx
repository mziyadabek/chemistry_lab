import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FlaskConical, BookOpen, PlayCircle, Shield, Clock, Star, Gift } from 'lucide-react'
import HeroSlider from '../components/ui/HeroSlider'
import StatsCounter from '../components/ui/StatsCounter'
import LabCard from '../components/ui/LabCard'
import { labs } from '../data/labs'

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } }

export default function HomePage() {
  const { t } = useTranslation()

  const steps = [
    { icon: <FlaskConical size={32} className="text-primary" />, title: t('home.step1'), desc: t('home.step1Desc') },
    { icon: <BookOpen size={32} className="text-secondary" />, title: t('home.step2'), desc: t('home.step2Desc') },
    { icon: <PlayCircle size={32} className="text-accent" />, title: t('home.step3'), desc: t('home.step3Desc') },
  ]

  const whyItems = [
    { icon: <Shield size={20} className="text-primary" />, text: t('home.why1') },
    { icon: <Clock size={20} className="text-secondary" />, text: t('home.why2') },
    { icon: <Star size={20} className="text-accent" />, text: t('home.why3') },
    { icon: <Gift size={20} className="text-green-500" />, text: t('home.why4') },
  ]

  return (
    <div>
      <HeroSlider />

      {/* What is a Virtual Lab */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div {...fadeUp}>
            <h2 className="section-title">{t('home.whatIsTitle')}</h2>
            <p className="text-gray-600 leading-relaxed">{t('home.whatIsText')}</p>
          </motion.div>
          <motion.div {...fadeUp} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Virtual Lab Introduction"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 {...fadeUp} className="section-title">{t('home.howItWorks')}</motion.h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-surface rounded-2xl p-6 flex flex-col items-center gap-4 text-center shadow-sm"
              >
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                  {step.icon}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400">0{i + 1}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Works Preview */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="section-title">{t('home.labsPreviewTitle')}</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {labs.map(lab => <LabCard key={lab.id} lab={lab} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* Why Virtual Labs */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeUp} className="section-title">{t('home.whyTitle')}</motion.h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-3 bg-surface rounded-xl p-4 text-left"
              >
                {item.icon}
                <span className="text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
