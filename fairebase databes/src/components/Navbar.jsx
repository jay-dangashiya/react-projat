import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout Error:", err);
    }
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-white hover:bg-white/20 transition"
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        {/* Logo */}
        <Link to="/" className="text-white font-bold text-lg">
          🔐 Auth App
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              <NavLink to="/profile">
                <span className="flex items-center gap-1">
                  <FiUser /> Profile
                </span>
              </NavLink>

              <button
                onClick={logout}
                className="flex items-center gap-1 bg-white/20 px-4 py-2 rounded-lg text-white hover:bg-white/30"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/">Login</NavLink>

              <Link
                to="/register"
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/30 backdrop-blur-md px-4 pb-4 space-y-2">
          {user ? (
            <>
              <NavLink to="/profile" onClick={() => setOpen(false)}>
                <FiUser className="inline mr-2" />
                Profile
              </NavLink>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-white hover:bg-white/20 rounded-lg"
              >
                <FiLogOut className="inline mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" onClick={() => setOpen(false)}>
                Login
              </NavLink>

              <NavLink to="/register" onClick={() => setOpen(false)}>
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;