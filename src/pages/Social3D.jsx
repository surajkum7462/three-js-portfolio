import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Cylinder, Torus, Stars, OrbitControls, Html } from "@react-three/drei";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import * as THREE from "three";

// 3D Social Media Icons
const GitHubIcon3D = ({ isHovered, onClick }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef} onClick={onClick}>
        {/* GitHub Cat Shape */}
        <Sphere args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isHovered ? "#ffffff" : "#333333"}
            emissive="#333333"
            emissiveIntensity={isHovered ? 0.4 : 0.2}
          />
        </Sphere>
        {/* Ears */}
        <Sphere args={[0.3]} position={[-0.5, 0.7, 0]}>
          <meshStandardMaterial color={isHovered ? "#ffffff" : "#333333"} />
        </Sphere>
        <Sphere args={[0.3]} position={[0.5, 0.7, 0]}>
          <meshStandardMaterial color={isHovered ? "#ffffff" : "#333333"} />
        </Sphere>
        {/* Eyes */}
        <Sphere args={[0.15]} position={[-0.3, 0.2, 0.8]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </Sphere>
        <Sphere args={[0.15]} position={[0.3, 0.2, 0.8]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
        </Sphere>
      </group>
    </Float>
  );
};

const LinkedInIcon3D = ({ isHovered, onClick }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={meshRef} onClick={onClick}>
        {/* LinkedIn Square */}
        <Box args={[1.5, 1.5, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isHovered ? "#ffffff" : "#0077B5"}
            emissive="#0077B5"
            emissiveIntensity={isHovered ? 0.6 : 0.3}
          />
        </Box>
        {/* LinkedIn "in" text representation */}
        <Box args={[0.2, 0.6, 0.4]} position={[-0.3, 0, 0.2]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.4, 0.3, 0.4]} position={[0.2, 0.15, 0.2]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
        <Box args={[0.4, 0.3, 0.4]} position={[0.2, -0.3, 0.2]}>
          <meshStandardMaterial color="#ffffff" />
        </Box>
      </group>
    </Float>
  );
};

const TwitterIcon3D = ({ isHovered, onClick }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.025;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={meshRef} onClick={onClick}>
        {/* Twitter Bird Body */}
        <Sphere args={[0.8, 16, 8]} position={[0, 0, 0]} scale={[1.3, 1, 1]}>
          <meshStandardMaterial
            color={isHovered ? "#ffffff" : "#1DA1F2"}
            emissive="#1DA1F2"
            emissiveIntensity={isHovered ? 0.5 : 0.3}
          />
        </Sphere>
        {/* Beak */}
        <Cylinder args={[0.1, 0.2, 0.5]} position={[1, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#FFA500" />
        </Cylinder>
        {/* Wing */}
        <Sphere args={[0.4, 8, 4]} position={[0.3, 0, 0.3]} scale={[1.5, 1, 0.3]}>
          <meshStandardMaterial
            color={isHovered ? "#ffffff" : "#0F7FB5"}
            emissive="#0F7FB5"
            emissiveIntensity={0.2}
          />
        </Sphere>
      </group>
    </Float>
  );
};

const InstagramIcon3D = ({ isHovered, onClick }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef} onClick={onClick}>
        {/* Instagram Camera Body */}
        <Box args={[1.4, 1.4, 0.6]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={isHovered ? "#ffffff" : "#E4405F"}
            emissive="#E4405F"
            emissiveIntensity={isHovered ? 0.4 : 0.2}
          />
        </Box>
        {/* Camera Lens */}
        <Cylinder args={[0.4, 0.4, 0.3]} position={[0, 0, 0.45]}>
          <meshStandardMaterial
            color="#333333"
            emissive="#333333"
            emissiveIntensity={0.3}
          />
        </Cylinder>
        {/* Inner Lens */}
        <Cylinder args={[0.2, 0.2, 0.4]} position={[0, 0, 0.5]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </Cylinder>
      </group>
    </Float>
  );
};

// Floating Social Elements
const FloatingSocialElement = ({ position, color, type, scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.4;
    }
  });

  const Element = type === 'sphere' ? Sphere : type === 'box' ? Box : Torus;
  const args = type === 'sphere' ? [0.6 * scale] : 
               type === 'box' ? [1 * scale, 1 * scale, 0.3 * scale] :
               [0.8 * scale, 0.2 * scale, 8, 32];

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Element ref={meshRef} position={position} args={args}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Element>
    </Float>
  );
};

