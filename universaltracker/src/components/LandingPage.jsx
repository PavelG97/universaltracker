import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Target, Cpu, Activity } from "lucide-react";
import AI from "../assets/AI.png";
import Designer from "../assets/Designer.png";
import ChatBot from "./Chatbot/ChatBot";

const LandingPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleAssistantClick = () => {
    if (!showChat) setShowChat(true);
    setChatOpen(true);
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 min-h-screen relative">
      {/* Hero / Header */}
      <header className="bg-white shadow-md py-10 px-6 animate-fade-in-down">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              Welcome to <span className="text-purple-600">Universal Tracker</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Track your{" "}
              <span className="font-semibold text-yellow-600">goals</span>,{" "}
              <span className="font-semibold text-green-600">money</span>, and{" "}
              <span className="font-semibold text-blue-600">daily routine</span> with a smart assistant by your side.
            </p>
            <div className="flex gap-5 flex-wrap pt-3">
              <Link
                to="/login"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-md shadow transition-transform duration-300 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white border border-purple-600 text-purple-600 font-semibold py-3 px-8 rounded-md shadow-sm hover:bg-purple-50 transition"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end mt-10 md:mt-0">
            <img
              src={AI}
              alt="AI Avatar"
              className="w-36 h-36 object-cover rounded-full shadow-md border border-gray-200"
            />
          </div>
        </div>
      </header>

      {/* AI Assistant Section */}
      <section className="flex flex-col sm:flex-row items-center justify-center gap-6 px-6 my-20 max-w-4xl mx-auto">
        <img
          src={Designer}
          alt="AI Assistant"
          className="w-24 h-24 rounded-full shadow-md border border-cyan-300"
        />
        <div
          onClick={handleAssistantClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleAssistantClick()}
          className="cursor-pointer select-none bg-white border border-cyan-200 p-6 rounded-2xl shadow-md max-w-md text-base leading-relaxed hover:shadow-lg transition"
          title="Click to open chat assistant"
        >
          <p className="italic text-gray-700">Hello! 👋 I'm your assistant.</p>
          <p className="mt-2 text-gray-800">
            I’ll help you get started. Choose <strong>Login</strong> or <strong>Register</strong>, and begin tracking your{" "}
            <span className="text-green-600 font-semibold">money</span>,{" "}
            <span className="text-blue-600 font-semibold">goals</span>, or{" "}
            <span className="text-purple-600 font-semibold">daily life</span>.
          </p>
          <p className="mt-4 text-sm text-cyan-500 underline">Click here to chat with me!</p>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          How it works?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: <Target className="w-12 h-12 mx-auto text-purple-600 mb-4 transition-transform duration-300 hover:scale-110" />,
              title: "Choose your path",
              desc: "Pick what you want to improve – goals, money, or your daily mindset.",
              number: "1",
            },
            {
              icon: <Cpu className="w-12 h-12 mx-auto text-purple-600 mb-4 transition-transform duration-300 hover:scale-110" />,
              title: "Assistant helps you",
              desc: "Use the built-in assistant to get smart suggestions and summaries.",
              number: "2",
            },
            {
              icon: <Activity className="w-12 h-12 mx-auto text-purple-600 mb-4 transition-transform duration-300 hover:scale-110" />,
              title: "Watch your progress",
              desc: "Track your achievements, habits and progress visually every day.",
              number: "3",
            },
          ].map(({ icon, title, desc, number }) => (
            <div
              key={number}
              className="relative bg-gray-100 p-6 rounded-xl text-center shadow hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-yellow-400 text-purple-900 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg shadow select-none">
                {number}
              </div>
              {icon}
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
          Why use Universal Tracker?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "All-in-one tool",
              desc: "Track finances, goals and daily thoughts in one place.",
            },
            {
              title: "Smart assistant",
              desc: "Let the built-in AI help you make better decisions and save time.",
            },
            {
              title: "Simple & Clean",
              desc: "Minimalist design with no distractions, ads or clutter.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="p-6 border border-gray-300 rounded-xl text-center shadow-sm hover:shadow-md transition transform hover:-translate-y-1 hover:scale-105 bg-white cursor-default"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Project */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">About this Project</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            This project was created as part of my final school project to showcase React, Tailwind CSS,
            routing with React Router and basic UI/UX principles. The goal was to create a helpful productivity tool
            for everyday users.
          </p>
        </div>
      </section>

      {/* Fixed ChatBot */}
      {showChat && (
        <div
          className="fixed bottom-8 right-8 z-50 shadow-lg rounded-3xl overflow-hidden border-2 border-purple-600 bg-white transition-opacity duration-300"
          aria-live="polite"
        >
          <ChatBot open={chatOpen} setOpen={setChatOpen} />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-300 text-center py-8 text-sm text-gray-500">
        <p className="mb-4">Follow us:</p>
        <div className="flex justify-center gap-6">
          {[
            {
              href: "https://instagram.com",
              alt: "Instagram",
              src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
            },
            {
              href: "https://facebook.com",
              alt: "Facebook",
              src: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg",
            },
            {
              href: "mailto:kontakt@universaltracker.com",
              alt: "Email",
              src: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png",
            },
          ].map(({ href, alt, src }) => (
            <a
              key={alt}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition duration-300"
            >
              <img src={src} alt={alt} className="w-8 h-8 object-contain" />
            </a>
          ))}
        </div>
        <p className="mt-6">&copy; {new Date().getFullYear()} Universal Tracker – Created by Pavel Grega</p>
      </footer>
    </div>
  );
};

export default LandingPage;
