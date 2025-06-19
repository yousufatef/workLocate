"use server";

import { IWorkspace } from '@/types/workspace';
import axiosInstance from '../axios';
import { handleError } from '../utils';
interface WorkspacesResponse {
    workingSpaces: IWorkspace[];
    totalPages: number;
}


export async function getAllWorkspaces({ query, limit = 6, page = 1 }: { query?: string; limit?: number; page?: number }): Promise<WorkspacesResponse> {
    try {
        const res = await axiosInstance.get('/workspace/all', {
            params: {
                page,
                query,
                limit
            },
        });
        return {
            workingSpaces: res.data.data,
            totalPages: res.data.totalPages,
        };
    } catch (error) {
        handleError(error);
        return { workingSpaces: [], totalPages: 0 };
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
export async function deleteWorkspace({ id }: { id: string }) {
    try {
        const res = await axiosInstance.delete(`/workspace/${id}`);
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
}
