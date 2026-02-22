import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = "https://institutehub-iev4.onrender.com";

function AdminDashboard() {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [coursesCount, setCoursesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [token, role]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [studentsRes, inquiriesRes, coursesRes] = await Promise.all([
        fetch(`${API_URL}/api/admin/students`, { headers }),
        fetch(`${API_URL}/api/admin/inquiries`, { headers }),
        fetch(`${API_URL}/api/courses`),
      ]);

      const studentsData = studentsRes.ok ? await studentsRes.json() : [];
      const inquiriesData = inquiriesRes.ok ? await inquiriesRes.json() : [];
      const coursesData = coursesRes.ok ? await coursesRes.json() : [];

      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
      setCoursesCount(Array.isArray(coursesData) ? coursesData.length : 0);
    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    await fetch(`${API_URL}/api/admin/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchDashboardData();
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await fetch(`${API_URL}/api/admin/inquiries/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchDashboardData();
  };

  const markAsRead = async (id) => {
    await fetch(`${API_URL}/api/admin/inquiries/${id}/read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-lg">
        Loading Dashboard...
      </div>
    );
  }

  const unreadCount = inquiries.filter((msg) => !msg.isRead).length;

  return (
    <div className="min-h-screen bg-black text-white px-10 py-8">
      <h1 className="text-4xl font-bold mb-10 tracking-wide">
        Admin Dashboard
      </h1>

      {/* ===== STATS ===== */}
      <div className="grid md:grid-cols-3 gap-8 mb-14">
        <Stat title="Total Students" value={students.length} />
        <Stat title="Total Courses" value={coursesCount} />
        <Stat title="Unread Messages" value={unreadCount} />
      </div>

      {/* ===== STUDENTS ===== */}
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
        Students
      </h2>

      {students.length === 0 ? (
        <p className="text-gray-400">No students found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {students.map((s) => (
            <div
              key={s._id}
              className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:shadow-lg hover:shadow-gray-800 transition"
            >
              <h3 className="text-lg font-semibold">{s.name}</h3>
              <p className="text-gray-400 text-sm">{s.email}</p>

              {s.enrolledCourse ? (
                <div className="mt-3 text-sm text-green-400 space-y-1">
                  <p>{s.enrolledCourse.title}</p>
                  <p>{s.enrolledCourse.duration}</p>
                  <p>{s.enrolledCourse.level}</p>
                  <p>₹{s.enrolledCourse.fees}</p>
                </div>
              ) : (
                <p className="text-gray-500 mt-3 text-sm">
                  Not Enrolled
                </p>
              )}

              <button
                onClick={() => deleteStudent(s._id)}
                className="mt-4 w-full bg-red-600 py-2 rounded-md hover:bg-red-700 transition text-sm"
              >
                Delete Student
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ===== INQUIRIES ===== */}
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
        Contact Messages
      </h2>

      {inquiries.length === 0 ? (
        <p className="text-gray-400">No messages found</p>
      ) : (
        <div className="space-y-6">
          {inquiries.map((msg) => (
            <div
              key={msg._id}
              className="bg-gray-900 border border-gray-800 p-6 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  {msg.name}
                  <span className="text-gray-400 text-sm ml-2">
                    ({msg.email})
                  </span>
                </p>

                {msg.isRead ? (
                  <span className="text-green-400 text-sm">Read</span>
                ) : (
                  <span className="text-red-400 text-sm">Unread</span>
                )}
              </div>

              <p className="mt-3 text-gray-300">{msg.message}</p>

              <p className="text-gray-500 text-xs mt-2">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-4 mt-4">
                {!msg.isRead && (
                  <button
                    onClick={() => markAsRead(msg._id)}
                    className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
                  >
                    Mark as Read
                  </button>
                )}

                <button
                  onClick={() => deleteInquiry(msg._id)}
                  className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl text-center hover:shadow-lg hover:shadow-gray-800 transition">
      <p className="text-gray-400 mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

export default AdminDashboard;