import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { personalInfo } from "../../../data/mockData";

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 text-5xl md:text-7xl">
            Hi, I'm <span className="text-primary">{personalInfo.name}</span>
          </h1>
          <h2 className="mb-6 text-2xl md:text-4xl text-muted-foreground">
            {personalInfo.role}
          </h2>
          <p className="mb-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Motivated and detail-oriented Full-Stack Developer with hands-on
            experience in building responsive, user-friendly web and mobile
            applications. Proficient in modern frontend technologies, mobile
            application development, and actively skilled in backend
            development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="group px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center gap-2"
          >
            View Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center gap-2"
          >
            Hire Me
            <Download className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <p className="text-muted-foreground mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["React", "React Native", "JavaScript", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:border-primary transition-colors"
                >
                  {tech}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
