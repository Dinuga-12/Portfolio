import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import { Award, ExternalLink, X, Calendar } from "lucide-react";
import { certificationsData } from "../../constants/data";

const Certifications = () => {
  // 1. State to manage the currently open certificate modal
  const [selectedCert, setSelectedCert] = useState(null);

  // Duplicate data for infinite marquee loop
  const marqueeData = [...certificationsData, ...certificationsData, ...certificationsData];

  return (
    <SectionWrapper id="certifications" className="bg-transparent py-20 overflow-hidden relative z-10">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col items-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Certifications
          </span>
        </h2>
        <p className="text-slate-400">Industry-recognized credentials showcasing my skills.</p>
      </div>
      
      {/* --- MARQUEE CONTAINER --- */}
      {/* UPDATED: Changed fade zones to 5% (Narrow/Sharp edges) */}
      <div 
        className="relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
        }}
      >
        <motion.div
          className="flex gap-6 w-max pl-4"
          animate={{ x: "-33.33%" }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {marqueeData.map((cert, index) => (
            <div
              key={index}
              className="min-w-[320px] bg-[#0f172a]/80 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group shadow-lg backdrop-blur-md flex flex-col"
            >
              {/* --- CARD IMAGE --- */}
              <div className="h-40 bg-white/5 relative flex items-center justify-center p-6">
                 <img
                   src={cert.image}
                   alt={cert.name}
                   className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                   onError={(e) => {
                     e.target.src = "https://placehold.co/600x400/1e293b/FFF?text=Certificate";
                   }}
                 />
              </div>

              {/* --- CARD CONTENT --- */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{cert.name}</h3>
                  <p className="text-cyan-400 text-xs uppercase tracking-wider font-semibold mb-3">{cert.issuer}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
                   <div className="flex items-center gap-2 text-slate-500 text-xs">
                      <Award size={14} className="text-cyan-500" />
                      <span>{cert.date}</span>
                   </div>
                   
                   <button
                     onClick={() => setSelectedCert(cert)}
                     className="px-4 py-2 bg-white/5 hover:bg-cyan-600 hover:text-white text-slate-300 text-xs font-bold rounded-lg transition-colors flex items-center gap-2"
                   >
                     View Credential
                   </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f172a] border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            >
              
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white">Certificate Details</h3>
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-500 text-slate-400 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
                
                <div className="w-full md:w-1/2 aspect-video bg-black/50 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center p-2">
                   <img 
                      src={selectedCert.image} 
                      alt={selectedCert.name} 
                      className="w-full h-full object-contain"
                   />
                </div>

                <div className="w-full md:w-1/2 space-y-4">
                   <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedCert.name}</h2>
                      <p className="text-cyan-400 font-medium text-lg">{selectedCert.issuer}</p>
                   </div>
                   
                   <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <Calendar size={16} />
                      <span>Issued: {selectedCert.date}</span>
                   </div>

                   <p className="text-slate-400 text-sm leading-relaxed">
                     This certification validates proficiency in {selectedCert.name}. 
                     It demonstrates technical expertise and dedication to continuous learning in the field.
                   </p>

                   <a 
                     href={selectedCert.link} 
                     target="_blank" 
                     rel="noreferrer"
                     className="inline-flex items-center gap-2 px-6 py-3 mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all hover:scale-105"
                   >
                     Verify on {selectedCert.issuer} <ExternalLink size={16} />
                   </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </SectionWrapper>
  );
};

export default Certifications;