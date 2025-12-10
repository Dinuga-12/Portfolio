// File: src/components/sections/Projects.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; 
import SectionWrapper from "../ui/SectionWrapper";
import { projectsData } from "../../constants/data";
import { ArrowRight, ChevronLeft, ChevronRight, Layers, Code2, Cpu, Database } from "lucide-react";

const categories = ["All", "Full-Stack", "Hardware", "Data Science"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. FILTER PROJECTS
  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "All") return true;
    return project.type && project.type.includes(activeCategory);
  });

  // Reset index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // 2. NAVIGATION
  const handleNext = () => {
    if (filteredProjects.length > 0) {
      setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
    }
  };

  const handlePrev = () => {
    if (filteredProjects.length > 0) {
      setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    }
  };

  // 3. 3D CARD STYLE
  const getCardStyle = (index) => {
    const total = filteredProjects.length;
    if (total === 0) return {};

    let offset = (index - activeIndex + total) % total;
    if (offset > total / 2) offset -= total;

    if (Math.abs(offset) > 2) return { opacity: 0, pointerEvents: "none" };

    if (offset === 0) {
      return {
        x: 0, z: 0, scale: 1, rotateY: 0, zIndex: 10, opacity: 1, blur: 0, pointerEvents: "auto",
      };
    } else if (offset > 0) {
      return {
        x: 400 + (offset * 40), 
        z: -300 * offset, 
        scale: 1 - (offset * 0.15), 
        rotateY: -30, 
        zIndex: 10 - offset, 
        opacity: 0.5, 
        blur: 3, 
        pointerEvents: "none",
      };
    } else {
      return {
        x: -400 + (offset * 40), 
        z: 300 * offset, 
        scale: 1 + (offset * 0.15), 
        rotateY: 30, 
        zIndex: 10 + offset, 
        opacity: 0.5, 
        blur: 3, 
        pointerEvents: "none",
      };
    }
  };

  const activeProject = filteredProjects[activeIndex];

  return (
    <SectionWrapper id="projects" className="py-12 md:py-20 relative z-10 overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 w-full h-full flex flex-col justify-between">
        
        {/* --- 1. COMPACT HEADER & TABS --- */}
        <div className="flex flex-col items-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-8 text-slate-900 dark:text-white"
          >
            Featured <span className="text-cyan-500">Projects</span>
          </motion.h2>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={`
                  relative px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-all duration-300 border flex items-center gap-2
                  ${activeCategory === cat 
                    ? "bg-cyan-500 text-white border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                    : "bg-white/5 text-slate-500 border-slate-200 dark:border-white/10 hover:bg-white/10 hover:text-cyan-400"}
                `}
              >
                {cat === "All" && <Layers size={16} />}
                {cat === "Hardware" && <Cpu size={16} />}
                {cat === "Full-Stack" && <Code2 size={16} />}
                {cat === "Data Science" && <Database size={16} />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- 2. 3D CAROUSEL --- */}
        <div className="relative h-[400px] md:h-[450px] flex items-center justify-center perspective-[1200px]">
          
          {filteredProjects.length === 0 ? (
             <div className="text-slate-500 text-lg">No projects found.</div>
          ) : (
            <>
              <AnimatePresence initial={false}>
                {filteredProjects.map((project, index) => {
                  const style = getCardStyle(index);
                  if (style.opacity === 0) return null;

                  return (
                    <motion.div
                      key={project.id}
                      animate={{
                        x: style.x,
                        z: style.z,
                        scale: style.scale,
                        rotateY: style.rotateY,
                        opacity: style.opacity,
                        zIndex: style.zIndex,
                        filter: `blur(${style.blur}px)`
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute w-[320px] md:w-[550px] aspect-video rounded-xl shadow-2xl cursor-pointer bg-slate-900 border border-white/10"
                      onClick={() => {
                        const total = filteredProjects.length;
                        let offset = (index - activeIndex + total) % total;
                        if (offset > total / 2) offset -= total;
                        if (offset !== 0) setActiveIndex(index);
                      }}
                    >
                      <div className="relative w-full h-full rounded-xl overflow-hidden group">
                        <img 
                          src={project.img || project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Arrows */}
              {filteredProjects.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-black transition-all z-50 backdrop-blur-md">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={handleNext} className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-black transition-all z-50 backdrop-blur-md">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* --- 3. DETAILS PANEL --- */}
        {activeProject && (
          // UPDATED: Reduced 'mt' (margin-top) to pull it up closer to images
          <div className="mt-2 md:mt-3 relative z-20 h-auto min-h-[200px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                {/* Type Label: Reduced margin-bottom (mb-2 -> mb-1) */}
                <span className="text-cyan-500 text-xs md:text-sm font-bold uppercase tracking-wider mb-1">
                  {activeProject.type ? activeProject.type.split(" / ")[0] : "Project"}
                </span>
                
                {/* Title: Reduced font size (text-4xl -> text-3xl) and margin (mb-2 -> mb-1) */}
                <h3 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {activeProject.title}
                </h3>

                {/* Description: Reduced font size (text-base -> text-sm) and margin (mb-4 -> mb-3) */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-3 max-w-2xl line-clamp-3">
                  {activeProject.shortDesc || activeProject.description}
                </p>

                {/* Tech Stack: Reduced margin (mb-6 -> mb-5) */}
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                   {(activeProject.technologies || []).slice(0, 5).map((tech, i) => (
                      <span key={i} className="text-xs md:text-sm text-slate-500 border border-slate-300 dark:border-white/10 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                   ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Link 
                    to={`/project/${activeProject.id}?from=home`}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black text-sm md:text-base font-bold rounded-full hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-all shadow-lg flex items-center gap-2"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                  <Link 
                    to="/projects"
                    className="px-6 py-2.5 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white text-sm md:text-base font-bold rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
                  >
                    All Projects
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        )}

      </div>
    </SectionWrapper>
  );
};

export default Projects;