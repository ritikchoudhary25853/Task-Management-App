import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  ClipboardList,
  CheckCircle,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "24",
    icon: <Users size={28} />,
    color: "bg-blue-500",
  },
  {
    title: "Total Tasks",
    value: "120",
    icon: <ClipboardList size={28} />,
    color: "bg-yellow-500",
  },
  {
    title: "Completed Tasks",
    value: "86",
    icon: <CheckCircle size={28} />,
    color: "bg-green-500",
  },
  {
    title: "Failed Tasks",
    value: "12",
    icon: <XCircle size={28} />,
    color: "bg-red-500",
  },
];

const AdminDashboard = () => {
  return (
    <div
      id="admin-dashboard"
      className="p-8 bg-gradient-to-br from-black via-gray-900 to-black text-white"
    >
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-extrabold">
          Welcome Admin 👋
        </h1>
        <p className="text-gray-400 mt-2 max-w-xl">
          Manage employees, track tasks, and monitor productivity from one
          powerful dashboard.
        </p>
      </motion.div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl p-6 shadow-lg ${stat.color}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm uppercase opacity-80">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold mt-1">
                  {stat.value}
                </p>
              </div>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ADMIN FEATURES / PORTFOLIO SECTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold mb-6">
          Admin Capabilities 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Create & Assign Tasks",
            "Track Employee Performance",
            "Monitor Task Status",
            "Role-based Authentication",
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ x: 10 }}
              className="p-5 rounded-lg bg-gray-800 border border-gray-700"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FOOTER / PORTFOLIO TAG */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center text-gray-500 text-sm"
      >
        Built with ❤️ using React, Tailwind & Framer Motion
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
