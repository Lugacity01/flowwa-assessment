import { Routes, Route, Navigate } from "react-router-dom";
import RewardsHub from "./pages/RewardsHub";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="no-scrollbar">
      <Routes>
        {/* Default redirect */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        {/* Rewards Page */}
        

         <Route
          path="/rewards"
          element={
            <ProtectedRoute>
              <RewardsHub />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default App;
