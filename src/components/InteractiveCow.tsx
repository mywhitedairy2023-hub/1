import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

export function InteractiveCow() {
  const [isPouring, setIsPouring] = useState(false);
  const [milkLevel, setMilkLevel] = useState(0);
  const fillInterval = useRef<NodeJS.Timeout | null>(null);

  // Clear the interval if the component unmounts
  useEffect(() => {
    return () => {
      if (fillInterval.current) clearInterval(fillInterval.current);
    };
  }, []);

  const handleStartPouring = () => {
    setIsPouring(true);
    // Slowly fill the bucket up to a maximum level of 24
    fillInterval.current = setInterval(() => {
      setMilkLevel((prev) => (prev >= 24 ? 24 : prev + 1));
    }, 100);
  };

  const handleStopPouring = () => {
    setIsPouring(false);
    if (fillInterval.current) {
      clearInterval(fillInterval.current);
    }
  };

  return (
    // Added 'select-none' so the user doesn't accidentally highlight text while holding
    <div className="relative w-full h-[600px] flex items-center justify-center select-none">
      
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
            cx="250" cy="200" rx="180" ry="120"
            fill="#FFFFFF" stroke="#333" strokeWidth="3"
            animate={isPouring ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 0.3, repeat: Infinity }}
          />

          {/* Spots */}
          <ellipse cx="200" cy="180" rx="40" ry="35" fill="#1a1a1a" />
          <ellipse cx="280" cy="160" rx="35" ry="30" fill="#1a1a1a" />
          <ellipse cx="230" cy="220" rx="30" ry="25" fill="#1a1a1a" />
          <ellipse cx="310" cy="210" rx="38" ry="32" fill="#1a1a1a" />

          {/* Head */}
          <motion.g
            animate={isPouring ? { rotate: [0, -2, 2, -2, 0] } : {}}
            transition={{ duration: 0.4, repeat: Infinity }}
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
            stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round"
            animate={{ d: [
              "M 100 200 Q 70 180 60 200 Q 50 220 55 230",
              "M 100 200 Q 70 190 65 210 Q 60 230 60 240",
              "M 100 200 Q 70 180 60 200 Q 50 220 55 230"
            ]}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <circle cx="55" cy="230" r="8" fill="#333" />

          {/* Udder & Teats (Clickable) */}
          <motion.g
            style={{ cursor: 'pointer', touchAction: 'none' }} // touchAction prevents screen scrolling on mobile when holding
            onPointerDown={handleStartPouring}
            onPointerUp={handleStopPouring}
            onPointerLeave={handleStopPouring}
            whileHover={{ scale: 1.05 }}
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

        {/* Continuous Milk Streams */}
        <div className="absolute top-[56%] left-1/2 transform -translate-x-1/2 flex gap-[14px] pointer-events-none z-0">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-white rounded-full"
              style={{
                boxShadow: '0 0 10px rgba(255,255,255,0.8)',
                transformOrigin: 'top' // Ensures streams pull down from the teats
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: isPouring ? 140 : 0,
                opacity: isPouring ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        {/* Milk Bucket */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
          animate={isPouring ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <svg width="120" height="80" viewBox="0 0 120 80">
            <path
              d="M 20 20 L 15 70 Q 15 75 20 75 L 100 75 Q 105 75 105 70 L 100 20 Z"
              fill="#C0C0C0" stroke="#333" strokeWidth="2"
            />
            <ellipse cx="60" cy="20" rx="40" ry="8" fill="#D3D3D3" stroke="#333" strokeWidth="2" />

            {/* Milk level that fills up! */}
            <motion.rect
              x="22"
              width="76"
              fill="#FFFFFF"
              animate={{
                height: milkLevel,
                y: 72 - milkLevel
              }}
              transition={{ duration: 0.1 }}
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
            Press and hold the udder to pour milk! 🥛
          </p>
        </div>
      </motion.div>
    </div>
  );
}