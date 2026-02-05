import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const TaskListNumber = ({ data }) => {
  const taskCards = [
    { title: "New Tasks", count: data.taskCounts.newTask, color: "from-yellow-400 to-yellow-600" },
    { title: "Completed", count: data.taskCounts.completed, color: "from-green-400 to-green-600" },
    { title: "Active", count: data.taskCounts.active, color: "from-blue-400 to-blue-600" },
    { title: "Failed", count: data.taskCounts.failed, color: "from-red-400 to-red-600" },
  ];

  return (
    <div
      className="
        mt-10 flex gap-5 overflow-x-auto pb-3
        sm:grid sm:grid-cols-2 sm:overflow-visible
        lg:grid-cols-4
      "
    >
      {taskCards.map((task, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={index}
          whileHover={{ scale: 1.05 }}
          className="
            min-w-[230px] sm:min-w-0
            bg-gradient-to-br
            text-white
            rounded-2xl
            p-6
            shadow-lg
            cursor-pointer
          "
          style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
        >
          <div className={`bg-gradient-to-br ${task.color} rounded-xl p-5`}>
            <h2 className="text-4xl font-bold">{task.count}</h2>
            <p className="mt-2 text-sm tracking-wide uppercase opacity-90">
              {task.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskListNumber;
