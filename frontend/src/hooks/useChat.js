
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'nova-conversations'

function createConversation() {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title: 'New Chat',
    messages: [],
  }
}

function useChat() {
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)

      if (saved) {
        const parsed = JSON.parse(saved)

        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }

      const oldMessages = JSON.parse(
        localStorage.getItem('nova-messages') || '[]'
      )

      if (Array.isArray(oldMessages) && oldMessages.length > 0) {
        return [
          {
            ...createConversation(),
            title: oldMessages[0].text.slice(0, 30) || 'New Chat',
            messages: oldMessages,
          },
        ]
      }

      return [createConversation()]
    } catch {
      return [createConversation()]
    }
  })

  const [activeConversationId, setActiveConversationId] = useState(
    () => {
      try {
        return localStorage.getItem('nova-active-conversation') || null
      } catch {
        return null
      }
    }
  )

  const [message, setMessage] = useState('')

  const activeConversation =
    conversations.find(
      (conversation) => conversation.id === activeConversationId
    ) || conversations[0]

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
  }, [conversations])

  useEffect(() => {
    if (activeConversation) {
      localStorage.setItem(
        'nova-active-conversation',
        activeConversation.id
      )
    }
  }, [activeConversation])

  const messages = activeConversation?.messages || []

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
