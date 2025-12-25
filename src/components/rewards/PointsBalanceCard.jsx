import React, { useEffect, useState } from "react";
import { Gift, Star } from "lucide-react";
import { getCurrentUser } from "../../lib/auth";
import { supabase } from "../../lib/supabase";

const PointsBalanceCard = () => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const goal = 5000; // $5 gift card

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        const { data } = await supabase
          .from("profiles")
          .select("points")
          .eq("id", user.id)
          .single();

        if (data) setPoints(data.points);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  const progressPercent = Math.min((points / goal) * 100, 100);


  if (loading) {
    return (
      <div className="bg-white rounded-xl px-3 py-4 border border-gray-200 animate-pulse">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>

        {/* Points */}
        <div className="mb-4">
          <div className="h-12 w-24 bg-gray-200 rounded mb-2" />
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between mb-2">
            <div className="h-3 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full" />
        </div>

        {/* Footer text */}
        <div className="h-3 w-48 bg-gray-200 rounded" />
      </div>
    );
  }


  return (
    <div className="bg-white rounded-xl px-3 py-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <Gift className="text-purple-600" size={18} />
        </div>
        <h3 className="font-semibold text-gray-900">Points Balance</h3>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-5xl font-bold text-gray-900">
            {points}
          </span>
          <Star className="text-yellow-500 fill-yellow-500" size={32} />
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress to $5 Gift Card</span>
          <span className="font-medium">
            {points}/{goal}
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-start gap-2 text-sm text-gray-500">
        <span>📈</span>
        <span>
          {points === 0
            ? "Just getting started — keep earning points!"
            : "Nice progress — keep it up!"}
        </span>
      </div>
    </div>
  );
};

export default PointsBalanceCard;
