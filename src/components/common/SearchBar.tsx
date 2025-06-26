"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";

export function SearchBar() {
    const [text, setText] = useState("");
    const [query] = useDebounce(text, 500);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const currentQuery = searchParams.get("query");
        if (currentQuery) {
            setText(currentQuery);
        } else {
            setText("");
        }
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);
        if (!query) {
            router.push("/", { scroll: false });
        } else {
            router.push(`/?query=${encodeURIComponent(query)}`, { scroll: false });
        }
        setIsLoading(false);
    }, [query, router]);

    const handleClear = useCallback(() => {
        setText("");
        router.push("/", { scroll: false });
    }, [router]);

    const handleSearch = useCallback(() => {
        if (text.trim()) {
            router.push(`/?query=${encodeURIComponent(text.trim())}`, { scroll: false });
        }
    }, [text, router]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "Enter") {
                handleSearch();
            }
        },
        [handleSearch]
    );

    return (
        <div className="w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[600px] lg:max-w-[600px] mb-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-3 bg-white/95 p-1 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-xl border border-white/20 transition-all duration-300 hover:bg-white focus-within:bg-white focus-within:shadow-xl">
                <div className="flex-1 min-w-0">
                    <div className="relative group">
                        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 sm:h-5 sm:w-5 transition-colors group-focus-within:text-[#134B70]" />
                        <Input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search by workspace name..."
                            className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 bg-transparent text-gray-800 placeholder:text-gray-500 border-1 border-gray-200 rounded-xl outline-none focus-visible:ring-0 focus-visible:border-[#134B70] focus-visible:ring-[#134B70]/10 focus-visible:ring-offset-1 transition-all duration-200 text-sm sm:text-base"
                            aria-label="Search workspaces"
                        />
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                            {text && (
                                <button
                                    onClick={handleClear}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#134B70] focus-visible:ring-offset-1"
                                    aria-label="Clear search"
                                >
                                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                                </button>
                            )}
                            {isLoading && (
                                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-[#134B70]" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
