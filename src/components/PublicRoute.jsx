import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../lib/auth";
import { Loader2 } from "lucide-react";


const PublicRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkUser();
  }, []);

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
    </div>
  );
}


  // 👇 already logged in → redirect away from login/signup
  if (user) {
    return <Navigate to="/rewards" replace />;
  }

  return children;
};

export default PublicRoute;
