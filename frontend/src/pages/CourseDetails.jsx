import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, role } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/api/courses/${id}`);
        const text = await res.text();

        if (!res.ok) {
          throw new Error("Course not found");
        }

        const data = JSON.parse(text);
        setCourse(data);
      } catch (err) {
        console.error("Course fetch error:", err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, API_URL]);

  const handleEnroll = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "student") {
      setMessage("Only students can enroll in courses");
      return;
    }

    try {
      setEnrolling(true);
      setMessage("");

      const res = await fetch(
        `${API_URL}/api/enrollments/enroll/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data.message || "Enrollment failed");
      }

      setMessage("🎉 Successfully enrolled!");
    } catch (err) {
      console.error("Enroll error:", err);
      setMessage(err.message || "Server error");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Course not found
      </div>
    );
  }

  return (
    <section
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${course.image || "https://via.placeholder.com/1600"})`,
        filter: "brightness(1.15)", // 🔆 slightly brighter image
      }}
    >
      {/* Softer Overlay (reduced darkness) */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-5xl px-8 md:px-20">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
            {course.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              ⏳ {course.duration || "N/A"}
            </span>
            <span className="px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full">
              🎯 {course.level || "N/A"}
            </span>
          </div>

          {course.fees && (
            <p className="text-3xl font-bold text-green-400 mb-8">
              ₹ {course.fees}
            </p>
          )}

          {Array.isArray(course.syllabus) && course.syllabus.length > 0 && (
            <div className="mb-10 max-w-2xl">
              <h3 className="text-2xl font-bold mb-4 text-white">
                📚 Course Syllabus
              </h3>
              <ul className="space-y-2 text-gray-200">
                {course.syllabus.map((topic, idx) => (
                  <li key={idx}>✔ {topic}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="px-10 py-4 rounded-full text-lg font-semibold 
            bg-gradient-to-r from-pink-500 to-orange-400
            hover:from-pink-600 hover:to-orange-500
            transition shadow-lg disabled:opacity-60"
          >
            {enrolling ? "Enrolling..." : "Enroll in Course"}
          </button>

          {message && (
            <p className="mt-4 text-green-300">{message}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CourseDetails;