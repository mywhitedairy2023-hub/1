import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  sway: number; // Added to lock in the horizontal sway distance
}

export function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const newBubbles: Bubble[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      sway: Math.random() * 20 - 10, // Pre-calculate sway to prevent glitching
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            // Softened to a milky blue to match the Dairy theme
            background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.02))`,
            border: '1px solid rgba(59, 130, 246, 0.15)',
            boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.05)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, bubble.sway, 0], // Uses the locked-in sway value
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}