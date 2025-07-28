import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, RoundedBox, Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

const Card3D = ({ isHovered, title }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = isHovered ? 
        Math.sin(state.clock.elapsedTime * 2) * 0.1 : 0;
      meshRef.current.rotation.x = isHovered ? 
        Math.sin(state.clock.elapsedTime * 1.5) * 0.05 : 0;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
      <RoundedBox
        ref={meshRef}
        args={[2, 2.5, 0.1]}
        radius={0.1}
        smoothness={4}
        scale={isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      >
        <meshStandardMaterial
          color={isHovered ? '#8B5CF6' : '#1F2937'}
          transparent
          opacity={0.8}
          emissive={isHovered ? '#4C1D95' : '#000000'}
          emissiveIntensity={0.2}
        />
      </RoundedBox>
    </Float>
  );
};

const ProjectCard3D = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group h-96"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 2, 2]} intensity={1} />
          <pointLight position={[-2, -2, -2]} intensity={0.5} color="#8B5CF6" />
          
          <Card3D isHovered={isHovered} title={project.title} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col p-6 bg-gradient-to-br from-black/20 via-transparent to-black/40 backdrop-blur-sm rounded-2xl border border-white/10">
        {/* Image */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-40 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Title */}
        <motion.h3 
          className="text-xl font-bold text-white mb-2 drop-shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <p className="text-white/90 text-sm mb-4 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <motion.span
              key={i}
              className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 backdrop-blur-sm border border-white/20 text-white font-medium"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Button */}
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300"
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)" 
          }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="mr-2">🔗</span>
          View Code
        </motion.a>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"
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

export default ProjectCard3D;
