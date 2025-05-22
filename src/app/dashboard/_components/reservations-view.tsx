"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllReservations } from "@/lib/actions/reservation.actions" // You'll need to create this
// import { format } from "date-fns"
import { IReservation } from "@/types/reservation"


export function ReservationView() {
    const router = useRouter()
    const [allReservations, setReservations] = useState<IReservation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const { reservations } = await getAllReservations()
                setReservations(reservations)
            } catch (err) {
                setError("Failed to fetch bookings")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [])

    if (loading) {
        return (
            <div className="py-6">
                <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                    <ChevronLeft className="h-6 w-6" />
                    <span className="font-semibold">Home</span>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Reservations</CardTitle>
                        <CardDescription>Loading bookings...</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="animate-pulse space-y-4">
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-6">
                <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                    <ChevronLeft className="h-6 w-6" />
                    <span className="font-semibold">Home</span>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Reservations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-red-500">{error}</div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="py-6">
            <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                <ChevronLeft className="h-6 w-6" />
                <span className="font-semibold">Home</span>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Reservations</CardTitle>
                    <CardDescription>View and manage customer bookings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Reservation ID</TableHead>
                                <TableHead>Room ID</TableHead>
                                {/* <TableHead>Date</TableHead> */}
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allReservations.map((reservation) => (
                                <TableRow key={reservation._id}>
                                    <TableCell className="font-medium">BK-{reservation._id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell>{reservation.roomId}</TableCell>
                                    {/* <TableCell>{reservation.user?.firstName} {reservation.user?.lastName}</TableCell> */}
                                    <TableCell>{reservation.totalPrice}</TableCell>
                                    {/* <TableCell>{format(new Date(reservation.eventId.startDateTime), "PP")}</TableCell> */}

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}