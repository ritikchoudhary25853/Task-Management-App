export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));

export const formatTime = (date) =>
  new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(
    new Date(date),
  );

export const daysUntil = (date) => {
  const today = new Date();
  const due = new Date(`${date}T23:59:59`);
  return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
};

export const statusTone = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Accepted: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  "In Progress": "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  Completed: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Failed: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  Rejected: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
};

export const priorityTone = {
  Low: "border-emerald-300 text-emerald-700 dark:border-emerald-500/40 dark:text-emerald-300",
  Medium: "border-amber-300 text-amber-700 dark:border-amber-500/40 dark:text-amber-300",
  High: "border-rose-300 text-rose-700 dark:border-rose-500/40 dark:text-rose-300",
};
