import React from "react";
import { X } from "lucide-react";

const ShareModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers className="text-purple-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Share Your Stack</h3>
          <p className="text-gray-600">
            You have no stack created yet, go to Tech Stack to create one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
