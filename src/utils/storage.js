import { seedActivity, seedNotifications, seedTasks, seedUsers } from "../data/seedData";

const KEYS = {
  users: "worktrack.users",
  tasks: "worktrack.tasks",
  auth: "worktrack.auth",
  notifications: "worktrack.notifications",
  activity: "worktrack.activity",
  settings: "worktrack.settings",
};

export const uid = (prefix = "id") =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const loadState = () => {
  const users = read(KEYS.users, null);
  const tasks = read(KEYS.tasks, null);

  if (!users || !tasks) {
    write(KEYS.users, seedUsers);
    write(KEYS.tasks, seedTasks);
    write(KEYS.notifications, seedNotifications);
    write(KEYS.activity, seedActivity);
    write(KEYS.settings, { theme: "light", compact: false });
  }

  return {
    users: read(KEYS.users, seedUsers),
    tasks: read(KEYS.tasks, seedTasks),
    currentUser: read(KEYS.auth, null),
    notifications: read(KEYS.notifications, seedNotifications),
    activity: read(KEYS.activity, seedActivity),
    settings: read(KEYS.settings, { theme: "light", compact: false }),
  };
};

export const persistState = (state) => {
  write(KEYS.users, state.users);
  write(KEYS.tasks, state.tasks);
  write(KEYS.notifications, state.notifications);
  write(KEYS.activity, state.activity);
  write(KEYS.settings, state.settings);
  if (state.currentUser) {
    write(KEYS.auth, state.currentUser);
  } else {
    localStorage.removeItem(KEYS.auth);
  }
};
