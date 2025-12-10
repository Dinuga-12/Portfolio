// File: src/components/ui/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  // --- UPDATED LINKS ARRAY ORDER ---
  // The links are now ordered: Home, About, Skills, Education, Certificates, Projects, Contact
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" }, // Moved up
    { name: "Education", href: "#education" }, // Moved up
    { name: "Certificates", href: "#certifications" }, // Correct ID, Moved up
    { name: "Projects", href: "#projects" }, // Moved down
    { name: "Contact", href: "#contact" }, // Moved down
  ];

  // --- Logic to handle active link highlight on scroll ---
  useEffect(() => {
    const handleScroll = () => {
      // Get all sections defined in the links array
      const sections = links.map(link => document.querySelector(link.href)).filter(Boolean);
      const scrollPosition = window.scrollY + 100; // Offset for header height

      let currentActive = "#home";
      sections.forEach(section => {
        if (section.offsetTop <= scrollPosition) {
          currentActive = `#${section.id}`;
        }
      });
      setActiveHash(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]); // Depend on links array for safety

  const handleLinkClick = (href) => {
    setActiveHash(href);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-purple-500 cursor-pointer"
            onClick={() => window.scrollTo(0,0)}
          >
            DM.
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4 lg:space-x-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  // --- PREMIUM STYLING ---
                  className={`
                    relative px-1 py-1 text-sm font-semibold transition-all duration-300 
                    ${activeHash === link.href 
                      ? "text-cyan-500 dark:text-cyan-400" 
                      : "text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400"
                    }
                  `}
                >
                  {link.name}
                  
                  {/* Active Indicator (Gradient underline) */}
                  {activeHash === link.href && (
                    <motion.span
                      layoutId="activeTab" 
                      className="absolute bottom-[-8px] left-0 right-0 h-[2px] 
                                bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              ))}
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-gray-200/50 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-slate-900 absolute w-full border-b border-gray-200 dark:border-slate-800 shadow-xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                    ${activeHash === link.href 
                        ? "text-white bg-cyan-500 dark:bg-cyan-600" 
                        : "text-slate-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-cyan-500"
                    }
                  `}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;