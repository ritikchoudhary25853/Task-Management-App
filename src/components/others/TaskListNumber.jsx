import React from "react";

const TaskListNumber = ({ data }) => {
  const taskCards = [
    { title: "New Task", count: data.taskCounts.newTask, bg: "bg-yellow-400" },
    { title: "Completed Task", count: data.taskCounts.completed, bg: "bg-green-500" },
    { title: "Active Task", count: data.taskCounts.active, bg: "bg-blue-500" },
    { title: "Failed Task", count: data.taskCounts.failed, bg: "bg-red-500" },
  ];

  return (
    <div
      className="
        mt-8 gap-6
        flex overflow-x-auto
        sm:grid sm:grid-cols-2 sm:overflow-visible
        lg:grid-cols-4
      "
    >
      {taskCards.map((task, index) => (
        <div
          key={index}
          className={`
            min-w-[240px] sm:min-w-0
            flex flex-col justify-center items-center
            ${task.bg} text-white
            py-6 rounded-xl shadow-lg
          `}
        >
          <h2 className="text-4xl lg:text-5xl font-bold">
            {task.count}
          </h2>
          <h3 className="text-lg lg:text-xl font-semibold mt-2">
            {task.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default TaskListNumber;
