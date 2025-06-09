import Heading from "../common/Heading";

interface AmenitiesProps {
    amenities: { [key: string]: string };
}

const Amenities = ({ amenities }: AmenitiesProps) => {
    return (
        <div className="mb-6 md:mb-8">
            <Heading>Amenities</Heading>
            <div className="w-fit flex flex-wrap gap-5 border rounded-lg shadow-sm p-4">
                {Object.values(amenities).map((value, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md font-semibold"
                    >
                        {value}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Amenities;
