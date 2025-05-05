import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { format } from "date-fns"
import { Button } from "../ui/button"


const SelectDate = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your booking date</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "MMMM yyyy") : "Select month"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                {/* <Calendar mode="single" selected={date} onSelect={setDate} initialFocus /> */}
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mt-4">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500">
                                {day}
                            </div>
                        ))}
                        {[8, 9, 10, 11, 12, 13, 14].map((day) => (
                            <Button
                                key={day}
                                variant={day === 12 ? "default" : "outline"}
                                className="h-12 w-full"
                                onClick={() => setDate(new Date(2025, 0, day))}
                            >
                                {day}
                            </Button>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SelectDate