import React from "react"; 
import { motion } from "framer-motion";

// Helper component for the character-by-character entrance animation with alternating colors
const AnimatedText = ({ text, delayOffset = 0.5, stagger = 0.025 }) => {
    // 1. Split the sentence into words
    const words = text.split(/\s+/);
    
    // Calculate total length of the text (including spaces to correctly determine center point)
    const totalLength = text.length; 
    
    // 2. Map over words and split each into letters
    let letterCount = 0;
    const animatedElements = words.map((word, wordIndex) => {
        const letters = Array.from(word);
        
        // Define color gradient based on word index (alternating colors for visibility)
        const colorClass = wordIndex % 2 === 0
            ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500" // Cyan/Blue
            : "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-500"; // Violet/Fuchsia

        const wordElements = letters.map((letter, indexInWord) => {
            const currentGlobalIndex = letterCount;
            letterCount++; // Increment global index for positioning logic

            // Variants for each individual letter
            const letterVariants = {
                hidden: {
                    // Logic to make letters fly from the sides to the center
                    // If the letter is in the first half of the sentence, start from -50 (left).
                    // Otherwise, start from 50 (right).
                    x: currentGlobalIndex < totalLength / 2 ? -50 : 50,
                    opacity: 0,
                },
                visible: {
                    x: 0,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        damping: 10,
                        stiffness: 100,
                    },
                },
            };

            return (
                <motion.span
                    key={indexInWord}
                    variants={letterVariants}
                    className="inline-block"
                >
                    {letter}
                </motion.span>
            );
        });

        // Add a space after each word (except the last one)
        if (wordIndex < words.length - 1) {
             // Add space to the global count for accurate center calculation
            letterCount++; 
            wordElements.push(
                <motion.span 
                    key={`space-${wordIndex}`} 
                    className="inline-block"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                    &nbsp; 
                </motion.span>
            );
        }

        // We wrap the letters of the word in a span with the gradient color
        return (
            <span key={wordIndex} className={`${colorClass} inline-block`}>
                {wordElements}
            </span>
        );
    });

    // Variants for the container (staggering the children)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delayOffset,
                staggerChildren: stagger,
            },
        },
    };

    return (
        <motion.span
            className="flex justify-center flex-wrap" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {animatedElements}
        </motion.span>
    );
};


const WelcomeScreen = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center font-sans overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
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
          <source src="/startup-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* BRIGHTER Dark Overlay (bg-black/40) to let more video light through */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 text-center px-4">
        
        {/* Main Heading with Character Animation and Alternating Colors */}
        <h1
          className="text-4xl md:text-6xl font-extrabold mb-2 tracking-tight drop-shadow-lg"
        >
            <AnimatedText 
                text="Designing the Digital Future" 
                delayOffset={0.5} 
                stagger={0.025}
            />
        </h1>
        
        {/* Subtitle - Increased Visibility (text-slate-200) and stronger animation (y: 30 to y: 0) */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, type: "spring", stiffness: 150 }} 
          className="text-slate-200 text-sm md:text-lg max-w-lg mx-auto mb-10 leading-relaxed font-light drop-shadow-md"
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
            transition={{ duration: 9, ease: "linear" }} 
            onAnimationComplete={onComplete}
          />
        </div>
        
        {/* Loading Text */}
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="text-xs text-slate-500 mt-4 font-mono uppercase tracking-widest"
        >
            System Online...
        </motion.p>

      </div>
    </motion.div>
  );
};

export default WelcomeScreen;