"use client"

import { useState, useEffect, useCallback } from "react"

interface Workspace {
    _id: string
    name: string
    description?: string
    amenities?: string[]
    averageRating?: number
    // Add other fields if your API returns more
}

export function useWorkspaces(latitude = 29.9710, longitude = 31.2810) {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchWorkspaces = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch("https://recommendation-system-production-143e.up.railway.app/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    latitude,
                    longitude,
                }),
            })

            if (!res.ok) {
                throw new Error("Failed to fetch workspaces")
            }

            const data = await res.json()
            setWorkspaces(data)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Something went wrong")
            }
        } finally {
            setLoading(false)
        }
    }, [latitude, longitude])

    useEffect(() => {
        fetchWorkspaces()
    }, [fetchWorkspaces])

    return { workspaces, loading, error, refetch: fetchWorkspaces }
}
