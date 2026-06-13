import { motion } from "motion/react";
import { Code, Server, Database } from "lucide-react";
import { skills } from "../../../data/mockData";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      skills: skills.frontend,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Backend",
      icon: Server,
      skills: skills.backend,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Tools & Database",
      icon: Database,
      skills: skills.tools,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

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
          <h2 className="text-4xl md:text-5xl mb-4">
            Skills & <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set covering the full development stack, from
            design to deployment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300"
              >
                <div
                  className={`inline-flex p-3 rounded-lg ${category.bgColor} mb-4`}
                >
                  <Icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <h3 className="text-2xl mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-muted rounded-lg text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
