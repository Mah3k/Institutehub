import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-blue-950 text-white overflow-hidden px-6">

      
      <div className="absolute inset-0">
        <div className="absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 opacity-30 blur-[180px] animate-blobSlow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 opacity-20 blur-[160px] animate-blobSlow delay-2000"></div>
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500 opacity-25 blur-[100px] animate-pulse"></div>
      </div>

      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full bg-white/20 animate-ping`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      
      <div className="relative z-10 text-center max-w-6xl">

        
        <div className="inline-flex items-center gap-2 px-6 py-2 mb-10 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-sm font-semibold tracking-wide">
          🌟 Featured Academy
        </div>

        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8">
          Shaping the{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.8)]">
            Next-Gen
          </span>
          <br />
          Tech Leaders
        </h1>

        
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-14">
          InstituteHub equips students with cutting-edge skills, real-world
          projects, and mentorship from industry experts. Build your career
          with confidence.
        </p>

        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/courses")}
            className="relative px-14 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:shadow-[0_0_90px_rgba(99,102,241,0.9)] transition transform hover:scale-110"
          >
            Explore Courses
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-14 py-4 rounded-full font-semibold text-lg border border-white/30 backdrop-blur-xl hover:bg-white hover:text-black transition transform hover:scale-110"
          >
            Contact Us
          </button>
        </div>

        
        <div className="mt-16 flex flex-wrap justify-center gap-12 text-gray-400 text-sm">
          <span>🎓 10,000+ Students Trained</span>
          <span>🏆 Industry-Aligned Curriculum</span>
          <span>💼 MNC-Ready Career Path</span>
        </div>
      </div>

      
      <div className="absolute bottom-10 flex flex-col items-center animate-bounce text-gray-400">
        <span className="text-sm mb-2">Scroll</span>
        <div className="w-1 h-10 bg-gradient-to-b from-gray-400 to-transparent rounded-full"></div>
      </div>

      
      <style>{`
        @keyframes blobSlow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blobSlow {
          animation: blobSlow 15s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default Hero;
