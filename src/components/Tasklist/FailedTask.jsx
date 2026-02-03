import React from "react";
import { motion } from "framer-motion";
import { taskCardMotion } from "../animations/Taskcard";

const FailedTask = ({ data }) => {
  return (
    <motion.div
      {...taskCardMotion}
      className="
        w-full sm:w-80 md:w-96
        p-6 md:p-8
        bg-gradient-to-br from-red-400 to-red-600
        rounded-2xl
        text-white
        shadow-xl
      "
    >
      <div className="flex justify-between items-center text-sm">
        <span className="bg-red-800 px-3 py-1 rounded-md">
          {data.category}
        </span>
        <span>{data.date}</span>
      </div>

      <h2 className="mt-4 text-xl md:text-2xl font-semibold">
        {data.title}
      </h2>

      <p className="mt-3 text-sm">
        {data.description}
      </p>

      <button className="btn-danger w-full mt-6">
        Failed ✖
      </button>
    </motion.div>
  );
};

export default FailedTask;
