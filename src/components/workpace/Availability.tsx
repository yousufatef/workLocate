"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Heading from "../common/Heading"

const Availability = () => {
    const router = useRouter()
    return (
        <div className="mb-8">
            <Heading>Availability</Heading>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="w-full md:w-auto">
                    <Select defaultValue="fri-28-feb">
                        <SelectTrigger className="w-full md:w-[180px]">
                            <div className="flex items-center gap-2">
                                <span className="text-[#024E68]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                        <line x1="16" x2="16" y1="2" y2="6" />
                                        <line x1="8" x2="8" y1="2" y2="6" />
                                        <line x1="3" x2="21" y1="10" y2="10" />
                                    </svg>
                                </span>
                                <SelectValue placeholder="Select date" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fri-28-feb">Fri 28 Feb</SelectItem>
                            <SelectItem value="sat-29-feb">Sat 29 Feb</SelectItem>
                            <SelectItem value="sun-1-mar">Sun 1 Mar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-full md:w-auto">
                    <Select defaultValue="9am-2pm">
                        <SelectTrigger className="w-full md:w-[180px]">
                            <div className="flex items-center gap-2">
                                <span className="text-[#024E68]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </span>
                                <SelectValue placeholder="Select time" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="9am-2pm">9 AM - 2 PM</SelectItem>
                            <SelectItem value="2pm-7pm">2 PM - 7 PM</SelectItem>
                            <SelectItem value="7pm-12am">7 PM - 12 AM</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button className="w-full md:w-auto bg-[#024E68] hover:bg-[#01394D] cursor-pointer transition-colors duration-300 ease-in-out"
                    onClick={() => router.push("/booking")}>Book</Button>
            </div>
        </div>
    )
}

export default Availability