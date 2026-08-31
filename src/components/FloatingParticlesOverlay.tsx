import React, { useEffect, useRef } from 'react';

interface FloatingPetal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  petalType: 'petal' | 'dust' | 'sparkle';
  swayFreq: number;
  swayAmp: number;
  time: number;
}

export const FloatingParticlesOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Warm natural tone palette for petals and ambient particles
    const petalColors = [
      'rgba(166, 38, 57, 0.65)',   // Crimson rose
      'rgba(226, 149, 120, 0.7)',  // Dusty blush
      'rgba(166, 83, 65, 0.6)',    // Terracotta
      'rgba(244, 237, 234, 0.8)',  // Linen petal
      'rgba(212, 175, 55, 0.55)',  // Soft gold dust
    ];

    const particleCount = 28;
    const particles: FloatingPetal[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 5,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.6 + 0.3,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        petalType: i % 4 === 0 ? 'sparkle' : 'petal',
        swayFreq: Math.random() * 0.02 + 0.01,
        swayAmp: Math.random() * 1.5 + 0.5,
        time: Math.random() * 100,
      });
    }

    // Cursor interactive disturbance
    let mouseX = -1000;
    let mouseY = -1000;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Draw single stylized curved rose petal
    const drawPetal = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.fillStyle = color;

      c.beginPath();
      // Elliptical tear curve mimicking real falling rose petal
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.7, -size * 0.8, size * 0.9, size * 0.4, 0, size);
      c.bezierCurveTo(-size * 0.9, size * 0.4, -size * 0.7, -size * 0.8, 0, -size);
      c.fill();

      // Soft center petal vein
      c.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      c.lineWidth = 0.8;
      c.beginPath();
      c.moveTo(0, -size * 0.7);
      c.lineTo(0, size * 0.7);
      c.stroke();

      c.restore();
    };

    const drawSparkle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string
    ) => {
      c.save();
      c.translate(x, y);
      c.fillStyle = color;

      c.beginPath();
      c.arc(0, 0, size * 0.35, 0, Math.PI * 2);
      c.fill();

      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.time += 1;

        // Natural sway
        const sway = Math.sin(p.time * p.swayFreq) * p.swayAmp;
        p.x += p.speedX + sway;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Gentle cursor push
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        // Screen wrap
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        if (p.petalType === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    />
  );
};
