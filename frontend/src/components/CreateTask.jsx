import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Plus, Calendar, Users, FolderKanban, FileText } from "lucide-react";

export default function CreateTask({ onTaskCreated }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    project: "",
    assignedTo: "",
    dueDate: "",
    description: ""
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, userRes] = await Promise.all([
          API.get("/projects"),
          API.get("/users")
        ]);

        setProjects(projRes.data);
        setUsers(userRes.data);

        // ✅ FORCE DEFAULT SELECTION (IMPORTANT FIX)
        if (projRes.data.length > 0 && userRes.data.length > 0) {
          setForm(prev => ({
            ...prev,
            project: projRes.data[0]._id,
            assignedTo: userRes.data[0]._id
          }));
        }
      } catch (err) {
        console.log("ERROR:", err.response?.data || err.message);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔥 CREATE TASK
  const handleCreate = async () => {
    if (!form.title.trim()) {
      toast.error("Task title is required");
      return;
    }
    if (!form.project) {
      toast.error("Project selection is required");
      return;
    }
    if (!form.assignedTo) {
      toast.error("User assignment is required");
      return;
    }

    try {
      setSubmitting(true);
      await API.post("/tasks", {
        ...form,
        title: form.title.trim(),
        description: form.description.trim()
      });

      toast.success("Task created successfully! 🎯");

      // Reset form
      setForm(prev => ({
        ...prev,
        title: "",
        dueDate: "",
        description: ""
      }));

      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-content flex items-center justify-center py-8">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center">
          <Plus className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Create New Task</h2>
        </div>
      </div>

      <div className="card-content space-y-6">
        {/* Title */}
        <div>
          <label className="form-label">Task Title *</label>
          <input
            className="form-input"
            placeholder="Enter task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="form-label">Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              className="form-input pl-10"
              placeholder="Enter task description (optional)"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </div>

        {/* Project */}
        <div>
          <label className="form-label">Project *</label>
          <div className="relative">
            <FolderKanban className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              className="form-input pl-10"
              value={form.project || ""}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
            >
              <option value="" disabled>Select a project</option>
              {projects.length === 0 ? (
                <option disabled>No projects available</option>
              ) : (
                projects.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Assigned User */}
        <div>
          <label className="form-label">Assign To *</label>
          <div className="relative">
            <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <select
              className="form-input pl-10"
              value={form.assignedTo || ""}
              onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            >
              <option value="" disabled>Select a user</option>
              {users.length === 0 ? (
                <option disabled>No users available</option>
              ) : (
                users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="form-label">Due Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="date"
              className="form-input pl-10"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button
          onClick={handleCreate}
          disabled={submitting}
          className="btn btn-primary w-full"
        >
          {submitting ? (
            <>
              <div className="loading-spinner mr-2"></div>
              Creating Task...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </>
          )}
        </button>
      </div>
    </div>
  );
}
