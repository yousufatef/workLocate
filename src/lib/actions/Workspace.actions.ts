"use server";

import axiosInstance from '../axios';
import { handleError } from '../utils';

export async function getAllWorkspaces() {
    try {
        const { data } = await axiosInstance.get(
            '/workspace/all'
        );
        return data;
    } catch (error) {
        handleError(error);
        return null;
    }
}

export async function getWorkspaceById({ id }: { id: string }) {
    try {
        console.log(id);

        const res = await axiosInstance.get(
            `/workspace/${id}`
        );
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
}
