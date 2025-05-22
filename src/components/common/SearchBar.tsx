import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
    return (
        <div className="w-full mb-8  absolute left-0 top-[-95px]">
            <div className="flex flex-col md:flex-row gap-3 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search by City or Working space..."
                            className="w-full pl-10 bg-transparent text-primary-foreground  border border-primary-foreground outline-0 focus-visible:ring-0"
                        />
                    </div>
                </div>
                <Button className="bg-[#134B70] hover:bg-primary/90 cursor-pointer transition-colors duration-300 ease-in-out w-full md:w-auto text-white px-8">
                    Search
                </Button>
            </div>
        </div>
    );
}