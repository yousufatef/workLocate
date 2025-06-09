import { getAllWorkspaces } from "@/lib/actions/Workspace.actions"
import { IWorkspace } from "@/types/workspace"
import { useState, useEffect, useCallback } from "react"

const WORKSPACES_PER_PAGE = 6

const useWorkspace = (query: string = "") => {
    const [workspaces, setWorkspaces] = useState<IWorkspace[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

    const fetchWorkspaces = useCallback(async (pageToFetch = 1) => {
        try {
            setLoading(true)
            setError(null)

            const response = await getAllWorkspaces({
                query,
                page: pageToFetch,
                limit: WORKSPACES_PER_PAGE
            })

            if (response.workingSpaces.length === 0 || pageToFetch > response.totalPages) {
                setHasMore(false)
                return
            }

            setWorkspaces(prev =>
                pageToFetch === 1 ? response.workingSpaces : [...prev, ...response.workingSpaces]
            )

            setPage(pageToFetch)
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                setError((err as { message?: string }).message || "An error occurred")
            } else if (typeof err === "string") {
                setError(err)
            } else {
                setError("An error occurred")
            }
        } finally {
            setLoading(false)
        }
    }, [query])

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            fetchWorkspaces(page + 1)
        }
    }, [fetchWorkspaces, loading, hasMore, page])

    useEffect(() => {
        fetchWorkspaces(1) // Reset and load first page on mount or when `query` changes
    }, [fetchWorkspaces])

    return {
        workspaces,
        loading,
        error,
        hasMore,
        loadMore,
    }
}

export default useWorkspace
