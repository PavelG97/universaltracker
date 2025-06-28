import { Trash2 } from "lucide-react";
import React from "react";

export default function NoteList({
  notes,
  activeNoteId,
  onSelectNote,
  onDelete,
}) {
  return (
    <div className="divide-y divide-gray-200">
      {notes.map((note) => {
        const isActive = note._id === activeNoteId;
        const updateDate = new Date(note.updatedAt);

        return (
          <div
            key={note._id ?? note.id}  // preferuj _id, fallback na id
            className={`p-4 cursor-pointer hover:bg-gray-50 ${
              isActive ? "bg-amber-50" : ""
            }`}
          >
            <div className="flex justify-between">
              <div className="flex-1" onClick={() => onSelectNote(note)}>
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {note.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  {updateDate.toLocaleDateString()} at{" "}
                  {updateDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="mt-1 text-xs text-gray-500">{note.content}</p>
              </div>
              <button
                className="mt-2 text-red-500 hover:text-red-800 cursor-pointer max-w-max bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(note._id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
