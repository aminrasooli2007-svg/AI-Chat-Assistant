
import { Send, Paperclip, LoaderCircle } from 'lucide-react'

function Composer({ message, setMessage, onSend, t, isLoading }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()

      if (!isLoading) {
        onSend(e)
      }
    }
  }

  return (
    <div className="composer-area">
      <form className="composer" onSubmit={onSend}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          rows={1}
          aria-label={t.writeMessage}
          disabled={isLoading}
        />

        <div className="composer-footer">
          <div className="composer-tools">
            <button
              type="button"
              className="composer-tool"
              aria-label={t.attach}
              title={t.attach}
            >
              <Paperclip size={17} />
            </button>
            <span className="composer-hint">{t.hint}</span>
          </div>

          <button
            type="submit"
            className="send-button"
            disabled={!message.trim() || isLoading}
            aria-label={t.writeMessage}
          >
            {isLoading ? (
              <LoaderCircle size={17} className="loading-icon" />
            ) : (
              <Send size={17} />
            )}
          </button>
        </div>
      </form>

      <p className="disclaimer">{t.disclaimer}</p>
    </div>
  )
}

export default Composer
