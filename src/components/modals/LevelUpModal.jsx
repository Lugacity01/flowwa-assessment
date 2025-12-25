import React from "react";

const LevelUpModal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center relative animate-bounce">
        <div className="mb-4">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={64} />
            </div>
            <div className="absolute -top-2 -right-2">🎉</div>
            <div className="absolute -top-2 -left-2">✨</div>
            <div className="absolute -bottom-2 -right-2">🎊</div>
            <div className="absolute -bottom-2 -left-2">🔥</div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Level Up! 🎉
          </span>
        </h2>
        <h3 className="text-4xl font-bold text-purple-600 mb-4">+5 Points</h3>
        <p className="text-gray-600">
          You've claimed your daily points! Come back tomorrow for more!
        </p>
      </div>
    </div>
  );
};

export default LevelUpModal;
