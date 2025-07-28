import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiSpring,
  SiMysql,
  SiGit,
  SiDocker,
  SiMaven,
  SiThreedotjs,
  SiTailwindcss
} from 'react-icons/si';

import { FaCode } from 'react-icons/fa';
// import { SiOpenjdk } from "react-icons/si";


// Exact Technology Icons Mapping
const getSkillIcon = (skillName) => {
  const name = skillName.toLowerCase();

  if (name.includes('html')) return {
    icon: SiHtml5,
    color: "#E34F26",
    bgGradient: "from-orange-500 to-red-500"
  };
  if (name.includes('css')) return {
    icon: SiCss3,
    color: "#1572B6",
    bgGradient: "from-blue-500 to-blue-600"
  };
  if (name.includes('javascript')) return {
    icon: SiJavascript,
    color: "#F7DF1E",
    bgGradient: "from-yellow-400 to-yellow-500"
  };
  if (name.includes('react')) return {
    icon: SiReact,
    color: "#61DAFB",
    bgGradient: "from-cyan-400 to-blue-500"
  };
  if (name.includes('java') && !name.includes('script')) return {
    icon: SiJava,
    color: "#007396",
    bgGradient: "from-orange-600 to-red-600"
  };
  if (name.includes('spring')) return {
    icon: SiSpring,
    color: "#6DB33F",
    bgGradient: "from-green-500 to-green-600"
  };
  if (name.includes('three')) return {
    icon: SiThreedotjs,
    color: "#000000",
    bgGradient: "from-gray-800 to-black"
  };
  if (name.includes('mysql')) return {
    icon: SiMysql,
    color: "#4479A1",
    bgGradient: "from-blue-600 to-blue-700"
  };
  if (name.includes('git') || name.includes('github')) return {
    icon: SiGit,
    color: "#F05032",
    bgGradient: "from-orange-500 to-red-500"
  };
  if (name.includes('docker')) return {
    icon: SiDocker,
    color: "#0db7ed",
    bgGradient: "from-blue-400 to-blue-600"
  };
  if (name.includes('maven')) return {
    icon: SiMaven,
    color: "#C71A36",
    bgGradient: "from-red-600 to-red-700"
  };
  if (name.includes('tailwind')) return {
    icon: SiTailwindcss,
    color: "#06B6D4",
    bgGradient: "from-cyan-400 to-cyan-600"
  };

  // Default fallback
  return {
    icon: FaCode,
    color: "#8B5CF6",
    bgGradient: "from-purple-500 to-purple-600"
  };
};

// Main Skill Icon Component with Exact Brand Icons
const SkillIcon3D = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const skillData = getSkillIcon(skill.name);
  const IconComponent = skillData.icon;

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 group relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(255,255,255,0.1)",
        boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      viewport={{ once: true }}
    >
      {/* Background Gradient on Hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${skillData.bgGradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
        animate={{
          opacity: isHovered ? 0.1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Exact Brand Icon */}
      <div className="h-24 mb-4 flex items-center justify-center relative z-10">
        <motion.div
          className="relative"
          whileHover={{
            scale: 1.2,
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 0.3,
            rotate: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <IconComponent
            className="text-6xl transition-all duration-300"
            style={{
              color: isHovered ? '#ffffff' : skillData.color,
              filter: isHovered ? 'drop-shadow(0 0 20px rgba(255,255,255,0.5))' : `drop-shadow(0 0 10px ${skillData.color}40)`
            }}
          />

          {/* Floating particles around icon */}
          {isHovered && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: skillData.color,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-10, -30, -10],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Skill Info */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {skill.name}
        </h3>
        <p className="text-purple-300 text-sm mb-3">{skill.category}</p>
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            skill.level === 'Expert' ? 'bg-green-600/80 text-white' :
            skill.level === 'Advanced' ? 'bg-blue-600/80 text-white' :
            'bg-yellow-600/80 text-white'
          }`}>
            {skill.level}
          </span>

          {/* Skill Progress Indicator */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < (skill.level === 'Expert' ? 5 : skill.level === 'Advanced' ? 4 : 3)
                    ? 'bg-white/80'
                    : 'bg-white/20'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"
        style={{
          background: `radial-gradient(circle, ${skillData.color} 0%, transparent 70%)`,
          filter: 'blur(20px)'
        }}
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default SkillIcon3D;
