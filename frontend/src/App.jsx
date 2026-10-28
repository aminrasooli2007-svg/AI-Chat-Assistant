
import { useState } from 'react'
import {
  Bot,
  Sun,
  Moon,
  Globe,
  Send,
  Paperclip,
  Menu,
} from 'lucide-react'
import { translations } from './data/translations'
import Sidebar from './components/Sidebar'

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
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu"
              onClick={() => setSidebarOpen(true)}
              aria-label={t.openSidebar}
            >
              <Menu size={20} />
            </button>

            <div className="model-selector">
              <span className="status-dot" />
              <span>{t.assistant}</span>
              <span className="model-badge">{t.beta}</span>
            </div>
          </div>

          <div className="topbar-actions">
            <button
              className="icon-button"
              onClick={toggleLanguage}
              aria-label={t.language}
              title={t.language}
            >
              <Globe size={18} />
            </button>

            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label={t.toggleTheme}
              title={t.toggleTheme}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button className="share-button">{t.feedback}</button>
          </div>
        </header>

        <div className="chat-content">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-icon">
                <Bot size={30} />
                <span className="welcome-orbit orbit-one" />
                <span className="welcome-orbit orbit-two" />
              </div>

              <p className="eyebrow">{t.eyebrow}</p>

              <h1>
                {t.headingFirst}
                <br />
                <span>{t.headingSecond}</span>
              </h1>

              <p className="welcome-description">
                {t.descriptionFirst}
                <br className="desktop-break" />
                {t.descriptionSecond}
              </p>

              <div className="suggestion-grid">
                <button
                  className="suggestion-card"
                  onClick={() => setMessage(t.suggestionBrainstorm)}
                >
                  <span className="suggestion-icon purple">✳</span>
                  <span>
                    <strong>{t.brainstorm}</strong>
                    <small>{t.brainstormDescription}</small>
                  </span>
                </button>

                <button
                  className="suggestion-card"
                  onClick={() => setMessage(t.suggestionLearn)}
                >
                  <span className="suggestion-icon orange">⌘</span>
                  <span>
                    <strong>{t.learn}</strong>
                    <small>{t.learnDescription}</small>
                  </span>
                </button>

                <button
                  className="suggestion-card"
                  onClick={() => setMessage(t.suggestionCode)}
                >
                  <span className="suggestion-icon blue">〈/〉</span>
                  <span>
                    <strong>{t.code}</strong>
                    <small>{t.codeDescription}</small>
                  </span>
                </button>

                <button
                  className="suggestion-card"
                  onClick={() => setMessage(t.suggestionPlan)}
                >
                  <span className="suggestion-icon green">↗</span>
                  <span>
                    <strong>{t.plan}</strong>
                    <small>{t.planDescriptionCard}</small>
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="messages-list">
              {messages.map((item) => (
                <div className="message-row" key={item.id}>
                  <span className="message-avatar">A</span>
                  <p>{item.text}</p>
                </div>
              ))}

              <div className="assistant-placeholder">
                <span className="assistant-avatar">
                  <Bot size={18} />
                </span>
                <p>{t.apiPlaceholder}</p>
              </div>
            </div>
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
