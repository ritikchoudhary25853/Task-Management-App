import React from "react";
import { motion } from "framer-motion";
import { taskCardMotion } from "../animations/Taskcard";

const AcceptTask = ({ data }) => {
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
        bg-gradient-to-br from-blue-400 to-blue-600
        rounded-2xl
        text-white
        shadow-xl

        flex flex-col
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center text-xs sm:text-sm">
        <span className="bg-red-500 px-2.5 py-1 rounded-md font-medium">
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
        {data.description || "No description provided."}
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        <button className="btn-outline w-full">
          Mark as complete
        </button>

        <button className="btn-danger w-full">
          Mark as failed
        </button>
        </div>
    </motion.div>
  );
};

export default AcceptTask;
