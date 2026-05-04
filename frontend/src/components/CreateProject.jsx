import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { Plus, FileText, Users, UserCheck } from "lucide-react";

export default function CreateProject({ onProjectCreated }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.log("Error fetching users:", err);
        toast.error("Failed to load users");
      } finally {
        setFetchingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleUser = (userId) => {
    setSelected(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const createProject = async () => {
    if (!name.trim()) {
      toast.error("Project name is required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/projects", {
        name: name.trim(),
        description: description.trim(),
        members: selected
      });

      toast.success("Project created successfully! 🎉");
      setName("");
      setDescription("");
      setSelected([]);

      if (onProjectCreated) {
        onProjectCreated();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center">
          <Plus className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Create New Project</h2>
        </div>
      </div>

      <div className="card-content space-y-6">
        {/* Project Name */}
        <div>
          <label className="form-label">Project Name *</label>
          <input
            className="form-input"
            placeholder="Enter project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="form-label">Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              className="form-input pl-10"
              placeholder="Enter project description (optional)"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        {/* Team Members */}
        <div>
          <label className="form-label">Team Members</label>
          {fetchingUsers ? (
            <div className="flex items-center justify-center py-8">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="flex items-center mb-3">
                <Users className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  {selected.length} of {users.length} selected
                </span>
              </div>
              <div className="space-y-2">
                {users.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No users available</p>
                ) : (
                  users.map(u => (
                    <label key={u._id} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={selected.includes(u._id)}
                        onChange={() => toggleUser(u._id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex items-center">
                        <UserCheck className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{u.name}</span>
                        <span className="text-xs text-gray-500 ml-2">({u.role})</span>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <button
          onClick={createProject}
          disabled={loading || fetchingUsers}
          className="btn btn-primary w-full"
        >
          {loading ? (
            <>
              <div className="loading-spinner mr-2"></div>
              Creating Project...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </>
          )}
        </button>
      </div>
    </div>
  );
}