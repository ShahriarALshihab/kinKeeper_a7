import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import TimelineEntry from "../context/TimelineEntry";
import { useTimeline } from "../context/TimelineContext";

const FILTER_OPTIONS = ["All", "Call", "Text", "Video"];

const TimelinePage = () => {
  const { entries } = useTimeline();
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered = entries
    .filter((e) => filter === "All" || e.type === filter)
    .sort((a, b) =>
      sortOrder === "newest"
        ? b.timestamp - a.timestamp
        : a.timestamp - b.timestamp,
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Timeline</h1>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 hover:border-gray-300 transition-colors"
            >
              Filter timeline: {filter}
              <ChevronDown
                size={14}
                className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setFilter(opt);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      filter === opt
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() =>
              setSortOrder((p) => (p === "newest" ? "oldest" : "newest"))
            }
            className="border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm text-gray-600 hover:border-gray-300 transition-colors"
          >
            {sortOrder === "newest" ? "↓ Newest" : "↑ Oldest"}
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl px-5">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-gray-400 text-sm">No interactions found.</p>
              <p className="text-gray-300 text-xs mt-1">
                Try a different filter or log a check-in from a friend's page.
              </p>
            </div>
          ) : (
            filtered.map((entry) => (
              <TimelineEntry key={entry.id} entry={entry} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
