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
    // Check if personalInfo.titles is defined before accessing
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
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* 1. The Video (Base Texture) - Opacity 50 */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-50" 
        >
          <source src="/assets/videos/background.mp4" type="video/mp4" />
        </video>

        {/* 2. The "Breathing" Gradient Overlay - Darker Left */}
        <motion.div 
          animate={{ opacity: [0.8, 1.0, 0.8] }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"
        />

        {/* 3. Right-Side Brightness Booster */}
        <div 
            className="absolute top-1/2 right-[-200px] -translate-y-1/2 w-[800px] h-[800px] blur-[150px] pointer-events-none"
            style={{ 
              background: 'radial-gradient(circle, rgba(220, 245, 255, 0.15) 0%, rgba(125, 211, 252, 0.05) 50%, transparent 80%)' 
            }}
        />

        {/* 4. Bottom-Left Shadow */}
        <div 
            className="absolute bottom-[-100px] left-[-100px] w-[600px] h-[600px] blur-[100px] pointer-events-none"
            style={{ 
              background: 'radial-gradient(circle, rgba(0, 0, 0, 0.4) 0%, transparent 70%)' 
            }}
        />

        {/* 5. Elegant Center Colored Glow */}
        <motion.div
           animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
           className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 blur-[150px] rounded-full pointer-events-none"
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
          
          {/* Intro Text */}
          <motion.h2 variants={FADE_UP} className="text-slate-400 text-lg md:text-xl font-medium mb-4 tracking-widest uppercase">
            Hello, I'm
          </motion.h2>
          
          {/* --- NAME SECTION --- */}
          <motion.h1 variants={FADE_UP} className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter flex flex-wrap justify-center lg:justify-start items-center">
            
            {/* First Name */}
            <span className="text-slate-300 mr-3 md:mr-5">
                {personalInfo.name.split(" ")[0]}
            </span>

            {/* Second Name: Vibrant Gradient */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 pb-2">
              {personalInfo.name.split(" ")[1]}
            </span>

          </motion.h1>

          {/* --- TYPEWRITER --- */}
          <motion.div variants={FADE_UP} className="h-16 md:h-20 mb-8 flex items-center justify-center lg:justify-start gap-4">
            <Code2 size={40} className="text-slate-600" />
            
            <span className="text-3xl md:text-5xl font-mono text-slate-300 whitespace-nowrap">
              {displayText}
            </span>
            <span className="w-1 md:w-1.5 h-8 md:h-12 bg-cyan-500 animate-pulse" />
          </motion.div>

          {/* Description */}
          <motion.p variants={FADE_UP} className="text-slate-400 text-base md:text-lg leading-loose max-w-xl mb-10">
            I build clean, functional, and visually engaging web & mobile experiences — exploring 3D and interactive techniques.
          </motion.p>

          {/* Buttons Container */}
          <motion.div variants={FADE_UP} className="flex flex-wrap gap-5 justify-center lg:justify-start">
            
            {/* 1. VIEW MY WORK BUTTON (LINK) - UPDATED TO CYAN/PURPLE */}
            <Link 
              to="/projects" 
              className="relative group p-[2.5px] rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_40px_rgba(147,51,234,0.4)]"
            >
              {/* Rotating Border Gradient (Cyan to Purple) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#06b6d4_25%,#9333ea_50%,#06b6d4_75%,transparent_100%)]"
              />

              {/* Inner Button Content (White BG on hover, Cyan/Purple Gradient) */}
              <div className="relative px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-full z-10 transition-colors">
                {/* Cyan to Purple Gradient Fill */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <span className="relative z-10 flex items-center gap-2">View My Work <MousePointer2 size={18} /></span>
              </div>
            </Link>

            {/* 2. DOWNLOAD CV BUTTON - UPDATED TO CYAN/PURPLE ACCENT */}
            <a 
              href="/assets/images/resume.pdf" 
              download
              className="relative group p-[2.5px] rounded-full overflow-hidden transition-all hover:scale-105"
            >
              {/* Rotating Border Gradient (Slate/Cyan/Purple) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#334155_0%,#06b6d4_25%,#9333ea_75%,#334155_100%)]"
              />

              {/* Inner Button Content (Dark BG, Cyan/Purple Hover Effect) */}
              <div className="relative px-8 py-4 bg-slate-900 text-slate-300 font-semibold rounded-full z-10 hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2 border border-slate-700/50">
                <span className="relative z-10 flex items-center gap-2">Download CV <Download size={18} /></span>
              </div>
            </a>

          </motion.div>

          {/* HUD Stats Bar */}
          <motion.div 
            variants={FADE_UP} 
            className="mt-16 w-full pt-6 border-t border-white/5 flex justify-between md:justify-start gap-8 md:gap-16"
          >
            <div>
              <h4 className="text-3xl font-bold text-slate-200">5+</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Projects</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-slate-200">10+</h4>
              <p className="text-xs text-slate-500 uppercase tracking-wider">Technologies</p>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-slate-200">100%</h4>
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 hover:text-cyan-400 transition-colors cursor-pointer p-4 border border-white/5 rounded-full backdrop-blur-sm z-20"
      >
        <ArrowDown size={24} />
      </motion.a>

    </section>
  );
};

export default Hero;