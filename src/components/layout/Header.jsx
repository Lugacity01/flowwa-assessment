import React from "react";
import { Bell } from "lucide-react";

const Header = () => {
  return (
     <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-end gap-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default Header;
