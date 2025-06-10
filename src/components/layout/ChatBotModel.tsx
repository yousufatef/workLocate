"use client"
import { Bot, Send, X } from "lucide-react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"

const ChatBotModel = () => {
    const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([])
    const [inputValue, setInputValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setMessages(prev => [...prev, { text: inputValue, sender: 'user' }])

            // Simulate bot reply
            setTimeout(() => {
                setMessages(prev => [...prev, { text: `I'm a simple bot. You said: "${inputValue}"`, sender: 'bot' }])
            }, 500)

            setInputValue('')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    return (
        <div className="fixed right-6 bottom-8">
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                    <span className="bg-primary w-18 h-18 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
                        <Bot size={42} className="text-primary-foreground" />
                    </span>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-2">
                                <Bot className="text-primary" />
                                <h3 className="font-semibold text-lg">Work Locate Assistant</h3>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="h-64 overflow-y-auto space-y-2 pr-2">
                            {messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    How can I help you today?
                                </div>
                            ) : (
                                messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-xs rounded-lg px-4 py-2 ${message.sender === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-muted'}`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type your message..."
                            />
                            <Button
                                onClick={handleSendMessage}
                                disabled={!inputValue.trim()}
                                size="icon"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ChatBotModel
