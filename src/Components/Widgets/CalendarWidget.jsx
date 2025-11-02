import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

// ⚡️ Optional: if you’re using dark mode from context
// import { ThemeContext } from "../context/ThemeContext";

const CalendarWidget = ({ darkMode = false }) => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const goToToday = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`p-5 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 w-full h-full flex flex-col justify-between border ${
        darkMode
          ? "bg-gray-800/70 border-gray-700 text-gray-100"
          : "bg-white/80 border-gray-200 text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <CalendarDays
          className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`}
        />
        <h2
          className={`font-semibold text-lg tracking-wide ${
            darkMode ? "text-green-400" : "text-green-700"
          }`}
        >
          Smart Calendar
        </h2>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={prevMonth}
          className={`p-2 rounded-md transition ${
            darkMode
              ? "bg-gray-700 text-green-400 hover:bg-gray-600"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="font-medium text-base">
          {months[month]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className={`p-2 rounded-md transition ${
            darkMode
              ? "bg-gray-700 text-green-400 hover:bg-gray-600"
              : "bg-green-100 text-green-700 hover:bg-green-200"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-xs font-semibold mb-2 text-center opacity-80">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm flex-grow">
        {days.map((day, i) => {
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          const isWeekend = (i % 7 === 0 || i % 7 === 6) && day;

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className={`h-8 flex items-center justify-center rounded-md cursor-pointer transition-all ${
                isToday
                  ? "bg-green-500 text-white font-bold shadow-sm ring-2 ring-green-300"
                  : isWeekend
                  ? darkMode
                    ? "text-red-400 bg-gray-700 border border-gray-600 hover:bg-gray-600"
                    : "text-red-400 bg-white border border-gray-200 hover:bg-red-50"
                  : darkMode
                  ? "text-gray-200 bg-gray-700 border border-gray-600 hover:bg-gray-600"
                  : "text-gray-700 bg-white border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {day || ""}
            </motion.div>
          );
        })}
      </div>

      {/* Today Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={goToToday}
          className={`px-5 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 ${
            darkMode
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          Go to Today
        </button>
      </div>
    </motion.div>
  );
};

export default CalendarWidget;
