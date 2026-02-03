import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Contexts/AuthProvider";

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 },
  }),
};

const AllTasks = () => {
  const [userData] = useContext(AuthContext);

  if (!userData) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-gray-900 mt-6 to-black p-4 sm:p-6 rounded-2xl shadow-xl"
    >
      {/* Header (Desktop only) */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:flex bg-emerald-600 mb-4 py-3 px-4 justify-between rounded-xl text-white shadow-md"
      >
        <h2 className="w-1/5 font-semibold">Employee</h2>
        <h3 className="w-1/5 font-semibold">New</h3>
        <h3 className="w-1/5 font-semibold">Active</h3>
        <h3 className="w-1/5 font-semibold">Completed</h3>
        <h3 className="w-1/5 font-semibold">Failed</h3>
      </motion.div>

      {/* Rows */}
      <div className="space-y-3">
        {userData.map((emp, index) => (
          <motion.div
            key={emp.id}
            custom={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.02 }}
            className="
              border border-emerald-500/40
              bg-gray-800/60
              backdrop-blur
              p-4
              rounded-xl
              text-white
              flex
              flex-col
              md:flex-row
              md:justify-between
              shadow-lg
            "
          >
            {/* Employee */}
            <RowItem label="Employee" value={emp.firstName} />

            {/* New */}
            <RowItem
              label="New"
              value={emp.taskCounts.newTask}
              color="text-blue-400"
            />

            {/* Active */}
            <RowItem
              label="Active"
              value={emp.taskCounts.active}
              color="text-yellow-400"
            />

            {/* Completed */}
            <RowItem
              label="Completed"
              value={emp.taskCounts.completed}
              color="text-emerald-400"
            />

            {/* Failed */}
            <RowItem
              label="Failed"
              value={emp.taskCounts.failed}
              color="text-red-400"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const RowItem = ({ label, value, color = "text-white" }) => (
  <div className="md:w-1/5 flex justify-between md:block mb-2 md:mb-0">
    <span className="md:hidden text-gray-400 text-sm">{label}</span>
    <span className={`text-sm sm:text-base lg:text-lg font-semibold ${color}`}>
      {value}
    </span>
  </div>
);

export default AllTasks;
