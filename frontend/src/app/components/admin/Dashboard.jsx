/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Star,
  ExternalLink,
  Eye,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import { projectsAPI } from "../../../services/api";
import ProjectForm from "./ProjectForm";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await projectsAPI.delete(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects();
  };

  const toggleFeatured = async (project) => {
    try {
      await projectsAPI.update(project._id, {
        isFeatured: !project.isFeatured,
      });
      fetchProjects();
    } catch (error) {
      alert("Failed to update project");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your portfolio projects
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Project
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 border border-border rounded-lg hover:border-destructive hover:text-destructive transition-colors flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.length === 0 ? (
                <div className="text-center py-12 bg-card border border-border rounded-xl">
                  <p className="text-muted-foreground mb-4">No projects yet</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add Your First Project
                  </button>
                </div>
              ) : (
                projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="shrink-0">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full md:w-48 h-32 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl">{project.title}</h3>
                              {project.isFeatured && (
                                <Star className="w-5 h-5 fill-primary text-primary" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-muted text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => toggleFeatured(project)}
                            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                              project.isFeatured
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "border border-border hover:border-primary"
                            }`}
                          >
                            <Star className="w-4 h-4" />
                            {project.isFeatured ? "Featured" : "Set Featured"}
                          </button>
                          <button
                            onClick={() => handleEdit(project)}
                            className="px-4 py-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center gap-2 text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(project._id)}
                            className="px-4 py-2 border border-border rounded-lg hover:border-destructive hover:text-destructive transition-colors flex items-center gap-2 text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center gap-2 text-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live
                          </a>
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center gap-2 text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>

      {showForm && (
        <ProjectForm project={editingProject} onClose={handleFormClose} />
      )}
    </div>
  );
}
