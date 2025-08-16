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

  // Check device type for performance optimization
  const deviceType = useMemo(() => {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent;
    
    if (width < 768 || /Android.*Mobile|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      return 'mobile';
    } else if (width < 1024 || /iPad|Android(?!.*Mobile)/i.test(userAgent)) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }, []);

  const bits = useMemo(() => {
    const generateBits = (): FloatingBit[] => {
      const bits: FloatingBit[] = [];
      const colors = ['#5865F2', '#FFB86B', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
      
      // Use count from animation config
      const count = 15; // Generate full set, we'll filter later
      
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
  }, [deviceType]);

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

  // Optimize animations based on device and user preferences
  const animationConfig = useMemo(() => {
    if (prefersReducedMotion) {
              return {
          shouldAnimate: false,
          showStatic: true,
          count: 4,
          opacity: 'opacity-20',
          duration: 0,
          movement: { y: 0, x: 0, rotate: 0, scale: 0 }
        };
    }
    
    switch (deviceType) {
      case 'mobile':
        return {
          shouldAnimate: true,
          showStatic: false,
          count: 6,
          opacity: 'opacity-10',
          duration: 4, // Slower animations
          movement: { y: 3, x: 1, rotate: 90, scale: 0.15 }
        };
      case 'tablet':
        return {
          shouldAnimate: true,
          showStatic: false,
          count: 10,
          opacity: 'opacity-15',
          duration: 3.5,
          movement: { y: 5, x: 2, rotate: 180, scale: 0.25 }
        };
      default:
        return {
          shouldAnimate: true,
          showStatic: false,
          count: 15,
          opacity: 'opacity-20',
          duration: 3,
          movement: { y: 10, x: 5, rotate: 360, scale: 0.4 }
        };
    }
  }, [prefersReducedMotion, deviceType]);

  // Render static elements for reduced motion preference
  if (!animationConfig.shouldAnimate) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bits.slice(0, animationConfig.count).map((bit) => (
          <div
            key={bit.id}
            className={`absolute ${animationConfig.opacity}`}
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
      {bits.slice(0, animationConfig.count).map((bit) => (
        <motion.div
          key={bit.id}
          initial={{ 
            y: 0, 
            x: 0, 
            rotate: 0,
            scale: 0 
          }}
          animate={{
            y: [-animationConfig.movement.y, animationConfig.movement.y, -animationConfig.movement.y],
            x: [-animationConfig.movement.x, animationConfig.movement.x, -animationConfig.movement.x],
            rotate: [0, animationConfig.movement.rotate / 2, animationConfig.movement.rotate],
            scale: [1 - animationConfig.movement.scale, 1 + animationConfig.movement.scale, 1 - animationConfig.movement.scale],
          }}
          transition={{
            duration: bit.duration * (animationConfig.duration / 3),
            delay: bit.delay,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
          className={`absolute ${animationConfig.opacity}`}
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
