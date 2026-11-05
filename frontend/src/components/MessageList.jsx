import { Bot } from 'lucide-react'

function MessageList({ messages, t, isLoading }) {
  return (
    <div className="messages-list">
      {messages.map((item) => (
        <div
          className={`message-row ${item.role === 'assistant' ? 'assistant-message' : 'user-message'}`}
          key={item.id}
        >
          <span className="message-avatar">
            {item.role === 'assistant' ? <Bot size={18} /> : 'A'}
          </span>

          <div className="message-body">
            <p>{item.text}</p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="message-row assistant-message">
          <span className="message-avatar">
            <Bot size={18} />
          </span>

          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageList