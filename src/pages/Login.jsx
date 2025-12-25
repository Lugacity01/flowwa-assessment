import { useState } from "react";
import { loginUser } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginUser(email, password);
      navigate("/rewards"); // ProtectedRoute handles the rest
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-600 to-purple-700">
      <form
        onSubmit={handleLogin}
        className="bg-white w-[440px] rounded-2xl px-8 py-6 shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center text-purple-600">
          Log in to flowwa
        </h1>

        <p className="text-center text-sm text-gray-500 mt-2">
          Log in to receive personalized recommendations
        </p>

        {/* Email */}
        <div className="mt-6">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="user@example.com"
            className="w-full h-[52px] px-4 mt-2 border border-[#E6E1F5] rounded-lg text-sm focus:outline-none focus:border-purple-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mt-5">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-[52px] px-4 mt-2 border border-[#E6E1F5] rounded-lg text-sm focus:outline-none focus:border-purple-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mt-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] bg-purple-600 text-white rounded-full mt-6 text-sm font-medium hover:bg-purple-700 transition"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* OR DIVIDER */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* GOOGLE LOGIN */}
        <button
          type="button"
          className="w-full h-[52px] flex items-center justify-center gap-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        {/* SIGN UP LINK */}
        <p className="text-center text-sm mt-6">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-purple-600 cursor-pointer font-medium"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
