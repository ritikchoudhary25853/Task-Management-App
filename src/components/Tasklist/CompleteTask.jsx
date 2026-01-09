import React from 'react';

const CompleteTask = ({ data }) => {
  return (
    <div className="
      w-full 
      sm:w-80 
      md:w-96 
      h-auto 
      p-4 
      sm:p-6 
      md:p-10 
      bg-green-400 
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

      <div className="mt-6">
        <button className="w-full bg-green-600 text-white py-2 text-sm rounded-md">
          Completed
        </button>
      </div>
    </div>
  );
};

export default CompleteTask;
