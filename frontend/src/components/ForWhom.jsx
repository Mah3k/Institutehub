function ForWhom() {
  const audience = [
    { title: "College Students", description: "Enhance your skills and get industry-ready for your career." },
    { title: "Beginners", description: "Start from scratch with guided projects and mentorship support." },
    { title: "Career Switchers", description: "Gain real-world tech skills to switch careers confidently." },
    { title: "Final-Year Students", description: "Build strong portfolios and get placement-ready." },
  ];

  return (
    <section className="relative py-28 px-6 bg-gradient-to-br from-gray-900 via-black to-blue-950 text-white overflow-hidden">

      
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[140px] animate-blobSlow"></div>
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/25 blur-[140px] animate-blobSlow delay-2000"></div>
      <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/20 blur-[100px] animate-pulse"></div>

      
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">

        
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Who Is <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">InstituteHub For?</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Whether you’re starting your journey or aiming for a career upgrade, InstituteHub is perfect for you.
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {audience.map((person, index) => (
            <div
              key={index}
              className="relative group rounded-3xl p-8 text-center bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(59,130,246,0.25)]
                transition-all duration-500 ease-out
                hover:scale-110 hover:-translate-y-3 hover:shadow-[0_0_80px_rgba(99,102,241,0.6)]"
            >
              
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 blur-xl"></div>

              <h3 className="relative text-xl font-semibold text-blue-400 mb-3">{person.title}</h3>
              <p className="relative text-gray-300 text-sm">{person.description}</p>
            </div>
          ))}
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

export default ForWhom;
