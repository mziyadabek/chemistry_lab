import { useTranslation } from 'react-i18next'

const langs = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'kz', label: 'KZ' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const change = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
  }

  return (
    <div className="flex gap-1">
      {langs.map(lang => (
        <button
          key={lang.code}
          onClick={() => change(lang.code)}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
            i18n.language === lang.code
              ? 'bg-primary text-white'
              : 'text-gray-500 hover:bg-primary-light hover:text-primary'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
