import React, { useState } from "react";
import loginBg from "../assets/login.jpg";  // remove public from path
import logoImg from "../assets/logo.jpg";    // remove public from path

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div
      id="login-container"
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBg})` }} // use imported variable
    >
      <div className="w-11/12 max-w-md bg-white p-8 sm:p-10 rounded-2xl border border-gray-300 shadow-lg">
        {/* Logo */}
        <div
          style={{ backgroundImage: `url(${logoImg})` }} // use imported variable
          className="h-16 w-16 mx-auto mb-6 bg-cover bg-center rounded-full"
        ></div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-6 text-lg"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-500 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
