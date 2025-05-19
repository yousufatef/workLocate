import { getAllWorkspaces } from "@/lib/actions/Workspace.actions"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import { IWorkspace } from "@/types/workspace"
import StarRating from "@/components/workpace/StarRating"

const WorkingList = async () => {
    const { workingSpaces } = await getAllWorkspaces()
    return (
        <div className="container mt-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {workingSpaces.map((item: IWorkspace) => (
                <Card className="flex flex-col py-0 pb-2" key={item?._id}>
                    <Link href={`/workspace/${item?._id}`} className="p-2">
                        <div>
                            <Image src='/assets/images/workNest.png' className="object-contain" alt="work-nest" width={400} height={200} />
                        </div>
                    </Link>
                    <CardContent className="px-4 py-2 h-48 flex flex-col">
                        <div className="space-y-4 mb-2 flex-grow overflow-hidden">
                            <div className="flex items-start justify-between">
                                <h3 className="text-xl font-semibold line-clamp-1">{item?.name}</h3>
                            </div>
                            <div className="text-sm text-gray-500 flex justify-between">
                                <p className="line-clamp-1">{item?.address}</p>
                            </div>
                            <p className="text-gray-500 leading-5 line-clamp-3">
                                {item?.description}
                            </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <StarRating rate={item.averageRating} />
                            <Link href={`/workspace/${item?._id}`}>
                                <Button
                                    variant="default"
                                    className="bg-primary cursor-pointer transition-colors duration-300 ease-in-out"
                                >
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default WorkingList