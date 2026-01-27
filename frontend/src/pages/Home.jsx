import Hero from "../components/Hero";
import ForWhom from "../components/ForWhom";
import Stats from "../components/Stats";
import Courses from "../components/Courses";
import Testimonials from "../components/Testimonials";


function Home() {
  return (
    <>
      <Hero />
      <ForWhom/>
      <Stats />
      <Courses />
      <Testimonials />
    </>
  );
}

export default Home;