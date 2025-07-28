import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Text,
  OrbitControls,
  Stars,
  Sphere,
  Box,
  Cylinder,
  Torus,
  Html,
  ContactShadows
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Data from repository
const personalData = {
  name: "Suraj Kumar",
  title: "Full Stack Developer",
  skills: ["Java", "Spring Boot", "React", "JavaScript", "Tailwind CSS", "MySQL", "DSA"],
  quote: "Success is not final, failure is not fatal: it is the courage to continue that counts."
};

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A powerful e-commerce system featuring JWT-based login, intuitive product management, and secure transactions.",
    tags: ["React", "Spring Boot", "MySQL", "JWT"],
    github: "https://github.com/surajkum7462/E-Commecre-Project/tree/master",
    position: [-8, 2, 0],
    color: "#8B5CF6"
  },
  {
    id: 2,
    title: "Contact Dashboard App",
    description: "Mobile contact manager with data visualization and persistent storage. Built with performance and usability in mind.",
    tags: ["React Native", "TypeScript", "Expo", "Recharts"],
    github: "https://github.com/surajkum7462/Contact-DashBoard-App",
    position: [8, 2, 0],
    color: "#EC4899"
  },
  {
    id: 3,
    title: "E-Notes App",
    description: "Organize and share academic notes effectively by semester and subject with full CRUD and admin capabilities.",
    tags: ["Spring Boot", "Thymeleaf", "MySQL"],
    github: "https://github.com/surajkum7462/E-Notes-Real-Time-Project-",
    position: [-8, -2, 0],
    color: "#F59E0B"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A visually rich personal portfolio showcasing achievements with animated effects, 3D cards, and responsive layout.",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/surajkum7462/portfolio-frontend",
    position: [8, -2, 0],
    color: "#10B981"
  }
];

const education = [
  { year: "2018–2019", title: "Matriculation", score: "86%", position: [-12, 6, 0] },
  { year: "2019–2021", title: "Intermediate Science", score: "84%", position: [0, 6, 0] },
  { year: "2022–2026", title: "B.Tech in CSE", score: "8.5 CGPA", position: [12, 6, 0] }
];

// 3D Project Node Component
const ProjectNode = ({ project, onClick, isSelected, connections }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      try {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + project.id) * 0.1;

        const targetScale = (hovered || isSelected) ? 1.3 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      } catch (error) {
        console.warn('ProjectNode animation error:', error);
      }
    }
  });

  return (
    <group ref={groupRef} position={project.position}>
      {/* Project Node */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere
          ref={meshRef}
          args={[1.2]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onClick && onClick(project)}
        >
          <meshStandardMaterial
            color={hovered || isSelected ? "#ffffff" : project.color}
            transparent
            opacity={0.8}
            emissive={project.color}
            emissiveIntensity={hovered || isSelected ? 0.6 : 0.3}
          />
        </Sphere>

        {/* Floating particles around project */}
        {[...Array(6)].map((_, i) => (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.3} floatIntensity={0.6}>
            <Sphere
              args={[0.05]}
              position={[
                Math.cos((i / 6) * Math.PI * 2) * 2,
                Math.sin((i / 6) * Math.PI * 2) * 2,
                (Math.random() - 0.5) * 2
              ]}
            >
              <meshStandardMaterial
                color={project.color}
                emissive={project.color}
                emissiveIntensity={0.6}
                transparent
                opacity={0.8}
              />
            </Sphere>
          </Float>
        ))}
      </Float>

      {/* Text Label */}
      <Html position={[0, -2.5, 0]} center>
        <div className="text-white font-bold text-lg text-center bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/20 pointer-events-none">
          {project.title.split(' ')[0]}
        </div>
      </Html>
    </group>
  );
};

