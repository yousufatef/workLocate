"use client";
import WorkspaceForm from '@/components/workspace/WorkspaceForm';
import { getWorkspaceById } from '@/lib/actions/Workspace.actions';
import { IWorkspace } from '@/types/workspace';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdateWorkspacePage = () => {
    const { id } = useParams();
    const [workspace, setWorkspace] = useState<IWorkspace>();
    const { isSignedIn, user, isLoaded } = useUser();
    console.log('UpdateWorkspacePage id:', id);
    console.log('UpdateWorkspacePage:', workspace);

    useEffect(() => {
        const getWorkspace = async () => {
            if (typeof id === 'string') {
                const { workingSpace } = await getWorkspaceById({ id });
                setWorkspace(workingSpace ?? undefined);
            }
        };
        getWorkspace();
    }, [id]);

    if (!isLoaded) {
        return null;
    }
    if (isSignedIn && user.publicMetadata.role === 'admin') {
        return (
            <>
                <div className="my-8">
                    {workspace && workspace._id && <WorkspaceForm type='edit' workspace={workspace} workspaceId={workspace._id} />}
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

export default UpdateWorkspacePage