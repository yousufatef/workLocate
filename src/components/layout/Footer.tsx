import { MapPin, Mail, Phone, Clock } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-background border-t py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-10">
                    {/* Main Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Brand Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold text-primary flex gap-1 items-center">
                                    <span>Work</span>
                                    <span className="flex items-center">
                                        <span className="mr-0.5">L</span>
                                        <MapPin className="text-primary mx-[-5px]" />
                                        <span className="ml-0.5">cate</span>
                                    </span>
                                </h1>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Your trusted platform for professional connections and opportunities.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Get In Touch</h3>
                            <div className="flex items-start gap-3 text-gray-600 text-sm">
                                <Mail className="mt-0.5 flex-shrink-0" size={16} />
                                <span>hello@worklocate.example</span>
                            </div>
                            <div className="flex items-start gap-3 text-gray-600 text-sm">
                                <Phone className="mt-0.5 flex-shrink-0" size={16} />
                                <span>Support: +1 (555) 000-0000</span>
                            </div>
                            <div className="flex items-start gap-3 text-gray-600 text-sm">
                                <Clock className="mt-0.5 flex-shrink-0" size={16} />
                                <span>Monday-Friday: 9AM - 5PM</span>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-800">Stay Informed</h3>
                            <p className="text-gray-600 text-sm">
                                Get the latest updates delivered to your inbox.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                                <button className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Section */}
                    <div className="border-t pt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} WorkLocate. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-gray-500 text-sm">
                            <span>Privacy</span>
                            <span>Terms</span>
                            <span>Accessibility</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;