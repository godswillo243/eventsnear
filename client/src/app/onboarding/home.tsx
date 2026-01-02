import Navbar from "@/components/shared/navbar";
import Hero from "./sections/hero";
import HowItWork from "./sections/how-it-work";
import UpcomingEvents from "./sections/upcoming-events";
import Footer from "@/components/shared/footer";

const Home = () => {
  return (
    <div className="w-full relative space-y-6 max-md:space-y-0">
      <Navbar />
      <Hero />
      <HowItWork />
      <UpcomingEvents />
      <Footer />
    </div>
  );
};

export default Home;
