import React, { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // --- CONFIGURATION FOR SUBTLE MONOCHROMATIC LOOK ---
    const PARTICLE_COUNT_DESKTOP = 250; // Increased count to maintain density with smaller size
    const PARTICLE_COUNT_MOBILE = 120;
    
    const MAX_VELOCITY = 0.08; // Slower speed (was 0.1)
    
    // Only use white/light gray colors
    const dustColors = ["#ffffff", "#f0f0f0", "#e0e0e0"]; 

    let width, height;
    let particles = [];

    // Mouse tracking (Kept for completeness, but not affecting animation)
    const mouse = { x: null, y: null };
    const handleMouseMove = (e) => { mouse.x = e.x; mouse.y = e.y; };
    const handleMouseLeave = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    // --- RESIZE LOGIC ---
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles(); 
    };

    // --- PARTICLE CLASS ---
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        this.vx = (Math.random() - 0.5) * MAX_VELOCITY; 
        this.vy = (Math.random() - 0.5) * MAX_VELOCITY; 
        
        // **********************************************
        // CRITICAL CHANGE: Reduced particle size range 
        // Max size is now 0.8px (was 1.5px)
        // **********************************************
        this.size = Math.random() * 0.4 + 0.4; 
        
        this.color = dustColors[Math.floor(Math.random() * dustColors.length)];
      }

      // Update position (Wrap around edges)
      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      // Draw particle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize Particles Array
    const initParticles = () => {
      particles = [];
      const count = width < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    // --- ANIMATION LOOP ---
    const animate = () => {
      // Clear the canvas completely (maintains website's existing background color)
      ctx.clearRect(0, 0, width, height); 
      
      // Update & Draw Particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Start
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    // Cleanup Function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Fixed position, full screen, non-interactive, and lowest z-index
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ background: 'transparent' }} // Ensures the canvas itself is transparent
    />
  );
};

export default BackgroundAnimation;