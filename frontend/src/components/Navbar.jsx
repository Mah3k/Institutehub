import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  const navLinks = ["/", "/courses", "/about", "/contact"];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg group-hover:scale-110 transition duration-300">
            IH
            <div className="absolute inset-0 rounded-xl bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition"></div>
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Institute
            </span>
            <span className="text-gray-800">Hub</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          {navLinks.map((path, i) => {
            const label =
              path === "/"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <NavLink
                key={i}
                to={path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}

          {token && role === "student" && (
            <NavLink
              to="/student-dashboard"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {token && role === "admin" && (
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `transition ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!token && (
            <>
              <Link
                to="/login"
                className="px-5 py-2 rounded-full font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-6 py-2 rounded-full font-semibold bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-full font-semibold bg-red-500 hover:bg-red-600 text-white transition"
            >
              Logout
            </button>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4 font-medium text-gray-700">
          {navLinks.map((path, i) => {
            const label =
              path === "/"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <NavLink
                key={i}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block ${
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "hover:text-blue-600"
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}

          {token && role === "student" && (
            <NavLink
              to="/student-dashboard"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Dashboard
            </NavLink>
          )}

          {token && role === "admin" && (
            <NavLink
              to="/admin-dashboard"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-blue-600"
            >
              Admin
            </NavLink>
          )}

          {!token && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-white bg-blue-600 px-4 py-2 rounded-full text-center"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;