import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-white px-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 text-center max-w-6xl">
        <div className="inline-flex items-center gap-2 px-6 py-2 mb-10 rounded-full bg-white/20 backdrop-blur-md text-sm font-semibold tracking-wide border border-white/30">
          🌟 Featured Academy
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8 drop-shadow-2xl">
          Shaping the{" "}
          <span className="text-blue-300">
            Next-Gen
          </span>
          <br />
          Tech Leaders
        </h1>

        <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto mb-14 drop-shadow-lg">
          InstituteHub equips students with cutting-edge skills, real-world
          projects, and mentorship from industry experts. Build your career
          with confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/courses")}
            className="px-14 py-4 rounded-full font-semibold text-lg bg-white text-black hover:bg-gray-100 transition transform hover:scale-110 shadow-xl"
          >
            Explore Courses
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-14 py-4 rounded-full font-semibold text-lg border border-white hover:bg-white hover:text-black transition transform hover:scale-110 backdrop-blur-md"
          >
            Contact Us
          </button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-12 text-gray-100 text-sm">
          <span>🎓 10,000+ Students Trained</span>
          <span>🏆 Industry-Aligned Curriculum</span>
          <span>💼 MNC-Ready Career Path</span>
        </div>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center animate-bounce text-gray-100">
        <span className="text-sm mb-2">Scroll</span>
        <div className="w-1 h-10 bg-gradient-to-b from-gray-200 to-transparent rounded-full"></div>
      </div>
    </section>
  );
}

export default Hero;