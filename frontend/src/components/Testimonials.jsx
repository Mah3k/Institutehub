import { useState } from "react";

const testimonials = [
  {
    name: "Mahek Pirjade",
    role: "Full Stack Developer",
    feedback:
      "InstituteHub completely transformed my skills. The hands-on projects and guidance gave me real-world experience.",
  },
  {
    name: "Jayshree Bagadiya",
    role: "React Developer",
    feedback:
      "Learning here was amazing! I gained practical knowledge and confidence to take on real projects.",
  },
  {
    name: "Zain Shaikh",
    role: "Backend Engineer",
    feedback:
      "The mentorship and structured curriculum helped me build strong backend skills. Truly industry-ready!",
  },
  {
    name: "Ayesha Khan",
    role: "Frontend Developer",
    feedback:
      "The interactive lessons and projects made learning React intuitive and fun.",
  },
  {
    name: "Rohan Mehta",
    role: "Data Scientist",
    feedback:
      "The data courses and hands-on projects prepared me perfectly for real-world challenges.",
  },
];

function Testimonial() {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  return (
    <section className="relative py-28 px-6 bg-gradient-to-br from-gray-900 via-black to-blue-950 text-white overflow-hidden">

      
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[140px] animate-blobSlow"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/25 blur-[140px] animate-blobSlow delay-2000"></div>
      <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-purple-500/20 blur-[100px] animate-pulse"></div>

      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">

        
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real feedback from learners who turned their passion into careers.
          </p>
        </div>

        
        <div className="relative flex items-center justify-center h-[250px] md:h-[300px]">
          {testimonials.map((t, index) => {
            let offset = index - current;
            if (offset < -Math.floor(length / 2)) offset += length;
            if (offset > Math.floor(length / 2)) offset -= length;

            const zIndex = -Math.abs(offset) + 10;
            const scale = offset === 0 ? 1 : 0.85;
            const opacity = offset === 0 ? 1 : 0.4;
            const rotateY = offset * 15;

            return (
              <div
                key={index}
                className="absolute transition-all duration-700 transform"
                style={{
                  zIndex,
                  opacity,
                  transform: `translateX(${offset * 240}px) scale(${scale}) rotateY(${rotateY}deg)`,
                }}
              >
                <div className="relative bg-white/5 border border-white/10 backdrop-blur-3xl rounded-3xl p-8 shadow-[0_0_60px_rgba(59,130,246,0.25)] hover:scale-105 transition">
                  
                  <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-blue-500/20 blur-2xl animate-pulse"></div>
                  <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full bg-purple-500/20 blur-2xl animate-pulse delay-1000"></div>

                  
                  <p className="text-gray-300 mb-4 leading-relaxed italic max-w-xs">
                    "{t.feedback}"
                  </p>

                  
                  <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]">
                    {t.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{t.role}</p>
                </div>
              </div>
            );
          })}

          
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition text-lg"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition text-lg"
          >
            ▶
          </button>
        </div>
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

export default Testimonial;
