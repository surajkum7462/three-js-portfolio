import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import ProjectShowcase from "../components/ProjectShowcase";
import Background3D from "../components/Background3D";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A powerful e-commerce system featuring JWT-based authentication, advanced product management, secure payment processing, and real-time analytics dashboard.",
    tags: ["React", "Spring Boot", "MySQL", "JWT", "Redux"],
    image: "/images/ecommerce.jpg",
    github: "https://github.com/surajkum7462/E-Commecre-Project/tree/master",
    featured: true
  },
  {
    title: "Contact Dashboard App",
    description:
      "Mobile-first contact manager with advanced data visualization, cloud sync, offline capabilities, and intelligent contact suggestions using ML.",
    tags: ["React Native", "TypeScript", "Expo", "Recharts", "ML"],
    image: "/images/contact.jpg",
    github: "https://github.com/surajkum7462/Contact-DashBoard-App",
    featured: true
  },
  {
    title: "E-Notes App",
    description:
      "Comprehensive academic note management system with real-time collaboration, version control, AI-powered content suggestions, and advanced search.",
    tags: ["Spring Boot", "Thymeleaf", "MySQL", "WebSocket", "AI"],
    image: "/images/enotes.jpg",
    github: "https://github.com/surajkum7462/E-Notes-Real-Time-Project-",
    featured: false
  },
  {
    title: "Premium Portfolio",
    description:
      "Cutting-edge portfolio website with 3D animations, interactive elements, premium design system, and performance optimization.",
    tags: ["React", "Three.js", "Framer Motion", "WebGL", "GSAP"],
    image: "/images/muimage.png",
    github: "https://github.com/surajkum7462/portfolio-frontend",
    featured: true
  }
];

const ProjectsPremium = () => {
  const [filter, setFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    AOS.init({ duration: 1000 });
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredProjects = filter === 'all' ? projects : 
                          filter === 'featured' ? projects.filter(p => p.featured) :
                          projects.filter(p => !p.featured);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <Background3D />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-black/80 z-10" />

      {/* Interactive Cursor */}
      <motion.div
        className="fixed w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Main Content */}
      <div className="relative z-20 py-20 px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            whileHover={{ scale: 1.02 }}
          >
            🚀 Premium Projects
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Innovative solutions crafted with cutting-edge technology and premium design
          </motion.p>

          {/* Filter Buttons */}
          <motion.div 
            className="flex justify-center space-x-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {['all', 'featured', 'others'].map((filterType) => (
              <motion.button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === filterType
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-white/80 border border-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Projects Showcase */}
        <motion.div
          className="max-w-7xl mx-auto"
          layout
        >
          <ProjectShowcase projects={filteredProjects} />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-8">Development Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Projects Built", value: "5+" },
                { label: "Technologies", value: "10+" },
                { label: "Code Commits", value: "200+" }
                
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-purple-400 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.a
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg shadow-2xl border border-white/20 backdrop-blur-sm text-white"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px rgba(147, 51, 234, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-3">💼</span>
            Let's Build Something Amazing Together
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPremium;
