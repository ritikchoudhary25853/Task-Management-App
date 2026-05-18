/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import toast from "react-hot-toast";
import { persistState, loadState, uid } from "../utils/storage";

const WorkTrackContext = createContext(null);

const now = () => new Date().toISOString();

const avatarFor = (name) =>
  `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name || "WorkTrack User")}`;

const activity = (message) => ({ id: uid("activity"), message, at: now() });
const notification = (message, userId = "all", type = "system") => ({
  id: uid("note"),
  message,
  userId,
  type,
  read: false,
  createdAt: now(),
});

const getCurrentUser = (users, currentUser) => {
  if (!currentUser) return null;
  return users.find((user) => user.id === currentUser.id) || null;
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, currentUser: { id: action.user.id, role: action.user.role } };
    }
    case "LOGOUT":
      return { ...state, currentUser: null };
    case "REGISTER_USER": {
      const user = { ...action.user, id: uid("user"), avatar: avatarFor(action.user.name), createdAt: now() };
      return {
        ...state,
        users: [user, ...state.users],
        activity: [activity(`${user.name} registered as ${user.role}.`), ...state.activity],
        notifications: [notification(`${user.name} joined WorkTrack.`, "all", "team"), ...state.notifications],
      };
    }
    case "RESET_PASSWORD": {
      return {
        ...state,
        users: state.users.map((user) =>
          user.email.toLowerCase() === action.email.toLowerCase() ? { ...user, password: action.password } : user,
        ),
        activity: [activity(`Password reset requested for ${action.email}.`), ...state.activity],
      };
    }
    case "ADD_USER": {
      const user = { ...action.user, id: uid("user"), avatar: avatarFor(action.user.name), createdAt: now() };
      return {
        ...state,
        users: [user, ...state.users],
        activity: [activity(`${user.role} ${user.name} was added.`), ...state.activity],
        notifications: [notification(`New ${user.role.toLowerCase()} added: ${user.name}.`, "all", "team"), ...state.notifications],
      };
    }
    case "UPDATE_USER": {
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.user.id ? { ...user, ...action.user } : user)),
        activity: [activity(`${action.user.name} profile was updated.`), ...state.activity],
      };
    }
    case "DELETE_USER": {
      const user = state.users.find((item) => item.id === action.id);
      return {
        ...state,
        users: state.users.filter((item) => item.id !== action.id),
        tasks: state.tasks.filter((task) => task.assignedTo !== action.id),
        currentUser: state.currentUser?.id === action.id ? null : state.currentUser,
        activity: [activity(`${user?.name || "A user"} was removed.`), ...state.activity],
      };
    }
    case "CREATE_TASK": {
      const task = {
        ...action.task,
        id: uid("task"),
        status: "Pending",
        progress: 0,
        completionNotes: "",
        createdAt: now(),
        updatedAt: now(),
        history: [{ id: uid("history"), message: "Task assigned", at: now() }],
      };
      return {
        ...state,
        tasks: [task, ...state.tasks],
        notifications: [notification(`New task assigned: ${task.title}.`, task.assignedTo, "task"), ...state.notifications],
        activity: [activity(`Task ${task.title} was assigned.`), ...state.activity],
      };
    }
    case "UPDATE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.task.id
            ? {
                ...task,
                ...action.task,
                updatedAt: now(),
                history: [...(task.history || []), { id: uid("history"), message: "Task details updated", at: now() }],
              }
            : task,
        ),
        activity: [activity(`Task ${action.task.title} was updated.`), ...state.activity],
      };
    }
    case "DELETE_TASK": {
      const task = state.tasks.find((item) => item.id === action.id);
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.id),
        activity: [activity(`Task ${task?.title || "Untitled"} was deleted.`), ...state.activity],
      };
    }
    case "UPDATE_TASK_STATUS": {
      const task = state.tasks.find((item) => item.id === action.id);
      const progress =
        action.status === "Completed" ? 100 : action.status === "Failed" || action.status === "Rejected" ? task?.progress || 0 : action.progress ?? task?.progress ?? 0;
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.id
            ? {
                ...item,
                status: action.status,
                progress,
                completionNotes: action.notes ?? item.completionNotes,
                updatedAt: now(),
                history: [
                  ...(item.history || []),
                  { id: uid("history"), message: `Status changed to ${action.status}`, at: now() },
                ],
              }
            : item,
        ),
        notifications: [
          notification(`Task ${task?.title || "Untitled"} marked ${action.status}.`, "all", "task"),
          ...state.notifications,
        ],
        activity: [activity(`Task ${task?.title || "Untitled"} moved to ${action.status}.`), ...state.activity],
      };
    }
    case "UPDATE_PROGRESS": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id
            ? {
                ...task,
                progress: action.progress,
                status: task.status === "Accepted" && action.progress > 0 ? "In Progress" : task.status,
                updatedAt: now(),
                history: [...(task.history || []), { id: uid("history"), message: `Progress set to ${action.progress}%`, at: now() }],
              }
            : task,
        ),
      };
    }
    case "READ_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.map((item) => (item.id === action.id ? { ...item, read: true } : item)),
      };
    case "SET_THEME":
      return { ...state, settings: { ...state.settings, theme: action.theme } };
    case "SET_COMPACT":
      return { ...state, settings: { ...state.settings, compact: action.compact } };
    default:
      return state;
  }
}

