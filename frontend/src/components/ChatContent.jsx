
import Welcome from './Welcome'
import MessageList from './MessageList'

function ChatContent({ messages, t, onSelectSuggestion }) {
  return (
    <div className="chat-content">
      {messages.length === 0 ? (
        <Welcome
          t={t}
          onSelectSuggestion={onSelectSuggestion}
        />
      ) : (
        <MessageList
          messages={messages}
          t={t}
        />
      )}
    </div>
  )
}

export default ChatContent
