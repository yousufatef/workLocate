import type { Metadata } from "next"
import { Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with our team",
}

export default function ContactPage() {
    return (
        <div className="flex flex-col mb-0">
            {/* Hero Section with decorative elements */}
            <div className="relative bg-gradient-to-r from-[#004058] to-[#005571] text-white py-20 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Get in Touch</h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80 leading-relaxed">
                        {"We're here to help you find your ideal workspace. Reach out to our team with any questions."}
                    </p>

                </div>
            </div>

            {/* Contact Form and Info Section */}
            <div className="container mx-auto px-4 py-16 md:py-24 relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#005571]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16  relative">
                    {/* Contact Form */}
                    <Card className="p-6 md:p-8 shadow-lg border-0 rounded-xl overflow-hidden relative group" id="contact-form">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#005571]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <CardContent className="p-0 relative z-10">
                            <div className="flex items-center mb-8">
                                <div className="h-10 w-1.5 bg-[#005571] rounded-full mr-4"></div>
                                <h2 className="text-2xl md:text-3xl font-bold">Send us a message</h2>
                            </div>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name" className="text-sm font-medium">
                                            First name
                                        </Label>
                                        <Input
                                            id="first-name"
                                            placeholder="Enter your first name"
                                            className="h-12 transition-all duration-200 focus:border-[#005571] focus:ring-[#005571]/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name" className="text-sm font-medium">
                                            Last name
                                        </Label>
                                        <Input
                                            id="last-name"
                                            placeholder="Enter your last name"
                                            className="h-12 transition-all duration-200 focus:border-[#005571] focus:ring-[#005571]/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-12 transition-all duration-200 focus:border-[#005571] focus:ring-[#005571]/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium">
                                        Phone number
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="h-12 transition-all duration-200 focus:border-[#005571] focus:ring-[#005571]/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </Label>
                                    <Textarea
                                        id="message"
                                        placeholder="Tell us how we can help you"
                                        className="min-h-[150px] resize-none transition-all duration-200 focus:border-[#005571] focus:ring-[#005571]/20"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-[#005571] hover:bg-[#004058] transition-all duration-300 text-white font-medium rounded-lg"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-10 md:pl-8 lg:pl-12">
                        <div>
                            <div className="flex items-center mb-6">
                                <div className="h-10 w-1.5 bg-[#005571] rounded-full mr-4"></div>
                                <h2 className="text-2xl md:text-3xl font-bold">Contact Information</h2>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Our team is available Monday through Friday from 9am to 5pm to assist you with any questions about our
                                workspaces. We look forward to hearing from you!
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5 group">
                                <div className="bg-[#005571]/10 p-4 rounded-full transition-all duration-300 group-hover:bg-[#005571] group-hover:text-white">
                                    <Phone className="h-6 w-6 text-[#005571] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                                    <p className="text-sm text-muted-foreground mt-1">Available 9am-5pm EST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="bg-[#005571]/10 p-4 rounded-full transition-all duration-300 group-hover:bg-[#005571] group-hover:text-white">
                                    <Mail className="h-6 w-6 text-[#005571] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                                    <p className="text-muted-foreground">contact@workspacefinder.com</p>
                                    <p className="text-sm text-muted-foreground mt-1">{"We'll respond within 24 hours"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="bg-[#005571]/10 p-4 rounded-full transition-all duration-300 group-hover:bg-[#005571] group-hover:text-white">
                                    <MapPin className="h-6 w-6 text-[#005571] group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Main Office</h3>
                                    <p className="text-muted-foreground">
                                        123 Workspace Avenue
                                        <br />
                                        Suite 500
                                        <br />
                                        New York, NY 10001
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/* FAQ Section */}
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 py-16 md:py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Accordion type="single" collapsible className="space-y-4 max-w-[600px] m-auto mb-4">
                        <AccordionItem value="item-1" className="border border-gray-300 rounded-lg p-6 bg-primary shadow-sm hover:shadow-md transition-shadow">
                            <AccordionTrigger className="text-2xl md:text-3xl font-bold cursor-pointer flex items-center justify-between w-full text-left gap-4">
                                <span>Frequently Asked Questions</span>

                            </AccordionTrigger>
                            <AccordionContent className="pt-4 text-lg text-gray-200 animate-accordion-down">
                                Find answers to common questions about our workspaces and services. Our team has compiled the most frequent inquiries to help you get the information you need quickly.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="space-y-4 max-w-[600px] m-auto mb-4">
                        <AccordionItem value="item-1" className="border border-gray-300 rounded-lg p-6 bg-primary shadow-sm hover:shadow-md transition-shadow">
                            <AccordionTrigger className="text-2xl md:text-3xl font-bold cursor-pointer flex items-center justify-between w-full text-left gap-4">
                                <span>Frequently Asked Questions</span>

                            </AccordionTrigger>
                            <AccordionContent className="pt-4 text-lg text-gray-200 animate-accordion-down">
                                Find answers to common questions about our workspaces and services. Our team has compiled the most frequent inquiries to help you get the information you need quickly.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="space-y-4 max-w-[600px] m-auto mb-4">
                        <AccordionItem value="item-1" className="border border-gray-300 rounded-lg p-6 bg-primary shadow-sm hover:shadow-md transition-shadow">
                            <AccordionTrigger className="text-2xl md:text-3xl font-bold cursor-pointer flex items-center justify-between w-full text-left gap-4">
                                <span>Frequently Asked Questions</span>

                            </AccordionTrigger>
                            <AccordionContent className="pt-4 text-lg text-gray-200 animate-accordion-down">
                                Find answers to common questions about our workspaces and services. Our team has compiled the most frequent inquiries to help you get the information you need quickly.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" collapsible className="space-y-4 max-w-[600px] m-auto mb-4">
                        <AccordionItem value="item-1" className="border border-gray-300 rounded-lg p-6 bg-primary shadow-sm hover:shadow-md transition-shadow">
                            <AccordionTrigger className="text-2xl md:text-3xl font-bold cursor-pointer flex items-center justify-between w-full text-left gap-4">
                                <span>Frequently Asked Questions</span>

                            </AccordionTrigger>
                            <AccordionContent className="pt-4 text-lg text-gray-200 animate-accordion-down">
                                Find answers to common questions about our workspaces and services. Our team has compiled the most frequent inquiries to help you get the information you need quickly.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
               
                </div>
            </div>
        </div>
    )
}
