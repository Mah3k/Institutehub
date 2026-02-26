import { useNavigate } from "react-router-dom";
import {
  FaBullseye,
  FaEye,
  FaLaptopCode,
  FaUserTie,
  FaChalkboardTeacher,
  FaCertificate,
  FaUsers,
  FaRocket,
  FaLightbulb,
  FaShieldAlt,
  FaHeart,
} from "react-icons/fa";

function About() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white text-gray-800 overflow-hidden">

      {/* Soft Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-60 -left-60 w-[700px] h-[700px] rounded-full bg-purple-200 opacity-30 blur-[160px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-200 opacity-30 blur-[150px]"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-6">
        <div className="relative z-10 max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              InstituteHub
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            A next-generation technology institute dedicated to building
            confident, industry-ready software professionals.
          </p>
        </div>
      </section>

      {/* IMPROVED IMAGE SECTION */}
      <section
        className="relative min-h-[75vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>

        <div className="relative z-10 max-w-4xl text-center text-white px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Who We Are
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-4">
            InstituteHub bridges the gap between academic learning and
            real-world industry requirements through structured,
            hands-on education.
          </p>
          <p className="text-lg md:text-xl leading-relaxed">
            Our students don’t just learn — they build, experiment,
            collaborate, and grow into professionals ready for
            high-performance corporate environments.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div className="bg-purple-50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition">
          <FaBullseye className="text-purple-600 text-4xl mb-4" />
          <h3 className="text-2xl font-semibold text-purple-700 mb-3">
            Our Mission
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To empower students with industry-ready skills through practical
            learning, mentorship, and continuous improvement.
          </p>
        </div>

        <div className="bg-blue-50 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition">
          <FaEye className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-2xl font-semibold text-blue-700 mb-3">
            Our Vision
          </h3>
          <p className="text-gray-600 leading-relaxed">
            To become a globally recognized tech institute producing confident,
            ethical, and future-ready professionals.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US (ALL BOXES WITH ICONS) */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-purple-600">InstituteHub</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <FaLaptopCode />, text: "Industry-aligned curriculum", color: "text-pink-600" },
            { icon: <FaChalkboardTeacher />, text: "Expert mentors & faculty", color: "text-blue-600" },
            { icon: <FaUsers />, text: "Small batch personalized learning", color: "text-green-600" },
            { icon: <FaRocket />, text: "Career-focused mentorship", color: "text-purple-600" },
            { icon: <FaUserTie />, text: "Placement & interview guidance", color: "text-orange-600" },
            { icon: <FaCertificate />, text: "Certification & skill evaluation", color: "text-red-600" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-2xl p-8 shadow-md hover:-translate-y-2 hover:shadow-xl transition text-center"
            >
              <div className={`text-4xl mb-4 ${item.color}`}>
                {item.icon}
              </div>
              <p className={`font-semibold text-lg ${item.color}`}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES WITH ICONS */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Core Values</h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl shadow-md">
            <FaLightbulb className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-yellow-600 mb-2">
              Innovation
            </h3>
            <p className="text-gray-600">
              We embrace modern technologies and forward-thinking strategies.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-md">
            <FaShieldAlt className="text-blue-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Integrity
            </h3>
            <p className="text-gray-600">
              We maintain transparency, honesty, and ethical standards.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-md">
            <FaHeart className="text-pink-500 text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-pink-600 mb-2">
              Commitment
            </h3>
            <p className="text-gray-600">
              We are dedicated to student growth and career success.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Build Your <span className="text-purple-600">Future?</span>
        </h2>

        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Join InstituteHub and start your journey towards a confident,
          successful tech career.
        </p>

        <button
          onClick={() => navigate("/courses")}
          className="px-14 py-4 rounded-full font-semibold text-lg text-white bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 shadow-lg hover:scale-105 transition"
        >
          Explore Courses
        </button>
      </section>

    </section>
  );
}

export default About;