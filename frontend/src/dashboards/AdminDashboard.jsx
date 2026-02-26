import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBook, FaEnvelope, FaUserGraduate } from "react-icons/fa";

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
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700 text-lg">
        Loading Dashboard...
      </div>
    );
  }

  const unreadCount = inquiries.filter((msg) => !msg.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 px-10 py-10">

      <h1 className="text-4xl font-bold mb-12 flex items-center gap-3 text-gray-800">
        Admin Dashboard <FaUserGraduate className="text-blue-600" />
      </h1>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Stat title="Total Students" value={students.length} color="from-blue-100 to-blue-200" icon={<FaUsers />} />
        <Stat title="Total Courses" value={coursesCount} color="from-green-100 to-green-200" icon={<FaBook />} />
        <Stat title="Unread Messages" value={unreadCount} color="from-red-100 to-red-200" icon={<FaEnvelope />} />
      </div>

      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800 border-b border-gray-300 pb-2">
        Students <FaUsers className="text-blue-500" />
      </h2>

      {students.length === 0 ? (
        <p className="text-gray-500">No students found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {students.map((s) => (
            <div
              key={s._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>
              <p className="text-gray-500 text-sm">{s.email}</p>

              {s.enrolledCourse ? (
                <div className="mt-3 text-sm text-green-600 space-y-1">
                  <p>{s.enrolledCourse.title}</p>
                  <p>{s.enrolledCourse.duration}</p>
                  <p>{s.enrolledCourse.level}</p>
                  <p>₹{s.enrolledCourse.fees}</p>
                </div>
              ) : (
                <p className="text-gray-400 mt-3 text-sm">Not Enrolled</p>
              )}

              <button
                onClick={() => deleteStudent(s._id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm"
              >
                Delete Student
              </button>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800 border-b border-gray-300 pb-2">
        Contact Messages <FaEnvelope className="text-purple-500" />
      </h2>

      {inquiries.length === 0 ? (
        <p className="text-gray-500">No messages found</p>
      ) : (
        <div className="space-y-6">
          {inquiries.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">
                  {msg.name}
                  <span className="text-gray-500 text-sm ml-2">
                    ({msg.email})
                  </span>
                </p>

                {msg.isRead ? (
                  <span className="text-green-600 text-sm font-medium">Read</span>
                ) : (
                  <span className="text-red-500 text-sm font-medium">Unread</span>
                )}
              </div>

              <p className="mt-3 text-gray-700">{msg.message}</p>

              <p className="text-gray-400 text-xs mt-2">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-4 mt-4">
                {!msg.isRead && (
                  <button
                    onClick={() => markAsRead(msg._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm"
                  >
                    Mark as Read
                  </button>
                )}

                <button
                  onClick={() => deleteInquiry(msg._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
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

function Stat({ title, value, color, icon }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-8 rounded-2xl shadow-md text-center border border-gray-200 hover:shadow-xl transition`}>
      <div className="flex justify-center mb-3 text-2xl text-gray-700">
        {icon}
      </div>
      <p className="text-gray-600 mb-2">{title}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

export default AdminDashboard;