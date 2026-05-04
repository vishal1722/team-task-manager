import { useEffect, useState } from "react";
import API from "../api/axios";
import CreateProject from "../components/CreateProject";
import { isAdmin } from "../utils/auth";
import { Plus, FolderKanban, Users, Calendar } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log("Error fetching projects", err);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectCreated = () => {
    fetchProjects();
    setShowCreate(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Organize and manage your project teams
                </p>
              </div>

              {isAdmin() && (
                <button
                  onClick={() => setShowCreate(!showCreate)}
                  className="btn btn-primary inline-flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showCreate && (
          <div className="mb-8">
            <CreateProject onProjectCreated={handleProjectCreated} />
          </div>
        )}

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <FolderKanban className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-500">
              {isAdmin()
                ? "Create your first project to get started."
                : "Ask an admin to create a project for you."
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="card group hover:shadow-lg transition-shadow">
                <div className="card-header">
                  <div className="flex items-center">
                    <FolderKanban className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                </div>

                <div className="card-content">
                  {project.description && (
                    <p className="text-gray-600 mb-4">{project.description}</p>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{project.members?.length || 0} members</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="flex flex-wrap gap-1">
                    {project.members?.slice(0, 3).map((member) => (
                      <div
                        key={member._id}
                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                        title={member.name}
                      >
                        <span className="text-xs font-medium text-blue-700">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    ))}
                    {project.members?.length > 3 && (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          +{project.members.length - 3}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}