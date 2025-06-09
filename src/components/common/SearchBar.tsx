"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { Input } from "@/components/ui/input"
import { Search, X, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { useDebounce } from "use-debounce"

export function SearchBar() {
    const [text, setText] = useState("")
    const [query] = useDebounce(text, 500)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    // Initialize with current search params
    useEffect(() => {
        const currentQuery = searchParams.get("query")
        if (currentQuery) {
            setText(currentQuery)
        }
    }, [searchParams])

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => {
            if (!query) {
                router.push(`/`)
            } else {
                router.push(`/?query=${encodeURIComponent(query)}`)
            }
            setIsLoading(false)
        }, 100)

        return () => clearTimeout(timer)
    }, [query, router])

    const handleClear = useCallback(() => {
        setText("")
        router.push(`/`)
    }, [router])

    const handleSearch = useCallback(() => {
        if (text.trim()) {
            router.push(`/?query=${encodeURIComponent(text.trim())}`)
        }
    }, [text, router])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
                handleSearch()
            }
        },
        [handleSearch],
    )

    return (
        <div className="w-full max-w-4xl mx-auto mb-8 px-4">
            <div className="flex flex-col md:flex-row gap-3 bg-white/95 backdrop-blur-sm rounded-2xl p-2 md:p-6 shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-3xl hover:bg-white">
                <div className="flex-1">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 transition-colors group-focus-within:text-[#134B70]" />
                        <Input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search by city, workspace name, or amenities..."
                            className="w-full pl-12 pr-10 py-3 bg-transparent text-gray-700 placeholder:text-gray-500 border-2 border-gray-200 rounded-xl outline-0 focus-visible:ring-0 focus-visible:border-[#134B70] transition-all duration-200 text-base"
                            aria-label="Search workspaces"
                        />
                        {text && (
                            <button
                                onClick={handleClear}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                                aria-label="Clear search"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                        {isLoading && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Loader2 className="h-4 w-4 animate-spin text-[#134B70]" />
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="bg-[#134B70] hover:bg-[#0f3a56] active:bg-[#0d2f47] cursor-pointer transition-all duration-300 ease-in-out w-full md:w-auto text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Searching...
                        </>
                    ) : (
                        <>
                            Search
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
