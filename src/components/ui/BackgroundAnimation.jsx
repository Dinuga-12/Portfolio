import React, { useEffect, useRef } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // --- CONFIGURATION ---
    const PARTICLE_COLOR = "rgba(6, 182, 212,"; // Base Cyan for transparency logic
    const LINE_COLOR = "rgba(148, 163, 184,";   // Slate-400 for lines
    const PARTICLE_COUNT_DESKTOP = 80;
    const PARTICLE_COUNT_MOBILE = 40;
    const CONNECT_DISTANCE = 110; // Distance to draw lines
    const MOUSE_RADIUS = 150;     // Interaction radius

    // Specific Brand Colors for particles (Cyan, Purple, Blue)
    const brandColors = ["#06b6d4", "#a855f7", "#3b82f6"];

    let width, height;
    let particles = [];

    // Track Mouse Position
    const mouse = { x: null, y: null };

    const handleMouseMove = (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    // --- RESIZE LOGIC ---
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles(); // Re-initialize particles on resize to prevent stretching
    };

    // --- PARTICLE CLASS ---
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
        this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
        this.size = Math.random() * 2 + 1;
        this.color = brandColors[Math.floor(Math.random() * brandColors.length)]; // Random Brand Color
      }

      // Update position
      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse Interaction (Push/Pull effect) - Optional: 
        // Currently just tracking, but you can add logic here to make them flee the mouse
      }

      // Draw particle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Initialize Particles
    const initParticles = () => {
      particles = [];
      const count = width < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    // --- ANIMATION LOOP ---
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update & Draw Particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // 2. Draw Lines (Network Effect)
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    // --- CONNECT LINES LOGIC ---
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          // Calculate distance between two particles
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          // If close enough, draw a line
          if (distance < CONNECT_DISTANCE) {
            let opacityValue = 1 - distance / CONNECT_DISTANCE; // Fade out as they get further
            ctx.strokeStyle = `${LINE_COLOR} ${opacityValue * 0.2})`; // Use faint slate color
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        // --- MOUSE CONNECTIONS ---
        // Also connect particles to the mouse if close
        if (mouse.x != null) {
          let dx = particles[a].x - mouse.x;
          let dy = particles[a].y - mouse.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < MOUSE_RADIUS) {
            let opacityValue = 1 - distance / MOUSE_RADIUS;
            ctx.strokeStyle = `${PARTICLE_COLOR} ${opacityValue * 0.5})`; // Cyan connection to mouse
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    // Start
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    // Cleanup
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ background: 'transparent' }} // Let CSS background show through
    />
  );
};

export default BackgroundAnimation;