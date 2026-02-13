import React from "react";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";

const TaskList = ({ data }) => {
  // 🛡️ Safety guard
  if (!data || !Array.isArray(data.tasks)) {
    return (
      <div className="mt-16 text-center text-gray-400">
        Loading tasks...
      </div>
    );
  }

  return (
    <div
      id="tasklist"
      className="
        mt-16
        min-h-screen
        bg-gradient-to-br from-black via-gray-900 to-black
        rounded-xl

        /* 📱 Mobile first */
        flex flex-col
        gap-4
        p-4

        /* 📲 Tablet */
        sm:flex-row
        sm:flex-wrap
        sm:justify-center
        sm:gap-6
        sm:p-6
      "
    >
      {data.tasks.map((elem, idx) => {
        if (elem.active)
          return <AcceptTask key={elem.id || idx} data={elem} />;

        if (elem.newTask)
          return (
            <NewTask
              key={elem.id || idx}
              data={elem}
              index={idx}
              employeeId={data.id}
            />
          );

        if (elem.completed)
          return <CompleteTask key={elem.id || idx} data={elem} />;

        if (elem.failed)
          return <FailedTask key={elem.id || idx} data={elem} />;

        return null;
      })}
    </div>
  );
};

export default TaskList;
