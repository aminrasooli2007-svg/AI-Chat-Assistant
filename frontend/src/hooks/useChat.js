
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'nova-conversations'
const ACTIVE_CHAT_KEY = 'nova-active-conversation'
const OLD_MESSAGES_KEY = 'nova-messages'

function createConversation() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: 'New Chat',
    messages: [],
  }
}

function readStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : value
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    return false
  }

  return true
}

function loadConversations() {
  try {
    const saved = readStorage(STORAGE_KEY)

    if (saved) {
      const parsed = JSON.parse(saved)

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }

    const oldMessages = JSON.parse(
      readStorage(OLD_MESSAGES_KEY, '[]')
    )

    if (Array.isArray(oldMessages) && oldMessages.length > 0) {
      return [
        {
          ...createConversation(),
          title: oldMessages[0]?.text?.slice(0, 30) || 'New Chat',
          messages: oldMessages,
        },
      ]
    }
  } catch {
    return [createConversation()]
  }

  return [createConversation()]
}

function useChat() {
  const [conversations, setConversations] = useState(loadConversations)

  const [activeConversationId, setActiveConversationId] = useState(
    () => readStorage(ACTIVE_CHAT_KEY)
  )

  const [message, setMessage] = useState('')

  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId
    ) || conversations[0]

  const messages = activeConversation?.messages || []

  useEffect(() => {
    writeStorage(STORAGE_KEY, JSON.stringify(conversations))
  }, [conversations])

  useEffect(() => {
    if (activeConversation) {
      writeStorage(ACTIVE_CHAT_KEY, activeConversation.id)
    }
  }, [activeConversation])

  function handleSend(e) {
    e.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage || !activeConversation) return

    setConversations((current) =>
      current.map((conversation) => {
        if (conversation.id !== activeConversation.id) {
          return conversation
        }

        const updatedMessages = [
          ...conversation.messages,
          {
            id: `${Date.now()}-${conversation.messages.length}`,
            text: trimmedMessage,
          },
        ]

        return {
          ...conversation,
          title:
            conversation.messages.length === 0
              ? trimmedMessage.slice(0, 30)
              : conversation.title,
          messages: updatedMessages,
        }
      })
    )

    setMessage('')
  }

  function createNewChat() {
    const conversation = createConversation()

    setConversations((current) => [conversation, ...current])
    setActiveConversationId(conversation.id)
    setMessage('')
  }

  function selectConversation(conversationId) {
    setActiveConversationId(conversationId)
    setMessage('')
  }

  function deleteConversation(conversationId) {
    setConversations((current) => {
      const remaining = current.filter(
        (conversation) => conversation.id !== conversationId
      )

      if (remaining.length === 0) {
        const newConversation = createConversation()
        setActiveConversationId(newConversation.id)
        return [newConversation]
      }

      if (conversationId === activeConversationId) {
        setActiveConversationId(remaining[0].id)
      }

      return remaining
    })

    setMessage('')
  }

  function deleteMessage(messageId) {
    setConversations((current) =>
      current.map((conversation) => {
        if (conversation.id !== activeConversation?.id) {
          return conversation
        }

        return {
          ...conversation,
          messages: conversation.messages.filter(
            (item) => item.id !== messageId
          ),
        }
      })
    )
  }

  function clearChat() {
    if (!activeConversation) return

    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? { ...conversation, messages: [], title: 'New Chat' }
          : conversation
      )
    )

    setMessage('')
  }

  return {
    message,
    setMessage,
    messages,
    conversations,
    activeConversationId: activeConversation?.id,
    handleSend,
    createNewChat,
    selectConversation,
    deleteConversation,
    deleteMessage,
    clearChat,
  }
}

export default useChat
