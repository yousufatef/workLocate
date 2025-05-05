"use client"
import { Button } from "@/components/ui/button"
import Amenities from "@/components/workpace/Amenities"
import Availability from "@/components/workpace/Availability"
import ImageGrid from "@/components/workpace/ImageGrid"
import Reviews from "@/components/workpace/Reviews"
import { Heart, MapPin, Star } from "lucide-react"
import { useRouter } from "next/navigation"

const Workspace = () => {
    const router = useRouter()

    const mainImage = {
        src: "/five.png",
        alt: "Modern office space with desks and plants",
    };

    const smallImages = [
        { src: "/one.png", alt: "Meeting area with blue chairs" },
        { src: "/two.png", alt: "Office space with plants" },
        { src: "/three.png", alt: "Lounge area with blue chairs" },
        { src: "/four.png", alt: "Modern office desks" },
    ];
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* header title  */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold">WorkNest</h1>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                    <p className="text-sm font-bold">$50 / Hour</p>
                    <Button className="w-full md:w-auto bg-[#024E68] hover:bg-[#01394D] cursor-pointer transition-colors duration-300 ease-in-out"
                        onClick={() => router.push("/booking")}>BOOK NOW</Button>
                </div>
            </div>

            <div>
                <ImageGrid mainImage={mainImage} smallImages={smallImages} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                    <div className="mb-8">
                        <h2 className="font-semibold mb-4">
                            Welcome to <span className="text-xl text-[#024E68]">WorkNest</span>, a modern and fully equipped workspace designed
                            for freelancers, remote workers, and teams looking for a professional and productive environment. Whether
                            you need a hot desk, private office, or meeting room, we have the perfect setup for you.
                        </h2>
                    </div>

                    <Amenities />
                    <Availability />
                    <Reviews />
                </div>

                <div className="md:col-span-1">
                    <div className="sticky top-4">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">5.0</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <span>8th October City Giza, Egypt</span>
                            </div>
                        </div>

                        <div className="h-[200px] relative rounded-lg overflow-hidden mb-4">
                            <img src="/map.png" alt="Map location" className="object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-8 w-8 rounded-full bg-[#024E68] flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#024E68] hover:bg-[#01394D] cursor-pointer transition-colors duration-300 ease-in-out text-xs">
                                SHOW ON MAP
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Workspace