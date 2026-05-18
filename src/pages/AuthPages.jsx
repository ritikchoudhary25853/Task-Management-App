import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkTrack } from "../context/WorkTrackContext";
import { Button, Field, inputClass } from "../components/ui/Controls";
import { departments } from "../data/seedData";

const emailOk = (email) => /\S+@\S+\.\S+/.test(email);

function AuthShell({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-white lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden min-h-screen flex-col justify-between bg-slate-950 p-10 text-white lg:flex">
        <div>
          <p className="text-2xl font-black tracking-tight">WorkTrack</p>
          <p className="mt-2 max-w-sm text-sm text-slate-400">A focused workspace for assigning, tracking, and completing company work.</p>
        </div>
        <div className="max-w-xl">
          <p className="text-5xl font-black leading-tight">Clarity for every team task, deadline, and handoff.</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {["Admin controls", "Employee progress", "Local persistence"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-semibold">{item}</div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-500">Demo admin: admin@worktrack.com / admin123</p>
      </section>
      <section className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-7">
            <p className="text-3xl font-black tracking-tight">{title}</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

function PasswordField({ label, value, onChange, error }) {
  const [show, setShow] = useState(false);
  return (
    <Field label={label} error={error}>
      <div className="relative">
        <input className={`${inputClass} pr-11`} type={show ? "text" : "password"} value={value} onChange={onChange} placeholder="Enter password" />
        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" onClick={() => setShow((value) => !value)} aria-label="Toggle password">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </Field>
  );
}

export function LoginPage() {
  const { currentUser, login } = useWorkTrack();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "admin@worktrack.com", password: "admin123", role: "Admin" });
  const [errors, setErrors] = useState({});

  if (currentUser) return <Navigate to={currentUser.role === "Admin" ? "/admin/dashboard" : "/employee/dashboard"} replace />;

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (!emailOk(form.email)) next.email = "Use a valid email address.";
    if (form.password.length < 3) next.password = "Password is required.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (login(form.email, form.password, form.role)) {
      navigate(form.role === "Admin" ? "/admin/dashboard" : "/employee/dashboard", { replace: true });
    }
  };

  return (
    <AuthShell title="Welcome back" subtitle="Sign in with your role to continue.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Role">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1 dark:bg-slate-950">
            {["Admin", "Employee"].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setForm({ ...form, role, email: role === "Admin" ? "admin@worktrack.com" : "arjun@worktrack.com", password: role === "Admin" ? "admin123" : "employee123" })}
                className={`rounded-md px-3 py-2 text-sm font-semibold ${form.role === role ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white" : "text-slate-500"}`}
              >
                {role}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Email" error={errors.email}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className={`${inputClass} pl-10`} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </div>
        </Field>
        <PasswordField label="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} error={errors.password} />
        <div className="flex items-center justify-between text-sm">
          <Link className="font-semibold text-slate-700 hover:underline dark:text-slate-200" to="/forgot-password">Forgot password?</Link>
          <Link className="font-semibold text-slate-700 hover:underline dark:text-slate-200" to="/signup">Create account</Link>
        </div>
        <Button type="submit" className="w-full">
          <Lock size={18} />
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}

export function SignupPage() {
  const { currentUser, register } = useWorkTrack();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Employee", department: "Engineering", phone: "", title: "Team Member" });
  const [errors, setErrors] = useState({});

  if (currentUser) return <Navigate to="/" replace />;

  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Name is required.";
    if (!emailOk(form.email)) next.email = "Use a valid email address.";
    if (form.password.length < 6) next.password = "Use at least 6 characters.";
    if (form.phone.trim().length < 8) next.phone = "Phone is required.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (register(form)) navigate("/login");
  };

  return (
    <AuthShell title="Create account" subtitle="Register an employee or admin profile for the frontend demo.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name" error={errors.name}>
          <input className={inputClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input className={inputClass} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </Field>
        <PasswordField label="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} error={errors.password} />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role">
            <select className={inputClass} value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option>Employee</option>
              <option>Admin</option>
            </select>
          </Field>
          <Field label="Department">
            <select className={inputClass} value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })}>
              {departments.map((item) => <option key={item}>{item}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Phone" error={errors.phone}>
          <input className={inputClass} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        </Field>
        <Button type="submit" className="w-full">
          <UserPlus size={18} />
          Register
        </Button>
        <p className="text-center text-sm text-slate-500">Already registered? <Link className="font-semibold text-slate-800 dark:text-white" to="/login">Sign in</Link></p>
      </form>
    </AuthShell>
  );
}

export function ForgotPasswordPage() {
  const { users, resetPassword } = useWorkTrack();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const knownEmails = useMemo(() => users.map((user) => user.email), [users]);

  const submit = (event) => {
    event.preventDefault();
    if (!knownEmails.some((item) => item.toLowerCase() === email.toLowerCase())) {
      toast.error("No account found for that email.");
      return;
    }
    if (password.length < 6) {
      toast.error("Use at least 6 characters.");
      return;
    }
    resetPassword(email, password);
    toast.success("Password updated. Sign in with the new password.");
  };

  return (
    <AuthShell title="Reset password" subtitle="This demo updates your local WorkTrack password immediately.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Account email">
          <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} />
        </Field>
        <PasswordField label="New password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button type="submit" className="w-full">Update password</Button>
        <Link to="/login" className="block text-center text-sm font-semibold text-slate-700 dark:text-slate-200">Back to login</Link>
      </form>
    </AuthShell>
  );
}
