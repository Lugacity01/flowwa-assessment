import React from "react";
import { Star, Share2 } from "lucide-react";

import DailyStreakCard from "./DailyStreakCard";
import SpotlightCard from "./SpotlightCard";
import EarnCard from "./EarnCard";
import ReferralCard from "./ReferralCard";
import PointsBalanceCard from "./PointsBalanceCard";

const EarnPointsContent = ({
  onShareClick,
  onClaimClick,
  onClaimModalOpen,
}) => {
  return (
     <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-purple-600 pl-4">
          Your Rewards Journey
        </h2>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-8">
        <PointsBalanceCard />
        <DailyStreakCard onClaimClick={onClaimClick} />
        <SpotlightCard onClaimClick={onClaimModalOpen} />
      </div>

     
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-purple-600 pl-4 mb-6">
          Earn More Points
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <EarnCard
            icon={<Star className="text-purple-600" size={24} />}
            title="Refer and win 10,000 points!"
            description="Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of 10,000 points. Friends must complete onboarding to qualify."
            highlight="10,000 points"
          />
          <EarnCard
            icon={<Share2 className="text-purple-600" size={24} />}
            title="Share Your Stack"
            description=""
            points="+25 pts"
            action={
              <button onClick={onShareClick} className="flex items-center gap-2 text-purple-600 font-medium">
                <Share2 size={16} />
                Share
              </button>
            }
          />
        </div>
      </div>

     
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-purple-600 pl-4 mb-6">
          Refer & Earn
        </h2>

        <ReferralCard />
      </div>
    </div>
  );
};

export default EarnPointsContent;
