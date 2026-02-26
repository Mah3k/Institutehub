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
    <div className="group relative bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">

      {/* Course Image */}
      <img
        src={course.image || "https://via.placeholder.com/400x250"}
        alt={course.title || "Course"}
        className="w-full h-48 object-cover rounded-t-3xl"
      />

      <div className="p-6">

        {/* Course Title */}
        <h3 className="text-2xl font-bold text-orange-500 mb-2">
          {course.title || "Untitled Course"}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-3 line-clamp-3">
          {course.description || "No description available."}
        </p>

        {/* Duration & Level */}
        <p className="text-gray-500 text-sm mb-6">
          ⏳ {course.duration || "N/A"} | 🎯 {course.level || "N/A"}
        </p>

        {/* Buttons */}
        {isStudent ? (
          isAlreadyEnrolled ? (
            <div className="w-full text-center py-2 rounded-full bg-green-100 border border-green-400 text-green-600 font-semibold">
              ✔ Already Enrolled
            </div>
          ) : (
            <Link
              to={`/courses/${course._id}`}
              className="block w-full text-center py-2 rounded-full
              bg-gradient-to-r from-pink-500 to-orange-400
              hover:from-pink-600 hover:to-orange-500
              font-semibold text-white transition duration-300 shadow-md hover:shadow-lg"
            >
              View & Enroll
            </Link>
          )
        ) : (
          <Link
            to={`/courses/${course._id}`}
            className="block w-full text-center py-2 rounded-full
            bg-gradient-to-r from-pink-500 to-orange-400
            hover:from-pink-600 hover:to-orange-500
            font-semibold text-white transition duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

export default MyCourseCard;