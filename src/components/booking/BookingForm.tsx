"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { Calendar, Clock, DollarSign, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Room } from "@/types/rooms"
import axios from "axios"

interface BookingFormProps {
    room: Room
}

interface FormDataType {
    date: string
    startTime: string
    endTime: string
    attendees: number
    notes: string
}

export function BookingForm({ room }: BookingFormProps) {
    const router = useRouter()
    const { user } = useUser()
    const mongoId = user?.publicMetadata?.userMongoId

    const [formData, setFormData] = useState<FormDataType>({
        date: "",
        startTime: "",
        endTime: "",
        attendees: 1,
        notes: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const calculateDuration = (): number => {
        if (!formData.startTime || !formData.endTime) return 0
        const start = new Date(`2000-01-01T${formData.startTime}`)
        const end = new Date(`2000-01-01T${formData.endTime}`)
        if (end <= start) return 0
        return (end.getTime() - start.getTime()) / (1000 * 60 * 60)
    }

    const calculateTotalPrice = (): number => {
        return calculateDuration() * (room?.pricePerHour ?? 0)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: name === "attendees" ? parseInt(value) || 1 : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user) {
            toast.error("Please log in to book a room.")
            return
        }

        setIsSubmitting(true)

        try {
            const duration = calculateDuration();
            const totalPrice = calculateTotalPrice();

            const response = await axios.post(`https://worklocate-315a35b40e37.herokuapp.com/api/reservation/reserve`, {
                seatsBooked: formData.attendees,
                isPaid: false,
                roomId: room._id,
                customerId: mongoId,
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                duration,
                totalPrice,
            });

            console.log("Booking response:", response.data);
            toast.success("Room booked successfully!");

            // Wait 2 seconds before redirecting
            setTimeout(() => {
                router.push(`/my-bookings`);
            }, 2000);

        } catch (err) {
            console.error(err);
            toast.error("Booking failed.");
        } finally {
            setIsSubmitting(false);
        }

    }

    const isFormValid =
        formData.date &&
        formData.startTime &&
        formData.endTime &&
        formData.attendees > 0 &&
        formData.attendees <= (room.capacity ?? 0) &&
        calculateDuration() > 0

    const duration = calculateDuration()
    const totalPrice = calculateTotalPrice()
    const today = new Date().toISOString().split("T")[0]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Book This Room</CardTitle>
                        <Button variant="outline" size="sm" onClick={() => router.back()}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="date">Date</Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    id="date"
                                    name="date"
                                    type="date"
                                    min={today}
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="pl-10"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="startTime">Start Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        id="startTime"
                                        name="startTime"
                                        type="time"
                                        value={formData.startTime}
                                        onChange={handleInputChange}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="endTime">End Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        id="endTime"
                                        name="endTime"
                                        type="time"
                                        value={formData.endTime}
                                        onChange={handleInputChange}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="attendees">Number of Attendees</Label>
                            <Input
                                id="attendees"
                                name="attendees"
                                type="number"
                                min="1"
                                max={room.capacity}
                                value={formData.attendees}
                                onChange={handleInputChange}
                                required
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Maximum capacity: {room.capacity} people
                            </p>
                        </div>

                        {duration > 0 && (
                            <Card className="bg-muted/50">
                                <CardContent className="pt-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Duration:</span>
                                            <span className="font-medium">{duration} hour{duration !== 1 ? "s" : ""}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Rate:</span>
                                            <span>${room.pricePerHour}/hour</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-semibold border-t pt-2">
                                            <span>Total:</span>
                                            <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <Button type="submit" className="w-full" disabled={!isFormValid || isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Processing Booking...
                                </>
                            ) : (
                                <>
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Book Room - ${totalPrice.toFixed(2)}
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
