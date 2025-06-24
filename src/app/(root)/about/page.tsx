import Heading from "@/components/common/Heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Clock,
    MessageCircle,
    Target,
    Shield,
    Search,
    Calendar,
} from "lucide-react"

export default function AboutPage() {
    const services = [
        {
            icon: <Search className="h-8 w-8" />,
            title: "Smart Workspace Search",
            description:
                "Find the perfect co-working space with our advanced search filters including location, amenities, price range, and availability.",
        },
        {
            icon: <Clock className="h-8 w-8" />,
            title: "Real-Time Availability",
            description:
                "Get instant updates on workspace availability and pricing to make informed decisions without delays.",
        },
        {
            icon: <MessageCircle className="h-8 w-8" />,
            title: "AI Chatbot Assistant",
            description:
                "Our intelligent chatbot guides you through the booking process, answers queries, and provides 24/7 support.",
        },
        {
            icon: <Target className="h-8 w-8" />,
            title: "Personalized Recommendations",
            description: "Receive tailored workspace suggestions based on your preferences, location, and booking history.",
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: "Remote Booking",
            description: "Book workspaces from anywhere without the need for physical presence or phone calls.",
        },
        {
            icon: <Shield className="h-8 w-8" />,
            title: "Secure Payments",
            description: "Safe and secure payment processing with multiple payment options and booking confirmation.",
        },
    ]



    return (
        <div className="container flex flex-col justify-center items-center bg-background ">

            {/* Hero Section */}
            <section className="py-8 px-4 sm:px-6 lg:px-8" >

                <h1 className="text-primary text-3xl md:text-5xl font-bold text-center mb-6">Find Your Perfect
                    Workspace</h1>
                <p className="text-secondary-foreground mb-8 max-w-3xl text-center">
                    Simplifying the process of finding and reserving co-working spaces with modern technology, real-time
                    availability, and intelligent recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-primary">
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline">
                        Learn More
                    </Button>
                </div>
            </section>


            {/* About Section */}
            <section id="about" className="py-8 px-4 sm:px-6 lg:px-8">
                <Heading>About Work Locate</Heading>
                <div className="flex flex-col gap-4">
                    <p className="text-secondary-foreground ">
                        We are dedicated to transforming the way people find and book co-working spaces. Our platform addresses
                        the growing demand for flexible work environments by offering a comprehensive solution that connects
                        remote workers, freelancers, and businesses with the perfect workspace.
                    </p>
                    <p className="text-lg text-secondary-foreground ">
                        {" By leveraging modern web technologies and intelligent systems, we've created a platform that eliminates the hassle of manual booking processes and supports the evolving needs of today's workforce."}
                    </p>
                </div>

            </section >

            {/* Services Section */}
            < section id="services" className="py-8 bg-background px-4 sm:px-6 lg:px-8" >
                <Heading >Our Services</Heading>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center text-primary mb-4">
                                    {service.icon}
                                </div>
                                <CardTitle className="text-xl">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-secondary-foreground leading-relaxed">{service.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </ section>


        </div >
    )
}
