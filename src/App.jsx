import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/Layout/AppLayout";
import { useWorkTrack } from "./context/WorkTrackContext";
import { ForgotPasswordPage, LoginPage, SignupPage } from "./pages/AuthPages";
import { AdminDashboard, EmployeeDashboard } from "./pages/DashboardPages";
import EmployeesPage from "./pages/EmployeesPage";
import TasksPage from "./pages/TasksPage";
import { CalendarPage, ProfilePage, SettingsPage } from "./pages/UtilityPages";

function HomeRedirect() {
  const { currentUser } = useWorkTrack();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <Navigate to={currentUser.role === "Admin" ? "/admin/dashboard" : "/employee/dashboard"} replace />;
}

function ProtectedRoute({ role }) {
  const { currentUser } = useWorkTrack();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (role && currentUser.role !== role) return <Navigate to="/" replace />;
  return <AppLayout />;
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<ProtectedRoute role="Admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<EmployeesPage />} />
          <Route path="/admin/tasks" element={<TasksPage mode="admin" />} />
          <Route path="/admin/calendar" element={<CalendarPage mode="admin" />} />
        </Route>

        <Route element={<ProtectedRoute role="Employee" />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/tasks" element={<TasksPage mode="employee" />} />
          <Route path="/employee/calendar" element={<CalendarPage mode="employee" />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" toastOptions={{ duration: 2600 }} />
    </>
  );
}
