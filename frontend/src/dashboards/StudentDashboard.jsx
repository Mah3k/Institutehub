import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";

const API_URL = "https://institutehub-iev4.onrender.com/api";

function StudentDashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchDashboard();
    }
  }, [token]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to load dashboard");
      }

      const data = await res.json();
      setUser(data);
      setCourse(data.enrolledCourse || null);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async () => {
    if (!window.confirm("Are you sure you want to unenroll from this course?"))
      return;

    try {
      const res = await fetch(`${API_URL}/enrollments/unenroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await fetchDashboard();
      alert("Successfully unenrolled");
    } catch (err) {
      alert(err.message || "Unenroll failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-14 w-14 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        Loading user...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 px-8 py-12">

      <div className="max-w-7xl mx-auto space-y-14">

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <FaUserGraduate className="text-4xl text-blue-600" />
            <h1 className="text-5xl font-extrabold text-gray-800">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                {user.name}
              </span>
            </h1>
          </div>

          <p className="text-lg text-gray-600">{user.email}</p>

          <p className="text-lg">
            Role:{" "}
            <span className="capitalize font-semibold bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">
              {user.role}
            </span>
          </p>

          <p className={`text-lg font-semibold ${course ? "text-green-600" : "text-gray-500"}`}>
            {course ? "Enrolled in a Course" : "Not Enrolled in Any Course"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="rounded-3xl shadow-lg p-8 bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              📊 Learning Overview
            </h3>
            <p className="text-gray-700 mb-2">
              Active Course: {course ? course.title : "None"}
            </p>
            <p className="text-gray-700">
              Progress: {course ? "In Progress" : "0%"}
            </p>
          </div>

          <div className="rounded-3xl shadow-lg p-8 bg-gradient-to-br from-green-100 to-teal-100 border border-green-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🏆 Achievements
            </h3>
            <p className="text-gray-700">
              Complete courses to earn certificates and badges.
            </p>
          </div>

          <div className="rounded-3xl shadow-lg p-8 bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🎯 Goals
            </h3>
            <p className="text-gray-700">
              Stay consistent and finish your enrolled course successfully.
            </p>
          </div>

        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
            My Course
          </h2>

          {!course ? (
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center border border-gray-100">
              <p className="text-gray-600 mb-4">
                You are not enrolled in any course yet.
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white font-semibold"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 items-center rounded-3xl shadow-lg p-8 bg-gradient-to-br from-purple-100 to-blue-100 border border-purple-200">
              <img
                src={course.image}
                alt={course.title}
                className="h-56 w-full object-cover rounded-2xl"
              />

              <div className="md:col-span-2">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {course.description}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  ⏳ {course.duration} | 🎯 {course.level}
                </p>

                <button
                  onClick={handleUnenroll}
                  className="px-6 py-2 rounded-full border border-red-400 text-red-500 hover:bg-red-200 transition"
                >
                  Unenroll from Course
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default StudentDashboard;