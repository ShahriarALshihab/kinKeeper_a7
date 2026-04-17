import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTimeline } from "../context/TimelineContext";

const COLORS = {
  Call: "#1a5240",
  Text: "#9b59b6",
  Video: "#22c55e",
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow text-sm">
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-gray-500">{value} interaction{value !== 1 ? "s" : ""}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="flex items-center justify-center gap-6 mt-4">
    {payload.map((entry) => (
      <div key={entry.value} className="flex items-center gap-1.5">
        <span
          className="w-3 h-3 rounded-full inline-block"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-sm text-gray-600">{entry.value}</span>
      </div>
    ))}
  </div>
);

const StatsPage = () => {
  const { entries } = useTimeline();

  const counts = entries.reduce(
    (acc, e) => {
      acc[e.type] = (acc[e.type] || 0) + 1;
      return acc;
    },
    { Call: 0, Text: 0, Video: 0 }
  );

  const data = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Friendship Analytics
        </h1>

        
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h2 className="text-sm font-semibold text-gray-600 mb-6 text-center">
            By Interaction Type
          </h2>

          {data.length === 0 ? (
            <div className="text-center py-20 text-gray-400 text-sm">
              No interactions logged yet. Visit a friend's page and log a check-in.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[entry.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      
        <div className="grid grid-cols-3 gap-4 mt-5">
          {Object.entries(counts).map(([type, count]) => (
            <div
              key={type}
              className="bg-white border border-gray-200 rounded-xl p-4 text-center"
            >
              <div
                className="w-3 h-3 rounded-full mx-auto mb-2"
                style={{ backgroundColor: COLORS[type] }}
              />
              <p className="text-xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{type}s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;