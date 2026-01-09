import React from "react";
import AcceptTask from "./AcceptTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import NewTask from "./NewTask";

const TaskList = ({ data }) => {
 

  return (
    <div
      id="tasklist"
      className="mt-10 overflow-x-auto flex flex-nowrap justify-start items-center gap-5 p-5 rounded-xl"
    >
      {data.tasks.map((elem, idx) => {
                if (elem.active) {
                    return <AcceptTask key={idx} data={elem} />
                }
                if (elem.newTask) {
                    return <NewTask key={idx} data={elem}  index={idx}
      employeeId={data.id}/>
                }
                if (elem.completed) {
                    return <CompleteTask key={idx} data={elem} />
                }
                if (elem.failed) {
                    return <FailedTask key={idx} data={elem} />
                }

            })}
    </div>
  );
};


export default TaskList;
