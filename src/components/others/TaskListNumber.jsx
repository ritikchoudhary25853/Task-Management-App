import React from "react";

const TaskListNumber = ({ data }) => {
  const taskCards = [
    {
      title: "New Task",
      count: data.taskCounts.newTask,
      bg: "bg-yellow-400",
    },
    {
      title: "Completed Task",
      count: data.taskCounts.completed,
      bg: "bg-green-500",
    },
    {
      title: "Active Task",
      count: data.taskCounts.active,
      bg: "bg-blue-500",
    },
    {
      title: "Failed Task",
      count: data.taskCounts.failed,
      bg: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {taskCards.map((task, index) => (
        <div
          key={index}
          className={`flex flex-col justify-center items-center ${task.bg} text-white py-6 rounded-xl shadow-lg`}
        >
          <h2 className="text-5xl font-bold">{task.count}</h2>
          <h3 className="text-xl font-semibold mt-2">{task.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default TaskListNumber;
