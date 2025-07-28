import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A powerful e-commerce system featuring JWT-based login, intuitive product management, and secure transactions.",
    tags: ["React", "Spring Boot", "MySQL", "JWT"],
    image:
      "/images/ecommerce.jpg",
    github: "https://github.com/surajkum7462/E-Commecre-Project/tree/master",
  },
  
  {
    title: "Contact Dashboard App",
    description:
      "Mobile contact manager with data visualization and persistent storage. Built with performance and usability in mind.",
    tags: ["React Native", "TypeScript", "Expo", "Recharts"],
    image:
      "/images/contact.jpg",
    github: "https://github.com/surajkum7462/Contact-DashBoard-App",
  },
  {
    title: "E-Notes App",
    description:
      "Organize and share academic notes effectively by semester and subject with full CRUD and admin capabilities.",
    tags: ["Spring Boot", "Thymeleaf", "MySQL"],
    image:
      "/images/enotes.jpg",
    github: "https://github.com/surajkum7462/E-Notes-Real-Time-Project-",
  },
  {
    title: "Portfolio Website",
    description:
      "A visually rich personal portfolio showcasing achievements with animated effects, 3D cards, and responsive layout.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    image:
      "/images/muimage.png",
    github: "https://github.com/surajkum7462/portfolio-frontend",
  },
];

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-gray-900 via-purple-900 to-black text-white py-16 overflow-hidden">
      {/* Floating Background Bubbles */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
            className="w-3 h-3 bg-purple-400/30 rounded-full absolute animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <motion.h2
        className="text-5xl font-extrabold text-center mb-16 relative z-10 bg-gradient-to-r from-cyan-400 via-white to-pink-500 text-transparent bg-clip-text drop-shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🚀 Featured Projects
      </motion.h2>

      <div className="max-w-7xl mx-auto grid gap-12 px-6 md:grid-cols-2 lg:grid-cols-3 z-10 relative">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-purple-500/20 hover:shadow-purple-700/50 transform transition-transform duration-500 hover:-translate-y-2 hover:scale-105"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-52 object-cover rounded-xl mb-4 border border-white/20 shadow-md"
            />
            <h3 className="text-2xl font-bold text-cyan-300 mb-2 drop-shadow-sm">
              {project.title}
            </h3>
            <p className="text-white/90 text-sm mb-4 leading-relaxed font-light">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 shadow-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-auto px-5 py-2 text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-700 text-white rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition"
            >
              🔗 View Code
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
