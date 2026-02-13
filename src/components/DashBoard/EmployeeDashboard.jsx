import React from "react";
import { motion } from "framer-motion";
import TaskListNumber from "../others/TaskListNumber";
import TaskList from "../Tasklist/TaskList";


const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const EmployeeDashboard = ({ data }) => {
  return (
     <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="
        w-full
        min-h-screen
        overflow-x-hidden
        bg-gradient-to-br from-black via-gray-900 to-black
        text-white
      "
    >
      {/* Page Container */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-3 sm:px-6 lg:px-10
          py-4 sm:py-6
        "
      >
        {/* Greeting */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-xl sm:text-3xl font-bold">
            Welcome,{" "}
            <span className="text-emerald-400">{data.firstName}</span>
          </h1>

          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Here’s an overview of your tasks today
          </p>
        </motion.div>

        {/* Task Numbers */}
        <TaskListNumber data={data} />

        {/* Info Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="
            mt-8 sm:mt-10
            bg-gradient-to-br from-gray-800 to-gray-900
            border border-gray-700
            rounded-xl sm:rounded-2xl
            p-4 sm:p-8
            shadow-lg
          "
        >
          <h2 className="text-lg sm:text-2xl font-semibold mb-2 sm:mb-3">
            Professional Background
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            A motivated professional with hands-on experience in managing
            tasks, collaborating with cross-functional teams, and delivering
            work on time. Comfortable working in fast-paced environments and
            adapting to evolving project requirements.
          </p>

          <div className="mt-3 sm:mt-4 text-xs text-gray-400">
            Keep your tasks updated to maintain accurate progress.
          </div>
        </motion.div>

        {/* Task List */}
        <div className="mt-8">
          <TaskList data={data} />
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;
