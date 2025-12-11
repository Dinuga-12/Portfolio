import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import { skillsData } from "../../constants/data";
// Assuming you import BackgroundAnimation here if you want it in this section
// import BackgroundAnimation from "../background/BackgroundAnimation";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("All");
  // Removed the isMobile state as floating is now desired on all devices
  const categories = ["All", "Web Development", "Programming", "Hardware", "Database", "Tools"];

  // Filter Logic
  const filteredSkills = activeTab === "All"
    ? skillsData
    : skillsData.filter(skill => skill.category === activeTab);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    // Keep visible to ensure staggered children animate
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    }, // Removed potential trailing comma here
  };

  // Floating animation for ALL devices (PC and Mobile)
  const floatingAnimation = {
    y: [0, -10, 0], // Move up 10px and back
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: Math.random() * 0.5, // Random delay for a scattered look
    }, // Removed potential trailing comma here
  };

  // New Entry animation: Boxes come from the left/right and meet in the middle
  const entryAnimation = (index) => ({
    // Determine the initial position based on the index (odd/even)
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -150 : 150, // Even index (0, 2, 4...) from left, Odd index (1, 3, 5...) from right
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: index * 0.08 // Stagger the entry
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  });


  return (
    <SectionWrapper
      id="skills"
      className="py-20 relative z-10 bg-inherit"
    >
      {/* If BackgroundAnimation is scoped to this section, render it here:
      <BackgroundAnimation /> */}
     
      <div className="max-w-6xl mx-auto px-4 relative z-20">
       
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // --- UPDATED FOR DAY/NIGHT MODE ---
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          Technical <span className="text-cyan-500">Skills</span>
        </motion.h2>

        {/* --- CATEGORY TABS --- */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(category)}
              className={`
                px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border
                ${activeTab === category
                  ? "bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20 scale-105" // Active tab style remains same
                  // --- UPDATED FOR DAY/NIGHT MODE ---
                  : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200 dark:bg-white/10 dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/15"}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* --- SKILLS GRID --- */}
        <motion.div
          layout
          variants={containerVariants}
          animate="visible" // Triggers staggerChildren immediately for visibility on all devices
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill.name}
                // ENTRY ANIMATION: Boxes come from sides to meet in the middle
                variants={entryAnimation(index)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} // Ensures reliable trigger on mobile
                exit="exit"
               
                // FLOATING ANIMATION: Apply unconditionally for PC and Mobile
                animate={{ ...entryAnimation(index).visible, ...floatingAnimation }}
               
                // --- UPDATED FOR DAY/NIGHT MODE (BRIGHTNESS INCREASED FURTHER) ---
                className="
                  group relative
                  bg-white/90 border border-gray-200 shadow-md backdrop-blur-sm // Light mode default
                  hover:bg-white hover:shadow-lg hover:border-cyan-500/50
                  dark:bg-white/15 dark:border-white/30 dark:shadow-md // Increased opacity from /10 and /20
                  dark:hover:bg-white/25 dark:hover:shadow-lg dark:hover:border-cyan-500/30 // Increased hover opacity
                  rounded-xl p-5 flex flex-col items-center text-center
                  transition-colors duration-300 overflow-hidden
                  cursor-pointer
                "
              >
               
                {/* Top Gradient/Glow Effect on Hover */}
                <div
                  className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: skill.color || '#06b6d4' }}
                ></div>

                {/* Icon Section */}
                <div className="mb-4 relative z-10">
                  <div
                    className="
                      p-3 rounded-lg transition-transform duration-300 group-hover:scale-110
                      bg-gray-100/50 border border-gray-200 shadow-sm // Light mode icon container
                      dark:bg-black/20 dark:border-white/5 // Dark mode override
                    "
                    style={{ color: skill.color }}
                  >
                    <skill.icon size={32} />
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-xs mb-4 leading-relaxed line-clamp-3 text-gray-600 dark:text-slate-400">
                  {skill.desc}
                </p>

                {/* Experience Indicator Section */}
                <div className="mt-auto w-full">
                  <div className="relative w-full flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider mb-1.5 text-cyan-500 dark:text-cyan-400">
                      {skill.experience}
                    </span>
                   
                    {/* Progress Bar Track */}
                    <div className="w-1/2 h-1 rounded-full overflow-hidden bg-gray-300/50 dark:bg-black/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full rounded-full"
                        style={{ background: skill.color || '#06b6d4' }}
                      />
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Skills;