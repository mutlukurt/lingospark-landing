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
      
      // Optimize element count based on device type
      const count = deviceType === 'mobile' ? 6 : deviceType === 'tablet' ? 10 : 15;
      
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

  // Don't render animations if user prefers reduced motion or on mobile
  if (prefersReducedMotion || deviceType === 'mobile') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {deviceType === 'mobile' ? (
          // On mobile, show fewer static elements
          bits.slice(0, 2).map((bit) => (
            <div
              key={bit.id}
              className="absolute opacity-10"
              style={{
                left: `${bit.x}%`,
                top: `${bit.y}%`,
              }}
            >
              {renderShape(bit)}
            </div>
          ))
        ) : (
          // For reduced motion preference, show more static elements
          bits.slice(0, 3).map((bit) => (
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
          ))
        )}
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
            y: deviceType === 'mobile' ? [-5, 5, -5] : deviceType === 'tablet' ? [-7, 7, -7] : [-10, 10, -10],
            x: deviceType === 'mobile' ? [-2, 2, -2] : deviceType === 'tablet' ? [-3, 3, -3] : [-5, 5, -5],
            rotate: deviceType === 'mobile' ? [0, 90, 180] : deviceType === 'tablet' ? [0, 135, 270] : [0, 180, 360],
            scale: deviceType === 'mobile' ? [0.9, 1.1, 0.9] : deviceType === 'tablet' ? [0.85, 1.15, 0.85] : [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: deviceType === 'mobile' ? bit.duration * 1.5 : deviceType === 'tablet' ? bit.duration * 1.2 : bit.duration,
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
