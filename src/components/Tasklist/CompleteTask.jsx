import React from "react";
import { motion } from "framer-motion";
import { taskCardMotion } from "../animations/Taskcard";

const CompleteTask = ({ data }) => {
  return (
    <motion.div
      {...taskCardMotion}
      className="
        w-full sm:w-80 md:w-96
        p-6 md:p-8
        bg-gradient-to-br from-green-400 to-green-600
        rounded-2xl
        text-white
        shadow-xl
      "
    >
      <div className="flex justify-between items-center text-sm">
        <span className="bg-emerald-700 px-3 py-1 rounded-md">
          {data.category}
        </span>
        <span>{data.date}</span>
      </div>

      <h1 className="mt-4 text-xl md:text-2xl font-semibold">
        {data.title}
      </h1>

      <p className="mt-3 text-sm">
        {data.description}
      </p>

      <button className="btn-success w-full mt-6">
        Completed ✔
      </button>
    </motion.div>
  );
};

export default CompleteTask;
