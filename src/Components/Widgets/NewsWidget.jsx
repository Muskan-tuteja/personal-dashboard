import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const NewsWidget = ({ darkMode }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "pub_bf6ce8a8e7dc47189edd2ad511508b08";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=in&language=en&category=top`
        );

        console.log("API Response:", res.data);
        const data = Array.isArray(res.data.results) ? res.data.results : [];
        setArticles(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to fetch news 😢");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-100 text-lg font-semibold text-purple-500 animate-pulse">
        ⏳ Fetching latest headlines...
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 font-semibold text-lg mt-6">
        {error}
      </p>
    );

  return (
    <div className="p-4">
      <h1
        className={`text-2xl font-extrabold text-center mb-2 bg-clip-text text-transparent h-10 ${
          darkMode
            ? "bg-gradient-to-r from-pink-400 to-purple-400"
            : "bg-gradient-to-r from-purple-600 to-pink-500"
        }`}
      >
        Trending News
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(articles || []).slice(0, 9).map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03, y: -5 }}
            className={`rounded-2xl overflow-hidden border shadow-lg transition-all backdrop-blur-xl ${
              darkMode
                ? "bg-gray-800/60 border-gray-700 hover:shadow-purple-500/20"
                : "bg-white/70 border-gray-200 hover:shadow-purple-300/40"
            }`}
          >
            {article.image_url && (
              <img
                src={article.image_url}
                alt="news"
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2
                className={`font-semibold text-lg mb-2 line-clamp-2 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {article.title}
              </h2>
              <p
                className={`text-sm mb-3 line-clamp-3 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {article.description || "No description available."}
              </p>
              <a
                href={article.link}
                target="_blank"
                rel="noreferrer"
                className={`text-sm font-semibold transition-colors ${
                  darkMode
                    ? "text-purple-400 hover:text-pink-400"
                    : "text-purple-600 hover:text-pink-600"
                }`}
              >
                Read More →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
