// src/pages/Signup.jsx
import { useState } from "react";
import { signUpUser } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const referrerId = new URLSearchParams(window.location.search).get("ref");

      // ✅ SIGN UP ONCE
      const user = await signUpUser(email, password);

      
      if (referrerId && user?.id) {
        await supabase.rpc("handle_referral", {
          referrer: referrerId,
          referred: user.id,
        });
      }

      
      setSuccess("A verification link has been sent to your email. Please check your inbox.");

      setTimeout(() => {
        navigate("/");
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-600 to-purple-700">
      <form
        onSubmit={handleSignup}
        className="bg-white w-[440px] rounded-2xl px-8 py-10 shadow-lg"
      >
        <h1 className="text-2xl font-semibold text-center text-purple-600">
          Create Your Account
        </h1>

        <p className="text-center text-sm text-gray-500 mt-2">
          Sign up to manage your tools
        </p>

        {/* Email */}
        <div className="mt-8">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full h-[52px] px-4 mt-2 border border-[#E6E1F5] rounded-lg"
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
            className="w-full h-[52px] px-4 mt-2 border border-[#E6E1F5] rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mt-5">
          <label className="text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-[52px] px-4 mt-2 border border-[#E6E1F5] rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* SUCCESS MESSAGE */}
        {success && (
          <p className="text-sm text-green-600 text-center mt-4">
            {success}
          </p>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-sm text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[52px] bg-purple-600 text-white rounded-full mt-6 hover:bg-purple-700 transition"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            className="text-purple-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
