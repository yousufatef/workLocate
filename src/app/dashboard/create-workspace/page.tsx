"use client";
import WorkspaceForm from '@/components/workspace/WorkspaceForm';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react'

const CreateWorkspacePage = () => {
    const { isSignedIn, user, isLoaded } = useUser();

    useEffect(() => {

    }, []);

    if (!isLoaded) {
        return null;
    }
    if (isSignedIn && user.publicMetadata.role === 'admin') {
        return (
            <>
                <div className="my-8">
                    {<WorkspaceForm type='create' />}
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

export default CreateWorkspacePage