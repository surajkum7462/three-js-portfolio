// src/pages/Socials.jsx
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

const socials = [
  {
    icon: <FaGithub size={30} />, 
    label: "GitHub",
    url: "https://github.com/surajkum7462",
    color: "bg-gray-900 text-white",
  },
  {
    icon: <FaLinkedin size={30} />, 
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/suraj-kumar-337a27227",
    color: "bg-blue-700 text-white",
  },
  {
    icon: <FaTwitter size={30} />, 
    label: "Twitter",
    url: "https://x.com/SurajKu9683687?t=c7ayh7Mn_2RZc6k4ofm84w&s=09",
    color: "bg-blue-400 text-white",
  },
  {
    icon: <FaInstagram size={30} />, 
    label: "Instagram",
    url: "https://www.instagram.com/sawsuraj7?igsh=MWp0dGU1NzNpcHJnbA==",
    color: "bg-pink-500 text-white",
  },
  {
  icon: <FaEnvelope size={30} />,
  label: "Email",
  url: "mailto:kumarsuraj7462998828@gmail.com", 
  color: "bg-yellow-400 text-black",
}
];

const Socials = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 text-gray-900 py-20 px-6 overflow-hidden relative">
      {/* Background Animated Bubbles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0], y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 0.3 }}
            className="w-2.5 h-2.5 bg-yellow-300/30 rounded-full absolute animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.h2
        className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-transparent bg-clip-text drop-shadow-xl"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Connect With Me 🌐
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {socials.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-4 p-5 rounded-2xl shadow-xl hover:shadow-yellow-300/50 border-2 border-transparent hover:border-yellow-400 transition-all ${social.color}`}
          >
            <div className="text-2xl">{social.icon}</div>
            <span className="font-bold text-lg tracking-wide">{social.label}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Socials;