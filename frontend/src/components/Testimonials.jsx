import { useState, useEffect } from "react";

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
    name: "Eira Sayyed",
    role: "Frontend Developer",
    feedback:
      "The interactive lessons and projects made learning React intuitive and fun.",
  },
  {
    name: "Ayesha Khan",
    role: "Data Scientist",
    feedback:
      "The data courses and hands-on projects prepared me perfectly for real-world challenges.",
  },
];

function Testimonial() {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-[#F9F5FB] via-[#F4ECF9] to-[#F9F5FB]">
      <div className="max-w-5xl mx-auto text-center">

        {/* Gradient Heading Like Screenshot */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent">
          What Our Students Say
        </h2>

        <p className="text-gray-600 mb-16 text-lg">
          Real feedback from learners who transformed their careers with us.
        </p>

        {/* White Card */}
        <div className="relative bg-white rounded-2xl shadow-lg p-10 transition-all duration-700 ease-in-out">
          <p className="text-gray-700 italic text-lg leading-relaxed mb-6 min-h-[90px]">
            "{testimonials[current].feedback}"
          </p>

          <h3 className="text-xl font-semibold text-gray-900">
            {testimonials[current].name}
          </h3>
          <p className="text-gray-500 text-sm">
            {testimonials[current].role}
          </p>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-purple-600"
                  : "w-3 bg-purple-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonial;