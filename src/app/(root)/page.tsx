import Hero from "./_components/Hero"
import WorkingList from "./_components/WorkingList"


const Home = () => {

  // const advantagesList = [
  //   {
  //     image: <Clock size={32} />,
  //     title: "Real-Time Availability",
  //     description: "Instantly check workspace availability and secure your spot with live updates"
  //   },
  //   {
  //     image: <Sliders size={32} />,
  //     title: "Customizable Options",
  //     description: "Select from private offices, shared desks, or meeting rooms to suit your unique needs"
  //   },
  //   {
  //     image: <Bot size={32} />,
  //     title: "AI-Powered Chatbot",
  //     description: "Get instant assistance, answers to questions, and personalized guidance anytime"
  //   },
  //   {
  //     image: <BrainCircuit size={32} />,
  //     title: "Smart Recommendations",
  //     description: "Discover workspaces and services tailored to your preferences and booking history"
  //   },
  //   {
  //     image: <Tag size={32} />,
  //     title: "Flexible Pricing",
  //     description: "Enjoy hourly, daily, or monthly plans designed to fit any budget"
  //   },
  //   {
  //     image: <CreditCard size={32} />,
  //     title: "Easy Online Payments",
  //     description: "Experience seamless bookings with secure and convenient payment options"
  //   },
  // ];

  return (
    <div>
      <Hero />
      <WorkingList />
    </div>
  )
}

export default Home