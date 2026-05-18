import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export default function LabCard({ lab }) {
  const { t } = useTranslation()

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Color banner */}
      <div
        className="h-32 flex items-center justify-center text-5xl"
        style={{ backgroundColor: lab.bgLight }}
      >
        <span role="img" aria-label={lab.id}>{lab.emoji}</span>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-3">
        <h3 className="text-xl font-semibold text-gray-900">
          {t(`labs.${lab.id}.title`)}
        </h3>
        <p className="text-gray-500 text-sm flex-1">
          {t(`labs.${lab.id}.desc`)}
        </p>

        <Link
          to={lab.route}
          className="inline-flex items-center gap-2 text-sm font-semibold mt-2"
          style={{ color: lab.color }}
        >
          {t('labs.startLab')}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
