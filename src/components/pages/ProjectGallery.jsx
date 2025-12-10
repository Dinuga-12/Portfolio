import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projectsData } from "../../constants/data";
// Removed unused icons (Home, Briefcase, Mail)
import { ArrowLeft, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const ProjectGallery = () => {
  // --- STATE FOR 3D CAROUSEL ---
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- NAVIGATION HANDLERS ---
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  // --- CALCULATE POSITIONS FOR 3D EFFECT ---
  const getCardStyle = (index) => {
    const total = projectsData.length;
    
    // Calculate the distance: -1 (left), 0 (center), 1 (right)
    let offset = (index - activeIndex + total) % total;
    if (offset > total / 2) offset -= total;

    // CENTER CARD
    if (offset === 0) {
      return {
        x: 0,
        z: 0,
        scale: 1,
        rotateY: 0,
        zIndex: 10,
        opacity: 1,
        blur: 0,
        pointerEvents: "auto",
      };
    } 
    // RIGHT SIDE CARDS
    else if (offset > 0) {
      return {
        x: 350 + (offset * 40), // Push to right
        z: -300 * offset,       // Push back in 3D space
        scale: 1 - (offset * 0.2), // Shrink
        rotateY: -35,           // Rotate inwards
        zIndex: 10 - offset,
        opacity: offset > 2 ? 0 : 0.6, // Fade out distant cards
        blur: 4,
        pointerEvents: "none",
      };
    } 
    // LEFT SIDE CARDS
    else {
      return {
        x: -350 + (offset * 40), // Push to left
        z: 300 * offset,        // Push back
        scale: 1 + (offset * 0.2), // Shrink (offset is negative here)
        rotateY: 35,            // Rotate inwards
        zIndex: 10 + offset,
        opacity: offset < -2 ? 0 : 0.6,
        blur: 4,
        pointerEvents: "none",
      };
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden relative pb-32">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* --- BACK BUTTON --- */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-bold text-white hover:bg-white/10 transition-all group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back
      </Link>

      {/* --- HEADER --- */}
      <div className="pt-24 pb-10 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-2 tracking-tight"
        >
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Gallery</span>
        </motion.h1>
        <p className="text-slate-400 text-sm md:text-base">Swipe or click to explore the archives</p>
      </div>

      {/* --- 3D CAROUSEL CONTAINER --- */}
      <div className="relative h-[450px] flex items-center justify-center perspective-[1200px] mt-8">
        
        {/* Render Projects */}
        {projectsData.map((project, index) => {
          const style = getCardStyle(index);

          // Only render visible cards for performance
          if (style.opacity === 0) return null;

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                x: style.x,
                z: style.z,
                scale: style.scale,
                rotateY: style.rotateY,
                opacity: style.opacity,
                zIndex: style.zIndex,
                filter: `blur(${style.blur}px)`
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute w-[300px] md:w-[450px] aspect-video rounded-xl shadow-2xl cursor-pointer"
              onClick={() => setActiveIndex(index)} // Click side card to center it
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-white/10 bg-slate-900 group">
                <img 
                  src={project.img || project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                {/* Number Overlay */}
                <div className="absolute top-4 right-4 text-5xl font-bold text-white/10">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* REFLECTION EFFECT */}
              <div className="absolute -bottom-[102%] left-0 right-0 h-full scale-y-[-1] opacity-30 pointer-events-none blur-sm">
                 <img 
                   src={project.img || project.image} 
                   className="w-full h-full object-cover"
                   style={{ maskImage: "linear-gradient(transparent 60%, black 100%)", WebkitMaskImage: "linear-gradient(transparent 60%, black 100%)" }}
                   alt=""
                 />
              </div>
            </motion.div>
          );
        })}

        {/* NAVIGATION ARROWS */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 md:left-20 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-black transition-all z-50 backdrop-blur-md"
        >
          <ChevronLeft size={24} />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-4 md:right-20 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-black transition-all z-50 backdrop-blur-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* --- ACTIVE PROJECT DETAILS (Syncs with Carousel) --- */}
      <div className="max-w-4xl mx-auto px-6 mt-12 pb-20 relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16"
          >
            {/* Number Indicator (Big) */}
            <div className="hidden md:block">
              <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent font-mono">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  {projectsData[activeIndex].type || "Project"}
                </span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {projectsData[activeIndex].title}
              </h2>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
                {projectsData[activeIndex].description || projectsData[activeIndex].fullDesc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link 
                  to={`/project/${projectsData[activeIndex].id}?from=gallery`}
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-colors flex items-center gap-2"
                >
                  View Case Study <ArrowRight size={18} />
                </Link>
                
                {/* Tech Stack Pills */}
                <div className="flex items-center gap-2">
                   {(projectsData[activeIndex].tech || projectsData[activeIndex].technologies || []).slice(0, 3).map((t, i) => (
                      <span key={i} className="text-xs text-slate-500 border border-white/10 px-3 py-2 rounded-full">
                        {t}
                      </span>
                   ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- FLOATING BOTTOM DOCK REMOVED --- */}

      {/* --- ZIG-ZAG LIST (Bottom Section) --- */}
      <div className="max-w-5xl mx-auto px-6 mt-20 space-y-24">
        {projectsData.map((project, index) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            <Link 
              to={`/project/${project.id}?from=gallery`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-[400px] group relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.img || project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-300 border border-white/30">
                 <ExternalLink className="text-white w-5 h-5" />
              </div>
            </Link>

            <div className="flex-1 space-y-4 text-center md:text-left">
              <span className="text-cyan-500 font-mono text-lg font-bold">0{index + 1}.</span>
              <h2 className="text-3xl font-bold text-white leading-tight">{project.title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto md:mx-0">
                {project.fullDesc || project.description}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                {project.technologies && project.technologies.slice(0, 3).map((tech, i) => (
                   <span key={i} className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-300 text-xs">
                     {tech}
                   </span>
                ))}
              </div>

              <div className="pt-4">
                <Link 
                  to={`/project/${project.id}?from=gallery`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm font-bold border-b border-cyan-500 hover:text-cyan-400 transition-colors pb-0.5 inline-flex items-center gap-2"
                >
                  Read Full Case Study <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default ProjectGallery;