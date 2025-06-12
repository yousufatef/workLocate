import { BookingContainer } from "@/components/booking/BookingContainer"
import { BookingLoading } from "@/components/booking/BookingLoading"
import { Suspense } from "react"


export default async function BookingPage({ params }: { params: Promise<{ roomId: string }> }) {
    const { roomId } = await params

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<BookingLoading />}>
                <BookingContainer roomId={roomId} />
            </Suspense>
        </div>
    )
}
