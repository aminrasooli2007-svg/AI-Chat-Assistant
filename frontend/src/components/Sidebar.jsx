
import { useState } from 'react'
import {
  Bot,
  Plus,
  MessageSquare,
  X,
  Trash2,
  AlertTriangle,
  Search,
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
  const [conversationToDelete, setConversationToDelete] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = conversations.filter((conversation) =>
    (conversation.title || t.newChat)
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  )

  function handleConfirmDelete() {
    if (!conversationToDelete) return

    onDeleteConversation(conversationToDelete.id)
    setConversationToDelete(null)
  }

  function handleCancelDelete() {
    setConversationToDelete(null)
  }

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

        <div className="conversation-search">
          <Search size={17} />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
          />
        </div>

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
          ) : filteredConversations.length === 0 ? (
            <p className="empty-history">
              No conversations found.
            </p>
          ) : (
            filteredConversations.map((conversation) => (
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
                  <span>{conversation.title || t.newChat}</span>
                </button>

                <button
                  type="button"
                  className="icon-button history-delete"
                  aria-label={`Delete conversation: ${conversation.title}`}
                  title="Delete conversation"
                  onClick={() => setConversationToDelete(conversation)}
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

      {conversationToDelete && (
        <div
          className="confirm-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCancelDelete()
            }
          }}
        >
          <section
            className="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            aria-describedby="confirm-delete-description"
          >
            <div className="confirm-icon">
              <AlertTriangle size={25} />
            </div>

            <h2 id="confirm-delete-title">Delete conversation?</h2>

            <p id="confirm-delete-description">
              Are you sure you want to delete "{conversationToDelete.title || t.newChat}"?
              This action cannot be undone.
            </p>

            <div className="confirm-actions">
              <button
                type="button"
                className="confirm-cancel"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>

              <button
                type="button"
                className="confirm-delete"
                onClick={handleConfirmDelete}
                autoFocus
              >
                <Trash2 size={16} />
                Delete conversation
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default Sidebar
