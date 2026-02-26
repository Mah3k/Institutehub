import { useEffect, useState } from "react";
import MyCourseCard from "../components/MyCourseCard";

const API_URL = import.meta.env.VITE_API_URL;

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_URL}/api/courses`);

      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error("Failed to load courses:", err);
      setError("Unable to load courses at the moment.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-600 text-lg">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-500 text-lg">
        {error}
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white px-10 py-20">

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-16 text-center">
        Our{" "}
        <span className="text-orange-500 drop-shadow-sm">
          Courses
        </span>
      </h1>

      {/* Course grid */}
      {courses.length === 0 ? (
        <p className="text-center text-gray-500">
          No courses available
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <MyCourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Courses;