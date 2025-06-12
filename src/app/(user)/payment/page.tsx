"use client"

import { useState } from "react"
import { CreditCard, DollarSign, Check, ArrowLeft, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookingProgressBar } from "@/components/booking/BookingContainer"



export default function Payment() {
    const router = useRouter()
    const [paymentMethod, setPaymentMethod] = useState<string>("card")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isComplete, setIsComplete] = useState(false)



    const handleSubmit = () => {
        setIsSubmitting(true)

        // Simulate payment processing
        setTimeout(() => {
            setIsSubmitting(false)
            setIsComplete(true)

            // Redirect to confirmation after 2 seconds
            setTimeout(() => {
                router.push("/")
            }, 2000)
        }, 1500)
    }

    if (isComplete) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                        <p className="text-muted-foreground mb-6">
                            Your booking has been confirmed. Redirecting to confirmation page...
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <BookingProgressBar currentStep={2} />
                    <div className="flex flex-col gap-8 mt-8">
                        <div className="flex items-center">
                            <Link href="/booking">
                                <Button variant="ghost" size="sm" className="gap-1">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back to Booking
                                </Button>
                            </Link>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                                <CardDescription>{"Choose how you'd like to pay"}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className={`flex cursor-pointer items-center justify-center rounded-md border p-4 ${paymentMethod === "cash" ? "border-primary bg-primary/5" : ""
                                            }`}
                                        onClick={() => setPaymentMethod("cash")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-5 w-5" />
                                            <span className="font-medium">Cash</span>
                                            {paymentMethod === "cash" && <Check className="ml-2 h-4 w-4 text-primary" />}
                                        </div>
                                    </div>
                                    <div
                                        className={`flex cursor-pointer items-center justify-center rounded-md border p-4 ${paymentMethod === "card" ? "border-primary bg-primary/5" : ""
                                            }`}
                                        onClick={() => setPaymentMethod("card")}
                                    >
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="h-5 w-5" />
                                            <span className="font-medium">Credit/Debit Card</span>
                                            {paymentMethod === "card" && <Check className="ml-2 h-4 w-4 text-primary" />}
                                        </div>
                                    </div>
                                </div>

                                {paymentMethod === "card" && (
                                    <div className="mt-6 space-y-4">
                                        <h3 className="text-lg font-medium">Enter Card Details</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="cardName">Card Name</Label>
                                                <Input id="cardName" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cardNumber">Card Number</Label>
                                                <div className="relative">
                                                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                        <div className="flex items-center gap-1">
                                                            <div className="h-6 w-10 rounded bg-red-500" />
                                                            <div className="h-6 w-10 rounded bg-yellow-500" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="expireDate">Expiry Date</Label>
                                                    <Input id="expireDate" placeholder="MM/YY" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cvv">CVV</Label>
                                                    <Input id="cvv" placeholder="123" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === "cash" && (
                                    <div className="mt-6 space-y-4">
                                        <div className="rounded-md bg-amber-50 p-4 text-amber-800">
                                            <p className="text-sm">
                                                {" You've selected to pay with cash. Please note that you'll need to pay at the reception desk when you arrive at the workspace."}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="pt-4 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="terms" />
                                        <Label htmlFor="terms" className="text-sm">
                                            I agree to the{" "}
                                            <Link href="#" className="text-primary hover:underline">
                                                Terms and Conditions
                                            </Link>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="saveCard" />
                                        <Label htmlFor="saveCard" className="text-sm">
                                            Save Card Details for future bookings
                                        </Label>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? "Processing..." : "Complete Booking"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
