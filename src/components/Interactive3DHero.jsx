import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Box, Torus, Float, Text3D, OrbitControls, Stars, Effects } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const InteractiveShape = ({ position, color, type, onHover, isHovered }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      if (hovered || isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const ShapeComponent = type === 'sphere' ? Sphere : 
                        type === 'box' ? Box : Torus;

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <ShapeComponent
        ref={meshRef}
        position={position}
        args={type === 'torus' ? [1, 0.3, 8, 32] : [1]}
        onPointerOver={() => {
          setHovered(true);
          onHover && onHover(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover && onHover(false);
        }}
      >
        <meshStandardMaterial
          color={hovered || isHovered ? '#ffffff' : color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={hovered || isHovered ? 0.5 : 0.2}
        />
      </ShapeComponent>
    </Float>
  );
};

const ParticleField = () => {
  const points = useRef();
  const particleCount = 1000;
  
  const particles = React.useMemo(() => {
    const temp = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 50;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 50;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      points.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
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
        size={0.05}
        color="#8B5CF6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const CameraController = ({ mousePosition }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePosition.x * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePosition.y * 2, 0.05);
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

const Interactive3DHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredShape, setHoveredShape] = useState(null);
  const [skills] = useState([
    { name: 'React', position: [-3, 2, 0], color: '#61DAFB', type: 'sphere' },
    { name: 'Three.js', position: [3, 2, 0], color: '#000000', type: 'box' },
    { name: 'Spring Boot', position: [-3, -2, 0], color: '#6DB33F', type: 'torus' },
    { name: 'TypeScript', position: [3, -2, 0], color: '#3178C6', type: 'sphere' },
    { name: 'Node.js', position: [0, 0, -2], color: '#339933', type: 'box' }
  ]);

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
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.3} penumbra={1} />
        
        <Stars radius={100} depth={50} count={2000} factor={3} />
        
        <ParticleField />
        
        {skills.map((skill, index) => (
          <InteractiveShape
            key={skill.name}
            position={skill.position}
            color={skill.color}
            type={skill.type}
            onHover={(hovered) => setHoveredShape(hovered ? skill.name : null)}
            isHovered={hoveredShape === skill.name}
          />
        ))}
        
        <CameraController mousePosition={mousePosition} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Skill Information Overlay */}
      {hoveredShape && (
        <motion.div
          className="absolute top-4 right-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <h3 className="text-white font-bold text-lg">{hoveredShape}</h3>
          <p className="text-white/80 text-sm">
            {hoveredShape === 'React' && 'Frontend Framework for building user interfaces'}
            {hoveredShape === 'Three.js' && '3D graphics library for web applications'}
            {hoveredShape === 'Spring Boot' && 'Java framework for building enterprise applications'}
            {hoveredShape === 'TypeScript' && 'Statically typed superset of JavaScript'}
            {hoveredShape === 'Node.js' && 'JavaScript runtime for server-side development'}
          </p>
        </motion.div>
      )}

      {/* Interactive Cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  );
};

export default Interactive3DHero;
