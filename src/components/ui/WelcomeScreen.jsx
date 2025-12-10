import React from "react"; 
import { motion } from "framer-motion";

const WelcomeScreen = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center font-sans overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      
      {/* --- VIDEO BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover" 
        >
          {/* Ensure 'startup-bg.mp4' is in your 'public' folder */}
          <source src="/startup-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay (bg-black/60) to make text readable */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 text-center px-4">
        
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight drop-shadow-lg"
        >
          Designing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Future</span>
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-slate-300 text-sm md:text-lg max-w-lg mx-auto mb-10 leading-relaxed font-light"
        >
          Welcome to the digital portfolio of <span className="text-white font-semibold">Dinuga Methwan</span>. 
          Exploring the intersection of code, creativity, and engineering.
        </motion.p>

        {/* --- LOADING BAR (CONTROLS TIMING) --- */}
        <div className="w-64 h-1 bg-gray-800/50 rounded-full mx-auto overflow-hidden backdrop-blur-sm border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_cyan]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            // Duration set to 9 seconds
            transition={{ duration: 9, ease: "linear" }} 
            onAnimationComplete={onComplete}
          />
        </div>
        
        {/* Loading Text */}
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-slate-500 mt-4 font-mono uppercase tracking-widest"
        >
            Initializing System...
        </motion.p>

      </div>
    </motion.div>
  );
};

export default WelcomeScreen;