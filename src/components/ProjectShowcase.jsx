import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box } from '@react-three/drei';

const ProjectCard3DEnhanced = ({ isHovered }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = isHovered ? 
        Math.sin(state.clock.elapsedTime * 2) * 0.2 : 
        Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.x = isHovered ? 
        Math.cos(state.clock.elapsedTime * 1.5) * 0.1 : 0;
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
      <Box
        ref={meshRef}
        args={[2, 2.5, 0.2]}
        scale={isHovered ? [1.15, 1.15, 1.15] : [1, 1, 1]}
      >
        <meshStandardMaterial
          color={isHovered ? '#8B5CF6' : '#4C1D95'}
          transparent
          opacity={0.3}
          emissive={isHovered ? '#8B5CF6' : '#1E1B4B'}
          emissiveIntensity={0.3}
        />
      </Box>
      
      {isHovered && (
        <Sphere args={[0.1]} position={[0, 0, 1.2]}>
          <meshStandardMaterial
            color="#EC4899"
            emissive="#EC4899"
            emissiveIntensity={0.5}
          />
        </Sphere>
      )}
    </Float>
  );
};

const EnhancedProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = (event.clientY - centerY) / 10;
    const rotateYValue = (event.clientX - centerX) / 10;
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group h-[500px] perspective-1000"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      viewport={{ once: true }}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[3, 3, 3]} intensity={1} />
          <pointLight position={[-3, -3, -3]} intensity={0.5} color="#8B5CF6" />
          
          <ProjectCard3DEnhanced isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Main Card Content */}
      <div className="relative z-10 h-full p-8 bg-gradient-to-br from-black/20 via-transparent to-purple-900/30 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            className="absolute top-4 right-4 z-20"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full shadow-lg">
              FEATURED
            </span>
          </motion.div>
        )}

        {/* Project Image */}
        <motion.div 
          className="relative mb-6 overflow-hidden rounded-2xl group-hover:shadow-2xl transition-all duration-500"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          >
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-full p-4"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-white text-2xl">🔍</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3 
            className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
          >
            {project.title}
          </motion.h3>

          <p className="text-white/80 mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tagIndex}
                className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white"
                whileHover={{ 
                  scale: 1.1, 
                  backgroundColor: "rgba(139, 92, 246, 0.3)",
                  borderColor: "rgba(139, 92, 246, 0.5)"
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + tagIndex * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              View Code
            </motion.a>
            
            <motion.button
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white py-3 px-6 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Live Demo
            </motion.button>
          </div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
          animate={{
            scale: isHovered ? [1, 1.05, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* 3D Shadow */}
      <motion.div
        className="absolute inset-0 bg-black/30 rounded-3xl blur-2xl -z-20"
        style={{
          transform: "translateZ(-50px) scale(0.9)",
        }}
        animate={{
          opacity: isHovered ? 0.6 : 0.3,
        }}
      />
    </motion.div>
  );
};

const ProjectShowcase = ({ projects }) => {
  return (
    <div className="grid gap-12 md:gap-16 lg:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <EnhancedProjectCard
          key={project.title}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
};

export default ProjectShowcase;
