import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Phone,
  MessageSquare,
  Video,
  Clock,
  Archive,
  Trash2,
  ArrowLeft,
  Pencil,
} from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import { useTimeline } from "../context/TimelineContext";
import friendsData from "../data/friends.json";

const tagColors = [
  "bg-gray-100 text-gray-600",
  "bg-blue-50 text-blue-600",
  "bg-purple-50 text-purple-600",
  "bg-teal-50 text-teal-600",
];

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const FriendDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addEntry } = useTimeline();
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalValue, setGoalValue] = useState(null);

  const friend = friendsData.find((f) => f.id === parseInt(id));

  if (!friend) {
    navigate("/not-found");
    return null;
  }

  const currentGoal = goalValue !== null ? goalValue : friend.goal;

  const handleCheckIn = (type) => {
    addEntry(type, friend.name);
    toast.success(
      <div>
        <p className="font-semibold">{type} logged! 🎉</p>
        <p className="text-xs opacity-80">{type} with {friend.name} added to your timeline.</p>
      </div>,
      { position: "top-right", autoClose: 3000 }
    );
  };

  const handleSnooze = () => {
    toast.info(`⏰ Snoozed ${friend.name} for 2 weeks`, { position: "top-right", autoClose: 3000 });
  };

  const handleArchive = () => {
    toast.info(`📦 ${friend.name} archived`, { position: "top-right", autoClose: 3000 });
  };

  const handleDelete = () => {
    toast.error(`🗑️ ${friend.name} deleted`, { position: "top-right", autoClose: 3000 });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Friends
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
         
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            
              <img
                src={friend.picture}
                alt={friend.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=1a5240&color=fff`;
                }}
              />

           
              <h1 className="text-lg font-bold text-gray-900">{friend.name}</h1>

           
              <StatusBadge status={friend.status} />

            
              <div className="flex flex-wrap gap-1.5 justify-center">
                {friend.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium uppercase tracking-wide ${tagColors[i % tagColors.length]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

         
              <p className="text-gray-500 text-xs leading-relaxed italic px-2">
                "{friend.bio}"
              </p>

           
              <p className="text-xs text-gray-400">{friend.email}</p>

         
              <div className="w-full border-t border-gray-100 my-1" />

            
              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={handleSnooze}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Clock size={14} />
                  Snooze 2 Weeks
                </button>
                <button
                  onClick={handleArchive}
                  className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Archive size={14} />
                  Archive
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center justify-center gap-2 border border-red-200 rounded-lg py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>

         
          <div className="lg:col-span-3 flex flex-col gap-4">

     
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{friend.days_since_contact}</p>
                <p className="text-xs text-gray-500 mt-1">Days Since Contact</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{currentGoal}</p>
                <p className="text-xs text-gray-500 mt-1">Goal (Days)</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-gray-900">{formatDate(friend.next_due_date)}</p>
                <p className="text-xs text-gray-500 mt-1">Next Due</p>
              </div>
            </div>

          
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-900">Relationship Goal</h3>
                <button
                  onClick={() => setEditingGoal(!editingGoal)}
                  className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
                >
                  <Pencil size={12} />
                  Edit
                </button>
              </div>

              {editingGoal ? (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-gray-600">Connect every</span>
                  <input
                    type="number"
                    value={goalValue !== null ? goalValue : friend.goal}
                    onChange={(e) => setGoalValue(parseInt(e.target.value) || friend.goal)}
                    className="w-16 border border-gray-300 rounded-md px-2 py-1 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                    max="365"
                  />
                  <span className="text-sm text-gray-600">days</span>
                  <button
                    onClick={() => setEditingGoal(false)}
                    className="text-xs bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Connect every <span className="font-bold text-gray-900">{currentGoal} days</span>
                </p>
              )}
            </div>

          
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleCheckIn("Call")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                >
                  <Phone size={20} className="text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium text-gray-600">Call</span>
                </button>
                <button
                  onClick={() => handleCheckIn("Text")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                >
                  <MessageSquare size={20} className="text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium text-gray-600">Text</span>
                </button>
                <button
                  onClick={() => handleCheckIn("Video")}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                >
                  <Video size={20} className="text-gray-500 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-medium text-gray-600">Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetailPage;