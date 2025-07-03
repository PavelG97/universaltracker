import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";

function NoteEditor({ notes, onSave }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

// sycnhronization after notes change
  useEffect(() => {
    setTitle(notes?.title || "");
    setContent(notes?.content || "");
  }, [notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...notes, title: title.trim() || "untitled Note", content });
  };

  return (
    <form className="h-full flex flex-col" onSubmit={handleSubmit}>
      <div className="p-6 flex-1 flex flex-col">
        <input
          type="text"
          placeholder="Note Title"
          className="block w-full text-2xl font-bold border-b border-gray-200 focus:border-amber-500 mb-4 pb-2 p-2"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your Note here...."
          className="flex-1 w-full border-0 focus:ring-0 resize-none p-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center p-2 border border-gray-300 rounded-md text-sm font-medium text-white
           bg-amber-600 hover:bg-amber-700 foucs:outline-none cursor-pointer max-w-max"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Note
        </button>
      </div>
    </form>
  );
}

export default NoteEditor;
