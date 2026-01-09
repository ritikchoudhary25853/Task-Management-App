import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";

const NewTask = ({ data, index, employeeId }) => {
  const [, , deleteTask] = useContext(AuthContext);

  return (
    <div className="
      w-full 
      sm:w-80 
      md:w-96 
      h-auto 
      p-4 
      sm:p-6 
      md:p-10 
      bg-yellow-400 
      shrink-0 
      rounded-2xl
    ">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-500 text-white rounded-md px-2 py-1 text-xs sm:text-sm">
          {data.category}
        </h3>
        <h4 className="text-white text-xs sm:text-sm">
          {data.date}
        </h4>
      </div>

      <h1 className="text-white mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-semibold">
        {data.title}
      </h1>

      <p className="text-white mt-3 sm:mt-5 text-sm sm:text-md">
        {data.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button className="w-full sm:w-auto bg-green-500 text-white px-3 py-2 text-sm rounded-md">
          Mark as read
        </button>

        <button className="w-full sm:w-auto bg-blue-500 text-white px-3 py-2 text-sm rounded-md">
          Accept Task
        </button>

        {/* 
        <button
          onClick={() => deleteTask(employeeId, index)}
          className="w-full sm:w-auto bg-red-600 text-white px-3 py-2 text-sm rounded-md"
        >
          Delete
        </button>
        */}
      </div>
    </div>
  );
};

export default NewTask;
