"use client";
import RoomForm from '@/components/rooms/RoomForm';
import { getRoomById } from '@/lib/actions/room.actions';
import { Room } from '@/types/rooms';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdateRoomPage = () => {
    const { id } = useParams();
    const [room, setRoom] = useState<Room>();
    const { isSignedIn, user, isLoaded } = useUser();
    console.log('id:', id);
    useEffect(() => {
        const getRoom = async () => {
            if (typeof id === 'string') {
                const room = await getRoomById(id);
                setRoom(room ?? undefined);
            }
        };
        getRoom();
    }, [id]);

    if (!isLoaded) {
        return null;
    }
    if (isSignedIn && user.publicMetadata.role === 'admin') {
        return (
            <>
                <div className="my-8">
                    {room && room._id && (
                        <RoomForm
                            type="edit"
                            room={room}
                        />
                    )}
                </div>

            </>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="mt-4 text-lg">You do not have permission to access this page....</p>
            </div>
        );
    }
}

export default UpdateRoomPage