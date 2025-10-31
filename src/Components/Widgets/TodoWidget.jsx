import { useState, useEffect } from "react";
import { ClipboardList, PlusCircle, Trash2, Edit2, Check } from "lucide-react";

const TodoWidget = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔹 Load from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // 🔹 Save to localStorage whenever todos change
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
    const updatedTodos = [...todos];
    updatedTodos[index] = editText;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <ClipboardList className="text-indigo-600 w-5 h-5" />
        <h2 className="text-indigo-600 font-semibold text-lg">To-Do List</h2>
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 mb-3">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 text-sm bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          placeholder="Add task..."
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-500 text-white px-3 py-2 rounded-md hover:bg-indigo-600 transition-all flex items-center gap-1 text-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Add
        </button>
      </div>

      {/* Task List */}
      <ul className="space-y-2 max-h-44 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-gray-100">
        {todos.length === 0 && (
          <li className="text-gray-400 text-sm text-center py-2">
            No tasks yet ✨
          </li>
        )}
        {todos.map((todo, index) => (
          <li
            key={index}
            className="bg-indigo-50 border border-indigo-100 text-sm p-2 rounded-md flex justify-between items-center shadow-sm hover:shadow-md transition-all"
          >
            {editIndex === index ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 mr-2 text-sm bg-white border border-indigo-200 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
  );
};

export default TodoWidget;
