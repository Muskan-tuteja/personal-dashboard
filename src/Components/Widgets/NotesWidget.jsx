import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2 } from "lucide-react";

const NotesWidget = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const isMounted = useRef(false);

  // ✅ Load notes once (only on first mount)
  useEffect(() => {
    try {
      const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
      if (Array.isArray(savedNotes)) {
        setNotes(savedNotes);
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  }, []);

  // ✅ Save notes only after first load (avoid overwriting on first render)
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("notes", JSON.stringify(notes));
    } else {
      isMounted.current = true;
    }
  }, [notes]);

  const handleAddNote = () => {
    if (note.trim() === "") return;
    setNotes((prev) => [...prev, note.trim()]);
    setNote("");
  };

  const handleDelete = (index) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-2xl shadow-lg p-5 w-full text-gray-800 backdrop-blur-md border border-yellow-200 transition-all hover:shadow-xl hover:scale-[1.02] duration-300">
      <h2 className="text-lg font-semibold mb-3 flex items-center justify-center gap-2 text-yellow-600">
        📝 Notes Keeper
      </h2>

      {/* Input Section */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          className="p-2 flex-1 rounded-lg border border-yellow-300 focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
        />
        <button
          onClick={handleAddNote}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition"
        >
          <Plus className="inline-block w-4 h-4 mr-1" />
          Add
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-yellow-100">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-2">
            No notes yet 💭
          </p>
        ) : (
          notes.map((n, index) => (
            <div
              key={index}
              className="relative bg-yellow-50 border border-yellow-200 p-3 rounded-md shadow-sm hover:shadow-md transition-all text-sm text-gray-800"
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
