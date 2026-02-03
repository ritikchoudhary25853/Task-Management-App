import React from "react";
import SideBar from "../others/SideBar";
import NavBar from "../others/NavBar";
import AppRoutes from "../Routes/AppRoutes";
import EmployeeSidebar from "../others/EmployeeSideBar";

const MainLayout = ({ role, userData, changeUser }) => {
  return (
    <div className="flex min-h-screen">
      {role === "admin" ? <SideBar userData={userData} /> : <EmployeeSidebar userData={userData} />}
     

      <div className="flex-1 flex flex-col">
        <NavBar changeUser={changeUser} />

        <main className="flex-1  bg-gray-600">
          <AppRoutes role={role} userData={userData} />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
