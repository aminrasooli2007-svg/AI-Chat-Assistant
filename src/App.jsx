
import { useState } from 'react'
import { Bot, Plus, MessageSquare, Sun, Moon, Globe, Send, Paperclip, Menu, X } from 'lucide-react'

const translations = {
  en: {
    closeSidebar: 'Close sidebar',
    openSidebar: 'Open sidebar',
    home: 'Nova AI home',
    newChat: 'New chat',
    workspace: 'YOUR WORKSPACE',
    chatAssistant: 'Chat assistant',
    recent: 'RECENT',
    emptyHistory: 'Your conversations will appear here.',
    planTitle: 'Make more with Nova',
    planDescription: 'Explore what AI can do for you.',
    yourWorkspace: 'Your workspace',
    freePlan: 'Free plan',
    assistant: 'Nova Assistant',
    beta: 'BETA',
    language: 'Change language',
    toggleTheme: 'Toggle theme',
    feedback: 'Share feedback',
    eyebrow: 'YOUR AI, REIMAGINED',
    headingFirst: 'Ideas start with',
    headingSecond: 'a conversation.',
    descriptionFirst: 'Your thoughtful AI companion for exploring ideas,',
    descriptionSecond: 'solving problems, and creating something amazing.',
    brainstorm: 'Brainstorm ideas',
    brainstormDescription: 'Turn a spark into something great',
    learn: 'Learn something',
    learnDescription: 'Make the complex feel simple',
    code: 'Write some code',
    codeDescription: 'Build, debug, and improve',
    plan: 'Plan a project',
    planDescriptionCard: 'Go from idea to action',
    suggestionBrainstorm: 'Help me brainstorm a creative project',
    suggestionLearn: 'Explain a complex topic in simple terms',
    suggestionCode: 'Help me write clean, readable code',
    suggestionPlan: 'Help me plan my next big goal',
    apiPlaceholder: 'Connect an AI API to start receiving responses.',
    placeholder: 'Ask Nova anything...',
    writeMessage: 'Write your message',
    attach: 'Attach a file',
    hint: 'Be curious. Think bigger.',
    disclaimer: 'Nova can make mistakes. Check important information.',
  },
  fa: {
    closeSidebar: 'بستن نوار کناری',
    openSidebar: 'باز کردن نوار کناری',
    home: 'صفحه اصلی نوا ای‌آی',
    newChat: 'گفتگوی جدید',
    workspace: 'فضای کاری شما',
    chatAssistant: 'دستیار گفتگو',
    recent: 'گفتگوهای اخیر',
    emptyHistory: 'گفتگوهای شما اینجا نمایش داده می‌شوند.',
    planTitle: 'با نوا بیشتر انجام بده',
    planDescription: 'توانایی‌های هوش مصنوعی را کشف کن.',
    yourWorkspace: 'فضای کاری شما',
    freePlan: 'طرح رایگان',
    assistant: 'دستیار نوا',
    beta: 'آزمایشی',
    language: 'تغییر زبان',
    toggleTheme: 'تغییر تم',
    feedback: 'ارسال بازخورد',
    eyebrow: 'هوش مصنوعی، به شکلی تازه',
    headingFirst: 'ایده‌ها با یک',
    headingSecond: 'گفتگو آغاز می‌شوند.',
    descriptionFirst: 'همراه هوشمند شما برای کشف ایده‌ها،',
    descriptionSecond: 'حل مشکلات و خلق چیزهای شگفت‌انگیز.',
    brainstorm: 'ایده‌پردازی',
    brainstormDescription: 'یک جرقه را به ایده‌ای عالی تبدیل کن',
    learn: 'یادگیری',
    learnDescription: 'موضوعات پیچیده را ساده یاد بگیر',
    code: 'برنامه‌نویسی',
    codeDescription: 'کدنویسی کن، اشکال‌زدایی کن و بهتر بساز',
    plan: 'برنامه‌ریزی پروژه',
    planDescriptionCard: 'از ایده تا اجرا پیش برو',
    suggestionBrainstorm: 'برای یک پروژه خلاقانه ایده‌پردازی کن',
    suggestionLearn: 'یک موضوع پیچیده را ساده توضیح بده',
    suggestionCode: 'برایم کدی تمیز و خوانا بنویس',
    suggestionPlan: 'برای هدف بزرگ بعدی‌ام برنامه‌ریزی کن',
    apiPlaceholder: 'برای دریافت پاسخ، یک API هوش مصنوعی متصل کن.',
    placeholder: 'هر چیزی از نوا بپرس...',
    writeMessage: 'پیام خود را بنویسید',
    attach: 'پیوست فایل',
    hint: 'کنجکاو باش و بزرگ‌تر فکر کن.',
    disclaimer: 'نوا ممکن است اشتباه کند. اطلاعات مهم را بررسی کنید.',
  },
}

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

    if (!message.trim()) return

    setMessages((current) => [...current, { id: Date.now(), text: message.trim() }])
    setMessage('')
  }

  return (
    <main className={`app ${isDark ? 'dark' : 'light'}`} dir={isPersian ? 'rtl' : 'ltr'} lang={language}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          aria-label={t.closeSidebar}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <a className="brand" href="#" aria-label={t.home}>
            <span className="brand-icon"><Bot size={23} /></span>
            <span>nova<span className="brand-accent">.ai</span></span>
          </a>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label={t.closeSidebar}>
            <X size={19} />
          </button>
        </div>

        <button className="new-chat-button" onClick={() => setMessages([])}>
          <Plus size={18} />
          <span>{t.newChat}</span>
          <span className="shortcut">⌘ K</span>
        </button>

        <div className="sidebar-section">
          <p className="section-label">{t.workspace}</p>
          <button className="nav-item active">
            <MessageSquare size={17} />
            <span>{t.chatAssistant}</span>
          </button>
        </div>

        <div className="history-section">
          <p className="section-label">{t.recent}</p>
          {messages.length === 0 ? (
            <p className="empty-history">{t.emptyHistory}</p>
          ) : (
            <button className="history-item">
              <MessageSquare size={16} />
              <span>{messages[0].text.slice(0, 24) || t.newChat}</span>
            </button>
          )}
        </div>

        <div className="sidebar-bottom">
          <div className="plan-card">
            <span className="plan-sparkle">✳</span>
            <div>
              <p className="plan-title">{t.planTitle}</p>
              <p className="plan-description">{t.planDescription}</p>
            </div>
          </div>
          <button className="profile-button">
            <span className="avatar">A</span>
            <span className="profile-info">
              <strong>{t.yourWorkspace}</strong>
              <small>{t.freePlan}</small>
            </span>
            <span className="profile-menu">···</span>
          </button>
        </div>
      </aside>

      <section className="chat-panel">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label={t.openSidebar}>
              <Menu size={20} />
            </button>
            <div className="model-selector">
              <span className="status-dot" />
              <span>{t.assistant}</span>
              <span className="model-badge">{t.beta}</span>
            </div>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" onClick={toggleLanguage} aria-label={t.language} title={t.language}>
              <Globe size={18} />
            </button>
            <button className="icon-button" onClick={toggleTheme} aria-label={t.toggleTheme} title={t.toggleTheme}>
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
              <h1>{t.headingFirst}<br /><span>{t.headingSecond}</span></h1>
              <p className="welcome-description">
                {t.descriptionFirst}<br className="desktop-break" />
                {t.descriptionSecond}
              </p>

              <div className="suggestion-grid">
                <button className="suggestion-card" onClick={() => setMessage(t.suggestionBrainstorm)}>
                  <span className="suggestion-icon purple">✳</span>
                  <span><strong>{t.brainstorm}</strong><small>{t.brainstormDescription}</small></span>
                </button>
                <button className="suggestion-card" onClick={() => setMessage(t.suggestionLearn)}>
                  <span className="suggestion-icon orange">⌘</span>
                  <span><strong>{t.learn}</strong><small>{t.learnDescription}</small></span>
                </button>
                <button className="suggestion-card" onClick={() => setMessage(t.suggestionCode)}>
                  <span className="suggestion-icon blue">〈/〉</span>
                  <span><strong>{t.code}</strong><small>{t.codeDescription}</small></span>
                </button>
                <button className="suggestion-card" onClick={() => setMessage(t.suggestionPlan)}>
                  <span className="suggestion-icon green">↗</span>
                  <span><strong>{t.plan}</strong><small>{t.planDescriptionCard}</small></span>
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
                <span className="assistant-avatar"><Bot size={18} /></span>
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
                <button type="button" className="composer-tool" aria-label={t.attach} title={t.attach}>
                  <Paperclip size={17} />
                </button>
                <span className="composer-hint">{t.hint}</span>
              </div>
              <button type="submit" className="send-button" disabled={!message.trim()} aria-label={t.writeMessage}>
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
