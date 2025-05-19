import { Button } from "@/components/ui/button"
import Amenities from "@/components/workpace/Amenities"
import Availability from "@/components/workpace/Availability"
import ImageGrid from "@/components/workpace/ImageGrid"
import Reviews from "@/components/workpace/Reviews"
import StarRating from "@/components/workpace/StarRating"
import { getWorkspaceById } from "@/lib/actions/Workspace.actions"
import { Heart, MapPin } from "lucide-react"
import Link from "next/link"

const Workspace = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const { workingSpace } = await getWorkspaceById({ id })
    console.log("heres data", workingSpace)
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
                        <h1 className="text-3xl font-bold text-primary">{workingSpace.name}</h1>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                            <Heart className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex items-center mt-1">
                        <StarRating rate={workingSpace.averageRating} />
                    </div>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                    <p className="text-sm font-bold">$50 / Hour</p>
                    <Button className="w-full md:w-auto bg-primary cursor-pointer transition-colors duration-300 ease-in-out"
                    >
                        <Link href="/booking">BOOK NOW</Link>
                    </Button>
                </div>
            </div>

            <div>
                <ImageGrid mainImage={mainImage} smallImages={smallImages} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
                    <div className="mb-8">
                        <h2 className="font-semibold mb-4">
                            Welcome to <span className="text-xl text-[#024E68]">{workingSpace.name}</span>, {workingSpace.description}
                        </h2>
                    </div>

                    <Amenities amenities={workingSpace.amenities} />
                    <Availability />
                    <Reviews reviews={workingSpace.reviews} />
                </div>

                <div className="md:col-span-1">
                    <div className="sticky top-4">
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <StarRating rate={workingSpace.averageRating} />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>8th October City Giza, Egypt</span>
                            </div>
                        </div>

                        <div className="h-[200px] relative rounded-lg overflow-hidden mb-4">
                            <img src="/map.png" alt="Map location" className="object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-primary-foreground" />
                                </div>
                            </div>
                            <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary cursor-pointer transition-colors duration-300 ease-in-out text-xs">
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