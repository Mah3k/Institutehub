import Hero from "../components/Hero";
import ForWhom from "../components/ForWhom";
import Learning from "../components/Learning";
import Stats from "../components/Stats";
import Courses from "../components/Courses";
import Testimonials from "../components/Testimonials";


function Home() {
  return (
    <>
      <Hero />
      <ForWhom/>
      <Learning />
      <Stats />
      <Courses />
      <Testimonials />
    </>
  );
}

export default Home;