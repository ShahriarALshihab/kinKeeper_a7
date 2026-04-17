import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <div className="text-7xl mb-6">🤷</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-lg font-semibold text-gray-700 mb-2">Page Not Found</p>
      <p className="text-gray-400 text-sm max-w-xs mb-8">
        The page you're looking for doesn't exist. It may have been moved or the URL might be wrong.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-2.5 rounded-lg transition-colors text-sm"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;