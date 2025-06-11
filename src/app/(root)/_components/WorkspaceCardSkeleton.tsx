import { Skeleton } from "@/components/ui/skeleton";

const WorkspaceCardSkeleton = () => {
    return (
        <div className="container mt-[60px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2">
                {Array(6)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i} className="border rounded-lg overflow-hidden">
                            <Skeleton className="h-48 w-full" />
                            <div className="p-4 space-y-2">
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-1/4" />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default WorkspaceCardSkeleton;