import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Target,
  CalendarCheck,
  PiggyBank,
  LogOut,
  TrendingUp,
} from "lucide-react";

import ProfileSection from "./Profile/ProfileSection";
import ChatBot from "./Chatbot/ChatBot";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  const goToApp = (path) => {
    window.open(path, "_blank");
  };

  const getMotivation = () => {
    const day = new Date().getDay();
    const messages = [
      "New week, new goals!",
      "Keep the momentum going!",
      "Stay consistent!",
      "Halfway there!",
      "Push through!",
      "Almost done!",
      "Time to reflect and recharge!",
    ];
    return messages[day];
  };
const tips = [
  "Write down 3 things you're grateful for.",
  "Review your goals before bedtime.",
  "Log your expenses daily to avoid surprises.",
  "Reward yourself for completing a habit.",
  "Drink a glass of water now — hydrate!",
  "Take a 5-minute stretch break every hour.",
  "Prioritize your tasks to stay focused.",
  "Celebrate small wins to stay motivated.",
  "Plan tomorrow's tasks tonight.",
  "Avoid multitasking to improve productivity.",
  "Spend a few minutes meditating daily.",
  "Keep your workspace tidy for better concentration.",
  "Track your progress visually with charts or lists.",
];

  const getRandomTip = () => tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md py-6 px-4 flex justify-center">
        <div className="flex items-center space-x-3">
          <TrendingUp size={48} className="text-green-600 animate-bounce-slow" />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-700 tracking-tight">
              Universal Tracker
            </h1>
            <p className="text-sm text-gray-500">Your all-in-one productivity hub</p>
            <p className="text-sm text-gray-500 italic mt-1">
              “Small steps every day lead to big results.”
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4 text-gray-700">
          What would you like to track today?
        </h2>
        <p className="text-center text-md text-gray-600 italic mb-10">
          {getMotivation()}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Goal Tracker */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer border-l-4 border-purple-500"
            onClick={() => goToApp("/goals")}
          >
            <Target className="mx-auto text-purple-600 mb-4 hover:scale-110 transition-transform duration-200" size={40} />
            <h3 className="text-lg font-semibold text-gray-800">Goals & Habits</h3>
            <p className="text-gray-500 text-sm mt-2">
              Set goals, track your progress, and build strong habits.
            </p>
          </div>

          {/* Daily Notes */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer border-l-4 border-blue-500"
            onClick={() => goToApp("/day")}
          >
            <CalendarCheck className="mx-auto text-blue-600 mb-4 hover:scale-110 transition-transform duration-200" size={40} />
            <h3 className="text-lg font-semibold text-gray-800">Daily Notes</h3>
            <p className="text-gray-500 text-sm mt-2">
              Capture your thoughts and reflect each day.
            </p>
          </div>

          {/* Financial Overview */}
          <div
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer border-l-4 border-yellow-500"
            onClick={() => goToApp("/money")}
          >
            <PiggyBank className="mx-auto text-yellow-600 mb-4 hover:scale-110 transition-transform duration-200" size={40} />
            <h3 className="text-lg font-semibold text-gray-800">Financial Overview</h3>
            <p className="text-gray-500 text-sm mt-2">
              Track your spending, income and budget.
            </p>
          </div>

          {/* Profile Section */}
          <ProfileSection goToApp={goToApp} />
        </div>

        {/* Tip of the day */}
        <div className="bg-purple-50 p-4 rounded-xl mt-12 text-center shadow-sm">
          <h4 className="font-semibold text-purple-700 mb-2">💡 Today's Tip</h4>
          <p className="text-gray-600 italic">{getRandomTip()}</p>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </button>
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center text-sm text-gray-400 italic">
          🔧 Upcoming: Calendar View, Community Chat & AI Insights, ProfilePage...
        </div>
      </main>

      <ChatBot />

      {/* Footer */}
      <footer className="bg-white border-t text-center py-8 text-sm text-gray-500">
        <p className="mb-4">Follow us:</p>
        <div className="flex justify-center gap-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-8 h-8 hover:scale-110 transition"
            />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg"
              alt="Facebook"
              className="w-8 h-8 hover:scale-110 transition"
            />
          </a>
          <a href="mailto:kontakt@universaltracker.com">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png"
              alt="Email"
              className="w-8 h-8 hover:scale-110 transition"
            />
          </a>
        </div>
        <p className="mt-6">&copy; 2025 Universal Tracker</p>
      </footer>
    </div>
  );
};

export default HomePage;
