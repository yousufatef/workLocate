import { Room } from "@/types/rooms"
import { RoomCard } from "./room-card"


interface RoomsGridProps {
    rooms: Room[]
}

export function RoomsGrid({ rooms }: RoomsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
            ))}
        </div>
    )
}
