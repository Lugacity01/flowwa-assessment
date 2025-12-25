import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import EarnPointsContent from "../components/rewards/EarnPointsContent";
import RedeemRewardsContent from "../components/rewards/RedeemRewardsContent";
import ShareModal from "../components/modals/ShareModal";
import ClaimPointsModal from "../components/modals/ClaimPointsModal";
import LevelUpModal from "../components/modals/LevelUpModal";
import SuccessToast from "../components/ui/SuccessToast";

const RewardsHub = () => {
  const [activeTab, setActiveTab] = useState("earn");
  const [showShareModal, setShowShareModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  const handleClaimClick = () => {
    setShowLevelUpModal(true);
    setTimeout(() => setShowLevelUpModal(false), 3000);
  };

  const handleSubmitClaim = () => {
    setShowClaimModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <Header />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto pt-16 md:pt-0">
          <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              {/* Page Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Rewards Hub
                </h1>
                <p className="text-gray-600">
                  Earn points, unlock rewards, and celebrate your progress!
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 mb-8 border-b border-gray-200 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("earn")}
                  className={`pb-3 px-1 font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "earn"
                      ? "text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Earn Points
                  {activeTab === "earn" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
                  )}
                </button>

                <button
                  onClick={() => setActiveTab("redeem")}
                  className={`pb-3 px-1 font-medium transition-colors relative whitespace-nowrap ${
                    activeTab === "redeem"
                      ? "text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Redeem Rewards
                  {activeTab === "redeem" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
                  )}
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "earn" ? (
                <EarnPointsContent
                  onShareClick={() => setShowShareModal(true)}
                  onClaimClick={handleClaimClick}
                  onClaimModalOpen={() => setShowClaimModal(true)}
                />
              ) : (
                <RedeemRewardsContent />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
      {showClaimModal && (
        <ClaimPointsModal
          onClose={() => setShowClaimModal(false)}
          onSubmit={handleSubmitClaim}
        />
      )}
      {showLevelUpModal && <LevelUpModal />}
      {showSuccessToast && <SuccessToast />}
    </div>
  );
};

export default RewardsHub;
