import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Get the last message from the user
    const lastMessage = messages[messages.length - 1]

    // Make request to your existing API
    const response = await fetch("https://chatbot-production-d2d9.up.railway.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: lastMessage.content,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to get response from chatbot API")
    }

    const data = await response.json()
    const botResponse = data.response || "معذرة، لم أفهم سؤالك."

    // Return just the bot's response content
    return Response.json({
      content: botResponse,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return Response.json(
      {
        content: "حدث خطأ. حاول مرة أخرى.",
      },
      { status: 500 },
    )
  }
}
