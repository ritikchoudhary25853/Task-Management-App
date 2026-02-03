import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../DashBoard/AdminDashboard";
import EmployeeDashboard from "../DashBoard/EmployeeDashboard";
import Employees from "../others/Employees";
import CreateTask from "../others/CreateTask";
import AllTasks from "../others/AllTasks";

const AppRoutes = ({ role, userData }) => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          role === "admin" ? (
            <AdminDashboard />
          ) : (
            <EmployeeDashboard data={userData} />
          )
        }
      />

      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/employees" element={<AllTasks />} />
    
      
    </Routes>
  );
};

export default AppRoutes;
