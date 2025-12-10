import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import { educationData } from "../../constants/data";
import { GraduationCap, School, BookOpen, Calendar } from "lucide-react";

const Education = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Smooth out the scroll progress for the line animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Helper to pick icons
  const getIcon = (index) => {
    if (index === 0) return <School size={20} />;
    if (index === 1) return <BookOpen size={20} />;
    return <GraduationCap size={20} />;
  };

  return (
    <SectionWrapper id="education" className="bg-transparent py-20 overflow-hidden relative z-10">
      <div className="max-w-4xl mx-auto px-4 relative">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Journey</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            A timeline of my academic and professional growth.
          </p>
        </div>

        {/* Roadmap Container */}
        <div ref={containerRef} className="relative min-h-[800px]">
          
          {/* 1. Background Gray Line (The Path) - Updated for visibility in Day Mode */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-white/10 transform md:-translate-x-1/2" />

          {/* 2. Moving Colored Line (Fills on Scroll) */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 transform md:-translate-x-1/2 origin-top"
            style={{ height: "100%", scaleY: scaleY }} 
          />

          {/* 3. Milestones */}
          <div className="space-y-24">
            {educationData.map((edu, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className={`relative flex items-center md:justify-between ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
                  
                  {/* Empty Spacer for Desktop Layout */}
                  <div className="hidden md:block w-5/12" />

                  {/* Center Node (The Dot) */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      // Updated bg to be white in day mode, black in dark mode
                      className="w-10 h-10 rounded-full border-4 bg-white dark:bg-black border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center justify-center"
                    >
                      <div className="text-cyan-600 dark:text-cyan-400">
                        {getIcon(index)}
                      </div>
                    </motion.div>
                  </div>

                  {/* Content Card - Updated Colors for Day/Dark Mode */}
                  <motion.div 
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="ml-16 md:ml-0 w-full md:w-5/12 p-6 rounded-2xl 
                      border transition-all duration-300 group cursor-default backdrop-blur-md
                      bg-white dark:bg-white/5 
                      border-slate-200 dark:border-white/10
                      shadow-lg dark:shadow-none
                      hover:border-cyan-500/50 dark:hover:bg-white/10 hover:shadow-xl"
                  >
                    {/* Connecting Line for Mobile */}
                    <div className="md:hidden absolute top-1/2 -left-12 w-8 h-0.5 bg-slate-300 dark:bg-white/20" />

                    <span className="text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block 
                      bg-cyan-100 dark:bg-cyan-900/30 
                      text-cyan-700 dark:text-cyan-300">
                      <Calendar size={12} className="inline mr-1 -mt-0.5" />
                      {edu.duration}
                    </span>
                    
                    <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {edu.school}
                    </h3>
                    
                    <h4 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
                      {edu.degree}
                    </h4>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {edu.desc}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default Education;