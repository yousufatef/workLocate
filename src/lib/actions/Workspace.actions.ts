"use server";

import axios from 'axios';
import { handleError } from '../utils';

export async function getAllWorkspaces() {
    try {
        const { data } = await axios.get(
            'https://worklocate-315a35b40e37.herokuapp.com/api/workspace/all'
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

        const res = await axios.get(
            `https://worklocate-315a35b40e37.herokuapp.com/api/workspace/${id}`
        );
        return res.data;
    } catch (error) {
        handleError(error);
        return null;
    }
}
