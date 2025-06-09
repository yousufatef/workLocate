import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import StarRating from "@/components/workspace/StarRating"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { IWorkspace } from '@/types/workspace'

const WorkspaceCard = ({ workspace }: { workspace: IWorkspace }) => {
    return (
        <Card className="flex flex-col py-0 pb-2" key={workspace?._id}>
            <Link href={`/workspace/${workspace?._id}`} className="p-2">
                <div className="relative aspect-video"> {/* Added aspect ratio container */}
                    <Image
                        src={"/assets/images/workNest.png"} // Use workspace image if available
                        className="object-cover" // Changed from contain to cover
                        alt={`${workspace?.name} workspace`} // More descriptive alt text
                        fill // Use fill with aspect ratio container
                    />
                </div>
            </Link>
            <CardContent className="px-4 py-2 h-48 flex flex-col">
                <div className="space-y-4 mb-2 flex-grow overflow-hidden">
                    <div className="flex workspaces-center justify-between gap-2">
                        <h3 className="text-xl font-semibold">{workspace?.name}</h3>
                        <StarRating rate={workspace.averageRating || 0} /> {/* Default to 0 if undefined */}
                    </div>
                    <div className="text-sm text-gray-500 flex justify-between">
                        <p className="line-clamp-1">{workspace?.address}</p>
                    </div>
                    <p className="text-gray-500 leading-5 line-clamp-2 md:line-clamp-3"> {/* Increased line clamp */}
                        {workspace?.description || "No description available"} {/* Fallback text */}
                    </p>
                </div>
                <Link href={`/workspace/${workspace?._id}`} className="w-full">
                    <Button className="bg-primary w-full">View Details</Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default WorkspaceCard