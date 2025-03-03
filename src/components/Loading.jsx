// Loading.jsx
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Loading Map...</h2>
        <div className="flex justify-center">
          <div className="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-16 h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
