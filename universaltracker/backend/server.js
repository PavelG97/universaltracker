// server.js (alebo app.js)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import fetch from "node-fetch";
import noteRoutes from "./routes/notes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Auth routes
app.use("/api/auth", authRoutes);

// Notes routes
app.use("/api/notes", noteRoutes);

// OpenRouter AI Chat Endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "UniversalTracker AI Chatbot"
      },
      body: JSON.stringify({
     model: "qwen/qwq-32b:free",
        messages: [{ role: "user", content: message }]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter API error:", data);
      return res.status(response.status).json({ error: data.error || "API error" });
    }

    const reply = data.choices?.[0]?.message?.content || "Sorry, no response.";
    res.json({ reply });
  } catch (error) {
    console.error("OpenRouter request failed:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend proxy test success!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
