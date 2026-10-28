
import { useState } from 'react'
import { Send, Paperclip } from 'lucide-react'
import { translations } from './data/translations'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Welcome from './components/Welcome'
import MessageList from './components/MessageList'

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
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

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

        <div className="chat-content">
          {messages.length === 0 ? (
            <Welcome t={t} onSelectSuggestion={setMessage} />
          ) : (
            <MessageList messages={messages} t={t} />
          )}
        </div>

        <div className="composer-area">
          <form className="composer" onSubmit={handleSend}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(e)
                }
              }}
              placeholder={t.placeholder}
              rows={1}
              aria-label={t.writeMessage}
            />

            <div className="composer-footer">
              <div className="composer-tools">
                <button
                  type="button"
                  className="composer-tool"
                  aria-label={t.attach}
                  title={t.attach}
                >
                  <Paperclip size={17} />
                </button>
                <span className="composer-hint">{t.hint}</span>
              </div>

              <button
                type="submit"
                className="send-button"
                disabled={!message.trim()}
                aria-label={t.writeMessage}
              >
                <Send size={17} />
              </button>
            </div>
          </form>

          <p className="disclaimer">{t.disclaimer}</p>
        </div>
      </section>
    </main>
  )
}

export default App
