import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, LayoutDashboard, ClipboardList, Users } from "lucide-react";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  function SidebarItem({ to, icon, label, isOpen }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium
        ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
}


  return (
   
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 min-h-screen border-r transition-all duration-300`}
    >
      {/* Logo / Toggle Button */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 font-extrabold text-white text-2xl"
        >
          <Menu size={22} />
          {isOpen && <span>Work<span className="text-blue-500">Track</span></span>}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-4 text-white flex flex-col gap-4 px-2">
        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          isOpen={isOpen}
        />

        <SidebarItem
          to="/create-task"
          icon={<ClipboardList size={18} />}
          label="Create Task"
          isOpen={isOpen}
        />

        <SidebarItem
          to="/employees"
          icon={<Users size={18} />}
          label="Employees"
          isOpen={isOpen}
        />
      </nav>
    </aside>

  );
};


export default Sidebar;
