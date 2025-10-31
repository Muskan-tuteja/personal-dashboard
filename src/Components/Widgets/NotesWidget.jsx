import React, { useState } from "react";
import { Plus, Trash2, StickyNote } from "lucide-react";

const NotesWidget = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <StickyNote className="text-yellow-500 w-5 h-5" />
        <h2 className="text-yellow-500 font-semibold text-lg">Notes</h2>
      </div>

      {/* Input Section */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          className="flex-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          onClick={handleAddNote}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-2 rounded-md font-medium flex items-center gap-1 text-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-2 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-100">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-2">
            No notes yet 💭
          </p>
        ) : (
          notes.map((n, index) => (
            <div
              key={index}
              className="relative bg-yellow-50 border border-yellow-100 p-3 rounded-md shadow-sm hover:shadow-md transition-all text-sm text-gray-800"
            >
              <p className="break-words pr-6">{n}</p>
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesWidget;
