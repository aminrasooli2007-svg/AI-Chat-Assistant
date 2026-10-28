
import { Bot } from 'lucide-react'

function MessageList({ messages, t }) {
  return (
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
  )
}

export default MessageList
