import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Mock blog data since backend is not available
const mockBlogs = [
  {
    id: 1,
    title: "Building Scalable Web Applications with React and Spring Boot",
    summary: "Exploring best practices for creating full-stack applications with modern technologies, focusing on performance and scalability.",
    createdAt: "2024-01-15",
    tags: ["React", "Spring Boot", "Full Stack"]
  },
  {
    id: 2,
    title: "Mastering Data Structures and Algorithms",
    summary: "Deep dive into essential DSA concepts including trees, graphs, and dynamic programming with practical examples.",
    createdAt: "2024-01-10",
    tags: ["DSA", "Algorithms", "Problem Solving"]
  },
  {
    id: 3,
    title: "3D Web Development with Three.js and React",
    summary: "Creating immersive 3D experiences on the web using Three.js, React Three Fiber, and modern animation techniques.",
    createdAt: "2024-01-05",
    tags: ["Three.js", "3D", "WebGL"]
  },
  {
    id: 4,
    title: "Optimizing React Performance for Better User Experience",
    summary: "Advanced techniques for React optimization including memo, useMemo, useCallback, and code splitting strategies.",
    createdAt: "2023-12-20",
    tags: ["React", "Performance", "Optimization"]
  },
  {
    id: 5,
    title: "Building RESTful APIs with Spring Boot",
    summary: "Complete guide to creating robust and secure REST APIs using Spring Boot with JWT authentication and validation.",
    createdAt: "2023-12-15",
    tags: ["Spring Boot", "REST API", "Backend"]
  },
  {
    id: 6,
    title: "Modern CSS Techniques: From Flexbox to Grid",
    summary: "Mastering modern CSS layout techniques including Flexbox, Grid, and advanced animations for responsive design.",
    createdAt: "2023-12-10",
    tags: ["CSS", "Frontend", "Responsive Design"]
  }
];

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    const loadBlogs = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setBlogs(mockBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700 text-white py-16 px-6">
      <motion.h2
        className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📝 Tech Blog
      </motion.h2>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <motion.div
            className="text-2xl text-purple-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⚡
          </motion.div>
          <span className="ml-3 text-xl">Loading amazing content...</span>
        </div>
      ) : (
        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {blogs.length === 0 ? (
            <p className="text-center col-span-full text-gray-300 text-xl">
              No blog posts available at the moment.
            </p>
          ) : (
            blogs.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white/10 backdrop-blur-lg text-white p-6 rounded-2xl shadow-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                {post.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-400">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : "Unknown date"}
                  </p>
                  <motion.button
                    className="text-purple-400 hover:text-purple-300 font-medium text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read More →
                  </motion.button>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Blog;
