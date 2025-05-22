"use server";

import { IWorkspace } from '@/types/workspace';
import axiosInstance from '../axios';
import { handleError } from '../utils';
interface WorkspacesResponse {
    workingSpaces: IWorkspace[];
}

export async function getAllWorkspaces(): Promise<WorkspacesResponse> {
    try {
        const res = await axiosInstance.get('/workspace/all');
        return { workingSpaces: res.data.workingSpaces };
    } catch (error) {
        handleError(error);
        return { workingSpaces: [] }; 
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
