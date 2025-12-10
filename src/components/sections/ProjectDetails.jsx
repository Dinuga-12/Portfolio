import React, { useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom"; // Added useLocation
import { motion } from "framer-motion";
import { projectsData } from "../../constants/data"; 
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const location = useLocation(); // Hook to get URL info
  const project = projectsData.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- SMART BACK BUTTON LOGIC ---
  // 1. Check if "?from=gallery" exists in the URL
  const searchParams = new URLSearchParams(location.search);
  const fromGallery = searchParams.get("from") === "gallery";

  // 2. Decide destination and text
  const backLink = fromGallery ? "/projects" : "/#projects";
  const backText = fromGallery ? "Back to Gallery" : "Back to Projects";

  // 3. Decide if we use <a> (for hash scroll) or <Link> (for router nav)
  // If going to #projects, we use <a> to force the Scroll Fix in App.jsx
  // If going to /projects, we use <Link> for smooth internal routing
  const BackButtonComponent = fromGallery ? Link : 'a';

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <h2 className="text-2xl">Project not found</h2>
        <a href="/" className="ml-4 text-cyan-400 hover:underline">Go Home</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">
      
      {/* --- DYNAMIC BACK BUTTON --- */}
      <BackButtonComponent 
        to={fromGallery ? backLink : undefined} // Only used if Link
        href={!fromGallery ? backLink : undefined} // Only used if a
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full text-sm font-bold text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all group shadow-xl"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {backText}
      </BackButtonComponent>

      <div className="w-full bg-slate-900 min-h-screen relative">
        {/* ... (The rest of your existing design remains unchanged) ... */}
        
        {/* --- Hero Image --- */}
        <div className="relative h-[60vh] w-full">
          <motion.img 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={project.img || project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold uppercase tracking-wider border border-cyan-500/20 mb-4 inline-block"
                >
                  {project.type || "Project"}
                </motion.span>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-7xl font-bold text-white mb-2"
                >
                  {project.title}
                </motion.h1>
            </div>
          </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="max-w-7xl mx-auto p-8 md:p-16 grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-12">
            <div>
              <h4 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Overview</h4>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                {project.fullDesc || project.description}
              </p>
            </div>

            {project.features && (
              <div className="bg-slate-950/50 p-8 rounded-3xl border border-slate-800">
                <h4 className="text-lg font-bold text-cyan-400 mb-8 uppercase tracking-wide">Key Features</h4>
                <ul className="grid gap-6">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-300">
                      <span className="mt-2 w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 shadow-[0_0_10px_cyan]" />
                      <span className="leading-relaxed text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-10">
            <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700/30 backdrop-blur-sm">
              <h5 className="text-slate-400 font-bold uppercase text-xs mb-3 tracking-widest">My Role</h5>
              <p className="text-white text-xl font-medium">{project.role || "Developer"}</p>
            </div>

            <div>
              <h5 className="text-slate-500 font-bold uppercase text-xs mb-4 tracking-widest pl-1">Tech Stack</h5>
              <div className="flex flex-wrap gap-2">
                {project.technologies && project.technologies.map((t, i) => (
                  <span key={i} className="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-medium rounded-xl border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {project.result && (
              <div>
                <h5 className="text-slate-500 font-bold uppercase text-xs mb-4 tracking-widest pl-1">Outcome</h5>
                <p className="text-green-400 font-medium text-lg border-l-4 border-green-500 pl-6 py-2 bg-green-500/5 rounded-r-xl">
                  {project.result}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-8">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all flex items-center justify-center gap-2 group text-lg"
              >
                View Live Demo <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 group text-lg"
              >
                Source Code <Github size={20} className="group-hover:scale-110 transition-transform"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;