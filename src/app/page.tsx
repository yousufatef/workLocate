
import Heading from "@/components/common/Heading";
import { Bot, BrainCircuit, Clock, CreditCard, Sliders, Tag } from "lucide-react"
import Hero from "./_components/Hero";
import Carousal from "./_components/Carousal";


const Home = () => {


  const advantagesList = [
    {
      image: <Clock size={32} />,
      title: "Real-Time Availability",
      description: "Instantly check workspace availability and secure your spot with live updates"
    },
    {
      image: <Sliders size={32} />,
      title: "Customizable Options",
      description: "Select from private offices, shared desks, or meeting rooms to suit your unique needs"
    },
    {
      image: <Bot size={32} />,
      title: "AI-Powered Chatbot",
      description: "Get instant assistance, answers to questions, and personalized guidance anytime"
    },
    {
      image: <BrainCircuit size={32} />,
      title: "Smart Recommendations",
      description: "Discover workspaces and services tailored to your preferences and booking history"
    },
    {
      image: <Tag size={32} />,
      title: "Flexible Pricing",
      description: "Enjoy hourly, daily, or monthly plans designed to fit any budget"
    },
    {
      image: <CreditCard size={32} />,
      title: "Easy Online Payments",
      description: "Experience seamless bookings with secure and convenient payment options"
    },
  ];

  return (
    <div>
      <Hero />
      <div className="container mt-10">
        <Heading>Near You</Heading>
        <Carousal />
      </div>
      <div className="container mt-10">
        <Heading>Featured Spaces</Heading>
        <Carousal />
      </div>
      <div className="container mt-10" id="services">
        <Heading>Why Choose Us</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mt-">
          {advantagesList.map((advantage, index) => (
            <div
              key={index}
              className="p-6 text-center bg-white shadow-md rounded-xl border border-gray-200"
            >
              <div className="flex justify-center items-center w-20 h-20 mx-auto rounded-full bg-[#E6F4FF] text-[#006bb1]">
                {advantage.image}
              </div>
              <h3 className="mt-4 text-xl font-bold text-primary">{advantage.title}</h3>
              <p className="mt-3 text-gray-500 leading-5">{advantage.description}</p>
            </div>
          ))}
        </div>


      </div>
      <div className="container mt-10" id="about-us">
        <Heading>About</Heading>
        <p className="text-gray-500 leading-5">At WorkLocate, we make finding and booking your ideal coworking space simple and stress-free.
          allowing you to reserve workspaces that fit your needs—anytime, anywhere. Whether {"you're"} an entrepreneur,
          freelancer, or part of a team, we’re here to help you work smarter in inspiring spaces.
          you can explore options based on location, amenities, pricing, and availability—all in real time.
          Reserve your space today and take the first step toward a more flexible and fulfilling work experience.</p>
      </div>
    </div>
  )
}

export default Home