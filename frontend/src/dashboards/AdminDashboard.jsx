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

      if (!studentsRes.ok) throw new Error("Students fetch failed");
      if (!inquiriesRes.ok) throw new Error("Inquiries fetch failed");
      if (!coursesRes.ok) throw new Error("Courses fetch failed");

      const studentsData = await studentsRes.json();
      const inquiriesData = await inquiriesRes.json();
      const coursesData = await coursesRes.json();

      setStudents(Array.isArray(studentsData) ? studentsData : []);
      setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
      setCoursesCount(Array.isArray(coursesData) ? coursesData.length : 0);

    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE STUDENT ================= */
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    await fetch(`${API_URL}/api/admin/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchDashboardData();
  };

  /* ================= DELETE INQUIRY ================= */
  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await fetch(`${API_URL}/api/admin/inquiries/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchDashboardData();
  };

  /* ================= MARK AS READ ================= */
  const markAsRead = async (id) => {
    await fetch(`${API_URL}/api/admin/inquiries/${id}/read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchDashboardData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Dashboard...
      </div>
    );
  }

  const unreadCount = inquiries.filter((msg) => !msg.isRead).length;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <Stat title="Total Students" value={students.length} />
        <Stat title="Total Courses" value={coursesCount} />
        <Stat title="Unread Messages" value={unreadCount} />
      </div>

      {/* ================= STUDENTS ================= */}
      <h2 className="text-2xl font-bold mb-4">Students</h2>

      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 mb-10">
          {students.map((s) => (
            <div key={s._id} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-bold">{s.name}</h3>
              <p>{s.email}</p>

              {s.enrolledCourse ? (
                <div className="mt-2 text-green-400">
                  <p>Course: {s.enrolledCourse.title}</p>
                  <p>Duration: {s.enrolledCourse.duration}</p>
                  <p>Level: {s.enrolledCourse.level}</p>
                  <p>Fees: ₹{s.enrolledCourse.fees}</p>
                </div>
              ) : (
                <p className="text-gray-400 mt-2">Not Enrolled</p>
              )}

              <button
                onClick={() => deleteStudent(s._id)}
                className="mt-3 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= INQUIRIES ================= */}
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      {inquiries.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4">
          {inquiries.map((msg) => (
            <div key={msg._id} className="border-b border-gray-700 py-4">
              <div className="flex justify-between items-center">
                <p>
                  <strong>{msg.name}</strong> ({msg.email})
                </p>

                {msg.isRead ? (
                  <span className="text-green-400 text-sm">Read</span>
                ) : (
                  <span className="text-red-400 text-sm">Unread</span>
                )}
              </div>

              <p className="mt-2">{msg.message}</p>

              <p className="text-gray-400 text-sm mt-1">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-3 mt-3">
                {!msg.isRead && (
                  <button
                    onClick={() => markAsRead(msg._id)}
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                  >
                    Mark as Read
                  </button>
                )}

                <button
                  onClick={() => deleteInquiry(msg._id)}
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
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
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <p className="text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default AdminDashboard;