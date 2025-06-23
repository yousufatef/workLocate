"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { deleteWorkspace } from "@/lib/actions/Workspace.actions";


const TableActions = ({ workspaceId }: { workspaceId: string }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        try {
            setLoading(true);
            await deleteWorkspace({ workspaceId });
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-2">
            <Button
                size="icon"
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
            >
                {loading ? <LoadingSpinner /> : <Trash size={16} />}
            </Button>

            <Button
                size="icon"
                onClick={() => router.push(`/dashboard/update-workspace/${workspaceId}`)}
            >
                <Pen size={16} />
            </Button>
        </div>
    );
};

export default TableActions;
