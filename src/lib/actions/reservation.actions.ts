"use server";
import { handleError } from '../utils';
import axiosInstance from '../axios';
import { IReservation } from '@/types/reservation';



interface ReservationsResponse {
    reservations: IReservation[];
}


export async function getAllReservations(): Promise<ReservationsResponse> {
    try {

        const res = await axiosInstance.get('/reservation/admin/all-reservations');
        return { reservations: res.data.reservations };
    } catch (error) {
        handleError(error);
        return { reservations: [] };
    }
}