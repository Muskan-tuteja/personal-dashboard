import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_KEY = "VB7I4XQO2E1FELFU"; // 🔑 Replace with your own key

const StockWidget = () => {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStock = async () => {
    if (!symbol) return;
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
      );

      const timeSeries = res.data["Time Series (5min)"];
      if (!timeSeries) throw new Error("Invalid symbol or API limit reached");

      const chartData = Object.entries(timeSeries)
        .map(([time, value]) => ({
          time,
          price: parseFloat(value["1. open"]),
        }))
        .reverse();

      setData(chartData);
      setInfo({
        name: symbol.toUpperCase(),
        lastPrice: chartData.at(-1)?.price,
      });
    } catch (err) {
      setError("⚠️ Failed to load stock data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700 tracking-wide">
        📊 Smart Stock Dashboard
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g. AAPL, TCS)"
          className="border border-gray-300 rounded-l-xl p-3 w-72 focus:ring-2 focus:ring-indigo-400 outline-none text-gray-700"
        />
        <button
          onClick={fetchStock}
          className="bg-indigo-600 text-white px-6 rounded-r-xl hover:bg-indigo-700 transition-all"
        >
          Search
        </button>
      </div>

      {/* Loading & Error States */}
      {loading && (
        <p className="text-center text-gray-600 font-medium">Loading...</p>
      )}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {/* Stock Info Card */}
      {info && (
        <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto text-center transition-all hover:shadow-2xl">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {info.name} Stock
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            💰 Last Price:{" "}
            <span className="font-semibold text-indigo-600">
              {info.lastPrice}
            </span>
          </p>

          {/* Chart */}
          {data.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="time" hide />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f3f4f6",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      )}
    </div>
  );
};

export default StockWidget;
