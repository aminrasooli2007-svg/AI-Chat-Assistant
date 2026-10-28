
import { useState } from 'react'
import { Bot, Plus, MessageSquare, Sun, Moon, Globe, Send, Paperclip, Menu, X } from 'lucide-react'

function App() {
  const [theme, setTheme] = useState('dark')
  const [message, setMessage] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState([])

  const isDark = theme === 'dark'

  function handleSend(e) {
    e.preventDefault()

    if (!message.trim()) return

    setMessages((current) => [...current, { id: Date.now(), text: message.trim() }])
    setMessage('')
  }

  return (
    <main className={`app ${isDark ? 'dark' : 'light'}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <a className="brand" href="#" aria-label="Nova AI home">
            <span className="brand-icon"><Bot size={23} /></span>
            <span>nova<span className="brand-accent">.ai</span></span>
          </a>
          <button className="icon-button mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close sidebar">
            <X size={19} />
          </button>
        </div>

        <button className="new-chat-button" onClick={() => setMessages([])}>
          <Plus size={18} />
          <span>New chat</span>
          <span className="shortcut">⌘ K</span>
        </button>

        <div className="sidebar-section">
          <p className="section-label">YOUR WORKSPACE</p>
          <button className="nav-item active">
            <MessageSquare size={17} />
            <span>Chat assistant</span>
          </button>
        </div>

        <div className="history-section">
          <p className="section-label">RECENT</p>
          {messages.length === 0 ? (
            <p className="empty-history">Your conversations will appear here.</p>
          ) : (
            <button className="history-item">
              <MessageSquare size={16} />
              <span>{messages[0].text.slice(0, 24) || 'New conversation'}</span>
            </button>
          )}
        </div>

        <div className="sidebar-bottom">
          <div className="plan-card">
            <span className="plan-sparkle">✳</span>
            <div>
              <p className="plan-title">Make more with Nova</p>
              <p className="plan-description">Explore what AI can do for you.</p>
            </div>
          </div>
          <button className="profile-button">
            <span className="avatar">A</span>
            <span className="profile-info">
              <strong>Your workspace</strong>
              <small>Free plan</small>
            </span>
            <span className="profile-menu">···</span>
          </button>
        </div>
      </aside>

      <section className="chat-panel">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
              <Menu size={20} />
            </button>
            <div className="model-selector">
              <span className="status-dot" />
              <span>Nova Assistant</span>
              <span className="model-badge">BETA</span>
            </div>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Change language" title="Language">
              <Globe size={18} />
            </button>
            <button
              className="icon-button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="share-button">Share feedback</button>
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
              <p className="eyebrow">YOUR AI, REIMAGINED</p>
              <h1>Ideas start with<br /><span>a conversation.</span></h1>
              <p className="welcome-description">
                Your thoughtful AI companion for exploring ideas,<br className="desktop-break" />
                solving problems, and creating something amazing.
              </p>

              <div className="suggestion-grid">
                <button className="suggestion-card" onClick={() => setMessage('Help me brainstorm a creative project')}>
                  <span className="suggestion-icon purple">✳</span>
                  <span><strong>Brainstorm ideas</strong><small>Turn a spark into something great</small></span>
                </button>
                <button className="suggestion-card" onClick={() => setMessage('Explain a complex topic in simple terms')}>
                  <span className="suggestion-icon orange">⌘</span>
                  <span><strong>Learn something</strong><small>Make the complex feel simple</small></span>
                </button>
                <button className="suggestion-card" onClick={() => setMessage('Help me write clean, readable code')}>
                  <span className="suggestion-icon blue">〈/〉</span>
                  <span><strong>Write some code</strong><small>Build, debug, and improve</small></span>
                </button>
                <button className="suggestion-card" onClick={() => setMessage('Help me plan my next big goal')}>
                  <span className="suggestion-icon green">↗</span>
                  <span><strong>Plan a project</strong><small>Go from idea to action</small></span>
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
                <p>Connect an AI API to start receiving responses.</p>
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
              placeholder="Ask Nova anything..."
              rows={1}
              aria-label="Write your message"
            />
            <div className="composer-footer">
              <div className="composer-tools">
                <button type="button" className="composer-tool" aria-label="Attach a file" title="Attach a file">
                  <Paperclip size={17} />
                </button>
                <span className="composer-hint">Be curious. Think bigger.</span>
              </div>
              <button type="submit" className="send-button" disabled={!message.trim()} aria-label="Send message">
                <Send size={17} />
              </button>
            </div>
          </form>
          <p className="disclaimer">Nova can make mistakes. Check important information.</p>
        </div>
      </section>
    </main>
  )
}

export default App
