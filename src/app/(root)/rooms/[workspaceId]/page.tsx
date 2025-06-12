import { Suspense } from "react"
import { RoomsContainer } from "@/components/rooms/rooms-container"
import { RoomsLoading } from "@/components/rooms/rooms-loading"

interface WorkspaceRoomsPageProps {
    params: {
        workspaceId: string
    }
}

export default function WorkspaceRoomsPage({ params }: WorkspaceRoomsPageProps) {
    const { workspaceId } = params

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<RoomsLoading />}>
                <RoomsContainer workspaceId={workspaceId} />
            </Suspense>
        </div>
    )
}
