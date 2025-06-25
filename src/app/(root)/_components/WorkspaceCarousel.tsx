"use client"

import { useEffect, useState } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Autoplay from "embla-carousel-autoplay"
import { useRouter } from "next/navigation"
import { Star } from "lucide-react"
import { IWorkspace } from "@/types/workspace"

export default function WorkspaceCarousel() {
    const router = useRouter()
    const [workspaces, setWorkspaces] = useState<IWorkspace[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchRecommendedWorkspaces = async () => {
        try {
            setLoading(true)
            setError("")

            if (!navigator.geolocation) {
                throw new Error("Geolocation is not supported by your browser.")
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords

                    console.log("Location:", latitude, longitude)

                    const res = await fetch(
                        "https://recommendation-system-production-143e.up.railway.app/recommend",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ latitude, longitude }),
                        }
                    )

                    if (!res.ok) {
                        const errorText = await res.text()
                        throw new Error(`HTTP ${res.status}: ${errorText}`)
                    }

                    const data = await res.json()
                    setWorkspaces(data || [])
                    setLoading(false)
                },
                (geoError) => {
                    console.error("Geolocation error:", geoError)
                    setError("Failed to get your location.")
                    setLoading(false)
                }
            )
        } catch (err: unknown) {
            console.error("Error:", err)
            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("Something went wrong")
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRecommendedWorkspaces()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <p className="text-red-500 text-center">{error}</p>
                <Button onClick={fetchRecommendedWorkspaces} variant="outline">
                    Try Again
                </Button>
            </div>
        )
    }

    if (workspaces.length === 0) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-gray-500">No workspaces available</p>
            </div>
        )
    }

    return (
        <Carousel
            opts={{ align: "start" }}
            plugins={[Autoplay({ delay: 3000, stopOnMouseEnter: true })]}
            className="w-full"
        >
            <CarouselContent>
                {workspaces.map((workspace, index) => (
                    <CarouselItem key={workspace._id || index} className="md:basis-1/2 lg:basis-1/3">
                        <Card className="h-full">
                            <div className="p-2">
                                <div className="relative">

                                    {workspace.averageRating && (
                                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-sm">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span>{workspace.averageRating}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <CardContent className="p-4 flex flex-col h-48">
                                <h3 className="text-lg font-semibold line-clamp-2 mb-2">
                                    {workspace.name || "Unnamed Workspace"}
                                </h3>

                                {workspace.description && (
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                        {workspace.description}
                                    </p>
                                )}

                                {workspace.amenities && workspace.amenities.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {workspace.amenities.slice(0, 3).map((amenity: string, i: number) => (
                                            <Badge key={i} variant="secondary" className="text-xs">
                                                {amenity}
                                            </Badge>
                                        ))}
                                        {workspace.amenities.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{workspace.amenities.length - 3}
                                            </Badge>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-auto pt-3 border-t">
                                    <span className="font-bold">$50/hr</span>
                                    <Button
                                        onClick={() => router.push(`/workspace/${workspace._id || index}`)}
                                        size="sm"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-4 max-lg:hidden" />
            <CarouselNext className="mr-4 max-lg:hidden" />
        </Carousel>
    )
}
