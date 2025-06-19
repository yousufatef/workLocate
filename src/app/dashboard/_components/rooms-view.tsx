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
import { deleteRoom, getAllRooms } from "@/lib/actions/room.actions"
import { Room } from "@/types/rooms"



export default function RoomsView() {
    const [rooms, setRooms] = useState<Room[]>([])
    const router = useRouter()
    useEffect(() => {
        const getRooms = async () => {
            const { rooms } = await getAllRooms();
            console.log(rooms);
            setRooms(rooms)
        }
        getRooms()
    }, [])
    return (
        <div className="py-6">
            <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                <ChevronLeft className="h-6 w-6" />
                <span className="font-semibold">Home</span>
            </div>

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <CardTitle>Rooms</CardTitle>
                        <CardDescription>Manage your upcoming and past rooms.</CardDescription>
                    </div>
                    <Button>
                        <Link href="dashboard/create-event">Add Room</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Room Name</TableHead>
                                <TableHead>Price Per Hour</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rooms
                                .filter((room) => typeof room._id === "string")
                                .map((room) => (
                                    <TableRow key={room._id}>
                                        <TableCell className="font-medium">{room.name}</TableCell>
                                        <TableCell>
                                            {room.pricePerHour}
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <WorkspaceTableActions
                                                item={room}
                                                path="room"
                                                deleteFn={deleteRoom}
                                            />
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
