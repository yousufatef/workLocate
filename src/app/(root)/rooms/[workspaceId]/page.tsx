import { Suspense } from "react"
import { RoomsContainer } from "@/components/rooms/rooms-container"
import { RoomsLoading } from "@/components/rooms/rooms-loading"

interface PageProps {
    params: {
        workspaceId: string
    }
}

export default async function WorkspaceRoomsPage({ params }: PageProps) {
    // In Next.js 15, params might be a Promise, so we await it
    const resolvedParams = await params
    const { workspaceId } = resolvedParams
    console.log(`Workspace Rooms Page for workspaceId: ${workspaceId}`);


    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<RoomsLoading />}>
                <RoomsContainer workspaceId={workspaceId} />
            </Suspense>
        </div>
    )
}
