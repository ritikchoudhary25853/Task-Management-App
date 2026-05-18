import { motion as Motion } from "framer-motion";
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Timer,
  TrendingUp,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useWorkTrack } from "../context/WorkTrackContext";
import { Badge, EmptyState, StatCard } from "../components/ui/Controls";
import { daysUntil, formatDate, formatTime, priorityTone, statusTone } from "../utils/formatters";

const chartColors = ["#0f172a", "#0284c7", "#059669", "#f59e0b", "#e11d48", "#64748b"];

const groupByStatus = (tasks) =>
  ["Pending", "Accepted", "In Progress", "Completed", "Failed", "Rejected"].map((status) => ({
    name: status,
    value: tasks.filter((task) => task.status === status).length,
  }));

const groupByPriority = (tasks) =>
  ["Low", "Medium", "High"].map((priority) => ({
    priority,
    tasks: tasks.filter((task) => task.priority === priority).length,
  }));

export function AdminDashboard() {
  const { users, employees, admins, tasks, activity } = useWorkTrack();
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const failed = tasks.filter((task) => task.status === "Failed").length;
  const pending = tasks.filter((task) => task.status === "Pending").length;
  const activeEmployees = employees.filter((user) => user.status === "Active").length;

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-soft">
        <p className="text-sm font-semibold text-sky-300">Admin command center</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">Track people, tasks, deadlines, and outcomes in one place.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">All data is simulated locally with persistent frontend storage, so admin actions and employee task updates survive refreshes.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard icon={Users} label="Employees" value={employees.length} note={`${activeEmployees} active`} tone="sky" />
        <StatCard icon={UserCheck} label="Admins" value={admins.length} note={`${users.length} total users`} tone="slate" />
        <StatCard icon={ClipboardList} label="Tasks" value={tasks.length} note="Across all teams" tone="amber" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed} note={`${Math.round((completed / Math.max(tasks.length, 1)) * 100)}% completion`} tone="emerald" />
        <StatCard icon={XCircle} label="Failed" value={failed} note="Needs review" tone="rose" />
        <StatCard icon={Timer} label="Pending" value={pending} note="Awaiting acceptance" tone="amber" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold">Priority workload</h3>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={groupByPriority(tasks)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="priority" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="tasks" radius={[8, 8, 0, 0]} fill="#0284c7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold">Status distribution</h3>
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={groupByStatus(tasks)} dataKey="value" nameKey="name" outerRadius={95} label>
                  {groupByStatus(tasks).map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold">Recent activity</h3>
          <div className="mt-4 space-y-3">
            {activity.slice(0, 7).map((item) => (
              <div key={item.id} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                <p className="text-sm font-medium">{item.message}</p>
                <p className="mt-1 text-xs text-slate-500">{formatTime(item.at)}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold">Deadline watch</h3>
          <div className="mt-4 space-y-3">
            {tasks
              .filter((task) => !["Completed", "Failed", "Rejected"].includes(task.status))
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .slice(0, 6)
              .map((task) => {
                const assignee = users.find((user) => user.id === task.assignedTo);
                const days = daysUntil(task.dueDate);
                return (
                  <div key={task.id} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                    <div>
                      <p className="text-sm font-semibold">{task.title}</p>
                      <p className="text-xs text-slate-500">{assignee?.name} due {formatDate(task.dueDate)}</p>
                    </div>
                    <Badge className={days < 0 ? statusTone.Failed : days <= 2 ? statusTone.Pending : statusTone.Accepted}>{days < 0 ? "Overdue" : `${days}d`}</Badge>
                  </div>
                );
              })}
          </div>
        </section>
      </div>
    </div>
  );
}

export function EmployeeDashboard() {
  const { currentUser, tasks } = useWorkTrack();
  const myTasks = tasks.filter((task) => task.assignedTo === currentUser.id);
  const completed = myTasks.filter((task) => task.status === "Completed").length;
  const pending = myTasks.filter((task) => task.status === "Pending").length;
  const active = myTasks.filter((task) => ["Accepted", "In Progress"].includes(task.status)).length;
  const failed = myTasks.filter((task) => task.status === "Failed").length;
  const performance = Math.round((completed / Math.max(myTasks.filter((task) => task.status !== "Rejected").length, 1)) * 100);

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-6 shadow-soft dark:bg-slate-900">
        <p className="text-sm font-semibold text-sky-600 dark:text-sky-300">Welcome, {currentUser.name}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Your work queue is ready.</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Accept tasks, report progress, add completion notes, and keep your task history current.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={ClipboardList} label="Assigned" value={myTasks.length} note="All tasks" tone="sky" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed} note="Closed work" tone="emerald" />
        <StatCard icon={Timer} label="Pending" value={pending} note="Needs decision" tone="amber" />
        <StatCard icon={TrendingUp} label="Active" value={active} note="Accepted or in progress" tone="slate" />
        <StatCard icon={AlertCircle} label="Performance" value={`${performance}%`} note={`${failed} failed`} tone={performance >= 70 ? "emerald" : "amber"} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold">Performance</h3>
          <div className="mt-6 grid place-items-center">
            <div className="relative grid h-48 w-48 place-items-center rounded-full bg-slate-100 dark:bg-slate-950">
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: `conic-gradient(#059669 ${performance * 3.6}deg, transparent 0deg)` }}
              />
              <div className="relative grid h-36 w-36 place-items-center rounded-full bg-white dark:bg-slate-900">
                <div className="text-center">
                  <p className="text-4xl font-black">{performance}%</p>
                  <p className="text-xs text-slate-500">completion</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-bold">Upcoming deadlines</h3>
          <div className="mt-4 space-y-3">
            {myTasks.length === 0 && <EmptyState title="No assigned tasks" description="Assigned work will appear here." />}
            {myTasks
              .filter((task) => !["Completed", "Failed", "Rejected"].includes(task.status))
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .map((task) => (
                <Motion.div key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold">{task.title}</p>
                    <div className="flex gap-2">
                      <Badge className={priorityTone[task.priority]}>{task.priority}</Badge>
                      <Badge className={statusTone[task.status]}>{task.status}</Badge>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarClock size={20} />
                    Due {formatDate(task.dueDate)} ({daysUntil(task.dueDate) < 0 ? "overdue" : `${daysUntil(task.dueDate)} days left`})
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${task.progress}%` }} />
                  </div>
                </Motion.div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
