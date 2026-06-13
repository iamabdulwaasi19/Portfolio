import { motion } from "motion/react";
import { ExternalLink, Eye, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Projects({ projects }) {
  const nonFeaturedProjects = projects.filter((p) => !p.isFeatured);
  const displayedProjects = nonFeaturedProjects.slice(0, 5);
  const hasMore = nonFeaturedProjects.length > 5;

  return (
    <section id="projects" className="py-20 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">
            Other <span className="text-primary">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of projects showcasing my skills in full-stack
            development, API integration, and modern web technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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

          {hasMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: displayedProjects.length * 0.1,
              }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex items-center justify-center"
            >
              <Link
                to="/projects"
                className="w-full h-full flex flex-col items-center justify-center p-12 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <ArrowRight className="w-8 h-8 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-2xl group-hover:text-primary transition-colors">
                  View More Projects
                </h3>
                <p className="text-muted-foreground text-center">
                  Explore all {nonFeaturedProjects.length} projects
                </p>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
