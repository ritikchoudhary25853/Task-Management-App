import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../DashBoard/AdminDashboard";
import EmployeeDashboard from "../DashBoard/EmployeeDashboard";
import CreateTask from "../others/CreateTask";
import AllTasks from "../others/AllTasks";

const AppRoutes = ({ role, userData }) => {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard (Role based) */}
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

      {/* Admin-only routes */}
      {role === "admin" && (
        <>
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/employees" element={<AllTasks />} />
        </>
      )}

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
