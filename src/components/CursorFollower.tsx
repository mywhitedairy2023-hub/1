import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CursorFollower() {
  // useMotionValue tracks the mouse without causing React to constantly re-render
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Fast spring for the sharp outer ring
  const cursorSpringConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, cursorSpringConfig);
  const cursorY = useSpring(mouseY, cursorSpringConfig);

  // Slower, softer spring for the large background glow trail
  const glowSpringConfig = { damping: 30, stiffness: 100 };
  const glowX = useSpring(mouseX, glowSpringConfig);
  const glowY = useSpring(mouseY, glowSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Sharp Cursor Ring */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-white" />
      </motion.div>

      {/* Soft Background Glow (Aligned to the White Dairy Theme) */}
      <motion.div
        className="fixed pointer-events-none z-40 hidden lg:block"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-400/20 to-green-400/20 blur-3xl" />
      </motion.div>
    </>
  );
}