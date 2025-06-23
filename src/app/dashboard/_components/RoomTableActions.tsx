"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { deleteRoom, getRoomById } from "@/lib/actions/room.actions";
import { Room } from "@/types/rooms";

interface RoomTableActionsProps {
    roomId: string;
}

const RoomTableActions = ({ roomId }: RoomTableActionsProps) => {
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState<Room | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                setLoading(true);
                const fetchedRoom = await getRoomById(roomId);

                if (!fetchedRoom) throw new Error("Room not found");

                setRoom(fetchedRoom);
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (roomId) fetchRoom();
    }, [roomId]);

    const handleDelete = async () => {
        if (!room) return console.error("Room data not loaded");

        const workspaceId = room.workspaceId;
        if (!workspaceId) return console.error("workspaceId is missing");

        const confirmDelete = window.confirm("متأكد إنك عايز تمسح الغرفة؟");
        if (!confirmDelete) return;

        if (!workspaceId) {
            console.error("workspaceId is missing");
            return;
        }

        try {
            setLoading(true);

            const res = await deleteRoom({
                roomId,
                workspaceId: workspaceId,
            });

            if (res?.success === false) throw new Error(res.message);

            router.refresh(); // Or router.push("/dashboard");
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (!room) return;

        const workspaceId = room.workspaceId;
        if (!workspaceId) return console.error("workspaceId is missing");

        router.push(`/dashboard/update-room/${workspaceId}`);
    };

    return (
        <div className="flex gap-2">
            <Button
                size="icon"
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
            >
                <Trash size={16} />
            </Button>

            <Button
                size="icon"
                onClick={handleEdit}
                disabled={!room}
            >
                <Pen size={16} />
            </Button>
        </div>
    );
};

export default RoomTableActions;
