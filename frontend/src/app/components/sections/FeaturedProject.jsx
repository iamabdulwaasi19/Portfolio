import { motion } from "motion/react";
import { ExternalLink, Github, Check, Zap } from "lucide-react";

export default function FeaturedProject({ project }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary mb-2 block">Featured Project</span>
          <h2 className="text-4xl md:text-5xl mb-4">{project.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group overflow-hidden rounded-xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl mb-4">The Problem</h3>
            <p className="text-muted-foreground mb-6">
              Farmers often struggle to identify plant diseases early, leading
              to significant crop losses. Traditional methods require expert
              consultation, which can be time-consuming and expensive.
            </p>

            <h3 className="text-2xl mb-4">The Solution</h3>
            <p className="text-muted-foreground mb-6">{project.description}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-primary" />
                  <h4>Accuracy</h4>
                </div>
                <p className="text-2xl text-primary">~90%+</p>
              </div>
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <h4>Speed</h4>
                </div>
                <p className="text-2xl text-primary">10-15s</p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:border-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
