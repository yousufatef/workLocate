import Link from "next/link";

const Footer = () => {
    const lists = [
        {
            title: "About",
            list: ["Who We Are", "Our Mission", "Careers", "Blog"]
        },
        {
            title: "Explore",
            list: ["Popular Workspaces", "Top Locations", "Pricing Plans", "Flexible Bookings"]
        },
        {
            title: "Our Services",
            list: ["Workspace Reservations", "Meeting Rooms", "Flexible Plans", "Virtual Offices"]
        },
        {
            title: "Support",
            list: ["FAQs", "Help Center", "Contact Us", "Privacy Policy"]
        },
    ];

    return (
        <footer className="bg-gray-100 py-8 mt-16">
            <div className="container">
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 flex-1">
                        {lists.map((list, index) => (
                            <div key={index}> {/* Add a unique key for each list */}
                                <h3 className="font-bold mb-4">{list.title}</h3>
                                <ul className="space-y-2">
                                    {list.list.map((item, itemIndex) => (
                                        <li key={itemIndex}> {/* Use index as a fallback key */}
                                            <Link href="/" className="text-gray-500 hover:text-gray-900">
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;