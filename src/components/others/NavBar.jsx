import { LogOut } from "lucide-react";

const NavBar = ({ changeUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    changeUser(null);
  };

  return (
    <nav
      className="
        h-14 sm:h-16
        w-full 
        bg-blue-900
        border-b border-gray-800
        flex items-center justify-between
        px-4 sm:px-6
        shadow-md
      "
    >
      {/* Logo */}
      <div className="flex items-center font-extrabold text-white text-lg sm:text-2xl">
        Work<span className="text-blue-300">Track</span>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-2
          text-sm font-medium text-white
          px-3 py-2
          rounded-md
          hover:text-red-400 hover:bg-white/10
          transition
        "
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </nav>
  );
};

export default NavBar;
