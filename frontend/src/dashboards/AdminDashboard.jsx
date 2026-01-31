import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = " https://institutehub-iev4.onrender.com";

function AdminDashboard() {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [coursesCount, setCoursesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  /* Protect Route */
  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }
    fetchDashboardData();
    // eslint-disable-next-line
  }, [token, role]);

  /* Fetch dashboard data */
  const fetchDashboardData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [studentsRes, inquiriesRes, coursesRes] = await Promise.all([
        fetch(`${API_URL}/admin/students`, { headers }),
        fetch(`${API_URL}/contact`, { headers }),
        fetch(`${API_URL}/courses`, { headers }),
      ]);

      if (studentsRes.ok) setStudents(await studentsRes.json());
      if (inquiriesRes.ok) setInquiries(await inquiriesRes.json());
      if (coursesRes.ok) {
        const courses = await coursesRes.json();
        setCoursesCount(courses.length);
      }
    } catch (err) {
      console.error("Admin dashboard fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* Toggle Read */
  const toggleRead = async (id) => {
    await fetch(`${API_URL}/contact/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchDashboardData();
  };

  /* Delete Inquiry */
  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;

    await fetch(`${API_URL}/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchDashboardData();
  };

  /*Loader */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-blue-950">
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

      <div className="relative z-10 max-w-7xl mx-auto">

        
        <h1 className="text-5xl font-extrabold mb-2">
          Admin{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(139,92,246,0.8)]">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-300 mb-12 text-lg md:text-xl">
          System overview & student activity
        </p>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Stat title="Total Students" value={students.length} />
          <Stat title="Total Courses" value={coursesCount} />
          <Stat title="Messages" value={inquiries.length} />
        </div>

        
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.7)]">
          👩‍🎓 Students & Enrollments
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-400 mb-16">No students registered yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {students.map((s) => {
              const enrolledCourse = s.enrolledCourse;

              return (
                <div
                  key={s._id}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all duration-300"
                >
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-14 w-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-xl font-bold text-cyan-400">
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-lg bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        {s.name}
                      </p>
                      <p className="text-sm text-gray-400">{s.email}</p>
                    </div>
                  </div>

                  
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        enrolledCourse
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {enrolledCourse ? "Enrolled" : "Not Enrolled"}
                    </span>
                  </div>

                  
                  {enrolledCourse ? (
                    <div className="bg-black/20 border border-white/10 rounded-xl p-4">
                      <p className="text-xs text-gray-400 mb-1">Current Course</p>
                      <p className="font-semibold text-cyan-400">{enrolledCourse.title}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Duration: {enrolledCourse.duration}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No active enrollment</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/*CONTACT MESSAGES */}
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 drop-shadow-[0_0_15px_rgba(139,92,246,0.7)]">
          📩 Contact Messages
        </h2>

        {inquiries.length === 0 ? (
          <p className="text-gray-400">No messages yet</p>
        ) : (
          <div className="overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
            <table className="min-w-full text-sm">
              <thead className="bg-white/10 text-gray-300">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((i) => (
                  <tr key={i._id} className="border-t border-white/10">
                    <td className="px-6 py-4 text-cyan-400">{i.name}</td>
                    <td className="px-6 py-4">{i.email}</td>
                    <td className="px-6 py-4">{i.message}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(i.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => toggleRead(i._id)}
                        className="px-3 py-1 rounded-full text-xs bg-cyan-500 hover:bg-cyan-600"
                      >
                        {i.isRead ? "Unread" : "Mark Read"}
                      </button>
                      <button
                        onClick={() => deleteInquiry(i._id)}
                        className="px-3 py-1 rounded-full text-xs bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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


function Stat({ title, value }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/40 transition">
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]">
        {value}
      </p>
    </div>
  );
}

export default AdminDashboard;