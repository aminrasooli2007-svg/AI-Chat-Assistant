
import { Bot } from 'lucide-react'

function MessageList({ messages, t }) {
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
    </div>
  )
}

export default MessageList
