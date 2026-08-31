import confetti from 'canvas-confetti';
import { audioEngine } from '../audio/RomanticAudioEngine';

// Luxurious Velvet Rose Petal & Golden Stardust Shower
export const launchRoseShower = () => {
  audioEngine.playChime(1.1);

  // Custom rich romantic palette matching natural tones & velvet rose
  const petalColors = ['#a62639', '#e63946', '#e29578', '#a65341', '#f4edea', '#d4af37'];
  
  const end = Date.now() + 3000;

  // Gentle swirling petal rain from both top left and top right
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    if (Date.now() > end) {
      return clearInterval(interval);
    }

    // Left side soft drifting petals
    confetti({
      startVelocity: 18,
      spread: 70,
      ticks: 240,
      origin: { x: Math.random() * 0.3, y: -0.05 },
      colors: petalColors,
      shapes: ['circle'],
      scalar: 1.4,
      drift: Math.random() * 0.4,
      gravity: 0.65,
    });

    // Right side soft drifting petals
    confetti({
      startVelocity: 18,
      spread: 70,
      ticks: 240,
      origin: { x: 0.7 + Math.random() * 0.3, y: -0.05 },
      colors: petalColors,
      shapes: ['circle'],
      scalar: 1.4,
      drift: -Math.random() * 0.4,
      gravity: 0.65,
    });

    // Center sparkling stardust
    confetti({
      particleCount: 2,
      spread: 45,
      startVelocity: 12,
      origin: { x: 0.4 + Math.random() * 0.2, y: -0.02 },
      colors: ['#ffd700', '#fceade', '#e29578'],
      shapes: ['circle'],
      scalar: 0.8,
      gravity: 0.5,
    });
  }, 120);
};

// Grand Celestial Fireworks of Love
export const launchGrandFireworks = () => {
  audioEngine.playChime(1.3);

  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#a62639', '#a65341', '#e29578', '#d4af37', '#ffffff', '#f4edea'];

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Blast 1
    confetti({
      particleCount,
      spread: 90,
      startVelocity: 40,
      ticks: 200,
      origin: { x: randomInRange(0.15, 0.45), y: Math.random() - 0.2 },
      colors,
      scalar: 1.2,
      gravity: 0.8,
    });

    // Blast 2
    confetti({
      particleCount,
      spread: 90,
      startVelocity: 40,
      ticks: 200,
      origin: { x: randomInRange(0.55, 0.85), y: Math.random() - 0.2 },
      colors,
      scalar: 1.2,
      gravity: 0.8,
    });
  }, 220);
};

// Dedicated Heart Sparkle Burst
export const launchHeartBurst = (x = 0.5, y = 0.5) => {
  audioEngine.playChime(1.4);

  confetti({
    particleCount: 50,
    spread: 100,
    startVelocity: 25,
    origin: { x, y },
    colors: ['#a62639', '#e29578', '#a65341', '#ffd700'],
    scalar: 1.3,
    ticks: 180,
    gravity: 0.7,
  });
};
