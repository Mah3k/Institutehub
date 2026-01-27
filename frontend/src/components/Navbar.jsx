import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-3xl bg-black/40 border-b border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        
        <Link to="/" className="text-2xl font-extrabold text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">
          Institute<span className="text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Hub</span>
        </Link>

        
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-300">
          {["/", "/courses", "/about", "/contact"].map((path, i) => {
            const label = path === "/" ? "Home" : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `relative px-2 py-1 rounded-md transition-all ${
                    isActive
                      ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500 after:rounded-full after:animate-pulse"
                      : "hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}

          {/* Student Dashboard */}
          {token && role === "student" && (
            <NavLink
              to="/student-dashboard"
              className={({ isActive }) =>
                `relative px-2 py-1 rounded-md transition-all ${
                  isActive
                    ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500 after:rounded-full after:animate-pulse"
                    : "hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Admin Dashboard */}
          {token && role === "admin" && (
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `relative px-2 py-1 rounded-md transition-all ${
                  isActive
                    ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-500 after:rounded-full after:animate-pulse"
                    : "hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </div>

        
        <div className="flex items-center gap-4">
          {!token && (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:from-blue-600 hover:via-cyan-600 hover:to-purple-600 text-white transition shadow-[0_0_30px_rgba(99,102,241,0.5)]"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full font-semibold bg-red-500 hover:bg-red-600 text-white transition shadow-[0_0_25px_rgba(255,0,0,0.5)]"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
