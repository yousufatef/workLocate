import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"


const SelectSpace = () => {
    const [selectedSpace, setSelectedSpace] = useState("shared")
    const selectSpaces = [
        {
            id: "personal",
            title: "Personal",
            price: "$5/day",
            hours: "10/hrs",
            selected: selectedSpace === "personal",
        },
        {
            id: "shared",
            title: "Shared Space",
            price: "$15/day",
            hours: "10/hrs",
            selected: selectedSpace === "shared",
        },
        {
            id: "cabin",
            title: "Cabin",
            price: "$25/day",
            hours: "15/hrs",
            selected: selectedSpace === "cabin",
        },
        {
            id: "meeting",
            title: "Meeting",
            price: "$20/day",
            hours: "15/hrs",
            selected: selectedSpace === "private",
        },


    ]

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Select Your Space</CardTitle>
                <CardDescription>Choose the workspace that fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="spaces" className="w-full">
                    <TabsList className="grid w-full grid-cols-1">
                        <TabsTrigger value="spaces">Spaces</TabsTrigger>
                    </TabsList>
                    <TabsContent value="spaces" className="pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectSpaces.map(space => (
                                <Card
                                    key={space.id}
                                    className={`cursor-pointer ${selectedSpace === space.id ? "border-[#024E68] ring-2 ring-blue-100" : ""}`}
                                    onClick={() => setSelectedSpace(space.id)}
                                >
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-lg">{space.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-gray-500">{space.hours}</div>
                                            <div className="text-sm font-bold text-[#024E68]">{space.price}</div>
                                        </div>
                                        {selectedSpace === space.id && (
                                            <div className="absolute top-2 right-2 h-5 w-5 bg-[#024E68] rounded-full flex items-center justify-center">
                                                <Check className="h-3 w-3 text-white" />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}

                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>

    )
}

export default SelectSpace