
import {
  Bot,
  Plus,
  MessageSquare,
  X,
  Trash2,
} from 'lucide-react'

function Sidebar({
  t,
  sidebarOpen,
  setSidebarOpen,
  conversations,
  activeConversationId,
  onNewChat,
  onSelectConversation,
  onDeleteConversation,
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

          {conversations.length === 0 ? (
            <p className="empty-history">{t.emptyHistory}</p>
          ) : (
            conversations.map((conversation) => (
              <div
                className={`history-item ${
                  conversation.id === activeConversationId ? 'active' : ''
                }`}
                key={conversation.id}
              >
                <button
                  type="button"
                  className="history-select"
                  onClick={() => onSelectConversation(conversation.id)}
                  title={conversation.title}
                >
                  <MessageSquare size={16} />
                  <span>
                    {conversation.title || t.newChat}
                  </span>
                </button>

                <button
                  type="button"
                  className="icon-button history-delete"
                  aria-label={`Delete conversation: ${conversation.title}`}
                  title="Delete conversation"
                  onClick={() => onDeleteConversation(conversation.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
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
