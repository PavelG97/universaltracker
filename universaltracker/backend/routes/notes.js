// routes/notes.js
import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

// GET all notes for a user
router.get("/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// POST create new note
router.post("/", async (req, res) => {
  const { userId, title, content, date } = req.body;
  if (!userId || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const now = new Date();
    const newNote = new Note({ userId, title, content, date, createdAt: now, updatedAt: now });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

// PUT update note by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedData = { ...req.body, updatedAt: new Date() };
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedNote) return res.status(404).json({ error: "Note not found" });
    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note" });
  }
});

// DELETE note by ID
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

export default router;
