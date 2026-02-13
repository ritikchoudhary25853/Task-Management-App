import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Contexts/AuthProvider";
import { taskCardMotion } from "../animations/Taskcard";

const NewTask = ({ data, index, employeeId }) => {
  const [, , deleteTask] = useContext(AuthContext);

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
        bg-gradient-to-br from-yellow-400 to-yellow-600
        rounded-2xl
        text-white
        shadow-xl

        flex flex-col
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center text-xs sm:text-sm">
        <span className="bg-yellow-700 px-2.5 py-1 rounded-md font-medium">
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

      {/* Actions */}
      <div className="flex flex-col gap-3 mt-6">
        <button className="btn-outline w-full">
          Mark as read
        </button>

        <button className="btn-primary w-full">
          Accept Task
        </button>

        {/* Optional delete (safe) */}
        {/* 
        <button
          onClick={() => deleteTask?.(employeeId, index)}
          className="btn-danger w-full"
        >
          Delete
        </button>
        */}
      </div>
    </motion.div>
  );
};

export default NewTask;
