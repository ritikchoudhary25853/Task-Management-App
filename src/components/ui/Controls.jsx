import { motion as Motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export const Button = ({ children, variant = "primary", className = "", type = "button", ...props }) => {
  const variants = {
    primary: "bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    warning: "bg-amber-500 text-slate-950 hover:bg-amber-400",
    ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
  };

  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Field = ({ label, error, className = "", children }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
    {children}
    {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
  </label>
);

export const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-slate-400 dark:focus:ring-slate-800";

export const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}>{children}</span>
);

export const StatCard = ({ icon: Icon, label, value, note, tone = "slate" }) => {
  const tones = {
    slate: "bg-slate-950 text-white dark:bg-slate-800",
    emerald: "bg-emerald-600 text-white",
    sky: "bg-sky-600 text-white",
    amber: "bg-amber-400 text-slate-950",
    rose: "bg-rose-600 text-white",
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{value}</p>
          {note && <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{note}</p>}
        </div>
        <div className={`rounded-lg p-3 ${tones[tone]}`}>{Icon && <Icon size={20} />}</div>
      </div>
    </Motion.div>
  );
};

export const EmptyState = ({ title, description, action }) => (
  <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
    <p className="text-lg font-semibold text-slate-900 dark:text-white">{title}</p>
    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export const Modal = ({ title, children, onClose, size = "max-w-2xl" }) => (
  <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
    <Motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`max-h-[90vh] w-full overflow-y-auto rounded-lg bg-white shadow-2xl dark:bg-slate-950 ${size}`}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h2>
        <Button variant="ghost" className="h-9 w-9 px-0" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </Button>
      </div>
      <div className="p-5">{children}</div>
    </Motion.div>
  </div>
);

export const ConfirmModal = ({ title, message, onCancel, onConfirm }) => (
  <Modal title={title} onClose={onCancel} size="max-w-md">
    <div className="flex gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-500/15">
        <AlertTriangle size={22} />
      </div>
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{message}</p>
    </div>
    <div className="mt-6 flex justify-end gap-3">
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      <Button variant="danger" onClick={onConfirm}>Confirm</Button>
    </div>
  </Modal>
);
