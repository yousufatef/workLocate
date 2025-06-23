"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
// import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import WorkspaceTableActions from "./WorkspaceTableActions"
import { IWorkspace } from "@/types/workspace"
import { getAllWorkspaces } from "@/lib/actions/Workspace.actions"



export default function WorkspacesView() {
    const [workspaces, setWorkspaces] = useState<IWorkspace[]>([])
    const router = useRouter()
    useEffect(() => {
        const getWorkspaces = async () => {
            const { workingSpaces } = await getAllWorkspaces({});
            console.log(workingSpaces);
            setWorkspaces(workingSpaces)

        }
        getWorkspaces()
    }, [])
    return (
        <div className="py-6">
            <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                <ChevronLeft className="h-6 w-6" />
                <span className="font-semibold">Home</span>
            </div>

            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <CardTitle>workspaces</CardTitle>
                        <CardDescription>Manage your upcoming and past workspaces.</CardDescription>
                    </div>
                    <Button>
                        <Link href="dashboard/create-workspace">Add Workspace</Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Workspace Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {workspaces
                                .filter((workspace) => typeof workspace._id === "string")
                                .map((workspace) => (
                                    <TableRow key={workspace._id}>
                                        <TableCell className="font-medium">{workspace.name}</TableCell>
                                        <TableCell>
                                            {workspace.address}
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <WorkspaceTableActions
                                                workspaceId={workspace._id}
                                            />

                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
