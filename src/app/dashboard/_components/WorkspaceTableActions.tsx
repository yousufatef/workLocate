"use client"

import { useState } from 'react'
import { Pen, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/common/LoadingSpinner'

interface WorkspaceTableActionsProps<T> {
    item: T
    path: string
    deleteFn: (params: { id: string }) => Promise<void>
}

const WorkspaceTableActions = <T extends { _id: string }>({
    item,
    path,
    deleteFn,
}: WorkspaceTableActionsProps<T>) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        try {
            setLoading(true)
            await deleteFn({ id: item._id })
            // optionally refresh or show a toast here
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Button size="icon" variant="destructive" onClick={handleDelete}>
                {loading ? <LoadingSpinner /> : <Trash size={16} />}
            </Button>
            <Button size="icon" onClick={() => router.push(`dashboard/update-${path}/${item._id}`)}>
                <Pen size={16} />
            </Button>
        </>
    )
}

export default WorkspaceTableActions
