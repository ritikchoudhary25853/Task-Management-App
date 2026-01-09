import React from 'react';

const FailedTask = ({ data }) => {
  return (
    <div className="
      w-full 
      sm:w-80 
      md:w-96 
      h-auto 
      p-4 
      sm:p-6 
      md:p-10 
      bg-red-400 
      shrink-0 
      rounded-2xl
    ">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-600 text-white text-xs sm:text-sm px-2 py-1 rounded">
          {data.category}
        </h3>
        <h4 className="text-white text-xs sm:text-sm">
          {data.date}
        </h4>
      </div>

      <h2 className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-semibold text-white">
        {data.title}
      </h2>

      <p className="text-white text-sm sm:text-md mt-3">
        {data.description}
      </p>

      <div className="mt-6">
        <button className="w-full bg-red-500 text-white rounded py-2 text-sm font-medium">
          Failed
        </button>
      </div>
    </div>
  );
};

export default FailedTask;
