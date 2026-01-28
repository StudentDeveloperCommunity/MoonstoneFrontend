import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-gradient-to-br from-orange-400 via-pink-500 to-cyan-400 w-full">
      <div className="bg-white/80 rounded-xl shadow-lg p-8 mt-16">
        <h1 className="text-4xl font-bold mb-4 text-red-600">404 - Page Not Found</h1>
        <p className="mb-6 text-lg text-gray-700">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition">Go to Home Page</Link>
      </div>

    </div>
  );
}
