import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function MyCourseCard({ course }) {
  const auth = useAuth() || {};
  const user = auth.user;
  const role = auth.role;

  if (!course) return null;

  const isStudent = role === "student";
  const isAlreadyEnrolled =
    user?.enrolledCourse && user.enrolledCourse === course._id;

  return (
    <div className="group relative rounded-3xl transition transform hover:-translate-y-2">
      <div className="absolute inset-0 rounded-3xl pointer-events-none
        ring-1 ring-white/10
        group-hover:ring-2
        group-hover:ring-cyan-400/80
        group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
        transition duration-500"
      />

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
        <img
          src={course.image || "https://via.placeholder.com/400x250"}
          alt={course.title || "Course"}
          className="w-full h-48 object-cover rounded-2xl mb-4"
        />

        <h3 className="text-2xl font-bold text-blue-400 mb-2">
          {course.title || "Untitled Course"}
        </h3>

        <p className="text-gray-300 mb-3 line-clamp-3">
          {course.description || "No description available."}
        </p>

        <p className="text-gray-400 text-sm mb-6">
          ⏳ {course.duration || "N/A"} | 🎯 {course.level || "N/A"}
        </p>

        {isStudent ? (
          isAlreadyEnrolled ? (
            <div className="w-full text-center py-2 rounded-full bg-green-500/20 border border-green-400 text-green-400 font-semibold">
              ✔ Already Enrolled
            </div>
          ) : (
            <Link
              to={`/courses/${course._id}`}
              className="block w-full text-center py-2 rounded-full
              bg-gradient-to-r from-blue-500 to-cyan-500
              hover:from-blue-600 hover:to-cyan-600
              font-semibold text-white transition"
            >
              View & Enroll
            </Link>
          )
        ) : (
          <Link
            to={`/courses/${course._id}`}
            className="block w-full text-center py-2 rounded-full
            bg-gradient-to-r from-purple-500 to-pink-500
            hover:from-purple-600 hover:to-pink-600
            font-semibold text-white transition"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default MyCourseCard;
