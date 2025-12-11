import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import { educationData } from "../../constants/data";
import { GraduationCap, School, BookOpen, Calendar } from "lucide-react";

// --- Sub-Component: Individual Timeline Item ---

/**
 * A single, animated milestone item in the educational timeline.
 * @param {object} props
 * @param {object} props.edu - The education data object.
 * @param {number} props.index - The index of the item.
 * @param {function} props.getIcon - Helper function to get the Lucide icon.
 */
const TimelineItem = ({ edu, index, getIcon }) => {
  // Determine if the card should be on the left or right side on desktop
  const isLeft = index % 2 === 0;

  return (
    <div 
      key={index} 
      className={`relative flex items-center md:justify-between ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      
      {/* Empty Spacer for Desktop Layout */}
      <div className="hidden md:block w-5/12" />

      {/* Center Node (The Dot/Milestone) */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-20">
        <motion.div 
          initial={{ scale: 0, rotate: -90 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.05 }}
          className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl shadow-blue-500/50 dark:shadow-blue-500/30 flex items-center justify-center"
        >
          {/* Inner circle for background color */}
          <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
            <div className="text-blue-500 dark:text-cyan-400">
              {getIcon(index)}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content Card - PREMIUM GLASS EFFECT */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -70 : 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
        className="ml-16 md:ml-0 w-full md:w-5/12 p-6 rounded-2xl 
          border border-white/20 dark:border-white/10
          bg-white/50 dark:bg-slate-800/60
          shadow-xl dark:shadow-2xl dark:shadow-black/50
          backdrop-blur-xl transition-all duration-300 group cursor-default
          hover:shadow-cyan-500/30 dark:hover:shadow-cyan-600/20 hover:border-cyan-500/50"
      >
        {/* Connecting Line for Mobile */}
        <div className="md:hidden absolute top-1/2 -left-12 w-8 h-0.5 bg-cyan-400/50" />

        <span className="text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block 
          bg-cyan-500/10 dark:bg-cyan-500/20 
          text-cyan-700 dark:text-cyan-300">
          <Calendar size={12} className="inline mr-1 -mt-0.5" />
          {edu.duration}
        </span>
        
        <h3 className="text-2xl font-extrabold mb-1 text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
          {edu.school}
        </h3>
        
        <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {edu.degree}
        </h4>
        
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">
          {edu.desc}
        </p>
      </motion.div>

    </div>
  );
};

// --- Main Component: Education Timeline ---

const Education = () => {
  const containerRef = useRef(null);
  
  // Track scroll progress relative to this section
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Target the whole section view
  });

  // Smooth out the scroll progress for the line animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Create a slight parallax for the header text for a 'cinematic' feel
  const yText = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Helper to pick icons (same as before)
  const getIcon = (index) => {
    // You'll likely want to map these based on `edu.type` or similar data in a real app, 
    // but using index for variety based on the provided code structure:
    if (index === 0) return <School size={24} strokeWidth={2.5} />;
    if (index === 1) return <BookOpen size={24} strokeWidth={2.5} />;
    return <GraduationCap size={24} strokeWidth={2.5} />;
  };

  return (
    <SectionWrapper id="education" className="bg-transparent py-20 overflow-hidden relative z-10">
      <div className="max-w-4xl mx-auto px-4 relative">
        
        {/* Header with Parallax */}
        <motion.div 
          className="text-center mb-16"
          style={{ y: yText }} // Apply parallax transform
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Evolution</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            A chronological timeline detailing my academic milestones and continuous professional development.
          </p>
        </motion.div>

        {/* Roadmap Container */}
        <div ref={containerRef} className="relative min-h-[1000px] pb-40"> 
          
          {/* 1. Background Gray Line (The Path) - Enhanced for better contrast */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-300/30 dark:bg-white/5 transform md:-translate-x-1/2 rounded-full" />

          {/* 2. Moving Colored Line (Fills on Scroll) - More dramatic gradient */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 transform md:-translate-x-1/2 origin-top rounded-full"
            style={{ height: "100%", scaleY: scaleY }} 
          />

          {/* 3. Milestones Container */}
          <div className="space-y-36">
            {educationData.map((edu, index) => (
              <TimelineItem 
                key={index} 
                edu={edu} 
                index={index} 
                getIcon={getIcon} 
              />
            ))}
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default Education;