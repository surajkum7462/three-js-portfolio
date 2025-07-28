import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Torus, Stars, OrbitControls, Text3D } from "@react-three/drei";
import SkillIcon3D from "../components/SkillIcon3D.jsx";
import * as THREE from "three";


const FloatingShape3D = ({ position, color, size, type }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  const ShapeComponent = type === 'sphere' ? Sphere : type === 'box' ? Box : Torus;
  const args = type === 'torus' ? [size, size * 0.3, 8, 32] : [size];

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <ShapeComponent ref={meshRef} position={position} args={args}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.7}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </ShapeComponent>
    </Float>
  );
};

const ParticleField3D = () => {
  const points = useRef();
  const particleCount = 800;
  
  const particles = React.useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 40;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 40;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const Background3DAbout = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        
        <Stars radius={100} depth={50} count={1500} factor={3} fade speed={1} />
        
        <ParticleField3D />
        
        <FloatingShape3D position={[-8, 3, -5]} color="#8B5CF6" size={1} type="sphere" />
        <FloatingShape3D position={[8, -3, -5]} color="#EC4899" size={0.8} type="box" />
        <FloatingShape3D position={[-6, -4, -3]} color="#F59E0B" size={0.6} type="torus" />
        <FloatingShape3D position={[6, 4, -3]} color="#10B981" size={0.7} type="sphere" />
        <FloatingShape3D position={[0, 0, -8]} color="#3B82F6" size={1.2} type="box" />
        <FloatingShape3D position={[-4, 0, -2]} color="#EF4444" size={0.5} type="torus" />
        <FloatingShape3D position={[4, -2, -6]} color="#8B5CF6" size={0.9} type="sphere" />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>
    </div>
  );
};

const timeline = [
  {
    year: "2018–2019",
    title: "Matriculation",
    description: "Completed 10th grade with 86% from High School Tisri Barahmasiya.",
    achievement: "Academic Excellence"
  },
  {
    year: "2019–2021", 
    title: "Intermediate Science",
    description: "Completed 12th with 84% from +2 High School Tisri Barahmasiya.",
    achievement: "Science Stream"
  },
  {
    year: "2022–2026",
    title: "B.Tech in Computer Science",
    description: "Pursuing B.Tech at Trident Academy of Technology with CGPA: 8.5.",
    achievement: "Engineering Student"
  },
];

const skills = [
  { name: "HTML5", category: "Frontend", level: "Expert" },
  { name: "CSS3", category: "Frontend", level: "Expert" },
  { name: "JavaScript", category: "Frontend", level: "Advanced" },
  { name: "React.js", category: "Frontend", level: "Advanced" },
  { name: "Three.js", category: "Frontend", level: "Intermediate" },
  { name: "Spring Boot", category: "Backend", level: "Advanced" },
  { name: "Java", category: "Backend", level: "Expert" },
  { name: "MySQL", category: "Database", level: "Advanced" },
  { name: "Git & GitHub", category: "Tools", level: "Advanced" },
  { name: "Docker", category: "DevOps", level: "Intermediate" },
  { name: "Maven", category: "Tools", level: "Advanced" },
  { name: "JUnit", category: "Testing", level: "Intermediate" }
];

const AboutPremium = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <Background3DAbout />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-black/80 z-10" />

      {/* Interactive Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-screen"
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
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            whileHover={{ scale: 1.02 }}
          >
            About Me
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Passionate Full Stack Developer crafting innovative digital experiences with cutting-edge technology
          </motion.p>
        </motion.div>

        {/* Personal Introduction */}
        <motion.div
          className="max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-purple-300 mb-6">My Journey</h2>
            <p className="text-white/90 text-lg leading-relaxed mb-6">
              I'm Suraj Kumar, a passionate computer science student and full-stack developer who believes in the power of technology to transform ideas into reality. Currently pursuing my B.Tech in Computer Science Engineering at Trident Academy of Technology with a strong academic record.
            </p>
            <p className="text-white/90 text-lg leading-relaxed">
              My journey in programming started with curiosity and has evolved into a deep passion for creating scalable applications, solving complex algorithms, and building user-centric experiences that make a difference.
            </p>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-white px-4">Educational Timeline</h2>

          {/* Desktop Timeline */}
          <div className="relative hidden lg:block">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <motion.div
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    <h3 className="text-2xl font-bold text-purple-300 mb-2">{item.title}</h3>
                    <p className="text-yellow-300 font-semibold mb-3">{item.year}</p>
                    <p className="text-white/90 leading-relaxed mb-3">{item.description}</p>
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full text-sm text-white">
                      {item.achievement}
                    </span>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="relative flex items-center justify-center w-2/12">
                  <motion.div
                    className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border-4 border-white/20 shadow-lg"
                    whileHover={{ scale: 1.3 }}
                  />
                </div>

                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden relative px-4">
            {/* Mobile Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className="relative flex items-start mb-8 last:mb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Mobile Timeline Dot */}
                <motion.div
                  className="absolute left-6 w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full border-2 border-white/20 shadow-lg flex-shrink-0 mt-2"
                  whileHover={{ scale: 1.2 }}
                />

                {/* Mobile Content */}
                <div className="ml-16">
                  <motion.div
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/20"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-purple-300 mb-2">{item.title}</h3>
                    <p className="text-yellow-300 font-semibold mb-3 text-sm sm:text-base">{item.year}</p>
                    <p className="text-white/90 leading-relaxed mb-3 text-sm sm:text-base">{item.description}</p>
                    <span className="inline-block px-2 py-1 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-full text-xs sm:text-sm text-white">
                      {item.achievement}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section with 3D Icons */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Technical Expertise</h2>
          <p className="text-center text-white/80 mb-12 text-lg">Hover over each skill to see interactive 3D icons</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <SkillIcon3D key={index} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
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
            Let's Connect and Build Something Amazing
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPremium;
