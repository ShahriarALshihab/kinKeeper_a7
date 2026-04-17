import React from "react";

const statusConfig = {
  "overdue": {
    label: "Overdue",
    className: "bg-red-100 text-red-600",
  },
  "almost due": {
    label: "Almost Due",
    className: "bg-amber-100 text-amber-600",
  },
  "on-track": {
    label: "On-Track",
    className: "bg-green-100 text-green-600",
  },
};

const StatusBadge = ({ status, className = "" }) => {
  const config = statusConfig[status] || statusConfig["on-track"];
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${config.className} ${className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;