import { motion } from "motion/react";
import { GraduationCap, Lightbulb, Target } from "lucide-react";
import { personalInfo } from "../../../data/mockData";

export default function About() {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Education",
      description:
        "Computer Science graduate with a strong foundation in software engineering principles",
    },
    {
      icon: Target,
      title: "Focus",
      description:
        "Specialized in full-stack development and building scalable web and mobile applications",
    },
    {
      icon: Lightbulb,
      title: "Passion",
      description:
        "Love transforming ideas into real-world solutions that make a difference",
    },
  ];

  return (
    <section className="py-20 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">
            About <span className="text-primary">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-full h-[400px] rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center">
                    <span className="text-6xl">
                      {personalInfo.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-2xl">{personalInfo.role}</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="space-y-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
