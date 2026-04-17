import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import FriendCard from "../components/FriendCard";
import SummaryCards from "../components/SummaryCards";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTimeline } from "../context/TimelineContext";
import friendsData from "../data/friends.json";

const HomePage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { entries } = useTimeline();

  useEffect(() => {
    // Simulate data fetch with loading state
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Count interactions this month
  const now = new Date();
  const interactionsThisMonth = entries.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Banner */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Friends to keep close in your life
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            <Plus size={16} />
            Add a Friend
          </button>

          {/* Summary Cards */}
          <SummaryCards interactionCount={interactionsThisMonth} />
        </div>

        {/* Friends Section */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Your Friends</h2>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {friends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;