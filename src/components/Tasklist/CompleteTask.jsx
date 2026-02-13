import React from "react";
import { motion } from "framer-motion";
import { taskCardMotion } from "../animations/Taskcard";

const CompleteTask = ({ data }) => {
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
        bg-gradient-to-br from-green-400 to-green-600
        rounded-2xl
        text-white
        shadow-xl

        flex flex-col
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center text-xs sm:text-sm">
        <span className="bg-emerald-700 px-2.5 py-1 rounded-md font-medium">
          {data.category || "General"}
        </span>
        <span className="opacity-90">
          {data.date || "—"}
        </span>
      </div>

      {/* Title */}
      <h1 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
        {data.title || "Untitled Task"}
      </h1>

      {/* Description */}
      <p className="mt-3 text-sm sm:text-base opacity-95 line-clamp-3">
        {data.description || "No description available."}
      </p>

      {/* Status Button */}
      <button
        className="
          btn-success
          w-full
          mt-6
          cursor-default
          opacity-90
        "
        disabled
      >
        Completed ✔
      </button>
    </motion.div>
  );
};

export default CompleteTask;
