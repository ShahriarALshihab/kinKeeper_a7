import React from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const tagColors = [
  "bg-gray-100 text-gray-600",
  "bg-blue-50 text-blue-600",
  "bg-purple-50 text-purple-600",
  "bg-teal-50 text-teal-600",
];

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/friend/${friend.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center text-center gap-2 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all duration-200"
    >
    
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
        onError={(e) => {
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1a5240&color=fff`;
        }}
      />

     
      <div>
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{friend.name}</h3>
        <p className="text-gray-400 text-xs mt-0.5">{friend.days_since_contact}d ago</p>
      </div>


      <div className="flex flex-wrap gap-1 justify-center">
        {friend.tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide ${tagColors[i % tagColors.length]}`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status */}
      <StatusBadge status={friend.status} />
    </div>
  );
};

export default FriendCard;