
import { useState } from 'react'

function usePreferences() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nova-theme') || 'dark')
  const [language, setLanguage] = useState(() => localStorage.getItem('nova-language') || 'en')

  const isDark = theme === 'dark'
  const isPersian = language === 'fa'

  function toggleTheme() {
    const nextTheme = isDark ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('nova-theme', nextTheme)
  }

  function toggleLanguage() {
    const nextLanguage = isPersian ? 'en' : 'fa'
    setLanguage(nextLanguage)
    localStorage.setItem('nova-language', nextLanguage)
  }

  return {
    theme,
    language,
    isDark,
    isPersian,
    toggleTheme,
    toggleLanguage,
  }
}

export default usePreferences
