import { useEffect, useState } from "react";
import { getCurrentUser } from "../lib/auth";


const CompleteProfileModal = ({ open, onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserEmail = async () => {
      const user = await getCurrentUser();
      if (user?.email) {
        setEmail(user.email);
      }
    };

    if (open) {
      loadUserEmail();
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!fullName.trim()) {
      alert("Please enter your name");
      return;
    }

    setLoading(true);
    await onSubmit(fullName);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[380px] rounded-xl px-6 py-8">
        <h2 className="text-xl font-semibold text-center mb-2">
          Complete Your Profile
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Please add your name to continue
        </p>

        {/* Email (from auth) */}
        <div className="mb-4">
          <label className="text-sm font-medium">Email</label>
          <input
            value={email}
            disabled
            className="w-full mt-1 px-4 py-3 border rounded-lg bg-gray-100 text-sm"
          />
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label className="text-sm font-medium">Full Name</label>
          <input
            placeholder="Your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full mt-1 px-4 py-3 border rounded-lg text-sm"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default CompleteProfileModal;
