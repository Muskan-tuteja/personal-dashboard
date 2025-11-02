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
import { motion } from "framer-motion";

const API_KEY = "8YLH7XRZV0PP5ZD3"; // 👉 तुम अपनी free key डाल सकती हो https://financialmodelingprep.com/developer से

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
        `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?serietype=line&apikey=${API_KEY}`
      );

      if (!res.data.historical)
        throw new Error("Invalid stock symbol or API error.");

      const chartData = res.data.historical
        .map((d) => ({
          time: d.date,
          price: d.close,
        }))
        .reverse();

      setData(chartData);
      setInfo({
        name: symbol.toUpperCase(),
        lastPrice: chartData.length > 0 ? chartData.at(-1).price : "N/A",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6 flex flex-col items-center">
      {/* Header */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-10 text-center tracking-wide drop-shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        📊 Smart Stock Dashboard
      </motion.h1>

      {/* Search Section */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center items-center mb-10 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g. AAPL, TCS)"
          className="border-2 border-indigo-300 rounded-xl p-3 w-72 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-700 shadow-sm transition-all duration-300"
        />
        <button
          onClick={fetchStock}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 shadow-md hover:shadow-xl transition-all duration-300"
        >
          Search
        </button>
      </motion.div>

      {/* Status Messages */}
      {loading && (
        <motion.p
          className="text-indigo-600 font-medium text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🔄 Fetching latest data...
        </motion.p>
      )}
      {error && (
        <motion.p
          className="text-red-500 font-semibold mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      {/* Stock Info Card */}
      {info && (
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl border border-indigo-100 hover:shadow-indigo-200 transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
              {info.name} <span className="text-indigo-600">Stock</span>
            </h2>
            <div className="bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-semibold">
              💰 {info.lastPrice}
            </div>
          </div>

          {/* Chart */}
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={data}>
                <XAxis dataKey="time" hide />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No data available. Try another symbol.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default StockWidget;
