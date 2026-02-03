import React from "react";
import { motion } from "framer-motion";
import { taskCardMotion } from "../animations/Taskcard";

const AcceptTask = ({ data }) => {
  return (
    <motion.div
      {...taskCardMotion}
      className="
        w-full sm:w-80 md:w-96
        p-6 md:p-8
        bg-gradient-to-br from-blue-400 to-blue-600
        rounded-2xl
        text-white
        shadow-xl
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center text-sm">
        <span className="bg-red-500 px-3 py-1 rounded-md font-medium">
          {data.category}
        </span>
        <span className="opacity-90">{data.date}</span>
      </div>

      <h1 className="mt-4 text-xl md:text-2xl font-semibold">
        {data.title}
      </h1>

      <p className="mt-3 text-sm opacity-95">
        {data.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button className="btn-success">Mark as complete</button>
        <button className="btn-danger">Mark as failed</button>
      </div>
    </motion.div>
  );
};

export default AcceptTask;
