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
    const [workspaces, setWorkspaces] = useState([]);
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
    const handleClick = () => {
        router.push('"workspace/1"');
    }


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
                                <Link href="workspace/1" className="p-2">
                                    <div>
                                        <img src='/assets/images/workNest.png' className="object-contain" alt="work-nest" />
                                    </div>
                                </Link>
                                <CardContent className="px-4 py-2">
                                    <div className="space-y-4 mb-2">
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-xl font-semibold">{item?.name}</h3>
                                        </div>
                                        <div className="text-sm text-gray-500 flex justify-between">
                                            <p>{item?.address}</p>
                                        </div>
                                        <p className=" text-gray-500 leading-5">{item?.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <span className="text-lg font-bold">$50 / Hour</span>
                                        <Button
                                            variant="default"
                                            onClick={handleClick}
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