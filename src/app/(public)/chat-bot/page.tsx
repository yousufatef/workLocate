"use client"
import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Settings, Bot } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type Message = {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hello! How can I help you today?",
            role: "assistant",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: "user",
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        // Simulate bot response after a delay
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `I'm a demo chatbot. You said: "${input}"`,
                role: "assistant",
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botMessage])
            setIsLoading(false)
        }, 1000)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="flex h-[100dvh] w-full flex-col">
            <header className="flex items-center justify-between p-2 md:p-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#024E68]">
                        <Bot className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold">AI Assistant</h1>
                </div>
                <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                </Button>
            </header>

            <div className="flex flex-1 flex-col overflow-hidden px-2 pb-2 md:px-4 md:pb-4">
                <Card className="flex h-full flex-col overflow-hidden">
                    <CardHeader className="border-b bg-muted/50 px-3 py-2 md:px-4">
                        <h2 className="text-sm font-medium">Chat Session</h2>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-hidden p-0">
                        <ScrollArea className="h-full">
                            <div className="flex flex-col gap-3 p-3 md:gap-4 md:p-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn("flex w-full", message.role === "user" ? "justify-end" : "justify-start")}
                                    >
                                        <div
                                            className={cn(
                                                "flex max-w-[80%] gap-2 rounded-lg px-3 py-2 md:px-4",
                                                message.role === "user" ? "bg-[#024E68] text-white" : "bg-muted",
                                            )}
                                        >
                                            {message.role === "assistant" && (
                                                <Avatar className="h-8 w-8 bg-background">
                                                    <Bot className="h-4 w-4" />
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-sm">{message.content}</p>
                                                <span className="mt-1 text-xs opacity-70">
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="border-t p-2 md:p-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSend()
                            }}
                            className="flex w-full items-center gap-2"
                        >
                            <Input
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}