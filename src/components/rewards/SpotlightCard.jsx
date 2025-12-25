import React from "react";
import { Calendar, Gift, User } from "lucide-react";

const SpotlightCard = ({ onClaimClick }) => {
  return (
    <div className="rounded-xl text-white relative overflow-hidden">
      <div className=" px-3 py-4 bg-gradient-to-br from-purple-600 to-blue-500 ">
        <div className="absolute top-4 right-4 w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
          <User className="text-white" size={20} />
        </div>

        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
          Featured
        </span>

        <h3 className="text-2xl font-bold mb-2">Top Tool Spotlight</h3>
        <p className="text-xl font-semibold mb-4">Reclaim</p>
      </div>

      <div className="flex items-start gap-2 px-3 mb-6">
        <Calendar className="text-purple-600 flex-1 mt-1" size={22} />

        <div className="flex-10">
          <h4 className="font-semibold text-[14px] text-gray-950 mb-1">
            Automate and Optimize Your Schedule
          </h4>
          <p className="text-sm text-gray-600">
            Reclaim.ai is an AI-powered calendar assistant that automatically
            schedules your tasks, meetings, and breaks to boost productivity.
            Free to try — earn Flowwa Points when you sign up!
          </p>
        </div>
      </div>

      <div className="flex justify-between px-3 gap-3">
        <button className=" flex items-center gap-2 bg-gradient-to-br from-purple-600 to-blue-500  px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors">
          <User size={16} />
          Sign up
        </button>
        <button
          onClick={onClaimClick}
          className=" flex items-center gap-2 bg-gradient-to-br from-purple-600 to-blue-500 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
        >
          <Gift size={16} />
          Claim 50 pts
        </button>
      </div>
    </div>
  );
};

export default SpotlightCard;
