/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Hero from "./sections/Hero";
import FeaturedProject from "./sections/FeaturedProject";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import About from "./sections/About";
import Contact from "./sections/Contact";
import { mockProjects } from "../../data/mockData";
import { projectsAPI } from "../../services/api";

export default function Home() {
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

  const featuredProject = projects.find((p) => p.isFeatured) || projects[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProject project={featuredProject} />
      <Projects projects={projects} />
      <Skills />
      <About />
      <Contact />

      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
          <Link
            to="/admin/login"
            className="text-xs opacity-30 hover:opacity-100 transition-opacity mt-2 inline-block"
          >
            •
          </Link>
        </div>
      </footer>
    </div>
  );
}
