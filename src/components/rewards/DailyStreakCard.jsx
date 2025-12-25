import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { getCurrentUser } from "../../lib/auth";
import { claimDailyStreak } from "../../lib/rewards";
import { supabase } from "../../lib/supabase";
import ClaimSuccessModal from "../ClaimSuccessModal";

const DailyStreakCard = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const [streak, setStreak] = useState(0);
  const [claimedToday, setClaimedToday] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        const { data } = await supabase
          .from("daily_streaks")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setStreak(data.streak_count);

          const today = new Date().toISOString().split("T")[0];
          setClaimedToday(data.last_claim_date === today);
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchStreak();
  }, []);

  const handleClaim = async () => {
    try {
      setLoading(true);
      const user = await getCurrentUser();
      if (!user) return;

      const result = await claimDailyStreak(user.id);

      setStreak(result.streak);
      setClaimedToday(true);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const activeDay =
    new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  /* =========================
     SKELETON LOADING STATE
  ========================== */
  if (initialLoading) {
    return (
      <div className="bg-white rounded-xl px-3 py-4 border border-gray-200 animate-pulse">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>

        {/* Streak number */}
        <div className="mb-6">
          <div className="h-12 w-32 bg-gray-200 rounded" />
        </div>

        {/* Days */}
        <div className="flex justify-between mb-6">
          {days.map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-gray-200 rounded-full"
            />
          ))}
        </div>

        {/* Text */}
        <div className="h-4 w-48 bg-gray-200 rounded mx-auto mb-4" />

        {/* Button */}
        <div className="h-12 w-full bg-gray-200 rounded-lg" />
      </div>
    );
  }

  /* =========================
     REAL CONTENT
  ========================== */
  return (
    <>
      <div className="bg-white rounded-xl px-3 py-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar className="text-blue-600" size={18} />
          </div>
          <h3 className="font-semibold text-gray-900">Daily Streak</h3>
        </div>

        <div className="mb-6">
          <span className="text-5xl font-bold text-purple-600">
            {streak} day{streak !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex justify-between mb-6">
          {days.map((day, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                index === activeDay
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Check in daily to earn +5 points
        </p>

        <button
          onClick={handleClaim}
          disabled={claimedToday || loading}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            claimedToday
              ? "bg-gray-200 text-gray-600"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
        >
          {claimedToday
            ? "Claimed Today"
            : loading
            ? "Claiming..."
            : "Claim Now"}
        </button>
      </div>

      {/* SUCCESS MODAL */}
      <ClaimSuccessModal
        open={showModal}
        onClose={() => setShowModal(false)}
        points={5}
      />
    </>
  );
};

export default DailyStreakCard;
