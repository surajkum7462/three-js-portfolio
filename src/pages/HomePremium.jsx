import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Text3D, OrbitControls, Stars, Torus } from '@react-three/drei';
import Background3D from '../components/Background3D';

const FloatingOrb = ({ position, color, size = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} position={position} args={[size]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
};

const ProfileImage3D = () => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Torus ref={meshRef} args={[2, 0.1, 8, 32]} position={[0, 0, -1]}>
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#4C1D95"
          emissiveIntensity={0.2}
        />
      </Torus>
    </Float>
  );
};

const HomePremium = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const fullText = "Welcome to Premium Portfolio";
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

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

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 70;
    const timeout = setTimeout(() => {
      setDisplayedText(fullText.slice(0, index));

      if (!isDeleting && index < fullText.length) {
        setIndex(prev => prev + 1);
      } else if (!isDeleting && index === fullText.length) {
        setIsDeleting(true);
      } else if (isDeleting && index > 0) {
        setIndex(prev => prev - 1);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, fullText]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <Background3D />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/30 to-black/80 z-10" />

      {/* Interactive Cursor Effect */}
      <motion.div
        className="fixed w-6 h-6 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col min-h-screen text-white">
        {/* Header */}
        <header className="text-center py-8">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {displayedText}
            <span className="animate-pulse">|</span>
          </motion.h1>
        </header>

        {/* Main Content Grid */}
        <div className="flex-grow flex items-center justify-center px-6">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <motion.div
              className="space-y-8"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.div
                className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                whileHover={{ scale: 1.05 }}
              >
                Hi, I'm
              </motion.div>
              
              <motion.div
                className="text-4xl md:text-6xl font-bold text-yellow-300 drop-shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 20px rgba(253, 224, 71, 0.5)"
                }}
              >
                Suraj Kumar
              </motion.div>

              <motion.p 
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Premium Full Stack Developer
              </motion.p>

              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.15)" }}
              >
                <h3 className="text-2xl font-bold text-purple-300 mb-4">Tech Stack</h3>
                <div className="grid grid-cols-2 gap-4 text-white/90">
                  <div>Java • Spring Boot</div>
                  <div>React • TypeScript</div>
                  <div>Three.js • WebGL</div>
                  <div>Tailwind CSS</div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-pink-300 mb-3">DSA & Problem Solving</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Advanced Data Structures & Algorithms</li>
                  <li>• Complex Problem Solving (LeetCode 500+)</li>
                  <li>• System Design & Architecture</li>
                  <li>• Performance Optimization</li>
                </ul>
              </motion.div>

              <motion.div className="flex space-x-4">
                <motion.a
                  href="/projects"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg shadow-2xl border border-white/20 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚀 View Projects
                </motion.a>
                
                <motion.a
                  href="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl font-bold text-lg border border-white/30"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  💬 Contact
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Scene */}
            <motion.div
              className="h-96 lg:h-full"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="relative h-full rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[5, 5, 5]} intensity={1} />
                  <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B5CF6" />
                  
                  <Stars radius={50} depth={30} count={500} factor={2} />
                  
                  <FloatingOrb position={[-2, 2, 0]} color="#8B5CF6" size={0.8} />
                  <FloatingOrb position={[2, -2, 0]} color="#EC4899" size={0.6} />
                  <FloatingOrb position={[0, 0, -2]} color="#F59E0B" size={0.4} />
                  
                  <ProfileImage3D />
                  
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate 
                    autoRotateSpeed={1}
                  />
                </Canvas>

                {/* Profile Image Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.img
                    src="/images/best photo.jpg"
                    alt="Suraj Kumar"
                    className="w-48 h-48 rounded-full border-4 border-white/30 shadow-2xl object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6">
          <motion.div
            className="bg-white/5 backdrop-blur-lg border-t border-white/10 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white/80">
              © {new Date().getFullYear()} Suraj Kumar • Premium Portfolio Experience
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default HomePremium;
