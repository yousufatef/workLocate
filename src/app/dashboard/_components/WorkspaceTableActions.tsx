"use client"
import { useState } from 'react'
import { Pen, Trash } from 'lucide-react'
// import { deleteEvent } from '@/lib/actions/event.actions'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { IWorkspace } from '@/types/workspace'
import Spinner from '@/components/common/Spinner'


const WorkspaceTableActions = ({ workspace }: { workspace: IWorkspace }) => {
    const [loading, ] = useState(false)
    const router = useRouter()
    return (
        <>

            <Button size={"icon"} variant={"destructive"} onClick={async () => {
                // setLoading(true)
                // await deleteEvent({ workspaceId: workspace._id as string })
                // setLoading(false)
            }}>
                {loading ? <Spinner /> : <Trash size={16} />}
            </Button>
            <Button size={"icon"} onClick={() => router.push(`dashboard/update-event/${workspace._id}`)}>
                <Pen size={16} />
            </Button>
        </>
    )
}

export default WorkspaceTableActions