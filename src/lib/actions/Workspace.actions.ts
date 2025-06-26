"use server";

import { IWorkspace } from '@/types/workspace';
import axiosInstance from '../axios';
import { handleError } from '../utils';
import axios from 'axios';
interface WorkspacesResponse {
    workingSpaces: IWorkspace[];
    totalPages: number;
}
export interface IWorkspaceProp {
    name: string;
    address: string;
    description: string;
    amenities: string[];
    roomCounter: number;
    clerkId?: string;
    adminId?: string;
}

export async function getAllWorkspaces({ query, limit = 6, page = 1 }: { query?: string; limit?: number; page?: number }): Promise<WorkspacesResponse> {
    try {
        const res = await axiosInstance.get('/workspace/all/pagenation', {
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
export async function deleteWorkspace({ workspaceId }: { workspaceId: string }) {
    try {
        const res = await axiosInstance.delete(`/workspace/${workspaceId}`);
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
}
export const updateWorkspace = async (values: IWorkspaceProp, workspaceId: string) => {
    try {
        const res = await axiosInstance.put(`/workspace/${workspaceId}/update`, values);
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
};
export const createWorkspace = async (values: IWorkspaceProp) => {
    try {
        const res = await axios.post(
            "https://worklocate-315a35b40e37.herokuapp.com/api/workspace/create",
            values,
            {
                headers: { "Content-Type": "application/json" }, // ← أضف دي
                withCredentials: true, // لو الـ API محتاج كوكيز/سِشن
            }
        );
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
};
