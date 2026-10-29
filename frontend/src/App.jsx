
import { useState } from 'react'
import { translations } from './data/translations'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Composer from './components/Composer'
import ChatContent from './components/ChatContent'
import BackgroundEffects from './components/BackgroundEffects'
import useChat from './hooks/useChat'
import usePreferences from './hooks/usePreferences'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const {
    language,
    isDark,
    isPersian,
    toggleTheme,
    toggleLanguage,
  } = usePreferences()

  const {
    message,
    setMessage,
    messages,
    handleSend,
    clearChat,
  } = useChat()

  const t = translations[language]

  function startNewChat() {
    clearChat()
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
