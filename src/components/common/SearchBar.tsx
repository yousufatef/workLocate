import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export function SearchBar() {
    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-3 bg-white rounded-lg p-4 shadow-lg">
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search workspace"
                            className="w-full pl-10 bg-transparent border focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                </div>

                <div className="w-full md:w-48">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cairo">Cairo</SelectItem>
                            <SelectItem value="giza">Giza</SelectItem>
                            <SelectItem value="alexandria">Alexandria</SelectItem>
                            <SelectItem value="banha">Banha</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="bg-primary hover:bg-[#01394D] cursor-pointer transition-colors duration-300 ease-in-out w-full md:w-auto text-white px-8">
                    Search
                </Button>
            </div>
        </div>
    );
}