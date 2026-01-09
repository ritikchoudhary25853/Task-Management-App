import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const AllTasks = () => {
  const [userData] = useContext(AuthContext);

  if (!userData) return null;

  return (
    <div className="bg-gray-900 p-4 sm:p-5 rounded mt-5">
      {/* Header (Desktop only) */}
      <div className="hidden md:flex bg-green-600 mb-3 py-2 px-4 justify-between rounded text-white">
        <h2 className="text-sm lg:text-lg font-medium w-1/5">Employee Name</h2>
        <h3 className="text-sm lg:text-lg font-medium w-1/5">New Task</h3>
        <h5 className="text-sm lg:text-lg font-medium w-1/5">Active Task</h5>
        <h5 className="text-sm lg:text-lg font-medium w-1/5">Completed</h5>
        <h5 className="text-sm lg:text-lg font-medium w-1/5">Failed</h5>
      </div>

      {/* Rows */}
      {userData.map((emp) => (
        <div
          key={emp.id}
          className="
            border-2 border-emerald-500 
            mb-3 
            p-4 
            rounded 
            text-white
            flex 
            flex-col 
            md:flex-row 
            md:justify-between
          "
        >
          {/* Employee Name */}
          <div className="md:w-1/5 flex justify-between md:block mb-2 md:mb-0">
            <span className="md:hidden text-gray-400 text-sm">Employee</span>
            <h2 className="text-sm sm:text-base lg:text-lg font-medium">
              {emp.firstName}
            </h2>
          </div>

          {/* New Task */}
          <div className="md:w-1/5 flex justify-between md:block mb-2 md:mb-0">
            <span className="md:hidden text-gray-400 text-sm">New</span>
            <span className="text-blue-400 text-sm sm:text-base lg:text-lg font-medium">
              {emp.taskCounts.newTask}
            </span>
          </div>

          {/* Active Task */}
          <div className="md:w-1/5 flex justify-between md:block mb-2 md:mb-0">
            <span className="md:hidden text-gray-400 text-sm">Active</span>
            <span className="text-yellow-400 text-sm sm:text-base lg:text-lg font-medium">
              {emp.taskCounts.active}
            </span>
          </div>

          {/* Completed */}
          <div className="md:w-1/5 flex justify-between md:block mb-2 md:mb-0">
            <span className="md:hidden text-gray-400 text-sm">Completed</span>
            <span className="text-white text-sm sm:text-base lg:text-lg font-medium">
              {emp.taskCounts.completed}
            </span>
          </div>

          {/* Failed */}
          <div className="md:w-1/5 flex justify-between md:block">
            <span className="md:hidden text-gray-400 text-sm">Failed</span>
            <span className="text-red-500 text-sm sm:text-base lg:text-lg font-medium">
              {emp.taskCounts.failed}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTasks;
