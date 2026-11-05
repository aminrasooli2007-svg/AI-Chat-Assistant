import Welcome from './Welcome'
import MessageList from './MessageList'

function ChatContent({ messages, t, onSelectSuggestion, isLoading }) {
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
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default ChatContent