// Central Hub (Suraj's Avatar)
const CentralHub = ({ onClick }) => {
  const meshRef = useRef();
  const coreRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    try {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
      }
      if (coreRef.current) {
        coreRef.current.rotation.x += 0.01;
        coreRef.current.rotation.z += 0.005;
      }
    } catch (error) {
      console.warn('CentralHub animation error:', error);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <Torus
          ref={meshRef}
          args={[2, 0.5, 16, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => onClick && onClick()}
        >
          <meshStandardMaterial
            color={hovered ? "#ffffff" : "#8B5CF6"}
            emissive="#4C1D95"
            emissiveIntensity={0.4}
            transparent
            opacity={0.9}
          />
        </Torus>

        {/* Inner Core */}
        <Sphere ref={coreRef} args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#EC4899"
            emissive="#EC4899"
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* Profile Photo - Floating in Center */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Html position={[0, 0, 0]} center transform>
          <motion.div
            className="relative pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.img
              src="/images/best photo.jpg"
              alt="Suraj Kumar"
              className="w-36 h-36 rounded-full border-4 border-white/50 shadow-2xl object-cover"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.8))',
                background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                padding: '2px'
              }}
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Animated rings around photo */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400/60"
              style={{ transform: 'scale(1.15)' }}
              animate={{
                rotate: 360,
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full border border-pink-400/40"
              style={{ transform: 'scale(1.25)' }}
              animate={{
                rotate: -360,
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </motion.div>
        </Html>
      </Float>

      {/* Name Text */}
      <Html position={[0, -4, 0]} center>
        <div className="text-white font-bold text-2xl text-center bg-black/50 px-6 py-2 rounded-xl backdrop-blur-sm border border-white/20 pointer-events-none">
          SURAJ KUMAR
        </div>
      </Html>
    </group>
  );
};

// Education Timeline in 3D
const EducationTimeline = () => {
  return (
    <group>
      {education.map((edu, index) => (
        <group key={index} position={edu.position}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <Box args={[1.5, 0.3, 0.3]}>
              <meshStandardMaterial
                color="#F59E0B"
                emissive="#F59E0B"
                emissiveIntensity={0.2}
              />
            </Box>
          </Float>
          
          <Html position={[0, -1.5, 0]} center>
            <div className="text-white font-semibold text-sm text-center bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/20">
              {edu.year}
            </div>
          </Html>
        </group>
      ))}
      
      {/* Timeline connector */}
      <Cylinder
        args={[0.02, 0.02, 24]}
        position={[0, 6, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.3}
        />
      </Cylinder>
    </group>
  );
};

// Skills Constellation
const SkillsConstellation = () => {
  const skillPositions = [
    [-15, 10, -5], [15, 10, -5], [-15, -10, -5], [15, -10, -5],
    [0, 15, -8], [0, -15, -8], [-10, 0, -10]
  ];

  return (
    <group>
      {personalData.skills.map((skill, index) => (
        <group key={skill} position={skillPositions[index] || [0, 0, -15]}>
          <Float speed={2 + index * 0.5} rotationIntensity={0.4} floatIntensity={0.6}>
            <Sphere args={[0.5]}>
              <meshStandardMaterial
                color="#10B981"
                emissive="#10B981"
                emissiveIntensity={0.4}
                transparent
                opacity={0.7}
              />
            </Sphere>
          </Float>
          
          <Html position={[0, -1.2, 0]} center>
            <div className="text-white font-medium text-xs text-center bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-white/20">
              {skill}
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};

// Advanced Particle System
const ParticleSystem = () => {
  const pointsRef = useRef();
  const particleCount = 1500; // Reduced for better performance

  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.7, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    try {
      if (pointsRef.current) {
        pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
        pointsRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.05) * 0.1;
      }
    } catch (error) {
      console.warn('ParticleSystem animation error:', error);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Dynamic Connection Lines
const ConnectionNetwork = () => {
  const connections = React.useMemo(() => {
    const lines = [];
    const centerPosition = [0, 0, 0];

    // Connect all projects to center
    projects.forEach(project => {
      lines.push({
        start: centerPosition,
        end: project.position,
        color: project.color
      });
    });

    // Connect projects to each other
    for (let i = 0; i < projects.length; i++) {
      for (let j = i + 1; j < projects.length; j++) {
        lines.push({
          start: projects[i].position,
          end: projects[j].position,
          color: "#8B5CF6"
        });
      }
    }

    return lines;
  }, []);

  return (
    <group>
      {connections.map((connection, index) => {
        const start = new THREE.Vector3(...connection.start);
        const end = new THREE.Vector3(...connection.end);
        const distance = start.distanceTo(end);
        const midpoint = start.clone().lerp(end, 0.5);
        const direction = end.clone().sub(start);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction.normalize()
        );

        return (
          <ConnectionLine
            key={index}
            distance={distance}
            position={midpoint.toArray()}
            quaternion={quaternion.toArray()}
            color={connection.color}
          />
        );
      })}
    </group>
  );
};

// Individual Connection Line Component
const ConnectionLine = ({ distance, position, quaternion, color }) => {
  const materialRef = useRef();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.3 + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Cylinder
      args={[0.01, 0.01, distance]}
      position={position}
      quaternion={quaternion}
    >
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </Cylinder>
  );
};

// Calculate connections between projects
const calculateConnections = (project, allProjects) => {
  return allProjects
    .filter(p => p.id !== project.id)
    .map(targetProject => {
      const start = new THREE.Vector3(...project.position);
      const end = new THREE.Vector3(...targetProject.position);
      const midpoint = start.clone().lerp(end, 0.5);
      const distance = start.distanceTo(end);
      const direction = end.clone().sub(start).normalize();
      const rotation = new THREE.Euler(0, 0, Math.atan2(direction.y, direction.x));

      return { midpoint: midpoint.toArray(), distance, rotation: [rotation.x, rotation.y, rotation.z] };
    });
};

// Main 3D Scene Component
const Scene3D = ({ selectedProject, onProjectClick, onCentralClick }) => {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
      <pointLight position={[0, 0, 15]} intensity={0.4} color="#EC4899" />
      <spotLight position={[0, 15, 0]} intensity={0.6} angle={0.3} penumbra={1} />

      {/* Background Color */}
      <color attach="background" args={['#0a0a0a']} />

      <Stars radius={120} depth={60} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* Advanced Particle System */}
      <ParticleSystem />

      {/* Dynamic Connection Network */}
      <ConnectionNetwork />

      {/* Central Hub */}
      <CentralHub onClick={onCentralClick} />

      {/* Project Nodes */}
      {projects.map(project => (
        <ProjectNode
          key={project.id}
          project={project}
          onClick={onProjectClick}
          isSelected={selectedProject?.id === project.id}
          connections={[]}
        />
      ))}

      {/* Education Timeline */}
      <EducationTimeline />

      {/* Skills Constellation */}
      <SkillsConstellation />

      <ContactShadows position={[0, -15, 0]} opacity={0.4} scale={100} blur={2} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        maxDistance={60}
        minDistance={10}
        autoRotate={true}
        autoRotateSpeed={0.3}
      />
    </>
  );
};

// UI Overlay Components
const ProjectOverlay = ({ project, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex items-center justify-center p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full border border-white/20"
      initial={{ scale: 0.8, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.8, y: 50 }}
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-bold text-white">{project.title}</h2>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white text-2xl"
        >
          ×
        </button>
      </div>
      
      <p className="text-white/80 mb-6 leading-relaxed">{project.description}</p>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full text-sm text-white"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
        >
          View Code
        </a>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all"
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const CentralOverlay = ({ onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex items-center justify-center p-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-3xl w-full border border-white/20"
      initial={{ scale: 0.8, y: 50 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.8, y: 50 }}
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-4xl font-bold text-white">{personalData.name}</h2>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white text-2xl"
        >
          ×
        </button>
      </div>
      
      <h3 className="text-2xl text-purple-300 mb-4">{personalData.title}</h3>
      <p className="text-white/80 mb-6 italic">"{personalData.quote}"</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xl font-bold text-white mb-3">Technical Skills</h4>
          <div className="flex flex-wrap gap-2">
            {personalData.skills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 bg-gradient-to-r from-blue-600/80 to-green-600/80 rounded-full text-sm text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-bold text-white mb-3">Education</h4>
          {education.map(edu => (
            <div key={edu.year} className="mb-2">
              <div className="text-white">{edu.title}</div>
              <div className="text-white/60 text-sm">{edu.year} • {edu.score}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 mt-8">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
        >
          Explore Universe
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// Main Portfolio Component
const Portfolio3DUniverse = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCentral, setShowCentral] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCentralClick = () => {
    setShowCentral(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
        <motion.div
          className="text-white text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            🌌
          </motion.div>
          <motion.h1
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Suraj Kumar's Universe
          </motion.h1>
          <motion.p
            className="text-xl text-white/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Initializing 3D Portfolio Experience...
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <Scene3D
            selectedProject={selectedProject}
            onProjectClick={handleProjectClick}
            onCentralClick={handleCentralClick}
          />
        </Suspense>
      </Canvas>

      {/* Enhanced UI Header */}
      <div className="absolute top-6 left-6 text-white z-40">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Suraj Kumar's 3D Universe
          </h1>
          <div className="space-y-1 text-sm text-white/80">
            <p>🖱️ Click nodes to explore details</p>
            <p>🖐️ Drag to orbit around universe</p>
            <p>🔍 Scroll to zoom in/out</p>
            <p>⚡ Auto-rotation enabled</p>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Legend */}
      <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-white z-40 border border-white/20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="font-bold mb-4 text-lg">Universe Map</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg"></div>
              <span>Projects (4 nodes)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-lg"></div>
              <span>Education Timeline</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg"></div>
              <span>Skills Constellation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 shadow-lg"></div>
              <span>Central Hub (Profile)</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-white/60">
              Connected universe showcasing full-stack development journey
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation Shortcuts */}
      <div className="absolute top-6 right-6 text-white z-40">
        <motion.div
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="font-bold mb-2">Quick Access</h3>
          <div className="space-y-2 text-sm">
            <a href="/classic" className="block hover:text-purple-300 transition-colors">
              📄 Classic Portfolio
            </a>
            <a href="/contact" className="block hover:text-purple-300 transition-colors">
              📧 Contact Form
            </a>
            <a href="/blog" className="block hover:text-purple-300 transition-colors">
              📝 Tech Blog
            </a>
          </div>
        </motion.div>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
        {showCentral && (
          <CentralOverlay onClose={() => setShowCentral(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio3DUniverse;
