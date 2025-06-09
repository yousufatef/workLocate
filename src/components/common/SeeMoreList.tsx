"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface SeeMorePaginationProps<T> {
    fetchData: (page: number) => Promise<{ items: T[]; totalPages: number }>;
    renderItems: (items: T[]) => React.ReactNode;
    initialPage?: number;
    limit?: number;
}

export default function SeeMorePagination<T>({
    fetchData,
    renderItems,
    initialPage = 1,
}: SeeMorePaginationProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadPage = async (pageToLoad: number) => {
        setLoading(true);
        try {
            const { items: newItems, totalPages: total } = await fetchData(pageToLoad);
            if (pageToLoad === 1) {
                setItems(newItems);
            } else {
                setItems((prev) => [...prev, ...newItems]);
            }
            setTotalPages(total);
        } catch (error) {
            console.error("Failed to fetch data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPage(initialPage);
    }, [initialPage]);

    const handleSeeMore = () => {
        if (page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            loadPage(nextPage);
        }
    };

    return (
        <div>
            <div>{renderItems(items)}</div>
            {page < totalPages && (
                <div className="flex justify-center mt-6">
                    <Button onClick={handleSeeMore} disabled={loading} className="w-40">
                        {loading ? "Loading..." : "See More"}
                    </Button>
                </div>
            )}
        </div>
    );
}
