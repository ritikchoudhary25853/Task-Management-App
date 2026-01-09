import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard"; 
import EmployeeDashboard from "./components/DashBoard/EmployeeDashboard";
import { AuthContext } from "./components/Contexts/AuthProvider";

const App = () => {
  // localStorage.clear();
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);

 
  const [userData,] = useContext(AuthContext);

  useEffect(() => {
    const saved = localStorage.getItem("loggedInUser");
    if (!saved) return;

    const data = JSON.parse(saved);
    setUser(data.role);
    setLoggedInUserData(data.data || null);
  }, []);

  const handleLogin = (email, password) => {

    // ---- ADMIN LOGIN ----
    if (email === "admin@me.com" && password === "123") {
      setUser("admin");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "admin" })
      );
      return;
    }

    // ---- EMPLOYEE LOGIN ----
    if (userData) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      );

      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
        return;
      }
    }

   
    alert("Invalid Credentials");
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}

      {user === "admin" && <AdminDashboard changeUser={setUser} />}

      {user === "employee" && (
        <EmployeeDashboard data={loggedInUserData} changeUser={setUser} />
      )}
    </>
  );
};

export default App;
