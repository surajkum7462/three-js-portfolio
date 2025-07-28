// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black bg-opacity-90 text-white px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="text-2xl font-bold tracking-wide text-yellow-400">Suraj</div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-lg font-medium">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/about" className="hover:text-yellow-400">About</Link>
        <Link to="/projects" className="hover:text-yellow-400">Projects</Link>
        <Link to="/blog" className="hover:text-yellow-400">Blog</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
        <Link to="/socials" className="hover:text-yellow-400">Socials</Link>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-black bg-opacity-95 flex flex-col items-center space-y-4 py-6 md:hidden text-lg font-medium shadow-md">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">About</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Projects</Link>
          <Link to="/blog" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Blog</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Contact</Link>
          <Link to="/socials" onClick={() => setIsOpen(false)} className="hover:text-yellow-400">Socials</Link>
        </div>
      )}
    </nav>
  );
}
