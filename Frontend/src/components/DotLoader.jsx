import React from "react";

const DotLoader = () => {
  // Dots with different animation delays
  const dots = [0.3, 0.2, 0.1];

  return (
    <div className="min-h-screen flex justify-center items-center space-x-3 bg-gradient-to-br from-gray-800 via-green-800 to-emerald-800 relative overflow-hidden">
      {dots.map((delay, index) => (
        <span
          key={index}
          className="w-5 h-5 rounded-full shadow-lg bg-gradient-to-tr from-green-600 to-emerald-600 animate-load"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
};

export default DotLoader;
