import React from 'react';

const Header = ({ data, changeUser }) => {

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    changeUser('');
  };

  return (
    <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      
      {/* Greeting */}
      <h2 className="text-white text-lg sm:text-xl">
        Hello <br />
        <span className="text-3xl sm:text-4xl text-yellow-300 font-semibold">
          {data.firstName} 👋
        </span>
      </h2>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="
          bg-red-600 
          px-4 
          py-2 
          rounded-xl 
          text-white 
          font-bold 
          hover:bg-red-400 
          transition-colors
          w-full sm:w-auto
        "
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
