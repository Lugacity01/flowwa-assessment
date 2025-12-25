import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessToast = () => {
  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-lg border border-green-200 p-4 flex items-center gap-3">
        <CheckCircle className="text-green-600" size={24} />
        <div>
          <p className="font-semibold text-gray-900">
            Your claim was submitted successfully! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessToast;
