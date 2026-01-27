import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-blue-950 text-white overflow-hidden">

      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 opacity-40 blur-[200px] animate-blobSlow"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 opacity-30 blur-[180px] animate-blobSlow"></div>
        <div className="absolute top-1/3 left-1/2 w-[350px] h-[350px] bg-cyan-400 opacity-30 blur-[140px] animate-pulse"></div>
      </div>

      
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-6">
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 drop-shadow-[0_0_40px_rgba(99,102,241,0.7)]">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              InstituteHub
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            A next-generation technology institute dedicated to building
            confident, industry-ready software professionals.
          </p>
        </div>
      </section>

    
      <section
        className="relative min-h-[70vh] flex items-center justify-center px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Who{" "}
            <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.9)]">
              We Are
            </span>
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed text-lg">
            InstituteHub bridges the gap between academic learning and
            real-world industry requirements through structured,
            hands-on education.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg">
            Our students don’t just learn — they build, experiment,
            collaborate, and grow into professionals ready for MNC-level
            environments.
          </p>
        </div>
      </section>

      
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        {[
          {
            title: "Our Mission",
            text: "To empower students with industry-ready skills through practical learning, mentorship, and continuous improvement.",
          },
          {
            title: "Our Vision",
            text: "To become a globally recognized tech institute producing confident, ethical, and future-ready professionals.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 hover:-translate-y-2 hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition"
          >
            <h3 className="text-2xl font-semibold text-blue-400 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose{" "}
          <span className="text-blue-400 drop-shadow-[0_0_25px_rgba(59,130,246,0.9)]">
            InstituteHub
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Industry-aligned curriculum",
            "Hands-on real-world projects",
            "Career-focused mentorship",
            "Small batch personalized learning",
            "Placement & interview guidance",
            "Continuous skill evaluation",
          ].map((point, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-gray-300 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(34,211,238,0.6)] transition"
            >
              ✔ {point}
            </div>
          ))}
        </div>
      </section>

      
      <section className="relative z-10 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6 drop-shadow-[0_0_30px_rgba(99,102,241,0.8)]">
          Ready to Build Your <span className="text-blue-400">Future?</span>
        </h2>
        <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
          Join InstituteHub and start your journey towards a confident,
          successful tech career.
        </p>

        <button
          onClick={() => navigate("/courses")}
          className="px-14 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_80px_rgba(99,102,241,0.9)] hover:shadow-[0_0_130px_rgba(34,211,238,1)] transition transform hover:scale-110"
        >
          Explore Courses
        </button>
      </section>

      
      <style>{`
        @keyframes blobSlow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        .animate-blobSlow {
          animation: blobSlow 16s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default About;
