// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-100 to-red-200 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">👁️‍🗨️ Heartbridge</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8">حلّل علاقتك بذكاء... قبل ما تندم.</p>
      <button
        onClick={() => navigate("/quiz")}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg animate-pulse transition"
      >
        ابدأ التحليل الآن
      </button>
    </div>
  );
}
