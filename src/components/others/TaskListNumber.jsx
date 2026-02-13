import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" },
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
        mt-10
        flex gap-4 overflow-x-auto pb-4 px-1
        snap-x snap-mandatory
        sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible
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
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="
            snap-center
            min-w-[220px]
            sm:min-w-0
            rounded-2xl
            p-5
            text-white
            shadow-lg
            bg-gradient-to-br
            transition-transform
          "
        >
          <div
            className={`
              bg-gradient-to-br ${task.color}
              rounded-xl
              p-5
              flex flex-col justify-between
              h-full
            `}
          >
            <h2 className="text-4xl font-bold leading-none">
              {task.count}
            </h2>
            <p className="mt-2 text-xs font-semibold tracking-widest uppercase opacity-90">
              {task.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskListNumber;
