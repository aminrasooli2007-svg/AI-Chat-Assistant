
import { useState } from 'react'

function useChat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  function handleSend(e) {
    e.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage) return

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        text: trimmedMessage,
      },
    ])

    setMessage('')
  }

  function clearChat() {
    setMessages([])
    setMessage('')
  }

  return {
    message,
    setMessage,
    messages,
    handleSend,
    clearChat,
  }
}

export default useChat
