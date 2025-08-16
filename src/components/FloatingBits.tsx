import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FloatingBit {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  delay: number;
  duration: number;
}

const FloatingBits: React.FC = () => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = useMemo(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Check if device is mobile/low-end
  const isMobile = useMemo(() => {
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  const bits = useMemo(() => {
    const generateBits = (): FloatingBit[] => {
      const bits: FloatingBit[] = [];
      const colors = ['#5865F2', '#FFB86B', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
      
      // Reduce number of elements on mobile
      const count = isMobile ? 6 : 15;
      
      for (let i = 0; i < count; i++) {
        bits.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 2,
        });
      }
      
      return bits;
    };

    return generateBits();
  }, [isMobile]);

  const renderShape = (bit: FloatingBit) => {
    const baseClasses = "absolute opacity-20";
    const style = {
      width: `${bit.size}px`,
      height: `${bit.size}px`,
      backgroundColor: bit.color,
      left: `${bit.x}%`,
      top: `${bit.y}%`,
    };

    switch (bit.shape) {
      case 'circle':
        return (
          <div
            className={`${baseClasses} rounded-full`}
            style={style}
          />
        );
      case 'square':
        return (
          <div
            className={`${baseClasses} rounded-sm`}
            style={style}
          />
        );
      case 'triangle':
        return (
          <div
            className={`${baseClasses} rotate-45`}
            style={{
              ...style,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              transform: 'rotate(45deg)',
            }}
          />
        );
      default:
        return null;
    }
  };

  // Don't render animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bits.slice(0, 3).map((bit) => (
          <div
            key={bit.id}
            className="absolute"
            style={{
              left: `${bit.x}%`,
              top: `${bit.y}%`,
            }}
          >
            {renderShape(bit)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bits.map((bit) => (
        <motion.div
          key={bit.id}
          initial={{ 
            y: 0, 
            x: 0, 
            rotate: 0,
            scale: 0 
          }}
          animate={{
            y: isMobile ? [-5, 5, -5] : [-10, 10, -10],
            x: isMobile ? [-2, 2, -2] : [-5, 5, -5],
            rotate: isMobile ? [0, 90, 180] : [0, 180, 360],
            scale: isMobile ? [0.9, 1.1, 0.9] : [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: isMobile ? bit.duration * 1.5 : bit.duration,
            delay: bit.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{
            left: `${bit.x}%`,
            top: `${bit.y}%`,
          }}
        >
          {renderShape(bit)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBits;
