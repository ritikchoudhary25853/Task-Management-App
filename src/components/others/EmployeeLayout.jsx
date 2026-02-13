import EmployeeSidebar from "./EmployeeSideBar";
import Navbar from "./Navbar";

const EmployeeLayout = ({ children, changeUser }) => {
  return (
    <div className="flex min-h-screen bg-black overflow-hidden">
      
      {/* Sidebar (desktop only) */}
      <div className="hidden sm:block">
        <EmployeeSidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar changeUser={changeUser} />
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
