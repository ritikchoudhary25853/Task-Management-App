import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Contexts/AuthProvider";
import { taskCardMotion } from "../animations/Taskcard";

const NewTask = ({ data, index, employeeId }) => {
  const [, , deleteTask] = useContext(AuthContext);

  return (
    <motion.div
      {...taskCardMotion}
      className="
        w-full sm:w-80 md:w-96
        p-6 md:p-8
        bg-gradient-to-br from-yellow-400 to-yellow-600
        rounded-2xl
        text-white
        shadow-xl
      "
    >
      <div className="flex justify-between items-center text-sm">
        <span className="bg-yellow-700 px-3 py-1 rounded-md">
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

      <div className="flex flex-col gap-3 mt-6">
        <button className="btn-outline">Mark as read</button>
        <button className="btn-primary">Accept Task</button>

        {/* Optional */}
        {/* 
        <button
          onClick={() => deleteTask(employeeId, index)}
          className="btn-danger"
        >
          Delete
        </button>
        */}
      </div>
    </motion.div>
  );
};

export default NewTask;
