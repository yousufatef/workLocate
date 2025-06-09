import Heading from "../common/Heading"
import { Card, CardContent } from "@/components/ui/card"
import StarRating from "./StarRating"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"

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
        <div className="mb-6 md:mb-8">
            <Heading>Reviews</Heading>
            <div>
                <Carousel>
                    <CarouselContent>
                        {reviews.map((review, index) => (
                            <CarouselItem className="sm:basic-1 md:basis-1/2 lg:basis-1/3" key={index}>
                                <Card className="p-4 space-y-3">
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
                                    <CardContent className="h-56 flex flex-col space-y-2">
                                        <h4 className="font-semibold text-[#024E68]">Amazing Workspace!</h4>
                                        <div className="flex">
                                            <StarRating rate={review.rating} />
                                        </div>
                                        <p className="text-sm text-gray-700">{review.comment}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-[16px] max-lg:hidden" />
                    <CarouselNext className="mr-[16px] max-lg:hidden" />
                </Carousel>

            </div>
        </div >
    )
}

export default Reviews
