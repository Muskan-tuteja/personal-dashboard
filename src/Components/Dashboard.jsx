import React, { useState } from "react";
import {
  FaCloudSun,
  FaClipboardList,
  FaNewspaper,
  FaStickyNote,
  FaCalendarAlt,
  FaHome,
  FaUserCircle,
  FaChartLine,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import TodoWidget from "./Widgets/TodoWidget";
import { WeatherWidget } from "./Widgets/WeatherWidget";
import NotesWidget from "./Widgets/NotesWidget";
import CalendarWidget from "./Widgets/CalendarWidget";
import NewsWidget from "./Widgets/NewsWidget";
import StockWidget from "./Widgets/StockWidget";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || "dashboard"
  );

  // ✅ Whenever activeTab changes, save it in localStorage
  React.useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const sidebarItems = [
    { id: "dashboard", name: "Dashboard", icon: <FaHome /> },
    { id: "weather", name: "Weather", icon: <FaCloudSun /> },
    { id: "todo", name: "To-Do", icon: <FaClipboardList /> },
    { id: "news", name: "News", icon: <FaNewspaper /> },
    { id: "notes", name: "Notes", icon: <FaStickyNote /> },
    { id: "calendar", name: "Calendar", icon: <FaCalendarAlt /> },
    { id: "stocks", name: "Stocks", icon: <FaChartLine /> },
  ];

  return (
    <div
      className={`flex h-screen transition-all duration-500 overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`w-60 p-6 flex flex-col shadow-2xl transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-b from-gray-800 to-gray-700 text-gray-100"
            : "bg-gradient-to-b from-indigo-600 to-cyan-500 text-white"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <FaUserCircle className="text-6xl mb-2 drop-shadow-lg" />
          <h2 className="text-lg font-semibold tracking-wide">
            Hi
          </h2>
          <p
            className={`text-xs ${
              darkMode ? "text-gray-300" : "text-blue-100"
            }`}
          >
            Welcome back!
          </p>
        </motion.div>

        <nav className="space-y-2 flex-1">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === item.id
                  ? darkMode
                    ? "bg-white/10 text-cyan-400 shadow-md"
                    : "bg-white text-indigo-600 shadow-md"
                  : darkMode
                  ? "hover:bg-gray-700 hover:text-cyan-300 text-gray-300"
                  : "hover:bg-indigo-500 hover:text-white text-indigo-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </motion.button>
          ))}
        </nav>

        {/* Dark/Light Toggle */}
        <div className="flex items-center  justify-center mt-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-2 py-2 rounded-lg font-medium text-sm transition-all mr-20  ${
              darkMode
                ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                : "bg-white text-indigo-600 hover:bg-indigo-100"
            }`}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </motion.button>
        </div>

        <footer
          className={`text-[11px] text-center mt-8 opacity-70 mr-20 ${
            darkMode ? "text-gray-400" : "text-blue-100"
          }`}
        >
          © 2025 Dashboard Pro
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-5"
            >
              <h2
                className={`text-3xl font-semibold mb-5 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                📊 Dashboard Overview
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Weather */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`backdrop-blur-lg p-5 rounded-2xl shadow-lg border-t-4  ${
                    darkMode
                      ? "bg-gray-800/70 border-blue-500"
                      : "bg-white/70 border-blue-400"
                  }`}
                >
                  <WeatherWidget />
                </motion.div>

                {/* To-do */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`backdrop-blur-lg p-4 rounded-2xl shadow-lg border-t-4 ${
                    darkMode
                      ? "bg-gray-800/70 border-cyan-400"
                      : "bg-white/70 border-cyan-400"
                  }`}
                >
                  <TodoWidget />
                </motion.div>

                {/* Notes */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`backdrop-blur-lg p-4 rounded-2xl shadow-lg border-t-4 ${
                    darkMode
                      ? "bg-gray-800/70 border-yellow-400"
                      : "bg-white/70 border-yellow-400"
                  }`}
                >
                  <NotesWidget />
                </motion.div>

                {/* Calendar */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                 className={`p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full h-full flex flex-col ${
  darkMode
    ? "bg-gray-800/60 border border-gray-700 text-gray-100"
    : "bg-white/70 backdrop-blur-xl border border-gray-200 text-gray-800"
}`}
                >
                  <CalendarWidget />
                </motion.div>

                {/* News */}
                {/* News */}
<motion.div
  whileHover={{ scale: 1.02 }}
  transition={{ type: "spring", stiffness: 250, damping: 18 }}
  className={`relative backdrop-blur-2xl rounded-3xl shadow-2xl border-t-4 transition-all duration-500 col-span-2 xl:col-span-2 p-6 overflow-hidden h-120
    ${
      darkMode
        ? "bg-gray-900/70 border-purple-500 hover:shadow-purple-400/20"
        : "bg-white/70 border-purple-400 hover:shadow-purple-300/40"
    }`}
>
  <div className="flex justify-between items-center mb-4">
   

    <button
      onClick={() => setActiveTab("news")}
      className={`px-3 py-1 text-sm rounded-lg font-semibold transition-all ${
        darkMode
          ? "bg-purple-700/40 text-purple-300 hover:bg-purple-600/60"
          : "bg-purple-100 text-purple-700 hover:bg-purple-200"
      }`}
    >
      View All
    </button>
  </div>

  <div className="h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-400/60 scrollbar-track-transparent">
    <NewsWidget />
  </div>
</motion.div>


                {/* Stocks */}
                
              </div>
            </motion.div>
          )}

          {/* Tabs */}
          {activeTab === "weather" && <WeatherWidget />}
          {activeTab === "todo" && <TodoWidget />}
          {activeTab === "notes" && <NotesWidget />}
          {activeTab === "calendar" && <CalendarWidget />}
          {activeTab === "news" && <NewsWidget />}
          {activeTab === "stocks" && <StockWidget />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
