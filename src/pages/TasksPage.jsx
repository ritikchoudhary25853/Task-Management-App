import { useMemo, useState } from "react";
import { Check, Edit3, FileText, Paperclip, Plus, Search, ThumbsDown, ThumbsUp, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useWorkTrack } from "../context/WorkTrackContext";
import { priorities, taskStatuses } from "../data/seedData";
import { Badge, Button, ConfirmModal, EmptyState, Field, inputClass, Modal } from "../components/ui/Controls";
import { daysUntil, formatDate, formatTime, priorityTone, statusTone } from "../utils/formatters";

const blankTask = {
  title: "",
  description: "",
  assignedTo: "",
  assignedBy: "",
  priority: "Medium",
  dueDate: "",
  category: "General",
  attachments: [],
};

function TaskForm({ initial, onSave, onCancel }) {
  const { employees, currentUser } = useWorkTrack();
  const [form, setForm] = useState({
    ...blankTask,
    ...initial,
    assignedBy: initial?.assignedBy || currentUser.id,
    assignedTo: initial?.assignedTo || employees[0]?.id || "",
    attachments: initial?.attachments || [],
  });
  const [attachmentName, setAttachmentName] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.assignedTo || !form.dueDate) {
      toast.error("Please complete the task details.");
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <Field label="Task title"><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
      <Field label="Description"><textarea className={`${inputClass} min-h-28`} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Assign to">
          <select className={inputClass} value={form.assignedTo} onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
            {employees.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </Field>
        <Field label="Priority">
          <select className={inputClass} value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
            {priorities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Due date"><input type="date" className={inputClass} value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></Field>
        <Field label="Category"><input className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></Field>
      </div>
      <Field label="Attachments UI">
        <div className="flex gap-2">
          <input className={inputClass} placeholder="example-brief.pdf" value={attachmentName} onChange={(e) => setAttachmentName(e.target.value)} />
          <Button
            variant="secondary"
            onClick={() => {
              if (!attachmentName.trim()) return;
              setForm({ ...form, attachments: [...form.attachments, attachmentName.trim()] });
              setAttachmentName("");
            }}
          >
            <Paperclip size={16} />
            Add
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {form.attachments.map((item) => (
            <Badge key={item} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {item}
              <button type="button" className="ml-2" onClick={() => setForm({ ...form, attachments: form.attachments.filter((file) => file !== item) })}>
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      </Field>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save task</Button>
      </div>
    </form>
  );
}

function CompletionModal({ task, action, onClose }) {
  const { updateTaskStatus } = useWorkTrack();
  const [notes, setNotes] = useState(task.completionNotes || "");
  const [progress, setProgress] = useState(task.progress || 0);
  const isComplete = action === "Completed";

  return (
    <Modal title={isComplete ? "Complete task" : "Mark task failed"} onClose={onClose} size="max-w-lg">
      <div className="space-y-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">{task.title}</p>
        <Field label={isComplete ? "Completion notes" : "Failure notes"}>
          <textarea className={`${inputClass} min-h-28`} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>
        <Field label={`Progress ${progress}%`}>
          <input type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(e.target.value)} className="w-full accent-emerald-600" />
        </Field>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button
            variant={isComplete ? "success" : "danger"}
            onClick={() => {
              updateTaskStatus(task.id, action, notes, Number(progress));
              toast.success(`Task marked ${action.toLowerCase()}.`);
              onClose();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function TaskCard({ task, assignee, canAdmin, canEmployee, onEdit, onDelete }) {
  const { updateTaskStatus, updateProgress } = useWorkTrack();
  const [completionAction, setCompletionAction] = useState(null);
  const days = daysUntil(task.dueDate);

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge className={statusTone[task.status]}>{task.status}</Badge>
            <Badge className={priorityTone[task.priority]}>{task.priority}</Badge>
          </div>
          <h3 className="mt-3 text-lg font-bold">{task.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{task.description}</p>
        </div>
        {canAdmin && (
          <div className="flex gap-2">
            <Button variant="secondary" className="h-9 w-9 px-0" onClick={() => onEdit(task)} aria-label="Edit task"><Edit3 size={16} /></Button>
            <Button variant="danger" className="h-9 w-9 px-0" onClick={() => onDelete(task)} aria-label="Delete task"><Trash2 size={16} /></Button>
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
          <p className="text-xs text-slate-500">Assignee</p>
          <p className="mt-1 font-semibold">{assignee?.name || "Unassigned"}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
          <p className="text-xs text-slate-500">Deadline</p>
          <p className="mt-1 font-semibold">{formatDate(task.dueDate)} ({days < 0 ? "overdue" : `${days}d left`})</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${task.progress}%` }} />
        </div>
        {canEmployee && !["Completed", "Failed", "Rejected"].includes(task.status) && (
          <input
            type="range"
            min="0"
            max="100"
            value={task.progress}
            onChange={(e) => updateProgress(task.id, e.target.value)}
            className="mt-3 w-full accent-emerald-600"
          />
        )}
      </div>

      {task.attachments?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {task.attachments.map((file) => <Badge key={file} className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"><FileText size={12} /> {file}</Badge>)}
        </div>
      )}

      {canEmployee && (
        <div className="mt-5 flex flex-wrap gap-2">
          <Button variant="success" disabled={task.status !== "Pending"} onClick={() => { updateTaskStatus(task.id, "Accepted"); toast.success("Task accepted."); }}>
            <ThumbsUp size={16} />
            Accept
          </Button>
          <Button variant="secondary" disabled={task.status !== "Pending"} onClick={() => { updateTaskStatus(task.id, "Rejected"); toast.success("Task rejected."); }}>
            <ThumbsDown size={16} />
            Reject
          </Button>
          <Button variant="primary" disabled={!["Accepted", "In Progress"].includes(task.status)} onClick={() => updateTaskStatus(task.id, "In Progress")}>
            <Check size={16} />
            In Progress
          </Button>
          <Button variant="success" disabled={["Completed", "Failed", "Rejected"].includes(task.status)} onClick={() => setCompletionAction("Completed")}>
            Complete
          </Button>
          <Button variant="danger" disabled={["Completed", "Failed", "Rejected"].includes(task.status)} onClick={() => setCompletionAction("Failed")}>
            Failed
          </Button>
        </div>
      )}

      {task.completionNotes && <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">{task.completionNotes}</p>}

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-600 dark:text-slate-300">Task history</summary>
        <div className="mt-3 space-y-2">
          {(task.history || []).slice().reverse().map((item) => (
            <div key={item.id} className="rounded-lg bg-slate-50 p-2 text-xs text-slate-500 dark:bg-slate-950">
              {item.message} - {formatTime(item.at)}
            </div>
          ))}
        </div>
      </details>

      {completionAction && <CompletionModal task={task} action={completionAction} onClose={() => setCompletionAction(null)} />}
    </article>
  );
}

export default function TasksPage({ mode = "admin" }) {
  const { currentUser, users, tasks, createTask, updateTask, deleteTask } = useWorkTrack();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const isAdmin = mode === "admin";
  const scopedTasks = isAdmin ? tasks : tasks.filter((task) => task.assignedTo === currentUser.id);
  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return scopedTasks.filter((task) => {
      const assignee = users.find((user) => user.id === task.assignedTo);
      const text = [task.title, task.description, task.category, assignee?.name].join(" ").toLowerCase();
      return text.includes(query) && (status === "All" || task.status === status) && (priority === "All" || task.priority === priority);
    });
  }, [scopedTasks, users, search, status, priority]);

  const saveTask = (task) => {
    if (task.id) {
      updateTask(task);
      toast.success("Task updated.");
    } else {
      createTask(task);
      toast.success("Task assigned.");
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black">{isAdmin ? "Task management" : "My tasks"}</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{isAdmin ? "Create, assign, edit, delete, and analyze team work." : "Accept work, update progress, and close tasks with notes."}</p>
        </div>
        {isAdmin && (
          <Button onClick={() => setEditing(blankTask)}>
            <Plus size={18} />
            Create task
          </Button>
        )}
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[1fr_170px_170px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className={`${inputClass} pl-10`} placeholder="Search tasks, categories, assignees" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            {taskStatuses.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select className={inputClass} value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>All</option>
            {priorities.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </section>

      {filtered.length === 0 ? (
        <EmptyState title="No tasks found" description="Try changing filters or create a task for an employee." action={isAdmin ? <Button onClick={() => setEditing(blankTask)}>Create task</Button> : null} />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              assignee={users.find((user) => user.id === task.assignedTo)}
              canAdmin={isAdmin}
              canEmployee={!isAdmin}
              onEdit={setEditing}
              onDelete={setConfirm}
            />
          ))}
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? "Edit task" : "Create task"} onClose={() => setEditing(null)}>
          <TaskForm initial={editing} onCancel={() => setEditing(null)} onSave={saveTask} />
        </Modal>
      )}
      {confirm && (
        <ConfirmModal
          title="Delete task"
          message={`Delete "${confirm.title}" from WorkTrack?`}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            deleteTask(confirm.id);
            toast.success("Task deleted.");
            setConfirm(null);
          }}
        />
      )}
    </div>
  );
}
