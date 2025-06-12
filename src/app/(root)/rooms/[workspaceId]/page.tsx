"use client"
import { useRouter } from 'next/router'
import { Suspense } from "react"
import { RoomsContainer } from "@/components/rooms/rooms-container"
import { RoomsLoading } from "@/components/rooms/rooms-loading"

const WorkspaceRoomsPage = () => {
    const router = useRouter()
    const { workspaceId } = router.query

    if (typeof workspaceId !== "string") {
        return <div>Invalid workspace ID</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<RoomsLoading />}>
                <RoomsContainer workspaceId={workspaceId} />
            </Suspense>
        </div>
    )
}

export default WorkspaceRoomsPage
