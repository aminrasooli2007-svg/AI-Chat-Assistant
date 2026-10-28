
import {
  Bot,
  Plus,
  MessageSquare,
  X,
  Menu,
} from 'lucide-react'

function Sidebar({
  t,
  sidebarOpen,
  setSidebarOpen,
  messages,
  onNewChat,
}) {
  return (
    <>
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
            <span className="brand-icon">
              <Bot size={23} />
            </span>
            <span>
              nova<span className="brand-accent">.ai</span>
            </span>
          </a>

          <button
            className="icon-button mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label={t.closeSidebar}
          >
            <X size={19} />
          </button>
        </div>

        <button className="new-chat-button" onClick={onNewChat}>
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
    </>
  )
}

export default Sidebar
