// models/Note.js
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, default: "Untitled Note" },
  content: { type: String, default: "" },
  date: { type: String }, // napr. "2025-06-21"
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Note", NoteSchema);
