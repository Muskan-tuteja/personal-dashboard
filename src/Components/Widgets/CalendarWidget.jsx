import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

const CalendarWidget = () => {
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

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(i);

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto">
      {/* Header */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <CalendarDays className="text-green-500 w-5 h-5" />
        <h2 className="text-green-500 font-semibold text-lg">Calendar</h2>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="p-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
        >
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-gray-700 font-medium text-sm">
          {months[month]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 text-xs font-semibold text-gray-600 mb-1 text-center">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day, i) => (
          <div
            key={i}
            className={`h-8 flex items-center justify-center rounded-md ${
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear()
                ? "bg-green-400 text-white font-semibold shadow-sm"
                : "bg-white border border-gray-100 hover:bg-gray-100"
            }`}
          >
            {day || ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
