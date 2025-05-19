import Heading from "../common/Heading"
import { Card } from "@/components/ui/card"
import StarRating from "./StarRating"

interface Review {
    rating: number
    comment: string
    name?: string
    date?: string
}

interface ReviewsProps {
    reviews: Review[]
}

const Reviews = ({ reviews }: ReviewsProps) => {
    return (
        <div>
            <Heading>Reviews</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reviews.map((review, index) => (
                    <Card key={index} className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative">
                                <img
                                    src="/person.png"
                                    alt="User avatar"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <p className="font-medium">{review.name || "Anonymous"}</p>
                                <p className="text-xs text-gray-500">{review.date || "Just now"}</p>
                            </div>
                        </div>
                        <h4 className="font-semibold text-[#024E68]">Amazing Workspace!</h4>
                        <div className="flex">
                            <StarRating rate={review.rating} />
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Reviews
