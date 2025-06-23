import { Room } from '@/types/rooms';
import { handleError } from '../utils';
import axios from 'axios';

export async function getAllRooms(): Promise<{ rooms: Room[] }> {
    try {
        const { data } = await axios.get("https://worklocate-315a35b40e37.herokuapp.com/api/room/all-admin");

        if (!data.success) throw new Error("Request failed");

        return { rooms: data.data };
    } catch (error) {
        handleError(error);
        return { rooms: [] };
    }
}

export async function getRoomById(roomId: string): Promise<Room | null> {
    if (!roomId || typeof roomId !== "string") {
        console.error("Invalid room ID type");
        return null;
    }

    try {
        const response = await axios.get<{ room?: Room }>(
            `https://worklocate-315a35b40e37.herokuapp.com/api/room/${roomId}`
        );

        return response.data.room ?? null;
    } catch (error) {
        handleError(error);
        return null;
    }
}


export async function deleteRoom({ workspaceId, roomId }: { workspaceId: string; roomId: string }) {
    try {
        const res = await axios.delete(`https://worklocate-315a35b40e37.herokuapp.com/api/room/${workspaceId}/${roomId}`);
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
}
export const updateRoom = async ({ values, roomId }: { values: Room; roomId: string }) => {
    try {
        console.log("Updating room with values:", values, "and roomId:", roomId);
        const res = await axios.put(`https://worklocate-315a35b40e37.herokuapp.com/api/room/${roomId}`, values);
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
};