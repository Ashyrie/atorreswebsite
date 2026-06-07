import { useEffect, useRef } from "react";

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = [];
    const maxParticles = window.innerWidth < 768 ? 35 : 75; // Adjust density based on screen size
    const connectionDist = 110;
    const mouse = { x: -1000, y: -1000, active: false, radius: 150 };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
    }

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < maxParticles; i++) {
        const baseAlpha = Math.random() * 0.35 + 0.15;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45, // slow movement
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
          alpha: baseAlpha,
          baseAlpha,
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      createParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    createParticles();
    window.addEventListener("resize", handleResize);
    // Bind mouse events to the parent element or window
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Animation Loop
    const draw = () => {
      // Check if hero is scrolled out of view to preserve resources
      if (window.scrollY > height) {
        animationId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`; // cyan-500
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse connection
        if (mouse.active) {
          const mdx = p1.x - mouse.x;
          const mdy = p1.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            // Pull particles slightly toward mouse
            const force = (mouse.radius - mdist) / mouse.radius;
            p1.x -= mdx * force * 0.02;
            p1.y -= mdy * force * 0.02;

            // Draw line to mouse
            const alpha = (1 - mdist / mouse.radius) * 0.22;
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`; // sky-500
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Draw particle
        ctx.fillStyle = `rgba(6, 182, 212, ${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update positions
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundary bounce
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
    />
  );
}
