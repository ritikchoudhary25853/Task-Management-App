import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bell,
  CalendarDays,
  CheckSquare,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  Users,
  X,
} from "lucide-react";
import { createElement } from "react";
import { useMemo, useState } from "react";
import { useWorkTrack } from "../../context/WorkTrackContext";
import { Button } from "../ui/Controls";
import { formatTime } from "../../utils/formatters";

const adminNav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/admin/employees", label: "People", icon: Users },
  { to: "/admin/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/admin/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

const employeeNav = [
  { to: "/employee/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/employee/tasks", label: "My Tasks", icon: CheckSquare },
  { to: "/employee/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout() {
  const { currentUser, logout, notifications, readNotification, settings, setTheme } = useWorkTrack();
  const [open, setOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const location = useLocation();

  const nav = currentUser?.role === "Admin" ? adminNav : employeeNav;
  const pageTitle = nav.find((item) => location.pathname.startsWith(item.to))?.label || "WorkTrack";
  const visibleNotifications = useMemo(
    () =>
      notifications
        .filter((note) => note.userId === "all" || note.userId === currentUser?.id || currentUser?.role === "Admin")
        .slice(0, 8),
    [notifications, currentUser],
  );
  const unread = visibleNotifications.filter((note) => !note.read).length;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-white">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white transition dark:border-slate-800 dark:bg-slate-950 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <div>
            <p className="text-xl font-black tracking-tight">WorkTrack</p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Company task command</p>
          </div>
          <Button variant="ghost" className="h-10 w-10 px-0 lg:hidden" onClick={() => setOpen(false)}>
            <X size={22} />
          </Button>
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
            <img src={currentUser?.avatar} alt="" className="h-11 w-11 rounded-lg" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{currentUser?.name}</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{currentUser?.role}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1 px-3 py-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                }`
              }
            >
              {createElement(item.icon, { size: 22 })}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-4 left-3 right-3">
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut size={22} />
            Logout
          </Button>
        </div>
      </aside>

      {open && <button className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu" />}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="h-11 w-11 px-0 lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={24} />
            </Button>
            <div>
              <h1 className="text-lg font-bold sm:text-xl">{pageTitle}</h1>
              <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">Signed in as {currentUser?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              className="h-11 w-11 px-0"
              onClick={() => setTheme(settings.theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {settings.theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
            </Button>
            <div className="relative">
              <Button variant="secondary" className="h-11 w-11 px-0" onClick={() => setNotesOpen((value) => !value)} aria-label="Notifications">
                <Bell size={24} />
                {unread > 0 && <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-rose-600 px-1 text-xs text-white">{unread}</span>}
              </Button>
              {notesOpen && (
                <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
                  <div className="border-b border-slate-200 px-4 py-3 text-sm font-bold dark:border-slate-800">Notifications</div>
                  <div className="max-h-96 overflow-y-auto">
                    {visibleNotifications.map((note) => (
                      <button
                        key={note.id}
                        className="block w-full border-b border-slate-100 px-4 py-3 text-left hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                        onClick={() => readNotification(note.id)}
                      >
                        <p className={`text-sm ${note.read ? "text-slate-500" : "font-semibold text-slate-900 dark:text-white"}`}>{note.message}</p>
                        <p className="mt-1 text-xs text-slate-400">{formatTime(note.createdAt)}</p>
                      </button>
                    ))}
                    {visibleNotifications.length === 0 && <p className="p-4 text-sm text-slate-500">No notifications yet.</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
