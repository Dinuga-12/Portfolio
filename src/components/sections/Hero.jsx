import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { personalInfo } from "../../constants/data";
import { ArrowDown, Download, MousePointer2, Code2 } from "lucide-react";

// --- ANIMATION VARIANTS ---
const FADE_UP = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
    }
  }
};

const Hero = () => {
  // --- TYPEWRITER STATE ---
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!personalInfo.titles) return;
    
    const currentTitle = personalInfo.titles[textIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % personalInfo.titles.length);
      } else {
        setDisplayText(
          currentTitle.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  return (
    // UPDATED: bg-slate-50 for Day Mode, bg-[#050505] for Dark Mode
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#050505] pt-20 transition-colors duration-500">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 1. The Video (Base Texture) */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          // UPDATED: Lower opacity in Day Mode (20) for subtlety, higher in Dark Mode (50)
          className="w-full h-full object-cover opacity-20 dark:opacity-50 grayscale dark:grayscale-0 transition-all duration-500" 
        >
          <source src="/assets/videos/background.mp4" type="video/mp4" />
        </video>

        {/* 2. The Gradient Overlay - CRITICAL FOR DAY MODE ELEGANCE */}
        <motion.div 
          animate={{ opacity: [0.8, 1.0, 0.8] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          // UPDATED: White gradient in Day Mode, Black gradient in Dark Mode
          className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-slate-50/80 to-slate-50/20 dark:from-black/90 dark:via-black/50 dark:to-transparent transition-colors duration-500"
        />

        {/* 3. Right-Side Brightness Booster (Hidden in Day Mode for cleanliness) */}
        <div 
            className="absolute top-1/2 right-[-200px] -translate-y-1/2 w-[800px] h-[800px] blur-[150px] pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500"
            style={{ 
              background: 'radial-gradient(circle, rgba(220, 245, 255, 0.15) 0%, rgba(125, 211, 252, 0.05) 50%, transparent 80%)' 
            }}
        />

        {/* 4. Bottom-Left Shadow (Hidden in Day Mode) */}
        <div 
            className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] blur-[100px] pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500"
            style={{ 
              background: 'radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, transparent 70%)' 
            }}
        />

        {/* 5. Center Glow (Subtle Blue in Day, Glow in Night) */}
        <motion.div
           animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
           // UPDATED: Very subtle blue tint in Day Mode
           className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 dark:bg-cyan-900/20 blur-[150px] rounded-full pointer-events-none"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="max-w-7xl w-full px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT: CONTENT --- */}
        <motion.div 
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          
          {/* Intro Text - Dark Gray in Day, Light Gray in Night */}
          <motion.h2 variants={FADE_UP} className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium mb-4 tracking-widest uppercase transition-colors">
            Hello, I'm
          </motion.h2>
          
          {/* --- NAME SECTION --- */}
          <motion.h1 variants={FADE_UP} className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter flex flex-wrap justify-center lg:justify-start items-center">
            
            {/* First Name - Dark Slate in Day, Light Slate in Night */}
            <span className="text-slate-800 dark:text-slate-300 mr-3 md:mr-5 transition-colors">
                {personalInfo.name.split(" ")[0]}
            </span>

            {/* Second Name: Vibrant Gradient (Works well on both) */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 pb-2">
              {personalInfo.name.split(" ")[1]}
            </span>

          </motion.h1>

          {/* --- TYPEWRITER --- */}
          <motion.div variants={FADE_UP} className="h-16 md:h-20 mb-8 flex items-center justify-center lg:justify-start gap-4">
            {/* Icon Color Update */}
            <Code2 size={40} className="text-slate-400 dark:text-slate-600 transition-colors" />
            
            {/* Text Color Update */}
            <span className="text-3xl md:text-5xl font-mono text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors">
              {displayText}
            </span>
            <span className="w-1 md:w-1.5 h-8 md:h-12 bg-cyan-500 animate-pulse" />
          </motion.div>

          {/* Description - Slate-600 for sharp readability in Day Mode */}
          <motion.p variants={FADE_UP} className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-loose max-w-xl mb-10 transition-colors">
            I build clean, functional, and visually engaging web & mobile experiences — exploring 3D and interactive techniques.
          </motion.p>

          {/* Buttons Container */}
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-5 justify-center lg:justify-start">
            
            {/* 1. VIEW MY WORK BUTTON (LINK) */}
            <Link 
              to="/projects" 
              className="relative group p-[2.5px] rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(147,51,234,0.3)]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#06b6d4_25%,#9333ea_50%,#06b6d4_75%,transparent_100%)]"
              />

              {/* Inner Button Content: UPDATED COLOR (Reduced Brightness) */}
              {/* Changed dark:from-cyan-500 to dark:from-cyan-600 */}
              {/* Changed dark:to-purple-600 to dark:to-purple-700 */}
              <div className="relative px-8 py-4 bg-slate-900 dark:bg-gradient-to-r dark:from-cyan-600 dark:to-purple-700 text-white font-bold rounded-full z-10 transition-colors">
                
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                
                <span className="relative z-10 flex items-center gap-2">View My Work <MousePointer2 size={18} /></span>
              </div>
            </Link>

            {/* 2. DOWNLOAD CV BUTTON */}
            <a 
              href="/assets/images/resume.pdf" 
              download
              className="relative group p-[2.5px] rounded-full overflow-hidden transition-all hover:scale-105"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#cbd5e1_0%,#06b6d4_25%,#9333ea_75%,#cbd5e1_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#334155_0%,#06b6d4_25%,#9333ea_75%,#334155_100%)]"
              />

              {/* Inner Button Content: White BG for Day Mode (Clean look) */}
              <div className="relative px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold rounded-full z-10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700/50">
                <span className="relative z-10 flex items-center gap-2">Download CV <Download size={18} /></span>
              </div>
            </a>

          </motion.div>

          {/* HUD Stats Bar */}
          <motion.div 
            variants={FADE_UP} 
            // UPDATED Border color for Day Mode
            className="mt-16 w-full pt-6 border-t border-slate-200 dark:border-white/5 flex justify-between md:justify-start gap-8 md:gap-16 transition-colors"
          >
            <div>
              <h4 className="text-3xl font-bold text-slate-800 dark:text-slate-200 transition-colors">5+</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Projects</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-slate-800 dark:text-slate-200 transition-colors">10+</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Technologies</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-slate-800 dark:text-slate-200 transition-colors">100%</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Commitment</p>
            </div>
          </motion.div>
        </motion.div>

        {/* --- RIGHT: DECORATIVE SPACE --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="order-1 lg:order-2 relative h-[300px] md:h-[400px] w-full flex items-center justify-center"
        >
          {/* Placeholder for future 3D element */}
        </motion.div>

      </div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.a 
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        // UPDATED Colors for Day Mode visibility
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer p-4 border border-slate-200 dark:border-white/5 rounded-full backdrop-blur-sm z-20"
      >
        <ArrowDown size={24} />
      </motion.a>

    </section>
  );
};

export default Hero;