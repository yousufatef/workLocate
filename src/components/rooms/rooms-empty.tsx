import { Search, Building } from "lucide-react"

interface RoomsEmptyProps {
    type: "no-rooms" | "no-results"
}

export function RoomsEmpty({ type }: RoomsEmptyProps) {
    if (type === "no-rooms") {
        return (
            <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                    <Building className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No rooms found for this workspace</p>
                    <p className="text-sm">{"This workspace doesn't have any rooms yet."}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No rooms match your search</p>
                <p className="text-sm">Try adjusting your search or filters</p>
            </div>
        </div>
    )
}
