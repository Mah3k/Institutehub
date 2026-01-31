import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const API_URL = " https://institutehub-iev4.onrender.com";

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
        const res = await fetch(`${API_URL}/courses/${id}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error(err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "student") {
      setMessage("Only students can enroll");
      return;
    }

    try {
      setEnrolling(true);
      setMessage("");

      const res = await fetch(`${API_URL}/enrollments/enroll/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data.message || "Enrollment failed");
      }

      setMessage("🎉 Successfully enrolled!");
    } catch (err) {
      setMessage(err.message);
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
      className="relative min-h-screen bg-cover bg-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${course.image || "https://via.placeholder.com/1600"})`,
      }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-blue-950/80"></div>

      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-52 -left-52 w-[700px] h-[700px] bg-blue-600/30 rounded-full blur-[180px] animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/25 rounded-full blur-[160px] animate-blob delay-2000"></div>
      </div>

      
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-5xl px-8 md:px-20">

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            {course.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8 leading-relaxed">
            {course.description}
          </p>

          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-5 py-2 bg-white/10 rounded-full">
              ⏳ {course.duration || "N/A"}
            </span>
            <span className="px-5 py-2 bg-white/10 rounded-full">
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
              <h3 className="text-2xl font-bold mb-4">📚 Course Syllabus</h3>
              <ul className="space-y-2 text-gray-300">
                {course.syllabus.map((topic, idx) => (
                  <li key={idx}>✔ {topic}</li>
                ))}
              </ul>
            </div>
          )}

          
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="px-10 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition shadow-[0_0_60px_rgba(59,130,246,0.8)] disabled:opacity-60"
          >
            {enrolling ? "Enrolling..." : "Enroll in Course"}
          </button>

          {message && (
            <p className="mt-4 text-cyan-400">
              {message}
            </p>
          )}
        </div>
      </div>

      
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.1); }
        }
        .animate-blob {
          animation: blob 14s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default CourseDetails;