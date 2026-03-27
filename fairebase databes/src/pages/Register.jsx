import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // register user
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      // set display name
      await updateProfile(userCredential.user, {
        displayName: form.name,
      });

      navigate("/profile");
    } catch (err) {
      setError("Registration failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg">

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-500 text-white text-sm p-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">

          {/* Name */}
          <div className="flex items-center bg-gray-700 px-3 rounded-lg">
            <FiUser className="text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 bg-transparent text-white outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-gray-700 px-3 rounded-lg">
            <FiMail className="text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent text-white outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-700 px-3 rounded-lg">
            <FiLock className="text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-transparent text-white outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-lg transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;