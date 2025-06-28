import { FileText, Plus } from "lucide-react";
import React from "react";

function EmptyState({ addNoteApp }) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-12 text-center">
      <FileText className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900"> Not Note selected</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-md ">
        Select a note to read it or create a new one.
      </p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center p-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-white
           bg-amber-600 hover:bg-amber-700 foucs:outline-none cursor-pointer"
          onClick={addNoteApp}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
