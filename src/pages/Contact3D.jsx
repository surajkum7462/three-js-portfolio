// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Float, Sphere, Box, Cylinder, Torus, Stars, OrbitControls } from "@react-three/drei";
// import { Link } from "react-router-dom";
// import * as THREE from "three";

// // 3D Form Elements
// const FloatingFormElement = ({ position, color, type, scale = 1 }) => {
//   const meshRef = useRef();

//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += 0.01;
//       meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
//       meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
//     }
//   });

//   const Element = type === 'sphere' ? Sphere : type === 'box' ? Box : Cylinder;
//   const args = type === 'sphere' ? [0.5 * scale] :
//                type === 'box' ? [0.8 * scale, 0.8 * scale, 0.2 * scale] :
//                [0.3 * scale, 0.3 * scale, 1 * scale];

//   return (
//     <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
//       <Element ref={meshRef} position={position} args={args}>
//         <meshStandardMaterial
//           color={color}
//           transparent
//           opacity={0.7}
//           emissive={color}
//           emissiveIntensity={0.3}
//         />
//       </Element>
//     </Float>
//   );
// };

// // 3D Email Icon
// const EmailIcon3D = ({ isHovered }) => {
//   const meshRef = useRef();

//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
//       meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
//     }
//   });

//   return (
//     <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
//       <group ref={meshRef}>
//         {/* Email envelope base */}
//         <Box args={[1.5, 1, 0.1]} position={[0, 0, 0]}>
//           <meshStandardMaterial
//             color={isHovered ? "#ffffff" : "#8B5CF6"}
//             emissive="#8B5CF6"
//             emissiveIntensity={isHovered ? 0.6 : 0.3}
//           />
//         </Box>
//         {/* Email flap */}
//         <Box args={[1.5, 0.8, 0.1]} position={[0, 0.1, 0.05]} rotation={[Math.PI / 6, 0, 0]}>
//           <meshStandardMaterial
//             color={isHovered ? "#EC4899" : "#A855F7"}
//             emissive="#EC4899"
//             emissiveIntensity={0.2}
//           />
//         </Box>
//       </group>
//     </Float>
//   );
// };

// // Contact Background
// const ContactBackground3D = () => {
//   return (
//     <div className="fixed inset-0 -z-10">
//       <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
//         <ambientLight intensity={0.3} />
//         <pointLight position={[10, 10, 10]} intensity={1} />
//         <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
//         <pointLight position={[0, 0, 15]} intensity={0.4} color="#EC4899" />

//         <color attach="background" args={['#0a0a0a']} />
//         <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />

//         {/* Floating form elements around the scene */}
//         <FloatingFormElement position={[-8, 3, -5]} color="#8B5CF6" type="box" />
//         <FloatingFormElement position={[8, -3, -5]} color="#EC4899" type="sphere" />
//         <FloatingFormElement position={[-6, -4, -3]} color="#F59E0B" type="cylinder" />
//         <FloatingFormElement position={[6, 4, -3]} color="#10B981" type="box" scale={0.8} />
//         <FloatingFormElement position={[0, 6, -8]} color="#3B82F6" type="sphere" scale={1.2} />
//         <FloatingFormElement position={[-4, 0, -6]} color="#EF4444" type="cylinder" scale={0.6} />
//         <FloatingFormElement position={[4, -6, -4]} color="#8B5CF6" type="box" scale={1.1} />

//         <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
//       </Canvas>
//     </div>
//   );
// };

// const Contact3D = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth) * 2 - 1,
//         y: -(e.clientY / window.innerHeight) * 2 + 1
//       });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Simulate form submission
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       console.log("Contact form submission:", formData);

//       setFormData({ name: "", email: "", message: "" });
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 5000);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* 3D Background */}
//       <ContactBackground3D />

//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/40 to-black/80 z-10" />

//       {/* Responsive Navigation */}
//       <motion.nav
//         className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10"
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-16">
//             <Link
//               to="/"
//               className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
//             >
//               SK
//             </Link>

//             <div className="hidden sm:flex items-center space-x-6">
//               <Link to="/" className="text-white/80 hover:text-white transition-colors">
//                 Home
//               </Link>
//               <Link to="/about" className="text-white/80 hover:text-white transition-colors">
//                 About
//               </Link>
//               <Link to="/projects" className="text-white/80 hover:text-white transition-colors">
//                 Projects
//               </Link>
//               <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
//                 Blog
//               </Link>
//               <Link to="/contact" className="text-white font-semibold">
//                 Contact
//               </Link>
//               <Link to="/socials" className="text-white/80 hover:text-white transition-colors">
//                 Social
//               </Link>
//             </div>

//             <button className="sm:hidden text-white">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Interactive Cursor - Hidden on mobile */}
//       <motion.div
//         className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-screen hidden lg:block"
//         animate={{
//           x: mousePosition.x * 30,
//           y: mousePosition.y * 30
//         }}
//         transition={{ type: "spring", damping: 30, stiffness: 200 }}
//       />

