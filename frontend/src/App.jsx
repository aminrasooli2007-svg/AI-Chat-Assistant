
import { useState } from 'react'
import { translations } from './data/translations'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Composer from './components/Composer'
import ChatContent from './components/ChatContent'
import BackgroundEffects from './components/BackgroundEffects'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nova-theme') || 'dark')
  const [language, setLanguage] = useState(() => localStorage.getItem('nova-language') || 'en')
  const [message, setMessage] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState([])

  const isDark = theme === 'dark'
  const isPersian = language === 'fa'
  const t = translations[language]

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

  function handleSend(e) {
    e.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage) return

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        text: trimmedMessage,
      },
    ])

    setMessage('')
  }

  function startNewChat() {
    setMessages([])
    setMessage('')
    setSidebarOpen(false)
  }

  return (
    <main
      className={`app ${isDark ? 'dark' : 'light'}`}
      dir={isPersian ? 'rtl' : 'ltr'}
      lang={language}
    >
      <BackgroundEffects />

      <Sidebar
        t={t}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        messages={messages}
        onNewChat={startNewChat}
      />

      <section className="chat-panel">
        <Topbar
          t={t}
          isDark={isDark}
          toggleTheme={toggleTheme}
          toggleLanguage={toggleLanguage}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <ChatContent
          messages={messages}
          t={t}
          onSelectSuggestion={setMessage}
        />

        <Composer
          message={message}
          setMessage={setMessage}
          onSend={handleSend}
          t={t}
        />
      </section>
    </main>
  )
}

export default App
