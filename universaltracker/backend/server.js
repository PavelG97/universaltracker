// server.js ---------------------------------------------------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error →", err));

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Function for delete all <think>...</think>
function removeThinkTags(text) {
  let previous;
  let cleaned = text;
  do {
    previous = cleaned;
    cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  } while (cleaned !== previous);
  return cleaned;
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const messages = [
      {
        role: "system",
        content:
          "You are a helpful assistant. Never show your internal thoughts or reasoning.Do not include any <think> tags or explanations. Respond ONLY with a short, concise answer.",
      },
      {
        role: "user",
        content: message,
      },
    ];

    const ollamaRes = await fetch(
      "http://192.168.22.4:11434/v1/chat/completions",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "qwen3:8b",
          messages,
          stream: false,
        }),
      }
    );

    const raw = await ollamaRes.text();

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error("Invalid JSON from AI server:\n", raw);
      return res
        .status(502)
        .json({ error: "Invalid JSON from AI server", rawResponse: raw });
    }

    if (!ollamaRes.ok) {
      console.error(" AI server error:", data);
      return res
        .status(ollamaRes.status)
        .json({ error: data.error || "AI server responded with error" });
    }

    let reply = data.choices?.[0]?.message?.content || "Sorry, no response.";

    // Delete all <think> tags with AI thinking text
    reply = removeThinkTags(reply);

    res.json({ reply });
  } catch (err) {
    console.error(" Request to AI server failed:", err);
    res.status(500).json({ error: "Server error contacting AI backend" });
  }
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend proxy test success!" });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
