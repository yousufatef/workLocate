"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
// import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import WorkspaceTableActions from "./WorkspaceTableActions"
import { IWorkspace } from "@/types/workspace"
import { getAllWorkspaces } from "@/lib/actions/Workspace.actions"



export default function EventsView() {
    const [events, setEvents] = useState<IWorkspace[]>([])
    const router = useRouter()
    useEffect(() => {
        const getEvents = async () => {
            const res = await getAllWorkspaces()
            setEvents(res)
        }
        getEvents()
    })
    return (
        <div className="py-6">
            <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                <ChevronLeft className="h-6 w-6" />
                <span className="font-semibold">Home</span>
            </div>

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <CardTitle>Events</CardTitle>
                        <CardDescription>Manage your upcoming and past events.</CardDescription>
                    </div>
                    <Button>
                        <Link href="dashboard/create-event">Create Event</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Event Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events
                                .filter((workspace: IWorkspace) => typeof workspace._id === "string")
                                .map((workspace: IWorkspace) => (
                                    <TableRow key={workspace._id}>
                                        <TableCell className="font-medium">{workspace.name}</TableCell>
                                        {/* <TableCell>{format(new Date(event.startDateTime), "PP")} - {format(new Date(event.endDateTime), "PP")}</TableCell> */}
                                        <TableCell>{workspace.location}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <WorkspaceTableActions workspace={workspace} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
