import { motion } from 'motion/react';
import { useState } from 'react';

// Define a type for our pre-calculated milk drops
interface MilkDrop {
  id: number;
  left: string;
}

export function InteractiveCow() {
  const [isMilking, setIsMilking] = useState(false);
  const [milkDrops, setMilkDrops] = useState<MilkDrop[]>([]);

  const handleUdderClick = () => {
    // Prevent spam clicking while already milking
    if (isMilking) return;
    
    setIsMilking(true);

    // Create milk drops and lock in their random horizontal positions
    const newDrops = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${45 + Math.random() * 10}%`
    }));
    setMilkDrops(newDrops);

    // Stop milking after animation finishes
    setTimeout(() => {
      setIsMilking(false);
      setMilkDrops([]);
    }, 2000);
  };

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Cow Body */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Cow Main Body */}
        <svg width="500" height="400" viewBox="0 0 500 400" className="relative z-10">
          {/* Body */}
          <motion.ellipse
            cx="250"
            cy="200"
            rx="180"
            ry="120"
            fill="#FFFFFF"
            stroke="#333"
            strokeWidth="3"
            animate={isMilking ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3, repeat: isMilking ? 6 : 0 }}
          />

          {/* Spots */}
          <ellipse cx="200" cy="180" rx="40" ry="35" fill="#1a1a1a" />
          <ellipse cx="280" cy="160" rx="35" ry="30" fill="#1a1a1a" />
          <ellipse cx="230" cy="220" rx="30" ry="25" fill="#1a1a1a" />
          <ellipse cx="310" cy="210" rx="38" ry="32" fill="#1a1a1a" />

          {/* Head */}
          <motion.g
            animate={isMilking ? { rotate: [0, -2, 2, -2, 0] } : {}}
            transition={{ duration: 0.4, repeat: isMilking ? 5 : 0 }}
            style={{ transformOrigin: '400px 140px' }}
          >
            <ellipse cx="400" cy="140" rx="70" ry="60" fill="#FFFFFF" stroke="#333" strokeWidth="3" />

            {/* Eyes */}
            <circle cx="380" cy="130" r="8" fill="#333" />
            <circle cx="420" cy="130" r="8" fill="#333" />
            <circle cx="382" cy="128" r="3" fill="#FFF" />
            <circle cx="422" cy="128" r="3" fill="#FFF" />

            {/* Nose */}
            <ellipse cx="400" cy="155" rx="25" ry="20" fill="#FFB6C1" stroke="#333" strokeWidth="2" />
            <circle cx="393" cy="152" r="4" fill="#333" />
            <circle cx="407" cy="152" r="4" fill="#333" />

            {/* Ears */}
            <ellipse cx="350" cy="110" rx="20" ry="35" fill="#FFFFFF" stroke="#333" strokeWidth="3" />
            <ellipse cx="450" cy="110" rx="20" ry="35" fill="#FFFFFF" stroke="#333" strokeWidth="3" />

            {/* Horns */}
            <path d="M 340 95 Q 335 75 340 60" stroke="#8B4513" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M 460 95 Q 465 75 460 60" stroke="#8B4513" strokeWidth="6" fill="none" strokeLinecap="round" />
          </motion.g>

          {/* Legs */}
          <rect x="150" y="280" width="30" height="100" rx="15" fill="#FFFFFF" stroke="#333" strokeWidth="3" />
          <rect x="220" y="280" width="30" height="100" rx="15" fill="#FFFFFF" stroke="#333" strokeWidth="3" />
          <rect x="290" y="280" width="30" height="100" rx="15" fill="#FFFFFF" stroke="#333" strokeWidth="3" />
          <rect x="360" y="280" width="30" height="100" rx="15" fill="#FFFFFF" stroke="#333" strokeWidth="3" />

          {/* Hooves */}
          <rect x="145" y="370" width="40" height="20" rx="5" fill="#333" />
          <rect x="215" y="370" width="40" height="20" rx="5" fill="#333" />
          <rect x="285" y="370" width="40" height="20" rx="5" fill="#333" />
          <rect x="355" y="370" width="40" height="20" rx="5" fill="#333" />

          {/* Tail */}
          <motion.path
            d="M 100 200 Q 70 180 60 200 Q 50 220 55 230"
            stroke="#FFFFFF"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            animate={{ d: [
              "M 100 200 Q 70 180 60 200 Q 50 220 55 230",
              "M 100 200 Q 70 190 65 210 Q 60 230 60 240",
              "M 100 200 Q 70 180 60 200 Q 50 220 55 230"
            ]}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <circle cx="55" cy="230" r="8" fill="#333" />

          {/* Udder (Clickable) */}
          <motion.g
            style={{ cursor: 'pointer' }}
            onClick={handleUdderClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Main udder */}
            <ellipse cx="250" cy="290" rx="60" ry="40" fill="#FFB6C1" stroke="#333" strokeWidth="2" />

            {/* Teats */}
            <ellipse cx="230" cy="320" rx="12" ry="20" fill="#FFB6C1" stroke="#333" strokeWidth="2" />
            <ellipse cx="250" cy="325" rx="12" ry="20" fill="#FFB6C1" stroke="#333" strokeWidth="2" />
            <ellipse cx="270" cy="320" rx="12" ry="20" fill="#FFB6C1" stroke="#333" strokeWidth="2" />
          </motion.g>
        </svg>

        {/* Milk Drops Animation */}
        {isMilking && milkDrops.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute w-3 h-4 bg-white rounded-full"
            style={{
              left: drop.left,
              top: '75%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{
              y: 100,
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              duration: 0.8,
              delay: drop.id * 0.1,
              ease: 'easeIn'
            }}
          />
        ))}

        {/* Milk Bucket */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          animate={isMilking ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3, repeat: isMilking ? 6 : 0 }}
        >
          <svg width="120" height="80" viewBox="0 0 120 80">
            <path
              d="M 20 20 L 15 70 Q 15 75 20 75 L 100 75 Q 105 75 105 70 L 100 20 Z"
              fill="#C0C0C0"
              stroke="#333"
              strokeWidth="2"
            />
            <ellipse cx="60" cy="20" rx="40" ry="8" fill="#D3D3D3" stroke="#333" strokeWidth="2" />

            {/* Milk level */}
            <motion.rect
              x="22"
              y="60"
              width="76"
              height="0"
              fill="#FFFFFF"
              animate={isMilking ? { height: 12, y: 60 } : { height: 0, y: 72 }}
              transition={{ duration: 2 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Instruction Text */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="px-8 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-blue-200">
          <p className="text-lg font-semibold text-blue-600">
            Click on the udder to milk the cow! 🥛
          </p>
        </div>
      </motion.div>
    </div>
  );
}