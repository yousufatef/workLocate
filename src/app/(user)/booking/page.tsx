"use client"
import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import SelectDate from "@/components/booking/SelectDate"
import SelectSpace from "@/components/booking/SelectSpace"
import { useRouter } from "next/navigation"




export default function BookingPage() {
    const [date,] = useState<Date | undefined>(new Date())
    const [selectedSpace,] = useState("shared")
    const [paymentMethod,] = useState("card")
    const router = useRouter()
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Book Your Workspace</h1>

                {/* <BookingForm /> */}
                <SelectDate />
                <SelectSpace />

                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium">Selected Space:</span>
                                <span>
                                    {selectedSpace === "shared" ? "Shared Space" : selectedSpace === "cabin" ? "Cabin" : "Meeting Room"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Date:</span>
                                <span>{date ? format(date, "MMMM d, yyyy") : "Not selected"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Price:</span>
                                <span className="font-bold text-[#024E68]">
                                    {selectedSpace === "shared" ? "$15.00" : selectedSpace === "cabin" ? "$25.00" : "$30.00"}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Payment Method:</span>
                                <span>{paymentMethod === "card" ? "Credit/Debit Card" : "Cash"}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={() => router.push("/payment")}>
                            Continue to Payment
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    )
}
