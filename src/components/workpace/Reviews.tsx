import Heading from "../common/Heading"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const Reviews = () => {
    return (
        <div>
            <Heading>Reviews</Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((review) => (
                    <Card key={review} className="p-4 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative">
                                <img
                                    src="/person.png"
                                    alt="User avatar"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium">Mekias Wallace</p>
                                <p className="text-xs text-gray-500">2 days ago</p>
                            </div>
                        </div>
                        <h4 className="font-semibold text-[#024E68]">Amazing Workspace!</h4>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <p className="text-sm text-gray-700">
                            "This Coworking Space is a Game-Changer! The High-Speed Internet is Reliable, the Modern Environment
                            Makes it Perfect for Getting Work Done. Plus, The Free Coffee is a Great Bonus!"
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Reviews