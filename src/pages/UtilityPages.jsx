import { CalendarDays, Mail, Phone, Save, Shield, User } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useWorkTrack } from "../context/WorkTrackContext";
import { Badge, Button, EmptyState, Field, inputClass } from "../components/ui/Controls";
import { daysUntil, formatDate, priorityTone, statusTone } from "../utils/formatters";

export function CalendarPage({ mode = "admin" }) {
  const { currentUser, users, tasks } = useWorkTrack();
  const scopedTasks = mode === "admin" ? tasks : tasks.filter((task) => task.assignedTo === currentUser.id);
  const grouped = useMemo(() => {
    return scopedTasks
      .slice()
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .reduce((acc, task) => {
        acc[task.dueDate] = [...(acc[task.dueDate] || []), task];
        return acc;
      }, {});
  }, [scopedTasks]);

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
            <CalendarDays size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-black">Calendar view</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tasks grouped by due date with countdowns.</p>
          </div>
        </div>
      </section>

      {Object.keys(grouped).length === 0 ? (
        <EmptyState title="No deadlines" description="Tasks with due dates will appear in this calendar view." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {Object.entries(grouped).map(([date, dayTasks]) => (
            <section key={date} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{formatDate(date)}</h3>
                  <p className="text-xs text-slate-500">{daysUntil(date) < 0 ? "Overdue" : `${daysUntil(date)} days left`}</p>
                </div>
                <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">{dayTasks.length} tasks</Badge>
              </div>
              <div className="space-y-3">
                {dayTasks.map((task) => {
                  const assignee = users.find((user) => user.id === task.assignedTo);
                  return (
                    <div key={task.id} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold">{task.title}</p>
                        <div className="flex gap-2">
                          <Badge className={priorityTone[task.priority]}>{task.priority}</Badge>
                          <Badge className={statusTone[task.status]}>{task.status}</Badge>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{assignee?.name} - {task.category}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProfilePage() {
  const { currentUser, updateUser, tasks } = useWorkTrack();
  const [form, setForm] = useState(currentUser);
  const myTasks = tasks.filter((task) => task.assignedTo === currentUser.id);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-lg bg-white p-6 shadow-soft dark:bg-slate-900">
        <img src={currentUser.avatar} alt="" className="h-24 w-24 rounded-2xl" />
        <h2 className="mt-4 text-2xl font-black">{currentUser.name}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{currentUser.title}</p>
        <div className="mt-5 space-y-3 text-sm">
          <p className="flex items-center gap-2"><Mail size={20} /> {currentUser.email}</p>
          <p className="flex items-center gap-2"><Phone size={20} /> {currentUser.phone}</p>
          <p className="flex items-center gap-2"><Shield size={20} /> {currentUser.role}</p>
          <p className="flex items-center gap-2"><User size={20} /> {currentUser.department}</p>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-950"><p className="text-xl font-black">{myTasks.length}</p><p className="text-xs text-slate-500">Tasks</p></div>
          <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-950"><p className="text-xl font-black">{myTasks.filter((task) => task.status === "Completed").length}</p><p className="text-xs text-slate-500">Done</p></div>
          <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-950"><p className="text-xl font-black">{myTasks.filter((task) => task.status === "Pending").length}</p><p className="text-xs text-slate-500">Pending</p></div>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-lg font-bold">Edit profile</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Title"><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Phone"><input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Department"><input className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></Field>
        </div>
        <Button
          className="mt-5"
          onClick={() => {
            updateUser(form);
            toast.success("Profile saved.");
          }}
        >
          <Save size={22} />
          Save profile
        </Button>
      </section>
    </div>
  );
}

export function SettingsPage() {
  const { settings, setTheme, setCompact } = useWorkTrack();
  return (
    <div className="max-w-3xl space-y-6">
      <section className="rounded-lg bg-white p-6 shadow-soft dark:bg-slate-900">
        <h2 className="text-2xl font-black">Settings</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Control local UI preferences for this browser.</p>
      </section>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-bold">Theme</p>
              <p className="text-sm text-slate-500">Switch between light and dark mode.</p>
            </div>
            <select className={`${inputClass} w-40`} value={settings.theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-5 dark:border-slate-800">
            <div>
              <p className="font-bold">Compact layout</p>
              <p className="text-sm text-slate-500">Reduce vertical spacing on data-heavy pages.</p>
            </div>
            <button
              type="button"
              onClick={() => setCompact(!settings.compact)}
              className={`h-7 w-12 rounded-full p-1 transition ${settings.compact ? "bg-emerald-600" : "bg-slate-300 dark:bg-slate-700"}`}
              aria-label="Toggle compact layout"
            >
              <span className={`block h-5 w-5 rounded-full bg-white transition ${settings.compact ? "translate-x-5" : ""}`} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
