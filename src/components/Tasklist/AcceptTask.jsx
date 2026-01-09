import React from 'react';

const AcceptTask = ({ data }) => {
  return (
    <div className="
      w-full 
      sm:w-80 
      md:w-96 
      h-auto 
      p-4 
      sm:p-6 
      md:p-8 
      bg-gray-800   /* Dark background for card */
      shrink-0 
      rounded-2xl
      shadow-md
    ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="bg-red-500 text-white rounded-md px-2 py-1 text-xs sm:text-sm">
          {data.category}
        </h3>

        <h4 className="text-gray-300 text-xs sm:text-sm">
          {data.date}
        </h4>
      </div>

      {/* Title */}
      <h1 className="text-white mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-semibold">
        {data.title}
      </h1>

      {/* Description */}
      <p className="text-gray-300 mt-3 sm:mt-5 text-sm sm:text-md">
        {data.description}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-between items-center mt-6">
        <button className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-3 py-2 text-sm rounded-md transition-colors">
          Mark as complete
        </button>

        <button className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-3 py-2 text-sm rounded-md transition-colors">
          Mark as failed
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
