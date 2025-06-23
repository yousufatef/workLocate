"use client"

import { useState } from "react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
}

interface UseChatbotReturn {
  messages: Message[]
  input: string
  isLoading: boolean
  setInput: (value: string) => void
  sendMessage: (message?: string) => Promise<void>
  clearMessages: () => void
}

export const useChatbot = (): UseChatbotReturn => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInputState] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (messageContent?: string) => {
    const messageToSend = messageContent || input.trim()

    if (!messageToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      role: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputState("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content || "معذرة، لم أفهم سؤالك.",
        role: "assistant",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "حدث خطأ. حاول مرة أخرى.",
        role: "assistant",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([])
  }

  return {
    messages,
    input,
    isLoading,
    setInput: setInputState,
    sendMessage,
    clearMessages,
  }
}
