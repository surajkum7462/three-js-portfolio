import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Octahedron, Torus, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, shape, color, speed = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  const ShapeComponent = shape === 'sphere' ? Sphere : 
                        shape === 'box' ? Box : 
                        shape === 'octahedron' ? Octahedron : Torus;

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <ShapeComponent ref={meshRef} position={position} args={[0.5]}>
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

const AnimatedShapes = () => {
  const shapes = useMemo(() => {
    const shapeTypes = ['sphere', 'box', 'octahedron', 'torus'];
    const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'];
    
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ],
      shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: 0.5 + Math.random() * 1.5
    }));
  }, []);

  return (
    <>
      {shapes.map((shape) => (
        <FloatingShape
          key={shape.id}
          position={shape.position}
          shape={shape.shape}
          color={shape.color}
          speed={shape.speed}
        />
      ))}
    </>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={1000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        
        <AnimatedShapes />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Background3D;
