"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { handleError } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"

interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    isAdmin: boolean;
    lastActive: string;
    profilePicture?: string;
}

export function OwnerView() {
    const [owners, setOwners] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    useEffect(() => {
        const fetchOwners = async () => {
            try {
                setIsLoading(true)
                const res = await axios.get('https://worklocate-315a35b40e37.herokuapp.com/api/auth/admin/owners')
                setOwners(res.data.owners)
                setIsLoading(false)
            } catch (err) {
                handleError(err)
                setIsLoading(false)
            }
        }


        fetchOwners()
    }, [])


    return (
        <div className="py-6">
            <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                <ChevronLeft className="h-6 w-6" />
                <span className="font-semibold">Home</span>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Owners</CardTitle>
                    <CardDescription>Manage your owners and their permissions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Owner</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                // Show skeleton loader while loading
                                <TableRow>
                                    <TableCell colSpan={2}>
                                        <OwnerViewSkeleton />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                // Show actual data when loaded
                                owners.map((owner) => (
                                    <TableRow key={owner.email}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={owner.profilePicture || "/placeholder.svg"} alt={owner.firstName} />
                                                    <AvatarFallback>{owner.firstName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{owner.firstName} {owner.lastName}</div>
                                                    <div className="text-sm text-muted-foreground">{owner.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>Owner</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

const OwnerViewSkeleton = () => {
    return (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                        <Skeleton className="h-4 w-[150px]" />
                        <Skeleton className="h-3 w-[100px]" />
                    </div>

                </div>
            ))}
        </div>
    )
}