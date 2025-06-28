import React from "react";

function ReuseButton({ Sign, handleClick, value }) {
  return (
    <button
      type="button"
      className="inline-flex items-center 
      p-2 border border-gray-300 rounded-md
      text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 foucs:outline-none cursor-pointer"
      onClick={() => handleClick(value)}
    >
      {Sign}
    </button>
  );
}

export default ReuseButton;
