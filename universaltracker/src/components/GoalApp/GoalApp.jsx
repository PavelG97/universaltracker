import React, { useState, useEffect } from "react";
import { BicepsFlexed } from "lucide-react";
import HabitList from "./components/HabitList";
import ChatBot from "../Chatbot/ChatBot";

export default function GoalApp() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-200 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <BicepsFlexed size={54} className="text-purple-700" />
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight drop-shadow-md">
            My Personal Goals
          </h1>
        </div>

        {/* Habit Tracker */}
        <HabitList goals={goals} setGoals={setGoals} />
      </div>
      <ChatBot />
    </div>
  );
}