//       {/* Main Content */}
//       <div className="relative z-20 min-h-screen flex items-center justify-center p-4 sm:p-6 pt-20">
//         <div className="max-w-4xl w-full">

//           {/* Header */}
//           <motion.div
//             className="text-center mb-8 sm:mb-12"
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <motion.h1
//               className="text-4xl sm:text-6xl md:text-8xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
//               whileHover={{ scale: 1.02 }}
//             >
//               Let's Connect
//             </motion.h1>

//             <motion.p
//               className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed px-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               Ready to bring your ideas to life? Let's discuss your next project
//             </motion.p>
//           </motion.div>

//           {/* 3D Email Icon - Hidden on mobile for performance */}
//           <motion.div
//             className="h-32 mb-8 hidden sm:block"
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           >
//             <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
//               <ambientLight intensity={0.4} />
//               <pointLight position={[3, 3, 3]} intensity={1} />
//               <pointLight position={[-3, -3, -3]} intensity={0.5} color="#8B5CF6" />

//               <EmailIcon3D isHovered={false} />
//             </Canvas>
//           </motion.div>

//           {/* 3D Floating Form */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, y: 100 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.4 }}
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"></div>

//             <form
//               onSubmit={handleSubmit}
//               className="relative bg-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl"
//             >
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">

//                 {/* Name Field */}
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileFocus={{ scale: 1.02 }}
//                 >
//                   <label className="block text-white font-bold text-base sm:text-lg mb-2 sm:mb-3">
//                     Your Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
//                     placeholder="Enter your full name"
//                     value={formData.name}
//                     onChange={handleChange}
//                   />
//                 </motion.div>

//                 {/* Email Field */}
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   whileFocus={{ scale: 1.02 }}
//                 >
//                   <label className="block text-white font-bold text-base sm:text-lg mb-2 sm:mb-3">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 text-sm sm:text-base"
//                     placeholder="your@email.com"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </motion.div>
//               </div>

//               {/* Message Field */}
//               <motion.div
//                 className="mb-6 sm:mb-8"
//                 whileHover={{ scale: 1.01 }}
//                 whileFocus={{ scale: 1.01 }}
//               >
//                 <label className="block text-white font-bold text-base sm:text-lg mb-2 sm:mb-3">
//                   Your Message
//                 </label>
//                 <textarea
//                   name="message"
//                   rows="5"
//                   required
//                   className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 resize-none text-sm sm:text-base"
//                   placeholder="Tell me about your project, ideas, or just say hello..."
//                   value={formData.message}
//                   onChange={handleChange}
//                 ></textarea>
//               </motion.div>

//               {/* Submit Button */}
//               <div className="text-center">
//                 <motion.button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ${
//                     isSubmitting
//                       ? "bg-purple-600/50 cursor-not-allowed"
//                       : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
//                   } text-white border border-white/20 backdrop-blur-sm`}
//                   whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
//                   whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
//                 >
//                   {isSubmitting ? (
//                     <motion.div
//                       className="flex items-center gap-3"
//                       animate={{ opacity: [0.5, 1, 0.5] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     >
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Sending Message...
//                     </motion.div>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </motion.button>
//               </div>

//               {/* Success Message */}
//               {showSuccess && (
//                 <motion.div
//                   className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-300 text-center backdrop-blur-sm"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                 >
//                   Message sent successfully! I'll get back to you soon.
//                 </motion.div>
//               )}
//             </form>
//           </motion.div>

//           {/* Contact Info */}
//           <motion.div
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1 }}
//           >
//             {[
//               { title: "Email", value: "surajkumar@example.com", icon: "📧" },
//               { title: "Location", value: "Bhubaneswar, India", icon: "📍" },
//               { title: "Response Time", value: "24-48 Hours", icon: "⚡" }
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="text-center bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10"
//                 whileHover={{
//                   scale: 1.02,
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
//                 }}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.2 + index * 0.1 }}
//               >
//                 <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{item.icon}</div>
//                 <h3 className="text-white font-bold mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h3>
//                 <p className="text-white/80 text-xs sm:text-sm break-words">{item.value}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact3D;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as THREE from "three";

function Contact3D() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const mountRef = useRef(null); // ✅ Reference for the 3D canvas
  const [loading, setLoading] = useState(false); // ⬅️ Add this

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ⬅️ Start loading

    try {
      await axios.post(
        "https://portfolio-backend-o3lx.onrender.com/api/contact",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccessMsg("Message sent successfully!");
      setErrorMsg("");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setErrorMsg("Failed to send message. Please try again later.");
      setSuccessMsg("");
    } finally {
      setLoading(false); // ⬅️ End loading regardless of result
    }
  };

  // ✅ 3D background setup with safe cleanup
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Particles
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xff44ff, size: 0.03 });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // ✅ Safe cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 z-0"></div>

      {/* Contact Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white bg-opacity-90 shadow-lg rounded-xl p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Contact Me
          </h2>

          {successMsg && <p className="text-green-600">{successMsg}</p>}
          {errorMsg && <p className="text-red-600">{errorMsg}</p>}

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full p-2 border rounded mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded hover:opacity-90 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact3D;
