import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Contexts/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    const updated = userData.map((emp) => {
      if (emp.firstName === assignTo) {
        return {
          ...emp,
          tasks: [...emp.tasks, newTask],
          taskCounts: {
            ...emp.taskCounts,
            newTask: emp.taskCounts.newTask + 1,
          },
        };
      }
      return emp;
    });

    setUserData(updated);
    localStorage.setItem("employees", JSON.stringify(updated));

    setTaskTitle("");
    setCategory("");
    setAssignTo("");
    setTaskDate("");
    setTaskDescription("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-black mt-6 rounded-2xl p-6 sm:p-8 shadow-xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Create New Task 🚀
      </h2>

      <form
        onSubmit={submitHandler}
        className="flex flex-col lg:flex-row gap-8"
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-1/2 space-y-4"
        >
          <Input
            label="Task Title"
            value={taskTitle}
            setValue={setTaskTitle}
            placeholder="Make a UI design"
          />

          <Input
            label="Date"
            type="date"
            value={taskDate}
            setValue={setTaskDate}
          />

          <Input
            label="Assign To"
            value={assignTo}
            setValue={setAssignTo}
            placeholder="Employee name"
          />

          <Input
            label="Category"
            value={category}
            setValue={setCategory}
            placeholder="Design, Dev, etc"
          />
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-2/5 flex flex-col"
        >
          <label className="text-sm text-gray-300 mb-1">
            Description
          </label>

          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="bg-transparent border border-gray-500 rounded-lg p-3 text-sm text-white h-52 focus:border-emerald-500 outline-none"
            placeholder="Describe the task..."
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-lg py-3 text-sm font-semibold text-black"
          >
            Create Task
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

/* 🔹 Reusable Input Component */
const Input = ({ label, value, setValue, placeholder, type = "text" }) => (
  <div>
    <label className="text-sm text-gray-300 mb-1 block">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border border-gray-500 rounded-lg py-2 px-3 text-sm text-white focus:border-emerald-500 outline-none"
    />
  </div>
);

export default CreateTask;
