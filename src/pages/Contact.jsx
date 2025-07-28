// // src/pages/Contact.jsx
// import { useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showInlineToast, setShowInlineToast] = useState(null);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setShowInlineToast(null);

//     try {
//       // Simulate form submission since backend is not available
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // Log form data for demonstration (in real app, this would be sent to backend)
//       console.log("Contact form submission:", formData);

//       setFormData({ name: "", email: "", message: "" });
//       setShowInlineToast("success");
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setShowInlineToast("error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-pink-50 via-orange-100 to-yellow-50 text-gray-900 py-20 px-6 overflow-hidden">
//       {/* Background Animated Dots */}
//       <div className="absolute inset-0 -z-10 pointer-events-none">
//         {[...Array(40)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0 }}
//             animate={{
//               opacity: [0, 0.4, 0],
//               y: [0, -20, 0],
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               delay: i * 0.25,
//             }}
//             className="w-2.5 h-2.5 bg-pink-400/20 rounded-full absolute animate-ping"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}
//       </div>

//       <ToastContainer />

//       <motion.h2
//         className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-xl"
//         initial={{ opacity: 0, y: -60 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
// Let's Connect
//       </motion.h2>

//       <motion.form
//         onSubmit={handleSubmit}
//         className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl space-y-6 border border-yellow-200"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div>
//           <label className="block text-lg font-bold text-pink-700">
//             Your Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             required
//             className="w-full mt-2 p-3 rounded-md bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block text-lg font-bold text-pink-700">
//             Email Address
//           </label>
//           <input
//             type="email"
//             name="email"
//             required
//             className="w-full mt-2 p-3 rounded-md bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block text-lg font-bold text-pink-700">
//             Your Message
//           </label>
//           <textarea
//             name="message"
//             rows="6"
//             required
//             className="w-full mt-2 p-3 rounded-md bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
//             value={formData.message}
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <div className="text-center">
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full text-black py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105 mb-2 ${
//               isSubmitting
//                 ? "bg-pink-300 cursor-not-allowed"
//                 : "bg-gradient-to-r from-pink-400 to-yellow-500 hover:from-pink-300 hover:to-yellow-400"
//             }`}
//           >
// {isSubmitting ? "Please wait..." : "Send Message"}
//           </button>

//           {showInlineToast === "success" && (
//             <div className="text-green-600 bg-green-100 border border-green-300 mt-2 p-3 rounded-lg shadow-md animate-fade-in">
//               Thank you! Your message has been received.
//             </div>
//           )}
//           {showInlineToast === "error" && (
//             <div className="text-red-600 bg-red-100 border border-red-300 mt-2 p-3 rounded-lg shadow-md animate-fade-in">
//               Something went wrong. Please try again later.
//             </div>
//           )}
//         </div>
//       </motion.form>
//     </div>
//   );
// };

// export default Contact;

// src/pages/Contact.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInlineToast, setShowInlineToast] = useState(null);
  const [loading, setLoading] = useState(false); // ⬅️ Add this

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowInlineToast(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Contact form submission:", formData);
      setFormData({ name: "", email: "", message: "" });
      setShowInlineToast("success");
    } catch (error) {
      console.error("Error sending message:", error);
      setShowInlineToast("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-24 bg-gradient-to-br from-pink-50 via-orange-100 to-yellow-50 text-gray-900 px-6 overflow-hidden">
      {/* Background Animated Dots */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.25,
            }}
            className="w-2.5 h-2.5 bg-pink-400/20 rounded-full absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <ToastContainer />

      <motion.h2
        className="text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-pink-500 via-red-400 to-yellow-500 text-transparent bg-clip-text drop-shadow-xl"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Let's Connect
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl space-y-6 border border-yellow-200"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label className="block text-lg font-bold text-pink-700">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full mt-2 p-3 rounded-md bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-lg font-bold text-pink-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full mt-2 p-3 rounded-md bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-lg font-bold text-pink-700">
            Your Message
          </label>
          <textarea
            name="message"
            rows="6"
            required
            className="w-full mt-2 p-3 rounded-md bg-white border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {loading ? "Please wait..." : "Send Message"}
          </button>

          {showInlineToast === "success" && (
            <div className="text-green-600 bg-green-100 border border-green-300 mt-2 p-3 rounded-lg shadow-md animate-fade-in">
              Thank you! Your message has been received.
            </div>
          )}
          {showInlineToast === "error" && (
            <div className="text-red-600 bg-red-100 border border-red-300 mt-2 p-3 rounded-lg shadow-md animate-fade-in">
              Something went wrong. Please try again later.
            </div>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default Contact;
