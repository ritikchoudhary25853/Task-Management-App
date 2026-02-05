import { LogOut } from "lucide-react";

const Navbar = ({ changeUser }) => {
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    changeUser(null);
  };

  return (
    <nav className="
          h-16 w-full
          bg-blue-900
          border-b border-gray-800
          flex items-center justify-between
          px-6
          shadow-md
          ">

      {/* Logo */}
      <div className="flex items-center text-2xl font-extrabold text-white">
        Work<span className="text-blue-300">Track</span>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-sm font-medium text-white hover:text-red-500"
      >
        <LogOut size={18} />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
