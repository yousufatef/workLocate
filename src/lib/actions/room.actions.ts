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
export async function deleteRoom({ id }: { id: string }) {
    try {
        const res = await axios.delete(`https://worklocate-315a35b40e37.herokuapp.com/api/room/6807bb4683f409bf85c9c6dc/6807bbaa1849180415b2f081/${id}`);
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
}
