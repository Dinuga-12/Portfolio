import React, { useState } from "react";
import SectionWrapper from "../ui/SectionWrapper";
import { personalInfo } from "../../constants/data";
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  // --- STATE MANAGEMENT ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // 1. Simulate API Sending (2 Seconds)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear Data

        // 2. Auto-Reappear Form (Wait 3 Seconds then show form again)
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);

      }, 2000);
    }
  };

  return (
    <SectionWrapper id="contact" className="py-16 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4">
        
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* --- LEFT COLUMN: CONTACT INFO --- */}
          <div>
            {/* Heading Updated for Day Mode */}
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-500">Connect</span>
            </h2>
            {/* Description Text Updated */}
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-sm">
              I am always open to discussing new projects, creative ideas, or opportunities. Let's build something amazing together.
            </p>
            
            <div className="space-y-4">
              {/* Email Card (Updated Backgrounds & Borders) */}
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-sm dark:shadow-none">
                <div className="p-2.5 bg-cyan-100 dark:bg-cyan-500/10 rounded-lg text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Mail Me</p>
                  <p className="text-slate-900 dark:text-white text-sm font-medium">{personalInfo.email}</p>
                </div>
              </a>

              {/* Phone Card */}
              <a href={`tel:${personalInfo.phoneIntl}`} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-purple-500/50 hover:bg-slate-50 dark:hover:bg-white/10 transition-all group shadow-sm dark:shadow-none">
                <div className="p-2.5 bg-purple-100 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Call Me</p>
                  <p className="text-slate-900 dark:text-white text-sm font-medium">{personalInfo.phone}</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-green-500/50 transition-all group shadow-sm dark:shadow-none">
                <div className="p-2.5 bg-green-100 dark:bg-green-500/10 rounded-lg text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-slate-900 dark:text-white text-sm font-medium">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-full text-slate-600 dark:text-slate-400 hover:bg-cyan-500 hover:text-black transition-all hover:-translate-y-1 shadow-md dark:shadow-lg">
                <Github size={18} />
              </a>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-full text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1 shadow-md dark:shadow-lg">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM / SUCCESS MESSAGE --- */}
          <div className="relative">
            {/* Form Container: Updated Background for Day Mode visibility */}
            <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl dark:shadow-2xl relative z-10 min-h-[400px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* --- SUCCESS STATE --- */
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green-600 dark:text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Thank you for reaching out. <br />
                      The form will return shortly...
                    </p>
                    {/* Progress Bar */}
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, ease: "linear" }}
                      className="h-1 bg-green-500/50 mt-6 rounded-full mx-auto max-w-[100px]"
                    />
                  </motion.div>
                ) : (
                  /* --- FORM STATE --- */
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Send a Message</h3>
                    
                    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                      <div className="grid grid-cols-2 gap-4">
                        
                        {/* Name Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase ml-1">Name</label>
                          <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-3 text-sm rounded-lg bg-slate-50 dark:bg-black/20 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-white dark:focus:bg-black/40 ${errors.name ? "border-red-500" : "border-slate-200 dark:border-white/10"}`} 
                            placeholder="John Doe" 
                          />
                          {errors.name && <p className="text-red-500 text-[10px] ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase ml-1">Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-3 text-sm rounded-lg bg-slate-50 dark:bg-black/20 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-white dark:focus:bg-black/40 ${errors.email ? "border-red-500" : "border-slate-200 dark:border-white/10"}`} 
                            placeholder="john@example.com" 
                          />
                          {errors.email && <p className="text-red-500 text-[10px] ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
                        </div>
                      </div>
                      
                      {/* Subject Input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase ml-1">Subject</label>
                        <input 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`w-full p-3 text-sm rounded-lg bg-slate-50 dark:bg-black/20 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-white dark:focus:bg-black/40 ${errors.subject ? "border-red-500" : "border-slate-200 dark:border-white/10"}`} 
                          placeholder="Project Inquiry" 
                        />
                        {errors.subject && <p className="text-red-500 text-[10px] ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.subject}</p>}
                      </div>

                      {/* Message Input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase ml-1">Message</label>
                        <textarea 
                          rows="3" 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`w-full p-3 text-sm rounded-lg bg-slate-50 dark:bg-black/20 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all focus:border-cyan-500 focus:bg-white dark:focus:bg-black/40 resize-none ${errors.message ? "border-red-500" : "border-slate-200 dark:border-white/10"}`} 
                          placeholder="Tell me about your project..."
                        ></textarea>
                        {errors.message && <p className="text-red-500 text-[10px] ml-1 flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
                      </div>
                      
                      <button 
                        disabled={isSubmitting}
                        className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-600 text-white text-sm font-bold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>Sending... <Loader2 size={16} className="animate-spin" /></>
                        ) : (
                          <>Send Message <Send size={16} /></>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl -z-0" />
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;