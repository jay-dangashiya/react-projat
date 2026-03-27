import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiMail, FiLogOut } from "react-icons/fi";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // If user not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-xl text-center shadow-lg">
          <FiUser className="text-5xl text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-4">Please login first</p>
          <Link
            to="/"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 w-full max-w-md rounded-2xl shadow-lg p-6">

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <FiUser className="text-3xl text-gray-400" />
            </div>
          )}

          <h2 className="text-xl text-white font-semibold">
            {user.displayName || "User"}
          </h2>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3">
          <div className="bg-gray-700 p-3 rounded-lg flex items-center gap-3">
            <FiMail className="text-gray-400" />
            <span className="text-white text-sm">{user.email}</span>
          </div>

          <div className="bg-gray-700 p-3 rounded-lg text-white text-sm truncate">
            UID: {user.uid}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;