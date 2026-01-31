import { useEffect, useState } from "react";
import MyCourseCard from "../components/MyCourseCard";

const API_URL = " https://institutehub-iev4.onrender.com"; 

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
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
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950 px-10 py-20 text-white overflow-hidden">

      
      <div className="absolute inset-0">
        <div className="absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 opacity-30 blur-[180px] animate-blobSlow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 opacity-20 blur-[160px] animate-blobSlow delay-2000"></div>
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500 opacity-25 blur-[100px] animate-pulse"></div>

        {[...Array(20)].map((_, i) => (
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

      
      <h1 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-extrabold mb-16 text-center">
        Our{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          Courses
        </span>
      </h1>

      
      {courses.length === 0 ? (
        <p className="relative z-10 text-center text-gray-400">
          No courses available
        </p>
      ) : (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course) => (
            <MyCourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      
      <style>{`
        @keyframes blobSlow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blobSlow {
          animation: blobSlow 15s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}

export default Courses;
