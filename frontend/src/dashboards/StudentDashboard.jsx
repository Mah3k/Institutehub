import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "https://institutehub-iev4.onrender.com";

function StudentDashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Fetch dashboard data */
  useEffect(() => {
    fetchDashboard();
    // eslint-disable-next-line
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load dashboard");
      const data = await res.json();
      setUser(data);
      setCourse(data.enrolledCourse || null);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* Unenroll */
  const handleUnenroll = async () => {
    if (!window.confirm("Are you sure you want to unenroll from this course?"))
      return;

    try {
      const res = await fetch(`${API_URL}/enrollments/unenroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      await fetchDashboard();
      alert("Successfully unenrolled");
    } catch (err) {
      alert(err.message || "Unenroll failed");
    }
  };

  /*Loader */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin h-14 w-14 border-4 border-cyan-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950 text-white px-8 py-12 overflow-hidden">

      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-52 -left-52 w-[700px] h-[700px] bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 opacity-30 rounded-full blur-[180px] animate-blobSlow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 opacity-20 rounded-full blur-[160px] animate-blobSlow delay-2000"></div>
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] bg-cyan-500 opacity-25 rounded-full blur-[100px] animate-pulse"></div>

        
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20 animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">

        {/*PROFILE CARD */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center shadow-lg hover:shadow-cyan-500/40 transition">
          <div>
            <h1 className="text-4xl font-extrabold">
              Welcome,{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.8)]">
                {user.name}
              </span>
            </h1>
            <p className="text-gray-300 mt-1">{user.email}</p>
            <p className="text-sm text-gray-400 mt-2">
              Role:{" "}
              <span className="capitalize bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {user.role}
              </span>
            </p>
          </div>

          <span
            className={`mt-6 md:mt-0 px-6 py-2 rounded-full text-sm font-semibold ${
              course ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
            }`}
          >
            {course ? "Enrolled" : "Not Enrolled"}
          </span>
        </div>

        {/*ENROLLED COURSE*/}
        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.7)]">
            🎓 My Course
          </h2>

          {!course ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center shadow-lg hover:shadow-cyan-500/40 transition">
              <p className="text-gray-300 mb-4">
                You are not enrolled in any course yet.
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="mt-4 px-6 py-2 rounded-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold shadow-lg transition"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 items-center">
             
              <img
                src={course.image}
                alt={course.title}
                className="h-56 w-full object-cover rounded-2xl shadow-lg hover:shadow-cyan-500/50 transition"
              />

              
              <div className="md:col-span-2">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.8)] mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-300 mb-4">{course.description}</p>
                <p className="text-gray-400 text-sm mb-4">
                  ⏳ {course.duration} | 🎯 {course.level}
                </p>

                
                <button
                  onClick={handleUnenroll}
                  className="px-6 py-2 rounded-full bg-red-500/20 border border-red-400 text-red-400 hover:bg-red-500/30 shadow-lg transition"
                >
                  Unenroll from Course
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <style>{`
        @keyframes blobSlow {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blobSlow { animation: blobSlow 15s infinite ease-in-out; }
      `}</style>
    </section>
  );
}

export default StudentDashboard;