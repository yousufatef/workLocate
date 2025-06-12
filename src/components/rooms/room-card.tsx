"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, MapPin, Calendar, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { ImageCarousel } from "./image-carousel"
import { Room } from "@/types/rooms"

interface RoomCardProps {
    room: Room
}

export function RoomCard({ room }: RoomCardProps) {
    const router = useRouter()

    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            case "occupied":
                return "bg-red-100 text-red-800 hover:bg-red-200"
            case "unavailable":
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })
        } catch {
            return "Unknown date"
        }
    }

    const handleBookRoom = () => {
        router.push(`/booking/${room._id}`)
    }

    const isAvailable = room.availabilityStatus === "available"

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <ImageCarousel images={room.images || []} alt={room.name || "Room"} />

            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">{room.name}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {room.workspaceId?.name || "Unknown workspace"}
                        </div>
                    </div>
                    <Badge className={getStatusColor(room.availabilityStatus)} variant="secondary">
                        {room.availabilityStatus}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        <span>
                            {room.availableSeats || 0}/{room.capacity || 0} seats
                        </span>
                    </div>
                    <div className="flex items-center text-lg font-semibold text-green-600">
                        <DollarSign className="w-4 h-4" />
                        {room.pricePerHour || 0}/hr
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-sm font-medium">Room Type</div>
                    <Badge variant="outline" className="capitalize">
                        {room.type || "Unknown"}
                    </Badge>
                </div>

                <div className="space-y-2">
                    <div className="text-sm font-medium">Amenities</div>
                    <div className="flex flex-wrap gap-1">
                        {(room.amenities || []).map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                                {amenity}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="flex items-center text-xs text-muted-foreground pt-2 border-t">
                    <Calendar className="w-3 h-3 mr-1" />
                    Updated: {formatDate(room.updatedAt || "")}
                </div>

                <div className="text-xs text-muted-foreground">
                    Owner: {room.workspaceId?.ownerId?.firstName || ""} {room.workspaceId?.ownerId?.lastName || ""}
                </div>

                {/* Book Button */}
                <div className="pt-4">
                    <Button
                        onClick={handleBookRoom}
                        disabled={!isAvailable}
                        className="w-full"
                        variant={isAvailable ? "default" : "secondary"}
                    >
                        {isAvailable ? (
                            <>
                                <Clock className="w-4 h-4 mr-2" />
                                Book Now
                            </>
                        ) : (
                            "Currently Unavailable"
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
