"use client"

import { redirect } from "next/navigation"

export default function RoomsPage() {
    // Server-side redirect to default workspace
    const defaultWorkspaceId = "6807bb4783f409bf85c9c73b"
    redirect(`/rooms/${defaultWorkspaceId}`)
}
