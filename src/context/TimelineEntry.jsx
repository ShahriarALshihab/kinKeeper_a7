import React from "react";
import { Phone, MessageSquare, Video } from "lucide-react";

const iconConfig = {
  Call: {
    Icon: Phone,
    bg: "bg-gray-100",
    color: "text-gray-600",
  },
  Text: {
    Icon: MessageSquare,
    bg: "bg-gray-100",
    color: "text-gray-600",
  },
  Video: {
    Icon: Video,
    bg: "bg-gray-100",
    color: "text-gray-600",
  },
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TimelineEntry = ({ entry }) => {
  const config = iconConfig[entry.type] || iconConfig.Call;
  const { Icon } = config;

  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
      {/* Icon */}
      <div className={`w-9 h-9 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
        <Icon size={15} className={config.color} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{entry.type}</span>{" "}
          <span className="text-gray-500">with {entry.friendName}</span>
        </p>
        <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
      </div>
    </div>
  );
};

export default TimelineEntry;