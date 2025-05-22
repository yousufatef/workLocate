"use server";
import { handleError } from '../utils';
import axiosInstance from '../axios';

export async function getAllReservations() {
    try {
        const { data } = await axiosInstance.get(
            '/reservation/admin/all-reservations'
        );
        return data;
    } catch (error) {
        handleError(error);
        return null;
    }
}