import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../lib/auth";
import { getUserProfile, upsertUserProfile } from "../lib/profile";
import CompleteProfileModal from "./CompleteProfileModal";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const authUser = await getCurrentUser();

        if (!authUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(authUser);

        const existingProfile = await getUserProfile(authUser.id);
        setProfile(existingProfile);
      } catch (err) {
        console.error("ProtectedRoute error:", err);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleProfileComplete = async (fullName) => {
    try {
      const payload = {
        id: user.id,          // REQUIRED
        email: user.email,    // SAVE EMAIL
        full_name: fullName,  // SAVE NAME
      };

      await upsertUserProfile(payload);

      // update local state immediately
      setProfile(payload);
    } catch (err) {
      alert(err.message);
    }
  };

  // ⏳ Checking auth/profile
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 🔐 Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🚨 Profile incomplete
  if (!profile?.full_name) {
    return (
      <CompleteProfileModal
        open={true}
        onSubmit={handleProfileComplete}
      />
    );
  }

  // ✅ All good
  return children;
};

export default ProtectedRoute;
