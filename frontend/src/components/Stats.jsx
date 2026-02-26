function Stats() {
  const stats = [
    { number: "10,000+", label: "Students Trained" },
    { number: "50+", label: "Expert Mentors" },
    { number: "95%", label: "Placement Success" },
    { number: "500+", label: "Projects Completed" },
  ];

  return (
    <section className="py-28 px-6 bg-gradient-to-r from-[#2E2A8F] via-[#5B2C91] to-[#7B2CBF] text-white">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Our Impact
        </h2>

        <p className="text-white/80 max-w-2xl mx-auto mb-20">
          Numbers that reflect our commitment to excellence and student success.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16">

          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              
              <h3 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide">
                {stat.number}
              </h3>

              <p className="text-white/90 text-lg font-medium">
                {stat.label}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Stats;