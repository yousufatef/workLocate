import { Clock, Coffee, DoorOpen, Lock, Printer, Wifi } from "lucide-react"
import Heading from "../common/Heading"

const Amenities = () => {
    return (
        <div className="mb-8">
            <Heading>Amenities</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-6">
                <div className="flex items-center gap-3">
                    <Wifi className="h-5 w-5 text-[#024E68]" />
                    <span>High-Speed Wi-Fi</span>
                </div>
                <div className="flex items-center gap-3">
                    <DoorOpen className="h-5 w-5 text-[#024E68]" />
                    <span>Private Meeting Rooms</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-[#024E68]" />
                    <span>24/7 Access</span>
                </div>
                <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-[#024E68]" />
                    <span>Secure Lockers & Storage</span>
                </div>
                <div className="flex items-center gap-3">
                    <Coffee className="h-5 w-5 text-[#024E68]" />
                    <span>Complimentary Coffee & Refreshments</span>
                </div>
                <div className="flex items-center gap-3">
                    <Printer className="h-5 w-5 text-[#024E68]" />
                    <span>Printing & Scanning Services</span>
                </div>
            </div>
        </div>

    )
}

export default Amenities