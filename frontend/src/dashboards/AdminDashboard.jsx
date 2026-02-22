import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const API_URL = "https://institutehub-iev4.onrender.com";

function AdminDashboard() {
  const { token } = useAuth();

  const [students, setStudents] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [coursesCount, setCoursesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
    // eslint-disable-next-line
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [studentsRes, inquiriesRes, coursesRes] = await Promise.all([
        fetch(`${API_URL}/admin/students`, { headers }),
        fetch(`${API_URL}/admin/inquiries`, { headers }), // ✅ FIXED
        fetch(`${API_URL}/courses`),
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <Stat title="Total Students" value={students.length} />
        <Stat title="Total Courses" value={coursesCount} />
        <Stat title="Messages" value={inquiries.length} />
      </div>

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
                </div>
              ) : (
                <p className="text-gray-400 mt-2">Not Enrolled</p>
              )}
            </div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>

      {inquiries.length === 0 ? (
        <p>No messages found</p>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4">
          {inquiries.map((msg) => (
            <div key={msg._id} className="border-b border-gray-700 py-3">
              <p><strong>{msg.name}</strong> ({msg.email})</p>
              <p>{msg.message}</p>
              <p className="text-gray-400 text-sm">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>
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