import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, DollarSign, MapPin, Building } from "lucide-react"
import { ImageCarousel } from "../rooms/image-carousel"
import { Room } from "@/types/rooms"


interface RoomDetailsProps {
    room: Room
}

export function RoomDetails({ room }: RoomDetailsProps) {
    const formatDate = (dateString?: string) => {
        if (!dateString) {
            return "Unknown date";
        }
        try {
            return new Date(dateString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } catch {
            return "Unknown date";
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{room.name}</CardTitle>
                    <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        {room.workspaceId?.name}
                    </div>
                </CardHeader>
                <CardContent>
                    <ImageCarousel images={room.images || []} alt={room.name} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Room Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <strong>Capacity:</strong> {room.capacity} people
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <strong>Price:</strong> ${room.pricePerHour}/hour
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <strong>Type:</strong> {room.type}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                                <strong>Available:</strong> {room.availableSeats} seats
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                            {room?.amenities?.map((amenity, index) => (
                                <Badge key={index} variant="secondary">
                                    {amenity}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Workspace Owner</h4>
                        <p className="text-sm text-muted-foreground">
                            {room.workspaceId?.ownerId?.firstName} {room.workspaceId?.ownerId?.lastName}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Last Updated</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(room.updatedAt)}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
