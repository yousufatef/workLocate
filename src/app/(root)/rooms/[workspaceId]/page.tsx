import { Suspense } from "react"
import { RoomsContainer } from "@/components/rooms/rooms-container"
import { RoomsLoading } from "@/components/rooms/rooms-loading"

export default async function WorkspaceRoomsPage({
    params,
}: {
    params: { workspaceId: string }
}) {
    const { workspaceId } = params
    console.log(`Workspace Rooms Page for workspaceId: ${workspaceId}`)

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<RoomsLoading />}>
                <RoomsContainer workspaceId={workspaceId} />
            </Suspense>
        </div>
    )
}

