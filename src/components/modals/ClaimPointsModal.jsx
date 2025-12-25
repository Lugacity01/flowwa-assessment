import React, { useState } from "react";
import { X } from "lucide-react";

const ClaimPointsModal = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  // const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">Claim Your 25 Points</h3>
        
        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
          <p className="mb-2">Sign up for Reclaim (free, no payment needed), then fill the form below:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-700">
            <li>Enter your Reclaim sign-up email.</li>
            <li>Upload a screenshot of your Reclaim profile showing your email.</li>
          </ol>
          <p className="mt-2">After verification, you'll get 25 Flowwa Points! 🎉 😊</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email used on Reclaim
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload screenshot (mandatory)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <button type="button" className="text-purple-600 font-medium">
                Choose file
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimPointsModal;