// Social Background
const SocialBackground3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[0, 0, 15]} intensity={0.4} color="#EC4899" />
        
        <color attach="background" args={['#0a0a0a']} />
        <Stars radius={120} depth={60} count={2000} factor={4} fade speed={1} />
        
        {/* Floating social elements */}
        <FloatingSocialElement position={[-10, 4, -6]} color="#1DA1F2" type="sphere" />
        <FloatingSocialElement position={[10, -3, -5]} color="#E4405F" type="box" />
        <FloatingSocialElement position={[-8, -5, -4]} color="#0077B5" type="torus" />
        <FloatingSocialElement position={[8, 5, -7]} color="#333333" type="sphere" scale={0.8} />
        <FloatingSocialElement position={[0, 8, -8]} color="#FF0000" type="box" scale={1.2} />
        <FloatingSocialElement position={[-6, 0, -3]} color="#25D366" type="torus" scale={0.7} />
        <FloatingSocialElement position={[6, -7, -5]} color="#7289DA" type="sphere" scale={1.1} />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  );
};

const Social3D = () => {
  const [hoveredPlatform, setHoveredPlatform] = useState(null);
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

  const socialPlatforms = [
    {
      name: "GitHub",
      url: "https://github.com/surajkum7462",
      description: "Open source repositories and code contributions",
      component: GitHubIcon3D,
      icon: FaGithub,
      color: "#333333"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/surajkumar",
      description: "Professional network and career updates",
      component: LinkedInIcon3D,
      icon: FaLinkedin,
      color: "#0077B5"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/surajkumar",
      description: "Tech insights and development thoughts",
      component: TwitterIcon3D,
      icon: FaTwitter,
      color: "#1DA1F2"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/surajkumar",
      description: "Behind the scenes coding journey",
      component: InstagramIcon3D,
      icon: FaInstagram,
      color: "#E4405F"
    }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 3D Background */}
      <SocialBackground3D />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-black/80 z-10" />

      {/* Responsive Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
            >
              SK
            </Link>

            <div className="hidden sm:flex items-center space-x-6">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/projects" className="text-white/80 hover:text-white transition-colors">
                Projects
              </Link>
              <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                Contact
              </Link>
              <Link to="/socials" className="text-white font-semibold">
                Social
              </Link>
            </div>

            <button className="sm:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Interactive Cursor - Hidden on mobile */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-screen hidden lg:block"
        animate={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20">
        <div className="max-w-6xl w-full">

          {/* Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
              whileHover={{ scale: 1.02 }}
            >
              Social Universe
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Connect with me across different platforms and explore my digital presence
            </motion.p>
          </motion.div>

          {/* Compact Social Platform Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-16">
            {socialPlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredPlatform(platform.name)}
                onHoverEnd={() => setHoveredPlatform(null)}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 group-hover:border-purple-400/50 transition-all duration-300 text-center h-full flex flex-col"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSocialClick(platform.url)}
                >
                  {/* Exact Platform Icon */}
                  <motion.div
                    className="mb-4 flex justify-center"
                    whileHover={{
                      scale: 1.2,
                      rotate: 5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <platform.icon
                      className="text-5xl transition-colors duration-300"
                      style={{
                        color: hoveredPlatform === platform.name ? '#ffffff' : platform.color
                      }}
                    />
                  </motion.div>

                  {/* Platform Name */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {platform.name}
                  </h3>

                  {/* Short Description */}
                  <p className="text-white/70 text-sm mb-4 flex-grow leading-relaxed">
                    {platform.description}
                  </p>

                  {/* Connect Button */}
                  <motion.div
                    className="mt-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="py-2 px-4 bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded-lg text-white font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-300 border border-white/20"
                    >
                      Connect
                    </div>
                  </motion.div>
                </motion.div>

                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: `radial-gradient(circle, ${platform.color}20 0%, transparent 70%)`,
                    filter: 'blur(20px)'
                  }}
                  animate={{
                    scale: hoveredPlatform === platform.name ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredPlatform === platform.name ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255,255,255,0.1)"
              }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Let's Stay Connected!</h2>
              <p className="text-white/80 mb-6 text-base sm:text-lg px-4">
                Follow my journey, contribute to my projects, or just say hello
              </p>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {socialPlatforms.map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                  >
                    <platform.icon className="text-lg" style={{ color: platform.color }} />
                    {platform.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Social3D;
