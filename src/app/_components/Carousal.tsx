"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from 'embla-carousel-autoplay';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchWorkspaces } from "@/lib/api";
import { useEffect, useState } from "react";
// import Image from "next/image";
const Carousal = () => {
    interface Workspace {
        _id: string;
        name: string;
        address: string;
        description: string;
    }

    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    useEffect(() => {
        async function loadWorkspaces() {
            const data = await fetchWorkspaces();
            console.log(data);
            setWorkspaces(data);
            console.log(workspaces);
        }

        loadWorkspaces();
    }, []);
    const router = useRouter()



    return (
        <Carousel
            opts={{
                align: "start",
            }}
            plugins={[
                Autoplay({
                    delay: 2000,
                    stopOnLastSnap: false,
                    stopOnMouseEnter: true,
                    stopOnInteraction: false
                })
            ]
            }
            className="w-full"
        >
            <CarouselContent>
                {workspaces.map((item, index) => (
                    <CarouselItem key={index} className="sm:basic-1 md:basis-1/2 lg:basis-1/3">
                        <div>
                            <Card className="flex flex-col py-0 pb-2">
                                <Link href={`/workspace/${item?._id}`} className="p-2">
                                    <div>
                                        <img src='/assets/images/workNest.png' className="object-contain" alt="work-nest" />
                                    </div>
                                </Link>
                                <CardContent className="px-4 py-2 h-48 flex flex-col">
                                    <div className="space-y-4 mb-2 flex-grow overflow-hidden">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-xl font-semibold line-clamp-1">{item?.name}</h3>
                                        </div>
                                        <div className="text-sm text-gray-500 flex justify-between">
                                            <p className="line-clamp-1">{item?.address}</p>
                                        </div>
                                        <p className="text-gray-500 leading-5 line-clamp-3">
                                            {item?.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <span className="text-lg font-bold">$50 / Hour</span>
                                        <Button
                                            variant="default"
                                            onClick={() => router.push(`/workspace/${item?._id}`)}
                                            className="bg-primary hover:bg-[#01394D] cursor-pointer transition-colors duration-300 ease-in-out"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="ml-[16px] max-lg:hidden" />
            <CarouselNext className="mr-[16px] max-lg:hidden" />
        </Carousel>
    )
}

export default Carousal