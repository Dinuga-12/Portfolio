import React from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import { Code2, Gamepad2, Lightbulb, Rocket, Brain } from "lucide-react";

// --- 1. TYPING ANIMATION COMPONENT ---
const wordVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const TypingText = ({ text, delay = 0, className }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-1.5"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- STATS DATA ---
const stats = [
  { label: "Projects Completed", value: "5+", icon: Rocket },
  { label: "Tech Stack", value: "10+", icon: Code2 },
];

const About = () => {
  return (
    <SectionWrapper id="about" className="py-24 relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* --- LEFT: PROFILE VISUALS --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          // UPDATED: Added 'lg:-mt-24' to move the photo up on large screens
          className="relative group mx-auto lg:mx-auto w-full max-w-sm lg:-mt-24"
        >
          {/* Main Profile Card */}
          <div className="relative z-10 bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-4 rounded-3xl shadow-2xl transition-transform duration-500 group-hover:-rotate-2">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
              <img
                src="/assets/images/porfile.jpg"
                alt="Dinuga Methwan"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

              {/* RESTORED: Open to Work Tag */}
              <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white text-xs font-bold tracking-wide">Open to Work</span>
              </div>
            </div>
          </div>

          {/* Background Frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-3xl -z-10 transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 opacity-20" />

          {/* Floating Stats Card */}
          <div className="absolute -right-5 top-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-xl hidden md:block animate-float">
            <Brain className="text-cyan-600 dark:text-cyan-400 mb-1" size={24} />
            <span className="text-slate-900 dark:text-white text-xs font-bold">Problem Solver</span>
          </div>
        </motion.div>


        {/* --- RIGHT: TEXT CONTENT --- */}
        <div className="space-y-8">

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              I Craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">Digital Reality</span>
            </motion.h2>

            <TypingText
              text="I’m Dinuga Methwan, a Computer Engineering undergraduate combining engineering precision with creative design."
              className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium"
              delay={0}
            />
          </div>

          {/* 3-Part Info Block */}
          <div className="space-y-6">

            {/* Block 1 */}
            <div className="flex gap-4 group">
              <div className="mt-1 bg-cyan-100 dark:bg-cyan-500/10 p-3 rounded-lg h-fit text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                <Code2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Engineering & Design</h3>
                <TypingText
                  text="My background spans Full-Stack Development, Mobile Apps, and UI/UX. I don't just write code; I build intuitive, immersive experiences that solve real problems."
                  className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                  delay={0.5}
                />
              </div>
            </div>

            {/* Block 2 */}
            <div className="flex gap-4 group">
              <div className="mt-1 bg-purple-100 dark:bg-purple-500/10 p-3 rounded-lg h-fit text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <Lightbulb size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">The Methodology</h3>
                <TypingText
                  text="I approach every project with a detail-first mindset. From scalable backends to pixel-perfect frontends, I ensure every solution is technically sound and visually polished."
                  className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                  delay={1.5}
                />
              </div>
            </div>

            {/* Block 3 */}
            <div className="flex gap-4 group">
              <div className="mt-1 bg-pink-100 dark:bg-pink-500/10 p-3 rounded-lg h-fit text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                <Gamepad2 size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Beyond the Screen</h3>
                <TypingText
                  text="When I'm not coding, I'm exploring immersive video games—analyzing their mechanics to understand better user interaction and storytelling."
                  className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed"
                  delay={2.5}
                />
              </div>
            </div>

          </div>

          {/* --- KEY METRICS --- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-white/10 pt-8 max-w-sm"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-left">
                <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.value}</h4>
                <p className="text-slate-500 text-xs uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* --- BUTTON --- */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="/assets/images/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:scale-105 transition-all shadow-lg"
            >
              Download CV <Rocket size={18} />
            </a>
          </motion.div>

        </div>

      </div>
    </SectionWrapper>
  );
};

export default About;