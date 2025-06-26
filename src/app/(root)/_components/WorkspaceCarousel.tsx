"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, RefreshCw, Wifi, Coffee, Printer, Snowflake, Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import Heading from "@/components/common/Heading"
import Link from "next/link"
import Image from "next/image"

// Updated interface to match actual data structure
interface IWorkspace {
    name: string
    amenities: string[]
    averageRating: number
    latitude: number
    longitude: number
    amenities_count: number
    distance: number
    image?: string
}

// Default location (Cairo, Egypt)
const DEFAULT_LOCATION = {
    latitude: 29.971,
    longitude: 31.281,
}

// Amenity icons mapping - add this before the WorkspaceCard component
const getAmenityIcon = (amenity: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        "Wi-Fi": <Wifi className="h-3 w-3" />,
        Coffee: <Coffee className="h-3 w-3" />,
        Printer: <Printer className="h-3 w-3" />,
        AC: <Snowflake className="h-3 w-3" />,
    }
    return iconMap[amenity] || <div className="h-3 w-3 rounded-full bg-primary/20" />
}

// Updated WorkspaceCard component
function WorkspaceCard({ workspace }: { workspace: IWorkspace }) {
    return (
        <Card className="h-full hover:shadow-lg transition-shadow duration-200">
            <Link href={`/workspace/`} className="px-2 pt-2">
                <div className="relative aspect-video">
                    <Image
                        src={`${workspace?.image || "/assets/images/workNest.png"}`}
                        className="object-cover"
                        alt={`${workspace?.name} workspace`}
                        fill
                    />
                </div>
            </Link>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{workspace.name}</h3>

                {/* Rating and Distance */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{workspace.averageRating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{workspace.distance.toFixed(1)} km away</span>
                    </div>
                </div>

                {/* Amenities */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Amenities ({workspace.amenities_count})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {workspace.amenities.slice(0, 4).map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs flex items-center gap-1">
                                {getAmenityIcon(amenity)}
                                {amenity}
                            </Badge>
                        ))}
                        {workspace.amenities.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                                +{workspace.amenities.length - 4} more
                            </Badge>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

// Loading skeleton component
function WorkspaceCardSkeleton() {
    return (
        <Card className="h-full">
            <CardContent className="p-4">
                <Skeleton className="aspect-video rounded-lg mb-3" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex items-center justify-between mb-3">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <div className="flex gap-1">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-14" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function WorkspaceCarousel() {
    const [workspaces, setWorkspaces] = useState<IWorkspace[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [, setLocationUsed] = useState<"user" | "default" | null>(null)

    const fetchRecommendedWorkspaces = async (coords?: { latitude: number; longitude: number }) => {
        try {
            setLoading(true)
            setError("")

            // Use provided coordinates or get user location
            if (coords) {
                await fetchWorkspaces(coords.latitude, coords.longitude)
                return
            }

            // Check if geolocation is supported
            if (!navigator.geolocation) {
                console.log("Geolocation not supported, using default location")
                setLocationUsed("default")
                await fetchWorkspaces(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude)
                return
            }

            // Try to get user's location
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords
                    console.log("Using user location:", latitude, longitude)
                    setLocationUsed("user")
                    await fetchWorkspaces(latitude, longitude)
                },
                async (geoError) => {
                    console.log("Geolocation error, using default location:", geoError.message)
                    setLocationUsed("default")
                    await fetchWorkspaces(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude)
                },
                {
                    timeout: 10000, // 10 second timeout
                    enableHighAccuracy: false,
                    maximumAge: 300000, // 5 minutes
                },
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

    const fetchWorkspaces = async (latitude: number, longitude: number) => {
        try {
            const res = await fetch("https://recommendation-system-production-143e.up.railway.app/recommend", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ latitude, longitude }),
            })

            if (!res.ok) {
                const errorText = await res.text()
                throw new Error(`Failed to fetch workspaces: ${errorText}`)
            }

            const data = await res.json()
            console.log("Fetched workspaces:", data)
            setWorkspaces(data || [])
        } catch (err) {
            console.error("Fetch error:", err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRecommendedWorkspaces()
    }, [])

    // Loading state
    if (loading) {
        return (
            <div className="container">
                <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Finding workspaces near you...</span>
                    </div>
                </div>
                <Carousel className="w-full">
                    <CarouselContent>
                        {[...Array(3)].map((_, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <WorkspaceCardSkeleton />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="container">
                <Card className="p-8">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="rounded-full bg-red-100 p-3">
                            <RefreshCw className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Unable to load workspaces</h3>
                            <p className="text-muted-foreground mb-4">{error}</p>
                        </div>
                        <Button onClick={() => fetchRecommendedWorkspaces()} variant="outline" className="bg-white">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Try Again
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    // Empty state
    if (workspaces.length === 0) {
        return (
            <div className="container">
                <Card className="p-8">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="rounded-full bg-gray-100 p-3">
                            <MapPin className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">No workspaces found</h3>
                            <p className="text-muted-foreground mb-4">
                                {" We couldn't find any workspaces in your area. Try refreshing or check back later."}
                            </p>
                        </div>
                        <Button onClick={() => fetchRecommendedWorkspaces()} variant="outline" className="bg-white">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    // Success state with workspaces
    return (
        <div className="container mt-8">
            <Heading >Near You</Heading>

            <Carousel
                opts={{
                    align: "start",
                    loop: workspaces.length > 3,
                }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                        stopOnMouseEnter: true,
                        stopOnInteraction: false,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {workspaces.map((workspace, index) => (
                        <CarouselItem key={`${workspace.name}-${index}`} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                            <WorkspaceCard workspace={workspace} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-4 max-lg:hidden bg-white border shadow-md hover:bg-gray-50" />
                <CarouselNext className="mr-4 max-lg:hidden bg-white border shadow-md hover:bg-gray-50" />
            </Carousel>

        </div>
    )
}
