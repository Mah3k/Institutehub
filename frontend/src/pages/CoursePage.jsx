import { useEffect, useState } from "react";
import MyCourseCard from "../components/MyCourseCard";

const API_URL = " https://institutehub-iev4.onrender.com"; 

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/courses`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to load courses", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-gray-900 via-black to-blue-950">
        Loading courses...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950 px-10 py-16 text-white overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center relative z-10">
        Our <span className="text-blue-400 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Courses</span>
      </h1>

      {courses.length === 0 ? (
        <p className="text-center text-gray-400 relative z-10">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {courses.map((course) => (
            <MyCourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CoursePage;
