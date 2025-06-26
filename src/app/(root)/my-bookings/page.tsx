"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Calendar, AlertCircle, RefreshCw, Clock, Users, DollarSign } from "lucide-react"

interface Booking {
    _id: string
    seatsBooked: number
    roomId: {
        _id: string
        name: string
        workspaceId: string | null
    }
    customerId: string
    startTime: string
    endTime: string
    date: string
    duration: number
    isPaid: boolean
    totalPrice: number
    createdAt: string
    updatedAt: string
}

interface ProcessedBooking extends Booking {
    formattedDate: string
    formattedTimeRange: string
    formattedCreatedAt: string
    upcomingStatus: "Upcoming" | "Past"
    isUpcoming: boolean
}

const MyBookingsPage = () => {
    const [, setBookings] = useState<Booking[]>([])
    const [processedBookings, setProcessedBookings] = useState<ProcessedBooking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hasMounted, setHasMounted] = useState(false)

    const customerId = "682f885941fe6e44c2b4889f"

    const processBookings = (rawBookings: Booking[]): ProcessedBooking[] => {
        const now = new Date()

        return rawBookings
            .filter((booking) => booking && booking.roomId) // Filter out bookings with null roomId
            .map((booking) => {
                // Parse the booking date and time with null checks
                const bookingDate = new Date(booking.date || new Date())
                const startTime = booking.startTime || "00:00"
                const endTime = booking.endTime || "00:00"

                const [startHour, startMinute] = startTime.split(":").map(Number)
                const [endHour, endMinute] = endTime.split(":").map(Number)

                const startDateTime = new Date(bookingDate)
                startDateTime.setHours(startHour || 0, startMinute || 0, 0, 0)

                const endDateTime = new Date(bookingDate)
                endDateTime.setHours(endHour || 0, endMinute || 0, 0, 0)

                // Format date and time with fallbacks
                const formattedDate = bookingDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })

                const formattedTimeRange = `${startTime} - ${endTime}`

                const formattedCreatedAt = new Date(booking.createdAt || new Date()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })

                // Determine if booking is upcoming
                const isUpcoming = startDateTime > now
                const upcomingStatus: "Upcoming" | "Past" = isUpcoming ? "Upcoming" : "Past"

                return {
                    ...booking,
                    formattedDate,
                    formattedTimeRange,
                    formattedCreatedAt,
                    upcomingStatus,
                    isUpcoming,
                }
            })
            .sort((a, b) => {
                // Sort by date, upcoming first
                const dateA = new Date((a.date || "") + " " + (a.startTime || ""))
                const dateB = new Date((b.date || "") + " " + (b.startTime || ""))

                if (a.isUpcoming && !b.isUpcoming) return -1
                if (!a.isUpcoming && b.isUpcoming) return 1

                return a.isUpcoming ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
            })
    }

    const fetchBookings = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.get(
                "https://worklocate-315a35b40e37.herokuapp.com/api/reservation/customer/my-reservations",
                {
                    params: { customerId },
                },
            )

            const rawBookings = response.data?.reservations || []

            // Validate that we have an array
            if (!Array.isArray(rawBookings)) {
                throw new Error("Invalid response format")
            }

            setBookings(rawBookings)
            setProcessedBookings(processBookings(rawBookings))
        } catch (err: unknown) {
            console.error("Error fetching bookings:", err)
            if (axios.isAxiosError(err)) {
                setError(`Failed to fetch bookings: ${err.response?.data?.message || err.message}`)
            } else {
                setError("Failed to fetch bookings. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setHasMounted(true)
        fetchBookings()
    }, [])

    if (!hasMounted || loading) {
        return (
            <div className="container mx-auto p-6 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">My Bookings</h1>
                    <Skeleton className="h-10 w-24" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">My Bookings</h1>
                <Button onClick={fetchBookings} variant="outline" size="sm" disabled={loading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </Button>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                        <span>{error}</span>
                        <Button onClick={fetchBookings} variant="outline" size="sm" className="ml-4">
                            Try Again
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {!error && processedBookings.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                        <p className="text-muted-foreground text-center">
                            {"You haven't made any bookings yet. Start by exploring available rooms and make your first reservation."}
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {processedBookings.map((booking) => (
                        <Card key={booking._id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl mb-1">{booking.roomId?.name || "Unknown Room"}</CardTitle>
                                        <p className="text-sm text-muted-foreground">Booking ID: {booking._id?.slice(-8) || "N/A"}</p>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <Badge variant={booking.isUpcoming ? "default" : "secondary"}>{booking.upcomingStatus}</Badge>
                                        <Badge variant={booking.isPaid ? "default" : "destructive"}>
                                            {booking.isPaid ? "Paid" : "Unpaid"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Date:</span>
                                            <span>{booking.formattedDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Time:</span>
                                            <span>{booking.formattedTimeRange}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Seats:</span>
                                            <span>{booking.seatsBooked || 0}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-sm">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Total Price:</span>
                                            <span className="font-semibold">${booking.totalPrice || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Duration:</span>
                                            <span>{booking.duration || 0} minutes</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-medium">Booked on:</span>
                                            <span>{booking.formattedCreatedAt}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyBookingsPage
