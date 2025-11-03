import { useState, useEffect } from "react";
import { ClipboardList, PlusCircle, Trash2, Edit2, Check } from "lucide-react";

const TodoWidget = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    // ✅ Load once from localStorage (without flicker)
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // ✅ Save automatically when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (task.trim() === "") return;
    setTodos([...todos, task]);
    setTask("");
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  const handleSave = (index) => {
    const updated = [...todos];
    updated[index] = editText;
    setTodos(updated);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="min-h-[40vh] flex flex-col items-center text-gray-800 justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-center gap-2 mb-5">
          <ClipboardList className="text-indigo-600 w-6 h-6" />
          <h2 className="text-indigo-600 font-semibold text-xl">To-Do List</h2>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 text-sm bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAdd}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-all flex items-center gap-1 text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Add
          </button>
        </div>

        <ul className="space-y-3 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100">
          {todos.length === 0 && (
            <li className="text-gray-400 text-sm text-center py-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
                alt="empty"
                className="w-16 mx-auto mb-2 opacity-70 animate-bounce"
              />
              No tasks yet — start by adding one 💪
            </li>
          )}

          {todos.map((todo, index) => (
            <li
              key={index}
              className="bg-indigo-50 border border-indigo-100 text-sm p-2 rounded-md flex justify-between items-center shadow-sm hover:shadow-md transition-all animate-fadeIn"
            >
              {editIndex === index ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 mr-2 text-sm bg-black border border-indigo-200 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <span className="text-gray-700 truncate flex-1">{todo}</span>
              )}

              <div className="flex items-center gap-2">
                {editIndex === index ? (
                  <button
                    onClick={() => handleSave(index)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TodoWidget;
