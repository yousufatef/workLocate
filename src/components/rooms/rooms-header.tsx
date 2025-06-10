import { Badge } from "@/components/ui/badge"
import { Room } from "@/types/rooms"

interface RoomsHeaderProps {
    rooms: Room[]
    availableCount: number
    totalCapacity: number
}

export function RoomsHeader({ rooms, availableCount, totalCapacity }: RoomsHeaderProps) {
    return (
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Workspace Rooms</h1>
            <p className="text-muted-foreground mb-4">
                {rooms.length > 0 && rooms[0].workspaceId?.name
                    ? `Rooms in ${rooms[0].workspaceId.name}`
                    : "Discover and book the perfect workspace for your needs"}
            </p>

            {rooms.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-6">
                    <Badge variant="outline" className="px-3 py-1">
                        {rooms.length} Total Rooms
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1 bg-green-50 text-green-700">
                        {availableCount} Available
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                        {totalCapacity} Total Capacity
                    </Badge>
                </div>
            )}
        </div>
    )
}
