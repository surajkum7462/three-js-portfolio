// // src/pages/Home.jsx
// import { motion } from 'framer-motion';

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white flex items-center justify-center px-4">
//       <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
//         {/* Left Side - Text */}
//         <motion.div
//           initial={{ x: -80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
//             Hi, I'm <span className="text-yellow-300">Suraj Kumar</span>
//           </h1>
//           <p className="text-lg md:text-xl text-white/90 mb-6">
//             Full Stack Developer | Java • Spring Boot • React • Tailwind CSS
//           </p>
//           <a
//             href="/projects"
//             className="inline-block px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
//           >
//             View My Work
//           </a>
//         </motion.div>

//         {/* Right Side - Image */}
//         <motion.div
//           initial={{ x: 80, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 1 }}
//           className="flex justify-center"
//         >
//           <img
//             src="/images/best photo.jpg"  // <- change the filename to your image
//             alt="Suraj Kumar"
//             className="rounded-3xl w-64 md:w-80 shadow-2xl border-4 border-white"
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// src/pages/Home.jsx
// import { motion } from 'framer-motion';

// const Home = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white flex items-center justify-center px-4 pt-20">
//       <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

//         {/* Left Side - Text */}
//         <motion.div
//           initial={{ x: -100, opacity: 0, rotateY: 90 }}
//           animate={{ x: 0, opacity: 1, rotateY: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
//             Hi, I'm <span className="text-yellow-300">Suraj Kumar</span>
//           </h1>
//           <p className="text-lg md:text-xl text-white/90 mb-4">
//             Full Stack Developer | Java • Spring Boot • React • Tailwind CSS
//           </p>
//           <p className="text-sm md:text-base italic text-white/80 mb-6">
//             "Success is not final, failure is not fatal: it is the courage to continue that counts."
//           </p>

//           {/* Skills Section */}
//           <div className="bg-white bg-opacity-10 p-4 rounded-xl mb-6">
//             <h2 className="text-xl font-semibold text-yellow-300 mb-2">DSA & Core Skills</h2>
//             <ul className="list-disc list-inside text-white/90 space-y-1">
//               <li>Data Structures & Algorithms (DSA)</li>
//               <li>Problem Solving (LeetCode, GFG)</li>
//               <li>OOPs, Collections, Recursion</li>
//               <li>Trees, Graphs, DP, LinkedList</li>
//               <li>Time & Space Complexity</li>
//             </ul>
//           </div>

//           <a
//             href="/projects"
//             className="inline-block px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
//           >
//             View My Work
//           </a>
//         </motion.div>

//         {/* Right Side - Image */}
//         <motion.div
//           initial={{ x: 100, opacity: 0, rotateY: -90 }}
//           animate={{ x: 0, opacity: 1, rotateY: 0 }}
//           transition={{ duration: 1 }}
//           className="flex justify-center"
//         >
//           <img
//             src="/images/best photo.jpg"
//             alt="Suraj Kumar"
//             className="rounded-3xl w-64 md:w-80 shadow-2xl border-4 border-white transform hover:scale-105 transition duration-500"
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const fullText = "Welcome to my portfolio";
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-600 text-white relative overflow-hidden">

      {/* 3D Animated Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 blur-xl opacity-30"
            style={{
              width: `${100 + Math.random() * 150}px`,
              height: `${100 + Math.random() * 150}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="text-2xl md:text-3xl font-bold text-center py-4 pb-10 z-10 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400 drop-shadow-xl">
          {displayedText}
        </span>
      </nav>

      {/* Main content */}
      <div className="flex-grow flex items-center justify-center px-4 pt-16 z-10 relative">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left Side */}
          <motion.div
            initial={{ x: -100, opacity: 0, rotateY: 90 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              Hi, I'm <span className="text-yellow-300">Suraj Kumar</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4">
              Full Stack Developer | Java • Spring Boot • React • Tailwind CSS
            </p>
            <p className="text-sm md:text-base italic text-white/80 mb-6">
              "Success is not final, failure is not fatal: it is the courage to continue that counts."
            </p>

            {/* Skills */}
            <div className="bg-white bg-opacity-10 p-4 rounded-xl mb-6">
              <h2 className="text-xl font-semibold text-yellow-300 mb-2">DSA & Core Skills</h2>
              <ul className="list-disc list-inside text-white/90 space-y-1">
                <li>Data Structures & Algorithms (DSA)</li>
                <li>Problem Solving (LeetCode, GFG)</li>
                <li>OOPs, Collections, Recursion</li>
                <li>Trees, Graphs, DP, LinkedList</li>
                <li>Time & Space Complexity</li>
              </ul>
            </div>

            <a
              href="/projects"
              className="inline-block px-6 py-3 bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-300 transition transform hover:scale-105 shadow-lg"
            >
              View My Work
            </a>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ x: 100, opacity: 0, rotateY: -90 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <img
              src="/images/best photo.jpg"
              alt="Suraj Kumar"
              className="rounded-3xl w-64 md:w-80 shadow-2xl border-4 border-white transform hover:scale-105 transition duration-500"
            />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-white/80 text-sm py-4 z-10 relative bg-white/5 backdrop-blur-md shadow-inner border-t border-white/10 mt-8">
        © {new Date().getFullYear()} Suraj Kumar. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
