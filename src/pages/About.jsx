// src/pages/About.jsx
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaGithub,
  FaLeaf,
  FaBoxOpen,
  FaTools,
  FaVial,
  FaDatabase,
} from "react-icons/fa";

const timeline = [
  {
    year: "2018–2019",
    title: "Matriculation",
    description:
      "Completed 10th grade with 86% from High School Tisri Barahmasiya.",
  },
  {
    year: "2019–2021",
    title: "Intermediate Science",
    description:
      "Completed 12th with 84% from +2 High School Tisri Barahmasiya.",
  },
  {
    year: "2022–2026",
    title: "B.Tech in CSE",
    description:
      "Pursuing B.Tech at Trident Academy of Technology with CGPA: 8.5.",
  },
];

const skills = [
  { icon: <FaHtml5 className="text-orange-500 text-3xl" />, name: "HTML" },
  { icon: <FaCss3Alt className="text-blue-500 text-3xl" />, name: "CSS" },
  { icon: <FaJs className="text-yellow-300 text-3xl" />, name: "JavaScript" },
  { icon: <FaReact className="text-cyan-400 text-3xl" />, name: "React.js" },
  { icon: <FaLeaf className="text-green-500 text-3xl" />, name: "Spring Boot" },
  { icon: <FaBoxOpen className="text-red-400 text-3xl" />, name: "Maven" },
  { icon: <FaTools className="text-blue-300 text-3xl" />, name: "Gradle" },
  { icon: <FaVial className="text-purple-400 text-3xl" />, name: "JUnit" },
  { icon: <FaDatabase className="text-indigo-400 text-3xl" />, name: "Hibernate" },
  { icon: <FaBootstrap className="text-pink-500 text-3xl" />, name: "Bootstrap" },
  { icon: <FaGithub className="text-white text-3xl" />, name: "GitHub" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 relative overflow-hidden">
      {/* Glowing animated dots that fade on hover */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1 }}
            whileHover={{ opacity: 0 }}
            className="w-2 h-2 bg-yellow-300 rounded-full absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <motion.h2
        className="text-5xl font-extrabold text-center mb-12 tracking-wide bg-gradient-to-r from-yellow-300 via-white to-yellow-400 text-transparent bg-clip-text relative z-10"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto border-l-4 border-yellow-400 pl-8 space-y-10 relative z-10">
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            className="relative"
          >
            <div className="absolute w-4 h-4 bg-yellow-400 rounded-full left-[-1.1rem] top-2"></div>
            <h3 className="text-2xl font-bold text-yellow-300">
              {item.year} — {item.title}
            </h3>
            <p className="text-white/80 mt-2 text-lg">{item.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Skills Section */}
      <motion.h3
        className="text-4xl font-semibold text-center mt-20 mb-10 bg-gradient-to-r from-cyan-300 via-white to-purple-400 text-transparent bg-clip-text"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Skills & Tools
      </motion.h3>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.15 }}
            className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-md transition-all duration-300"
          >
            {skill.icon}
            <p className="mt-2 text-sm">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;
