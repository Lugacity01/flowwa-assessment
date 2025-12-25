import { X } from "lucide-react";

const ClaimSuccessModal = ({ open, onClose, points = 5 }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white w-[380px] rounded-xl px-6 py-8 text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        {/* Success icon */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-xl font-semibold text-purple-600 mb-2">
          Level Up! 🎉
        </h2>

        <p className="text-3xl font-bold text-purple-600 mb-3">
          +{points} Points
        </p>

        <p className="text-sm text-gray-600 mb-6">
          You&apos;ve claimed your daily points!  
          Come back tomorrow for more.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default ClaimSuccessModal;
