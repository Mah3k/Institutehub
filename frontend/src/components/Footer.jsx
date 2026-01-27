function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-10 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">

        
        <div>
          <h3 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            InstituteHub
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Empowering students with future-ready skills through structured
            learning, real-world projects, and expert guidance — InshaAllah.
          </p>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Get in Touch
          </h4>
          <p className="text-sm text-gray-400 hover:text-blue-400 transition">
            📧 support@institutehub.com
          </p>
          <p className="text-sm text-gray-400 mt-2 hover:text-cyan-400 transition">
            🌍 Learn from anywhere, anytime
          </p>
          <p className="text-sm text-gray-400 mt-2 hover:text-purple-400 transition">
            🤍 Built for students, by educators
          </p>
        </div>
      </div>

      
      <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
        © 2026{" "}
        <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          InstituteHub
        </span>
        . All rights reserved.
        <p className="mt-2 text-xs text-gray-500">
          Designed with dedication • Powered by learning • Guided with purpose
        </p>
      </div>
    </footer>
  );
}

export default Footer;
