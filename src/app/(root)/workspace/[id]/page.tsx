import { Button } from "@/components/ui/button"
import Amenities from "@/components/workspace/Amenities"
import Reviews from "@/components/workspace/Reviews"
import StarRating from "@/components/workspace/StarRating"
import { getWorkspaceById } from "@/lib/actions/Workspace.actions"
import { MapPin } from "lucide-react"
import Link from "next/link"

const Workspace = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const { workingSpace } = await getWorkspaceById({ id })
    console.log("heres data", workingSpace)

    return (
        <div className="container flex flex-col justify-center">
            <div className="flex flex-col md:flex-row justify-between gap-6 my-6 md:my-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold text-primary">{workingSpace.name}</h1>
                    <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>8th October City Giza, Egypt</span>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Link href={`/rooms/${id}`} className="w-full md:w-auto bg-primary cursor-pointer transition-colors duration-300 ease-in-out">
                        <Button className="w-full md:w-auto bg-primary cursor-pointer transition-colors duration-300 ease-in-out">
                            Show Rooms
                        </Button>
                    </Link>
                    <StarRating rate={workingSpace.averageRating} />
                </div>
            </div>
            <div className="my-6 md:my-8">
                <img src={workingSpace.image} alt={workingSpace.name} />
            </div>

            <h2 className="font-semibold mb-6 md:mb-8">
                Welcome to <span className="text-xl text-[#024E68]">{workingSpace.name}</span>, {workingSpace.description}
            </h2>

            <Amenities amenities={workingSpace.amenities} />
            <Reviews reviews={workingSpace.reviews} />



        </div>
    )
}


export default Workspace