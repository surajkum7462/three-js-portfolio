import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import HomePremium from './pages/HomePremium';
import About from './pages/About';
import AboutPremium from './pages/AboutPremium';
import Projects from './pages/Projects';
import ProjectsPremium from './pages/ProjectsPremium';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Contact3D from './pages/Contact3D';
import Socials from './pages/Socials';
import Social3D from './pages/Social3D';
import Portfolio3DUniverse from './pages/Portfolio3DUniverse';
import Navbar from './components/Navbar';
import NavbarPremium from './components/NavbarPremium';

import 'swiper/css';
import 'swiper/css/autoplay';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio3DUniverse />} />
        <Route path="/classic" element={
          <div className="pt-16">
            <NavbarPremium />
            <HomePremium />
          </div>
        } />
        <Route path="/home-classic" element={
          <div className="pt-16">
            <Navbar />
            <Home />
          </div>
        } />
        <Route path="/about" element={
          <div className="pt-16">
            <NavbarPremium />
            <AboutPremium />
          </div>
        } />
        <Route path="/about-classic" element={
          <div className="pt-16">
            <Navbar />
            <About />
          </div>
        } />
        <Route path="/projects" element={
          <div className="pt-16">
            <NavbarPremium />
            <ProjectsPremium />
          </div>
        } />
        <Route path="/projects-classic" element={
          <div className="pt-16">
            <Navbar />
            <Projects />
          </div>
        } />
        <Route path="/blog" element={
          <div className="pt-16">
            <NavbarPremium />
            <Blog />
          </div>
        } />
        <Route path="/contact" element={<Contact3D />} />
        <Route path="/contact-classic" element={
          <div className="pt-16">
            <NavbarPremium />
            <Contact />
          </div>
        } />
        <Route path="/socials" element={<Social3D />} />
        <Route path="/socials-classic" element={
          <div className="pt-16">
            <NavbarPremium />
            <Socials />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