export function WorkTrackProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    persistState(state);
  }, [state]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.settings.theme === "dark");
  }, [state.settings.theme]);

  const api = useMemo(() => {
    const users = state.users;
    const currentUser = getCurrentUser(users, state.currentUser);
    const employees = users.filter((user) => user.role === "Employee");
    const admins = users.filter((user) => user.role === "Admin");

    const login = (email, password, role) => {
      const user = users.find(
        (item) =>
          item.email.toLowerCase() === email.toLowerCase() &&
          item.password === password &&
          item.role === role &&
          item.status === "Active",
      );
      if (!user) {
        toast.error("Invalid credentials, role, or inactive account.");
        return false;
      }
      dispatch({ type: "LOGIN", user });
      toast.success(`Welcome back, ${user.name}.`);
      return true;
    };

    const register = (payload) => {
      if (users.some((user) => user.email.toLowerCase() === payload.email.toLowerCase())) {
        toast.error("An account with this email already exists.");
        return false;
      }
      dispatch({ type: "REGISTER_USER", user: { ...payload, status: "Active" } });
      toast.success("Account created. You can sign in now.");
      return true;
    };

    return {
      ...state,
      currentUser,
      employees,
      admins,
      login,
      register,
      logout: () => {
        dispatch({ type: "LOGOUT" });
        toast.success("Signed out.");
      },
      resetPassword: (email, password) => dispatch({ type: "RESET_PASSWORD", email, password }),
      addUser: (user) => dispatch({ type: "ADD_USER", user }),
      updateUser: (user) => dispatch({ type: "UPDATE_USER", user }),
      deleteUser: (id) => dispatch({ type: "DELETE_USER", id }),
      createTask: (task) => dispatch({ type: "CREATE_TASK", task }),
      updateTask: (task) => dispatch({ type: "UPDATE_TASK", task }),
      deleteTask: (id) => dispatch({ type: "DELETE_TASK", id }),
      updateTaskStatus: (id, status, notes, progress) => dispatch({ type: "UPDATE_TASK_STATUS", id, status, notes, progress }),
      updateProgress: (id, progress) => dispatch({ type: "UPDATE_PROGRESS", id, progress: Number(progress) }),
      readNotification: (id) => dispatch({ type: "READ_NOTIFICATION", id }),
      setTheme: (theme) => dispatch({ type: "SET_THEME", theme }),
      setCompact: (compact) => dispatch({ type: "SET_COMPACT", compact }),
    };
  }, [state]);

  return <WorkTrackContext.Provider value={api}>{children}</WorkTrackContext.Provider>;
}

export const useWorkTrack = () => {
  const context = useContext(WorkTrackContext);
  if (!context) throw new Error("useWorkTrack must be used inside WorkTrackProvider");
  return context;
};
