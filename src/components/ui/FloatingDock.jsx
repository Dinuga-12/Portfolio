import React from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Mail } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link

const FloatingDock = () => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100]">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 100 }}
        className="flex items-center gap-6 px-8 py-4 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-cyan-500/10"
      >
        {/* 1. HOME: Link to Top of Home */}
        <Link
          to="/" 
          className="group relative flex flex-col items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <Home size={24} strokeWidth={2} className="transform group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -bottom-2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_cyan]" />
        </Link>

        {/* 2. PROJECTS: Link to NEW Gallery Page */}
        <Link
          to="/projects" 
          className="group relative flex flex-col items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <Briefcase size={24} strokeWidth={2} className="transform group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -bottom-2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_cyan]" />
          
          {/* Tooltip */}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap border border-slate-700">
             All Projects
          </span>
        </Link>

        {/* 3. CONTACT: Link to Home page contact section */}
        <a 
          href="/#contact"
          className="group relative flex flex-col items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <Mail size={24} strokeWidth={2} className="transform group-hover:scale-110 transition-transform duration-300" />
          <span className="absolute -bottom-2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_cyan]" />
        </a>

      </motion.div>
    </div>
  );
};

export default FloatingDock;