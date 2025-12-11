//import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Phone, MapPin } from "lucide-react";
import { personalInfo } from "../../constants/data"; // Assuming you have this, or use hardcoded values below

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/dinugamethwan", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/dinugamethwan", label: "LinkedIn" },
    { icon: Mail, href: "mailto:dinugamethwan34@gmail.com", label: "Email" },
  ];

  const footerLinks = [
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Certifications", href: "/#certifications" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    // **** CRITICAL CHANGE: Updated background color to match/complement the new dark theme ****
    <footer className="relative bg-[#050D19] border-t border-white/10 pt-16 pb-8 overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. BRAND SECTION */}
          <div className="lg:col-span-1">
            <Link to="/" onClick={scrollToTop} className="inline-block mb-4">
              <h2 className="text-2xl font-bold text-white">
                Dinuga<span className="text-cyan-500">.</span>
              </h2>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              A Computer Engineering undergraduate passionate about building digital experiences that blend logic, creativity, and purposeful design.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, color: "#22d3ee" }}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. QUICK LINKS */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-slate-400 text-sm hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-400 transition-colors" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT INFO */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6">Contact Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Email Card */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-4 hover:border-cyan-500/30 transition-colors">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Email Me</h4>
                  <a href="mailto:dinugamethwan34@gmail.com" className="text-slate-400 text-xs hover:text-cyan-400 transition-colors">
                    dinugamethwan34@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-4 hover:border-purple-500/30 transition-colors">
                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Call Me</h4>
                  <a href="tel:0775434234" className="text-slate-400 text-xs hover:text-purple-400 transition-colors">
                    +94 77 543 4234
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-4 hover:border-green-500/30 transition-colors sm:col-span-2">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">Location</h4>
                  <p className="text-slate-400 text-xs">
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4. BOTTOM BAR */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            © {currentYear} Dinuga Methwan. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <p className="text-slate-600 text-xs flex items-center gap-1">
              Built with <span className="text-cyan-500">React</span> & <span className="text-purple-500">Tailwind</span>
            </p>
            
            {/* Back to Top Button */}
            <button 
              onClick={scrollToTop}
              className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:bg-cyan-500 hover:text-black transition-all group"
              aria-label="Back to Top"
            >
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;