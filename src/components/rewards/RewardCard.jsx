import React from "react";
import { Star } from "lucide-react";

const RewardCard = ({ name, desc, points, status, icon, onRedeem }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>

      <h4 className="font-semibold text-gray-900 mb-2">{name}</h4>

      <p className="text-sm text-gray-600 mb-4 flex-1">{desc}</p>

      <div className="flex items-center gap-1 text-sm text-yellow-600 mb-3">
        <Star className="fill-yellow-500" size={16} />
        <span className="font-medium">{points} pts</span>
      </div>

      <button
        onClick={onRedeem}
        disabled={status === "locked" || status === "coming"}
        className={`w-full py-2.5 rounded-lg font-medium transition-colors ${
          status === "locked" || status === "coming"
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-purple-600 text-white hover:bg-purple-700"
        }`}
      >
        {status === "coming"
          ? "Coming Soon"
          : status === "locked"
          ? "Locked"
          : "Redeem"}
      </button>
    </div>
  );
};

export default RewardCard;
