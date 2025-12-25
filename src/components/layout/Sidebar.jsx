import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Compass,
  BookOpen,
  Layers,
  CreditCard,
  Gift,
  Settings,
} from "lucide-react";
import logo from "../../assets/flowna.png";
import { getCurrentUser, logoutUser } from "../../lib/auth";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../lib/profile";

const Sidebar = () => {
  const menuItems = [
    { label: "Home", icon: Home },
    { label: "Discover", icon: Compass },
    { label: "Library", icon: BookOpen },
    { label: "Tech Stack", icon: Layers },
    { label: "Subscriptions", icon: CreditCard },
    { label: "Rewards Hub", icon: Gift, active: true },
    { label: "Settings", icon: Settings },
  ];

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // Fetch user profile
  useEffect(() => {
    const loadProfile = async () => {
      const user = await getCurrentUser();
      if (!user) return;

      const data = await getUserProfile(user.id);
      setProfile(data);
      setProfileLoading(false);
    };

    loadProfile();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const handleLogout = async () => {
  setIsLoading(true);

  await logoutUser();

  setTimeout(() => {
    navigate("/");
  }, 300);
};


  return (
    <>
      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b z-40 flex items-center px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <img src={logo} alt="logo" className="h-10 ml-3" />
      </div>

      {/* MOBILE BACKDROP */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="px-6 py-2">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-16 w-42" />
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setMobileOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                item.active
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="relative" ref={menuRef}>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-50"
          >
            <div className="p-4 border-t border-gray-200">
              {profileLoading ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                    <div className="h-3 w-40 bg-gray-200 rounded" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {profile?.full_name || "User"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {profile?.email}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PROFILE DROPDOWN */}
          {open && (
            <div className="absolute bottom-16 left-4 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/support");
                }}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                Support
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/feedback");
                }}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                Feedback
              </button>

              <div className="border-t border-gray-100" />

              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
              >
                {isLoading ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
