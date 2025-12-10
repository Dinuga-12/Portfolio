// File: src/App.jsx 

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// --- IMPORT COMPONENTS ---
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import Contact from './components/sections/Contact';
import Footer from './components/ui/Footer';
import ProjectDetails from './components/sections/ProjectDetails';
import WelcomeScreen from './components/ui/WelcomeScreen';
import FloatingDock from './components/ui/FloatingDock';
import ProjectGallery from './components/pages/ProjectGallery'; 
import BackgroundAnimation from './components/ui/BackgroundAnimation'; 

// --- SCROLL FIX COMPONENT ---
// Handles scrolling to #sections when navigating
const ScrollToAnchor = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Optional: Clean up URL after scroll
          window.history.replaceState(null, '', window.location.pathname);
        }
      }, 100);
    } 
    else if (pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// --- MAIN HOME PAGE LAYOUT - SECTION ORDER UPDATED HERE ---
const Home = () => (
  <>
    <Navbar />
    {/* 1. Home */}
    <Hero /> 
    {/* 2. About */}
    <About /> 
    {/* 3. Skills */}
    <Skills /> 
    {/* 4. Education */}
    <Education /> 
    {/* 5. Certificates */}
    <Certifications /> 
    {/* 6. Projects */}
    <Projects /> 
    {/* 7. Contact */}
    <Contact /> 
    <Footer />
    {/* Dock is visible only on Home Page */}
    <FloatingDock />
  </>
);

function App() {
  // --- LOADING STATE LOGIC ---
  const [isLoading, setIsLoading] = useState(() => {
    // 1. If trying to jump to a specific section (e.g. localhost:3000/#contact), skip intro
    if (window.location.hash) return false;
    
    // 2. If trying to open a specific page directly (e.g. localhost:3000/projects), skip intro
    // This prevents the intro from annoying users who just want to see a specific project.
    if (window.location.pathname !== "/") return false;
    
    // 3. Otherwise (Normal Root Refresh), ALWAYS show intro.
    // We removed 'sessionStorage' so it resets every time you hit Refresh (F5).
    return true;
  });

  const handleWelcomeComplete = () => {
    setIsLoading(false);
    // Note: We do NOT save to sessionStorage anymore, 
    // so it will show again next time you refresh.
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <WelcomeScreen key="welcome" onComplete={handleWelcomeComplete} />
      ) : (
        <div key="website" className="relative min-h-screen">
          
          {/* --- GLOBAL BACKGROUND ANIMATION --- */}
          {/* Fixed in background, persists across all pages */}
          <BackgroundAnimation />
          
          {/* --- MAIN CONTENT --- */}
          <div className="relative z-10">
            <BrowserRouter>
              <ScrollToAnchor />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectGallery />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
              </Routes>
            </BrowserRouter>
          </div>
          
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;