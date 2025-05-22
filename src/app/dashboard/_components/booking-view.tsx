"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllReservations } from "@/lib/actions/reservation.actions" // You'll need to create this
import { format } from "date-fns"

interface Reservation {
    _id: string;
    userId: string;
    eventId: {
        _id: string;
        title: string;
        startDateTime: Date;
        price?: number;
    };
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    createdAt: Date;
    status: "confirmed" | "cancelled" | "completed";
}

export function ReservationView() {
    const router = useRouter()
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const allReservations = await getAllReservations()
                setReservations(allReservations)
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
                                <TableHead>Reservation</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reservations.map((reservation) => (
                                <TableRow key={reservation._id}>
                                    <TableCell className="font-medium">BK-{reservation._id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell>{reservation.eventId.title}</TableCell>
                                    <TableCell>{reservation.user?.firstName} {reservation.user?.lastName}</TableCell>
                                    <TableCell>{reservation.eventId.title}</TableCell>
                                    <TableCell>{format(new Date(reservation.eventId.startDateTime), "PP")}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}