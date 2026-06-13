/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Save } from "lucide-react";
import { projectsAPI } from "../../../services/api";

export default function ProjectForm({ project, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    image: "",
    githubLink: "",
    liveLink: "",
    isFeatured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project) {
      setFormData((prevState) => ({
        ...prevState,
        title: project.title,
        description: project.description,
        techStack: project.techStack.join(", "),
        image: project.image,
        githubLink: project.githubLink,
        liveLink: project.liveLink,
        isFeatured: project.isFeatured,
      }));
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const projectData = {
        ...formData,
        techStack: formData.techStack.split(",").map((tech) => tech.trim()),
      };

      if (project) {
        await projectsAPI.update(project._id, projectData);
      } else {
        await projectsAPI.create(projectData);
      }

      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? e.target.checked : value,
    });
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="block mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
              placeholder="Describe your project..."
            />
          </div>

          <div>
            <label htmlFor="techStack" className="block mb-2">
              Tech Stack * (comma-separated)
            </label>
            <input
              type="text"
              id="techStack"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="React, Node.js, MongoDB"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Separate technologies with commas
            </p>
          </div>

          <div>
            <label htmlFor="image" className="block mb-2">
              Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="githubLink" className="block mb-2">
              GitHub Link *
            </label>
            <input
              type="url"
              id="githubLink"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="https://github.com/username/repo"
            />
          </div>

          <div>
            <label htmlFor="liveLink" className="block mb-2">
              Live Demo Link *
            </label>
            <input
              type="url"
              id="liveLink"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="https://myproject.vercel.app"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="isFeatured" className="cursor-pointer">
              Set as Featured Project
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading
                ? "Saving..."
                : project
                  ? "Update Project"
                  : "Add Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-border rounded-lg hover:border-destructive hover:text-destructive transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
