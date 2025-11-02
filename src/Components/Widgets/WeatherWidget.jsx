import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cloud, Wind, Droplets, MapPin } from "lucide-react";

export const WeatherWidget = () => {
  const [city, setCity] = useState(() => localStorage.getItem("city") || "");
  const [weather, setWeather] = useState(() => {
    const saved = localStorage.getItem("weather");
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "298cf030bb9e88fc6ab3805f2a9a6f8d";

  const fetchWeather = async (selectedCity = city) => {
    if (!selectedCity.trim()) return;
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      localStorage.setItem("city", selectedCity);
      localStorage.setItem("weather", JSON.stringify(response.data));
    } catch (err) {
      setError("❌ City not found! Try again.");
      setWeather(null);
      localStorage.removeItem("weather");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load last searched weather automatically on first load
  useEffect(() => {
    if (city && !weather) {
      fetchWeather(city);
    }
  }, []);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-100 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-blue-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        <h2 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2 text-blue-700">
          <Cloud className="w-5 h-5 animate-pulse" />
          Weather Forecast
        </h2>

        {/* Input Section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 flex-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm bg-blue-50"
          />
          <button
            onClick={() => fetchWeather()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs text-center mb-3">{error}</p>}

        {/* Weather Display */}
        {weather && (
          <div className="mt-4 text-center animate-fadeIn">
            <h3 className="text-base font-semibold flex justify-center items-center gap-1 text-blue-700">
              <MapPin className="w-4 h-4" /> {weather.name}
            </h3>
            <p className="text-gray-500 capitalize text-sm">
              {weather.weather[0].description}
            </p>
            <h1 className="text-4xl font-bold mt-2 mb-3 text-blue-800">
              {weather.main.temp}°C
            </h1>

            <div className="flex justify-around mt-3 text-sm text-gray-700">
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-md shadow-sm hover:scale-105 transition">
                <Droplets className="w-4 h-4 text-blue-500" />
                {weather.main.humidity}%
              </div>
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-md shadow-sm hover:scale-105 transition">
                <Wind className="w-4 h-4 text-blue-500" />
                {weather.wind.speed} m/s
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fade Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};
