import { useMemo, useState } from "react";
import { Edit3, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { departments } from "../data/seedData";
import { useWorkTrack } from "../context/WorkTrackContext";
import { Badge, Button, ConfirmModal, EmptyState, Field, inputClass, Modal } from "../components/ui/Controls";

const blankUser = {
  name: "",
  email: "",
  password: "employee123",
  role: "Employee",
  department: "Engineering",
  phone: "",
  status: "Active",
  title: "Team Member",
};

function UserForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(initial || blankUser);

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || !form.phone.trim() || form.password.length < 6) {
      toast.error("Please complete all required fields.");
      return;
    }
    onSave(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name"><input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Email"><input className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
        <Field label="Phone"><input className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
        <Field label="Password"><input className={inputClass} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
        <Field label="Role">
          <select className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option>Employee</option>
            <option>Admin</option>
          </select>
        </Field>
        <Field label="Department">
          <select className={inputClass} value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
            {departments.map((item) => <option key={item}>{item}</option>)}
          </select>
        </Field>
        <Field label="Title"><input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
        <Field label="Status">
          <select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </Field>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save user</Button>
      </div>
    </form>
  );
}

export default function EmployeesPage() {
  const { users, tasks, addUser, updateUser, deleteUser } = useWorkTrack();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const pageSize = 6;

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return users.filter((user) => {
      const matchesSearch = [user.name, user.email, user.department, user.phone].join(" ").toLowerCase().includes(query);
      const matchesRole = role === "All" || user.role === role;
      const matchesStatus = status === "All" || user.status === status;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(Math.ceil(filtered.length / pageSize), 1);

  const saveUser = (user) => {
    if (user.id) {
      updateUser(user);
      toast.success("User updated.");
    } else {
      addUser(user);
      toast.success("User added.");
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-black">People management</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add admins, manage employees, and keep profile details current.</p>
        </div>
        <Button onClick={() => setEditing(blankUser)}>
          <Plus size={22} />
          Add user
        </Button>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[1fr_160px_160px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
            <input className={`${inputClass} pl-11`} placeholder="Search by name, email, department, phone" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className={inputClass} value={role} onChange={(e) => { setRole(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>Admin</option>
            <option>Employee</option>
          </select>
          <select className={inputClass} value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="mt-4 overflow-x-auto">
          {paged.length === 0 ? (
            <EmptyState title="No users found" description="Try a different search or add a new team member." />
          ) : (
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 text-xs uppercase text-slate-500 dark:border-slate-800">
                <tr>
                  <th className="px-3 py-3">User</th>
                  <th className="px-3 py-3">Role</th>
                  <th className="px-3 py-3">Department</th>
                  <th className="px-3 py-3">Tasks</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((user) => {
                  const assigned = tasks.filter((task) => task.assignedTo === user.id).length;
                  return (
                    <tr key={user.id} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} alt="" className="h-10 w-10 rounded-lg" />
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">{user.role}</td>
                      <td className="px-3 py-4">{user.department}</td>
                      <td className="px-3 py-4">{assigned}</td>
                      <td className="px-3 py-4">
                        <Badge className={user.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"}>{user.status}</Badge>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex justify-end gap-2">
                          <Button variant="secondary" className="h-10 w-10 px-0" onClick={() => setEditing(user)} aria-label="Edit user"><Edit3 size={22} /></Button>
                          <Button variant="danger" className="h-10 w-10 px-0" onClick={() => setConfirm(user)} aria-label="Delete user"><Trash2 size={22} /></Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
          <span>Page {page} of {totalPages}</span>
          <div className="flex gap-2">
            <Button variant="secondary" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</Button>
            <Button variant="secondary" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>Next</Button>
          </div>
        </div>
      </section>

      {editing && (
        <Modal title={editing.id ? "Edit user" : "Add user"} onClose={() => setEditing(null)}>
          <UserForm initial={editing} onCancel={() => setEditing(null)} onSave={saveUser} />
        </Modal>
      )}
      {confirm && (
        <ConfirmModal
          title="Delete user"
          message={`Delete ${confirm.name}? Assigned tasks for this user will also be removed from local storage.`}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            deleteUser(confirm.id);
            toast.success("User deleted.");
            setConfirm(null);
          }}
        />
      )}
    </div>
  );
}
