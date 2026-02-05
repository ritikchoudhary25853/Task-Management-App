import React from "react";
import { motion } from "framer-motion";
import TaskListNumber from "../others/TaskListNumber";
import TaskList from "../Tasklist/TaskList";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const EmployeeDashboard = ({ data, changeUser }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >

      {/* Page Content */}
      <div className="px-4 sm:px-6 lg:px-10 py-6">
        {/* Greeting */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome, <span className="text-emerald-400">{data.firstName}</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Here’s an overview of your tasks today
          </p>
        </motion.div>

        {/* Task Numbers */}
        <TaskListNumber data={data} />

         <motion.div
  initial={{ y: 30, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.4 }}
  className="
    mt-10
    bg-gradient-to-br from-gray-800 to-gray-900
    border border-gray-700
    rounded-2xl
    p-6 sm:p-8
    shadow-lg
  "
>
  {/* Header */}
  <h2 className="text-xl sm:text-2xl font-semibold mb-3">
    Professional Background
  </h2>

  {/* Description */}
  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">Professional Background
A motivated professional with hands-on experience in managing tasks, collaborating with cross-functional teams, and delivering work on time. Comfortable working in fast-paced environments and adapting to evolving project requirements. Committed to maintaining quality and productivity.
  </p>

  {/* Footer note */}
  <div className="mt-4 text-xs text-gray-400">
    Keep your tasks updated to maintain accurate progress.
  </div>
</motion.div>

<TaskList data={data}/>

      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;
