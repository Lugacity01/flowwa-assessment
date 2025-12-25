import React, { useEffect, useState } from "react";
import RewardCard from "./RewardCard";
import { supabase } from "../../lib/supabase";
import { getCurrentUser } from "../../lib/auth";

const RedeemRewardsContent = () => {
  const [filter, setFilter] = useState("all");
  const [rewards, setRewards] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        // Fetch user points
        const { data: profile } = await supabase
          .from("profiles")
          .select("points")
          .eq("id", user.id)
          .single();

        setUserPoints(profile?.points || 0);

        // Fetch rewards
        const { data: rewardsData } = await supabase
          .from("rewards")
          .select("*")
          .order("points_required", { ascending: true });

        setRewards(rewardsData || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRewardStatus = (reward) => {
    if (reward.points_required === 0) return "coming";
    if (userPoints >= reward.points_required) return "unlocked";
    return "locked";
  };

  const enrichedRewards = rewards.map((reward) => ({
    ...reward,
    status: getRewardStatus(reward),
  }));

  const filteredRewards = enrichedRewards.filter((reward) => {
    if (filter === "all") return true;
    if (filter === "unlocked") return reward.status === "unlocked";
    if (filter === "locked") return reward.status === "locked";
    if (filter === "coming") return reward.status === "coming";
    return true;
  });

  const counts = {
    all: enrichedRewards.length,
    unlocked: enrichedRewards.filter((r) => r.status === "unlocked").length,
    locked: enrichedRewards.filter((r) => r.status === "locked").length,
    coming: enrichedRewards.filter((r) => r.status === "coming").length,
  };

  const handleRedeem = async (rewardId, cost) => {
    try {
      const user = await getCurrentUser();
      if (!user) return;

      await supabase.rpc("redeem_reward", {
        uid: user.id,
        rid: rewardId,
      });

      setUserPoints((prev) => prev - cost);
      alert("Reward redeemed successfully! 🎉");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-purple-600 pl-4">
          Redeem Your Points
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Available balance:{" "}
          <span className="font-semibold">{userPoints}</span> points
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-6 mb-6 border-b border-gray-200 overflow-x-auto">
        {[
          { key: "all", label: "All Rewards", count: counts.all },
          { key: "unlocked", label: "Unlocked", count: counts.unlocked },
          { key: "locked", label: "Locked", count: counts.locked },
          { key: "coming", label: "Coming Soon", count: counts.coming },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`pb-3 px-1 font-medium relative whitespace-nowrap ${
              filter === tab.key
                ? "text-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 text-gray-600 rounded-full">
              {tab.count}
            </span>
            {filter === tab.key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
            )}
          </button>
        ))}
      </div>

      {/* REWARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {filteredRewards.map((reward) => (
          <RewardCard
            key={reward.id}
            name={reward.name}
            desc={reward.description}
            points={reward.points_required}
            status={reward.status}
            icon="🎁"
            onRedeem={() =>
              handleRedeem(reward.id, reward.points_required)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RedeemRewardsContent;
