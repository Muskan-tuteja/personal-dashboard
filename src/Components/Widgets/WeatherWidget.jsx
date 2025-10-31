import React, { useState } from "react";
import axios from "axios";
import { Cloud, Wind, Droplets, MapPin } from "lucide-react";

export const WeatherWidget = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "298cf030bb9e88fc6ab3805f2a9a6f8d";

  const fetchWeather = async () => {
    if (!city.trim()) return;
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("❌ City not found! Try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-2xl shadow-lg p-5 w-full text-gray-800 backdrop-blur-md border border-blue-200 transition-all hover:shadow-xl hover:scale-[1.02] duration-300">
      <h2 className="text-lg font-semibold mb-3 flex items-center justify-center gap-2 text-blue-700">
        🌤️ Weather Forecast
      </h2>

      {/* Input Section */}
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 flex-1 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-xs text-center mb-2">{error}</p>
      )}

      {/* Weather Display */}
      {weather && (
        <div className="mt-3 text-center animate-fadeIn">
          <h3 className="text-base font-semibold flex justify-center items-center gap-1 text-blue-700">
            <MapPin className="w-4 h-4" /> {weather.name}
          </h3>
          <p className="text-gray-500 capitalize text-sm">
            {weather.weather[0].description}
          </p>
          <h1 className="text-3xl font-bold mt-1 mb-2 text-blue-800">
            {weather.main.temp}°C
          </h1>

          <div className="flex justify-around mt-3 text-sm text-gray-700">
            <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-md shadow-sm">
              <Droplets className="w-4 h-4 text-blue-500" />
              {weather.main.humidity}%
            </div>
            <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-md shadow-sm">
              <Wind className="w-4 h-4 text-blue-500" />
              {weather.wind.speed} m/s
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
