/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ExternalLink, Eye, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { mockProjects } from "../../data/mockData";
import { projectsAPI } from "../../services/api";

export default function AllProjects() {
  const [projects, setProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.log("Using mock data - backend not connected");
      setProjects(mockProjects);
    } finally {
      setLoading(false);
    }
  };

  const nonFeaturedProjects = projects.filter((p) => !p.isFeatured);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl mb-4">
              All <span className="text-primary">Projects</span>
            </h1>
            <p className="text-muted-foreground">
              Browse through all {nonFeaturedProjects.length} projects in my
              portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonFeaturedProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-60" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-muted text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-xs rounded">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Eye className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
