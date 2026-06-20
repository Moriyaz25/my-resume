"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Sparkles,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  X,
  Check,
} from "lucide-react";

const TABS = [
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "messages", label: "Messages", icon: Mail },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("projects");

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-canvas px-4 sm:px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="clay-sm w-11 h-11 flex items-center justify-center bg-lavender/15">
              <LayoutDashboard className="text-lavender" size={20} />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-ink">Dashboard</h1>
              <p className="font-body text-xs text-ink/50">Manage your portfolio content</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="clay-button-outline text-sm inline-flex items-center gap-2"
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>

        <div className="clay-sm p-2 flex flex-wrap gap-1 mb-6 w-fit">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-clay-sm font-body text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-kiln text-clay-light shadow-clay-out-sm"
                    : "text-ink/65 hover:bg-clay-shadow/50"
                }`}
              >
                <Icon size={15} /> {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "projects" && <ProjectsPanel />}
        {activeTab === "experience" && <ExperiencePanel />}
        {activeTab === "skills" && <SkillsPanel />}
        {activeTab === "messages" && <MessagesPanel />}
      </div>
    </main>
  );
}

/* ---------------- PROJECTS PANEL ---------------- */

const emptyProject = {
  slug: "",
  title: "",
  summary: "",
  description: "",
  techStack: "",
  metrics: "",
  githubUrl: "",
  liveUrl: "",
  featured: false,
  order: 0,
};

function ProjectsPanel() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, "new" = creating, object = editing
  const [form, setForm] = useState(emptyProject);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data.projects || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm(emptyProject);
    setEditing("new");
    setError("");
  }

  function openEdit(project) {
    setForm({
      ...project,
      techStack: project.techStack.join(", "),
      metrics: project.metrics.join("\n"),
    });
    setEditing(project.id);
    setError("");
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      techStack: form.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      metrics: form.metrics.split("\n").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };

    const url = editing === "new" ? "/api/admin/projects" : `/api/admin/projects/${editing}`;
    const method = editing === "new" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Save failed");
      return;
    }

    setEditing(null);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project? This can't be undone.")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <PanelSkeleton />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-lg font-semibold">Projects</h2>
        <button onClick={openNew} className="clay-button text-sm inline-flex items-center gap-2">
          <Plus size={15} /> New project
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="clay p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <input
                required
                className="clay-input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Field>
            <Field label="Slug (url-safe, e.g. retailflow)">
              <input
                required
                className="clay-input"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Summary (one-liner for cards)">
            <input
              required
              className="clay-input"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
            />
          </Field>

          <Field label="Description (long-form for detail page)">
            <textarea
              required
              rows={3}
              className="clay-input resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </Field>

          <Field label="Tech stack (comma-separated)">
            <input
              className="clay-input"
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              placeholder="Next.js, PostgreSQL, REST API"
            />
          </Field>

          <Field label="Metrics (one per line)">
            <textarea
              rows={3}
              className="clay-input resize-none"
              value={form.metrics}
              onChange={(e) => setForm({ ...form, metrics: e.target.value })}
              placeholder="Reduced billing time by 60%"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="GitHub URL (optional)">
              <input
                className="clay-input"
                value={form.githubUrl || ""}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              />
            </Field>
            <Field label="Live URL (optional)">
              <input
                className="clay-input"
                value={form.liveUrl || ""}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              />
            </Field>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 font-body text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured (wider card)
            </label>
            <Field label="Order">
              <input
                type="number"
                className="clay-input w-24"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
              />
            </Field>
          </div>

          {error && <p className="text-kiln-dark font-body text-sm">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" className="clay-button text-sm inline-flex items-center gap-2">
              <Check size={15} /> Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="clay-button-outline text-sm inline-flex items-center gap-2"
            >
              <X size={15} /> Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {projects.length === 0 && !editing && (
          <EmptyState message="No projects yet. Add your first one." />
        )}
        {projects.map((p) => (
          <div key={p.id} className="clay-sm p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-body font-semibold text-sm truncate">{p.title}</p>
              <p className="font-body text-xs text-ink/55 truncate">{p.summary}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <IconButton onClick={() => openEdit(p)} icon={Pencil} />
              <IconButton onClick={() => handleDelete(p.id)} icon={Trash2} danger />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- EXPERIENCE PANEL ---------------- */

const emptyExperience = {
  company: "",
  role: "",
  duration: "",
  type: "internship",
  bullets: "",
  order: 0,
};

function ExperiencePanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyExperience);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/experience");
    const data = await res.json();
    setItems(data.experience || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm(emptyExperience);
    setEditing("new");
    setError("");
  }

  function openEdit(item) {
    setForm({ ...item, bullets: item.bullets.join("\n") });
    setEditing(item.id);
    setError("");
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      bullets: form.bullets.split("\n").map((s) => s.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };

    const url = editing === "new" ? "/api/admin/experience" : `/api/admin/experience/${editing}`;
    const method = editing === "new" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Save failed");
      return;
    }

    setEditing(null);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this experience entry?")) return;
    await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <PanelSkeleton />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-lg font-semibold">Experience</h2>
        <button onClick={openNew} className="clay-button text-sm inline-flex items-center gap-2">
          <Plus size={15} /> New entry
        </button>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="clay p-6 mb-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Company">
              <input
                required
                className="clay-input"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </Field>
            <Field label="Role">
              <input
                required
                className="clay-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Duration (e.g. 2025 | 4 Months)">
              <input
                required
                className="clay-input"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </Field>
            <Field label="Type">
              <input
                className="clay-input"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                placeholder="internship / virtual"
              />
            </Field>
          </div>

          <Field label="Bullet points (one per line)">
            <textarea
              rows={4}
              className="clay-input resize-none"
              value={form.bullets}
              onChange={(e) => setForm({ ...form, bullets: e.target.value })}
            />
          </Field>

          <Field label="Order">
            <input
              type="number"
              className="clay-input w-24"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
            />
          </Field>

          {error && <p className="text-kiln-dark font-body text-sm">{error}</p>}

          <div className="flex gap-3">
            <button type="submit" className="clay-button text-sm inline-flex items-center gap-2">
              <Check size={15} /> Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="clay-button-outline text-sm inline-flex items-center gap-2"
            >
              <X size={15} /> Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {items.length === 0 && !editing && (
          <EmptyState message="No experience entries yet." />
        )}
        {items.map((item) => (
          <div key={item.id} className="clay-sm p-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="font-body font-semibold text-sm truncate">
                {item.role} — {item.company}
              </p>
              <p className="font-body text-xs text-ink/55">{item.duration}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <IconButton onClick={() => openEdit(item)} icon={Pencil} />
              <IconButton onClick={() => handleDelete(item.id)} icon={Trash2} danger />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- SKILLS PANEL ---------------- */

function SkillsPanel() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/skills");
    const data = await res.json();
    setSkills(data.skills || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, order: 0 }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Could not add skill");
      return;
    }

    setName("");
    setCategory("");
    load();
  }

  async function handleDelete(id) {
    await fetch(`/api/admin/skills/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <PanelSkeleton />;

  const grouped = skills.reduce((acc, s) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="font-display text-lg font-semibold mb-4">Skills</h2>

      <form onSubmit={handleAdd} className="clay p-6 mb-6 flex flex-wrap gap-3 items-end">
        <Field label="Skill name">
          <input
            required
            className="clay-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Prisma"
          />
        </Field>
        <Field label="Category">
          <input
            required
            className="clay-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Backend"
          />
        </Field>
        <button type="submit" className="clay-button text-sm inline-flex items-center gap-2 h-fit">
          <Plus size={15} /> Add
        </button>
        {error && <p className="text-kiln-dark font-body text-sm w-full">{error}</p>}
      </form>

      {skills.length === 0 ? (
        <EmptyState message="No skills yet." />
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="clay-sm p-4">
              <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mb-3">{cat}</p>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s.id}
                    className="clay-tag flex items-center gap-2 pr-2"
                  >
                    {s.name}
                    <button
                      onClick={() => handleDelete(s.id)}
                      aria-label={`Remove ${s.name}`}
                      className="hover:text-kiln-dark"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- MESSAGES PANEL ---------------- */

function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleToggleRead(id, read) {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    load();
  }

  if (loading) return <PanelSkeleton />;

  return (
    <div>
      <h2 className="font-display text-lg font-semibold mb-4">Messages</h2>

      {messages.length === 0 ? (
        <EmptyState message="No messages yet — they'll show up here when someone uses your contact form." />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`clay-sm p-4 ${!m.read ? "shadow-clay-hover" : ""}`}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-body font-semibold text-sm">
                    {m.name}{" "}
                    {!m.read && (
                      <span className="ml-2 clay-tag text-[10px] py-0.5 px-2 bg-kiln/10 text-kiln">
                        new
                      </span>
                    )}
                  </p>
                  <p className="font-body text-xs text-ink/55">{m.email}</p>
                </div>
                <span className="font-mono text-xs text-ink/40 whitespace-nowrap">
                  {new Date(m.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="font-body text-sm text-ink/75 mb-3 leading-relaxed">{m.message}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleRead(m.id, m.read)}
                  className="font-body text-xs font-medium text-sage hover:underline"
                >
                  Mark as {m.read ? "unread" : "read"}
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="font-body text-xs font-medium text-kiln-dark hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- SHARED UI HELPERS ---------------- */

function Field({ label, children }) {
  return (
    <label className="block flex-1 min-w-[180px]">
      <span className="font-body text-sm font-medium text-ink/80 mb-2 block">{label}</span>
      {children}
    </label>
  );
}

function IconButton({ onClick, icon: Icon, danger }) {
  return (
    <button
      onClick={onClick}
      className={`clay-sm w-9 h-9 flex items-center justify-center hover:shadow-clay-hover transition-shadow ${
        danger ? "text-kiln-dark" : "text-ink/70"
      }`}
    >
      <Icon size={14} />
    </button>
  );
}

function EmptyState({ message }) {
  return (
    <div className="clay-sm p-8 text-center font-body text-sm text-ink/50">{message}</div>
  );
}

function PanelSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="clay-sm p-4 h-16 animate-pulse bg-clay-shadow/40" />
      ))}
    </div>
  );
}
