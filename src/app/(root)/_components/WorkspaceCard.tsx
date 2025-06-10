import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import StarRating from "@/components/workspace/StarRating"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { IWorkspace } from '@/types/workspace'
import { MapPin } from 'lucide-react'

const WorkspaceCard = ({ workspace }: { workspace: IWorkspace }) => {
    return (
        <Card className="flex flex-col py-0 pb-2" key={workspace?._id}>
            <Link href={`/workspace/${workspace?._id}`} className="px-2 pt-2">
                <div className="relative aspect-video">
                    <Image
                        src="/assets/images/workNest.png"
                        className="object-cover"
                        alt={`${workspace?.name} workspace`}
                        fill
                    />
                </div>
            </Link>

            <CardContent className="px-4 flex flex-col flex-grow">
                <div className="flex flex-col gap-2 mb-4 flex-grow">
                    <StarRating rate={workspace.averageRating || 0} />
                    <h3 className="text-[18px] font-semibold truncate">
                        {workspace?.name}
                    </h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <p className="line-clamp-1">{workspace?.address}</p>
                    </div>
                </div>
                <Link href={`/workspace/${workspace?._id}`} className="w-full mt-auto">
                    <Button className="bg-primary w-full cursor-pointer">View Details</Button>
                </Link>
            </CardContent>
        </Card>

    )
}

export default WorkspaceCard