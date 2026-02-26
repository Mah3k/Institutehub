function ForWhom() {
  const audience = [
    { title: "College Students", description: "Enhance your skills and get industry-ready for your career.", color: "text-blue-600" },
    { title: "Beginners", description: "Start from scratch with guided projects and mentorship support.", color: "text-purple-600" },
    { title: "Career Switchers", description: "Gain real-world tech skills to switch careers confidently.", color: "text-pink-600" },
    { title: "Final-Year Students", description: "Build strong portfolios and get placement-ready.", color: "text-emerald-600" },
  ];

  return (
    <section className="py-28 px-6 bg-purple-50">
      <div className="max-w-7xl mx-auto text-center">

        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-purple-500">
            Who Is <span className="text-purple-600">InstituteHub For?</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Whether you’re starting your journey or aiming for a career upgrade, InstituteHub is perfect for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {audience.map((person, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl border border-purple-100 bg-white shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-3"
            >
              <h3 className={`text-xl font-bold mb-3 ${person.color}`}>
                {person.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {person.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ForWhom;