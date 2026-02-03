import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import { AuthContext } from "./components/Contexts/AuthProvider";
import MainLayout from "./components/Layout/MainLayout";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData] = useContext(AuthContext);

  useEffect(() => {
    const saved = localStorage.getItem("loggedInUser");
    if (!saved) return;

    const data = JSON.parse(saved);
    setUser(data.role);
    setLoggedInUserData(data.data || null);
  }, []);

  const handleLogin = (email, password) => {
    if (email === "admin@me.com" && password === "123") {
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
      return;
    }

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

      {user && (
        <MainLayout
          role={user}
          userData={loggedInUserData}
          changeUser={setUser}
        />
      )}
    </>
  );
};

export default App;
