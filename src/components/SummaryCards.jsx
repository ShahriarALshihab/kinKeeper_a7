import React from "react";
import friendsData from "../data/friends.json";

const SummaryCards = ({ interactionCount }) => {
  const total = friendsData.length;
  const onTrack = friendsData.filter((f) => f.status === "on-track").length;
  const needAttention = friendsData.filter(
    (f) => f.status === "overdue" || f.status === "almost due"
  ).length;

  const cards = [
    { value: total, label: "Total Friends" },
    { value: onTrack, label: "On Track" },
    { value: needAttention, label: "Need Attention" },
    { value: interactionCount, label: "Interactions This Month" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-gray-200 rounded-xl px-4 py-4 text-center"
        >
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;