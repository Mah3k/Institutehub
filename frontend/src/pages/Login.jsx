import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

// ✅ Correct backend auth base URL
const API_URL = "https://institutehub-iev4.onrender.com/api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error. Invalid response format.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const role = data?.user?.role;
      if (!role) throw new Error("User role missing");

      login(data.token, role.toLowerCase());

      role === "admin"
        ? navigate("/admin-dashboard")
        : navigate("/student-dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 text-white overflow-hidden bg-gray-900">

      {/* 🌟 GLOWING BACKGROUND BLOBS */}
      <div className="absolute inset-0">
        <div className="absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 opacity-30 blur-[180px] animate-blobSlow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 opacity-20 blur-[160px] animate-blobSlow delay-2000"></div>
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500 opacity-25 blur-[100px] animate-pulse"></div>
      </div>

      {/* ✨ GLASS LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition">

        <h2 className="text-4xl font-extrabold text-center mb-4">
          Welcome{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Back
          </span>
        </h2>

        <p className="text-center text-gray-300 mb-8">
          Login to continue your learning journey
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-black/40 text-white placeholder-gray-300 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black/40 text-white placeholder-gray-300 px-5 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full font-semibold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 hover:from-purple-600 hover:via-blue-600 hover:to-cyan-500 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-300">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* 🎨 ANIMATION */}
      <style>{`
        @keyframes blobSlow {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blobSlow {
          animation: blobSlow 15s infinite ease-in-out;
        }
      `}</style>

    </section>
  );
}

export default Login;
