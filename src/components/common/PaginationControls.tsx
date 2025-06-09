import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

// Function to generate page numbers with ellipsis
function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(1);

        if (currentPage > 4) {
            pages.push("...");
        }

        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        pages.push(totalPages);
    }

    return pages;
}

export default function PaginationControls({
    currentPage,
    totalPages,
}: PaginationControlsProps) {
    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <div className="flex justify-center gap-2 mt-4">
            {/* Previous Button */}
            <Link
                href={`?page=${currentPage - 1}`}
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    currentPage <= 1 && "pointer-events-none opacity-50"
                )}
            >
                <ArrowLeft />
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((pageNum, i) =>
                    typeof pageNum === "number" ? (
                        <Link
                            key={i}
                            href={`?page=${pageNum}`}
                            className={cn(
                                buttonVariants({ variant: "outline" }),
                                pageNum === currentPage && "bg-primary text-primary-foreground dark:text-gray-400"
                            )}
                        >
                            {pageNum}
                        </Link>
                    ) : (
                        <span key={i} className="px-2 text-gray-500 select-none">
                            ...
                        </span>
                    )
                )}
            </div>

            {/* Next Button */}
            <Link
                href={`?page=${currentPage + 1}`}
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    currentPage >= totalPages && "pointer-events-none opacity-50"
                )}
            >
                <ArrowRight />
            </Link>
        </div>
    );
}
