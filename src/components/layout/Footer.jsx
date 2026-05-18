import { useTranslation } from 'react-i18next'
import { FlaskConical } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <FlaskConical size={22} />
          <span>ChemLab Virtual</span>
        </div>
        <p className="text-sm text-center">{t('footer.description')}</p>
        <p className="text-xs">© {new Date().getFullYear()} {t('footer.rights')}</p>
      </div>
    </footer>
  )
}
