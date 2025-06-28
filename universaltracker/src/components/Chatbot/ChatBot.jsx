import React, { useState, useEffect, useCallback } from "react";
import Designer from "../../assets/Designer.png";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I´m your AI Chatbot. Say me how I can help you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const predefinedOptions = [
    { label: "Problem with login", text: "I have problem with login." },
    { label: "Help with Goals & Habits", text: "How do Goals & Habits work?" },
    { label: "Help with Daily Notes", text: "How can I add some new notes?" },
    { label: "Money budget problems?", text: "How can I control my income and expenses?" },
    { label: "How AI bot works?", text: "How can this AI Bot help me?" },
  ];

  const sendMessage = async (customInput) => {
    const userInput = customInput || input;
    if (!userInput.trim()) return;

    const userMsg = { from: "user", text: userInput };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Server error");
      }

      const data = await res.json();
      const botMsg = { from: "bot", text: data.reply || "No answer from AI." };
      setMessages((msgs) => [...msgs, botMsg]);
    } catch (error) {
      console.error("Fetch error:", error);
      setMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text: "⚠️ I’m sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickOption = (text) => {
    sendMessage(text);
  };

  const handleEscKey = useCallback((e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      window.addEventListener("keydown", handleEscKey);
    } else {
      window.removeEventListener("keydown", handleEscKey);
    }

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [open, handleEscKey]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleOpen}
        className="fixed bottom-5 right-5 w-16 h-16 bg-green-500 rounded-full shadow-lg z-50 hover:scale-105 transition"
        title="Chat with AI"
      >
        <img src={Designer} alt="ChatBot Icon" className="w-full h-full rounded-full" />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-5 w-80 h-[440px] bg-white rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white px-4 py-3 flex justify-between items-center text-sm font-semibold">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)} title="Close (Esc)">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 text-sm space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`text-${msg.from === "bot" ? "left" : "right"}`}>
                <span
                  className={`inline-block px-3 py-2 rounded-2xl max-w-[80%] break-words ${
                    msg.from === "bot"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="mt-2">
                <p className="font-semibold mb-2">Do you need help with something specific?</p>
                <div className="space-y-2">
                  {predefinedOptions.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickOption(option.text)}
                      className="w-full text-left bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-2 rounded-lg text-green-800 text-sm"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="text-center italic mt-2 text-gray-500">⏳ AI is thinking...</div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center border-t p-2 bg-white">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="ml-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
