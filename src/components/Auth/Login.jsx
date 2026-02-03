import React, { useState } from "react";
import { motion } from "framer-motion";

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
      style={{ backgroundImage: "url('/assets/login.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-11/12 max-w-md bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          style={{ backgroundImage: "url('/assets/logo.jpg')" }}
          className="h-16 w-16 mx-auto mb-6 bg-cover bg-center rounded-full"
        />

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full py-3 mt-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-colors"
          >
            Login
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          WorkTrack • Task Management System
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
