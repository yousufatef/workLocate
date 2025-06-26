"use client"

import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
import { Room } from "@/types/rooms"
import { BookingError } from "./BookingError"
import { BookingForm } from "./BookingForm"
import { RoomDetails } from "./RoomDetails"

interface BookingContainerProps {
    roomId: string
}

export function BookingContainer({ roomId }: BookingContainerProps) {
    // const router = useRouter()
    const [room, setRoom] = useState<Room | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchRoom = async () => {
            if (!roomId) {
                setError("Room ID is required")
                setLoading(false)
                return
            }

            try {
                setLoading(true)
                setError(null)

                const mockRoom: Room = {
                    _id: roomId,
                    name: "Abshire, Kling and Schaefer Workspace - Room 1",
                    capacity: 7,
                    pricePerHour: 215,
                    availableSeats: 7,
                    availabilityStatus: "available",
                    type: "shared",
                    workspaceId: "6807bb4783f409bf85c9c73b",
                    amenities: ["Printer", "Coffee", "Meeting Room"],
                    __v: 1,
                    createdAt: "2025-04-22T15:54:31.467Z",
                    updatedAt: "2025-05-21T15:34:00.479Z",
                    images: [
                        "https://media.istockphoto.com/id/1174108435/photo/modern-office-interior.jpg?s=2048x2048&w=is&k=20&c=xlgpOv3M4vRQCLqdTHtYdakNdDoxFWH2Bossjt05mYk=",
                        "https://media.istockphoto.com/id/1436083572/photo/an-empty-office-with-computer-equipment.jpg?s=2048x2048&w=is&k=20&c=nDAftkge2QwRgFNZbXRLzmXY-Ji-qYnPY2dhWAEp0hE=",
                    ],
                }

                setRoom(mockRoom)
            } catch (error) {
                console.error("Error fetching room:", error)
                setError(error instanceof Error ? error.message : "Failed to fetch room details")
            } finally {
                setLoading(false)
            }
        }

        fetchRoom()
    }, [roomId])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading room details...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return <BookingError error={error} />
    }

    if (!room) {
        return <BookingError error="Room not found" />
    }

    if (room.availabilityStatus !== "available") {
        return <BookingError error="This room is currently not available for booking" />
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RoomDetails room={room} />
            <BookingForm room={room} />
        </div>
    )
}
