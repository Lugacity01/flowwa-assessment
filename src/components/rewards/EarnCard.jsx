import React from "react";

const EarnCard = ({ icon, title, description, highlight, points, action }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex  items-start gap-4">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center ">
          {icon}
        </div>
        <div className="bg-white">
          <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-3">
              {description.split(highlight).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <React.Fragment key={i}>
                    {part}
                    <span className="text-purple-600 font-semibold">
                      {highlight}
                    </span>
                  </React.Fragment>
                ) : (
                  part
                )
              )}
            </p>
            {points && <span className="text-sm text-gray-500">{points}</span>}
            {action && <div className="mt-2">{action}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnCard;
