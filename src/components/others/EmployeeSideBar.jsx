import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  ClipboardList,
  ChevronDown,
} from "lucide-react";

const EmployeeSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [taskOpen, setTaskOpen] = useState(false);

  const SidebarItem = ({ to, icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium
        ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-400 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </NavLink>
  );

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-black h-screen border-r transition-all duration-300`}
    >
      {/* Logo / Toggle */}
      <div className="flex items-center px-4 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 font-bold text-white text-xl"
        >
          <Menu size={22} />
          {isOpen && (
            <span>
              Work<span className="text-blue-500">Track</span>
            </span>
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="mt-6 flex flex-col gap-2 px-2">
        {/* Dashboard */}
        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />

        {/* Tasks Toggle */}
        <button
          onClick={() => setTaskOpen(!taskOpen)}
          className="flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-400 hover:bg-gray-800 rounded-md"
        >
          <div className="flex items-center gap-3">
            <ClipboardList size={18} />
            {isOpen && <span>Tasks</span>}
          </div>

          {isOpen && (
            <ChevronDown
              size={16}
              className={`transition-transform ${
                taskOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>

        {/* Task Submenu */}
        {taskOpen && isOpen && (
          <div className="ml-6 flex flex-col gap-1">
            <SidebarItem to="/tasks/new" label="New Tasks" />
            <SidebarItem to="/tasks/active" label="Active Tasks" />
            <SidebarItem to="/tasks/completed" label="Completed Tasks" />
            <SidebarItem to="/tasks/failed" label="Failed Tasks" />
          </div>
        )}
      </nav>
    </aside>
  );
};

export default EmployeeSidebar;
