import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import { skillsData } from "../../constants/data";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "Web Development", "Programming", "Hardware", "Database", "Tools"];

  // Filter Logic
  const filteredSkills = activeTab === "All" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeTab);

  // --- ANIMATION VARIANTS ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 50, damping: 10 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: 0.2 } 
    }
  };

  // NEW: Floating Animation (Infinite Bobbing)
  // We use a random duration so they don't all bob in sync (which looks robotic)
  const floatingAnimation = {
    y: [0, -10, 0], // Move up 10px then back down
    transition: {
      duration: 3 + Math.random() * 2, // Random duration between 3s and 5s
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <SectionWrapper id="skills" className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-slate-900 dark:text-white"
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
                  ? "bg-cyan-500 text-white border-cyan-500 shadow-md shadow-cyan-500/20 scale-105" 
                  : "bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/10"}
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill.name}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                // Adding the Floating Animation here
                // We delay it slightly so it starts after the entrance animation
                whileInView={{
                  y: [0, -8, 0], // Float up 8px
                  transition: {
                    duration: 3 + (index % 3), // Varied timing based on index
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1 + (index * 0.2) // Delay start so they don't all float at once
                  }
                }}
                
                className="
                  group relative 
                  bg-sky-100 border border-sky-200 shadow-sm
                  hover:bg-white hover:shadow-lg hover:border-cyan-500/30 
                  dark:bg-white/10 dark:backdrop-blur-md dark:border-white/10 dark:shadow-none
                  dark:hover:bg-white/15 dark:hover:border-white/20
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
                      bg-white border border-sky-200 shadow-sm
                      dark:bg-black/20 dark:border-white/5 dark:shadow-none
                    "
                    style={{ color: skill.color }}
                  >
                    <skill.icon size={32} />
                  </div>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-bold mb-2 text-slate-800 dark:text-white">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-xs mb-4 leading-relaxed line-clamp-3 text-slate-600 dark:text-slate-300">
                  {skill.desc}
                </p>

                {/* Experience Indicator Section */}
                <div className="mt-auto w-full">
                  <div className="relative w-full flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold tracking-wider mb-1.5 text-cyan-700 dark:text-cyan-300">
                      {skill.experience}
                    </span>
                    
                    {/* Progress Bar Track */}
                    <div className="w-1/2 h-1 rounded-full overflow-hidden bg-sky-200 dark:bg-black/30">
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