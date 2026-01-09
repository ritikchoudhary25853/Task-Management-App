import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../../../Utils/LocalStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  
  const [userData, setUserData] = useState(() => {
    const { Employees } = getLocalStorage();

    if (!Employees || Employees.length === 0) {
      setLocalStorage();
      const { Employees: initial } = getLocalStorage();
      return initial || [];
    }

    return Employees;
  });


  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(userData));
  }, [userData]);

  // // 👉 DELETE TASK (employee → taskIndex)
  // const deleteTask = (employeeId, taskIndex) => {
  //   setUserData(prev =>
  //     prev.map(emp => {
  //       if (emp.id === employeeId) {
  //         return {
  //           ...emp,
  //           tasks: emp.tasks.filter((_, idx) => idx !== taskIndex),
  //         };
  //       }
  //       return emp;
  //     })
  //   );
  // };

  return (
    <AuthContext.Provider value={[userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
