import React from "react";
import { motion } from "framer-motion";
import { taskCardMotion } from "../animations/Taskcard";

const FailedTask = ({ data }) => {
  // 🛡️ Safety guard
  if (!data) return null;

  return (
    <motion.div
      {...taskCardMotion}
      className="
        w-full
        sm:w-[48%]
        lg:w-[31%]
        xl:w-[23%]

        p-5 sm:p-6 md:p-8
        bg-gradient-to-br from-red-400 to-red-600
        rounded-2xl
        text-white
        shadow-xl

        flex flex-col
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center text-xs sm:text-sm">
        <span className="bg-red-800 px-2.5 py-1 rounded-md font-medium">
          {data.category || "General"}
        </span>
        <span className="opacity-90">
          {data.date || "—"}
        </span>
      </div>

      {/* Title */}
      <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
        {data.title || "Untitled Task"}
      </h2>

      {/* Description */}
      <p className="mt-3 text-sm sm:text-base opacity-95 line-clamp-3">
        {data.description || "No description available."}
      </p>

      {/* Status Button */}
      <button
        className="
          btn-danger
          w-full
          mt-6
          cursor-default
          opacity-90
        "
        disabled
      >
        Failed ✖
      </button>
    </motion.div>
  );
};

export default FailedTask;
