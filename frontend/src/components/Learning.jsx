import { FaLaptopCode, FaChalkboardTeacher, FaHandshake, FaUsers, FaProjectDiagram, FaBriefcase } from "react-icons/fa";

function Learning() {
  const features = [
    {
      title: "Hands-on Learning",
      icon: <FaLaptopCode className="text-4xl text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Industry Expert Faculty",
      icon: <FaChalkboardTeacher className="text-4xl text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Industry Partnership",
      icon: <FaHandshake className="text-4xl text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Small Batch Size",
      icon: <FaUsers className="text-4xl text-pink-600" />,
      bg: "bg-pink-100",
    },
    {
      title: "Project Based Curriculum",
      icon: <FaProjectDiagram className="text-4xl text-orange-600" />,
      bg: "bg-orange-100",
    },
    {
      title: "Career Support",
      icon: <FaBriefcase className="text-4xl text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  return (
    <section className="py-24 px-6 bg-green-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-500 mb-4">
            Our Learning Approach
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We focus on practical knowledge, mentorship, and career growth to make you industry-ready.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl border border-green-100 bg-white shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-3"
            >
              <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-2xl ${item.bg} group-hover:scale-110 transition`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Learning;