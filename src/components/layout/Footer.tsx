import { MapPin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-background border-t py-8">
            <div className="container">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between text-center md:text-left">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-lg font-bold">
                        <h1 className="text-2xl font-bold text-primary flex gap-1 items-center">
                            <span className="shadow-2xl">Work</span>
                            <span className="flex items-center">
                                <span className="mr-0.5">L</span>
                                <MapPin className="text-primary shadow-2xl mx-[-5px]" />
                                <span className="ml-0.5">cate</span>
                            </span>
                        </h1>
                    </Link>

                    {/* Policy Links */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="#" className="text-gray-500 hover:text-gray-600 text-sm">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-600 text-sm">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-600 text-sm">
                            Cookie Policy
                        </Link>
                        <Link href="#" className="text-gray-500 hover:text-gray-600 text-sm">
                            Contact Us
                        </Link>
                    </div>

                    {/* Copyright */}
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} WorkLocate. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;