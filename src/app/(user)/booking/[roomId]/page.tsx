import { BookingContainer } from "@/components/booking/BookingContainer"
import { BookingLoading } from "@/components/booking/BookingLoading"
import { Suspense } from "react"

interface PageProps {
    params: {
        roomId: string
    }
}

export default async function BookingPage({ params }: PageProps) {
    const resolvedParams = await params
    const { roomId } = resolvedParams

    return (
        <div className="container mx-auto px-4 py-8">
            <Suspense fallback={<BookingLoading />}>
                <BookingContainer roomId={roomId} />
            </Suspense>
        </div>
    )
}
