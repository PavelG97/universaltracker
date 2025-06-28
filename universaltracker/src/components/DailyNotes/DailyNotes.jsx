import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Edit, Search, Trash2, X } from "lucide-react";
import ReuseButton from "./components/ReuseButton";
import NoteEditor from "./components/NoteEditor";
import EmptyState from "./components/EmptyState";
import NoteList from "./components/NoteList";

export default function DailyNotes() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userId = localStorage.getItem("userId"); // need do be used in login

  // Loading from mongodb
  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/notes/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setActiveNote(data[0] || null);
      })
      .catch((err) => console.error("Failed to fetch notes:", err));
  }, [userId]);

  // Filter for search with security
  const filteredNotes = notes.filter(
    (note) =>
      note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Neue notes from API
const handleAddNote = () => {
  if (!userId) return alert("User not logged in");

  const nowISO = new Date().toISOString();
  const newNote = {
    title: "Untitled Note",
    content: "New note content",  
    date: nowISO.split("T")[0],
    userId,
    createdAt: nowISO,
    updatedAt: nowISO,
  };

  fetch("http://localhost:5000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote),
  })
    .then(async (res) => {
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error from backend:", errorData);
        throw new Error(errorData.error || "Failed to add note");
      }
      return res.json();
    })
    .then((createdNote) => {
      setNotes([createdNote, ...notes]);
      setActiveNote(createdNote);
      setIsEditing(true);
    })
    .catch((err) => console.error("Add note error:", err));
};

  // notes update
  const handleUpdateNote = (updatedNote) => {
    fetch(`http://localhost:5000/api/notes/${updatedNote._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((data) => {
        setNotes(notes.map((note) => (note._id === updatedNote._id ? data : note)));
        setActiveNote(data);
        setIsEditing(false);
      })
      .catch((err) => console.error("Failed to update note:", err));
  };

  // delete from api
  const handleDeleteNote = (id) => {
    fetch(`http://localhost:5000/api/notes/${id}`, { method: "DELETE" })
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
        if (activeNote?._id === id) {
          setActiveNote(null);
        }
      })
      .catch((err) => console.error("Failed to delete note:", err));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header addNote={handleAddNote} />

      {/* SideBar */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="py-4 px-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search Notes...."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredNotes.length > 0 ? (
            <NoteList
              notes={filteredNotes}
              activeNoteId={activeNote?._id}
              onSelectNote={setActiveNote}
              onDelete={handleDeleteNote}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              {searchQuery ? "No Notes Match your search " : "No notes yet"}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {activeNote ? (
            <div className="h-full flex flex-col">
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">{activeNote.title}</h2>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <ReuseButton Sign={<X className="h-4 w-4" />} handleClick={() => setIsEditing(false)} />
                  ) : (
                    <>
                      <ReuseButton Sign={<Edit className="h-4 w-4" />} handleClick={() => setIsEditing(true)} />
                      <ReuseButton Sign={<Trash2 className="h-4 w-4" />} handleClick={() => handleDeleteNote(activeNote._id)} />
                    </>
                  )}
                </div>
              </div>
              {isEditing ? (
                <NoteEditor notes={activeNote} onSave={handleUpdateNote} />
              ) : (
                <div className="p-6 ">
                  <div className="prose max-w-none">
                    <h1>{activeNote.title}</h1>
                    <p className="text-sm text-gray-500 mb-4">
                      Last Updated: {new Date(activeNote.updatedAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="whitespace-pre-wrap">{activeNote.content}</div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState addNoteApp={handleAddNote} />
          )}
        </div>
      </div>
      
    </div>
  );
}
