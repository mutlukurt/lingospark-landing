import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, BookOpen, Award } from 'lucide-react';
import FloatingBits from './FloatingBits';
import Mascot3D from './Mascot3D';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Optimize animations for different device types
  const animationConfig = useMemo(() => {
    switch (deviceType) {
      case 'mobile':
        return {
          shouldAnimate: true,
          duration: 0.3,
          delay: 0.1,
          mouseTracking: false,
          reducedMotion: true
        };
      case 'tablet':
        return {
          shouldAnimate: true,
          duration: 0.4,
          delay: 0.15,
          mouseTracking: true,
          reducedMotion: false
        };
      default:
        return {
          shouldAnimate: true,
          duration: 0.5,
          delay: 0.1,
          mouseTracking: true,
          reducedMotion: false
        };
    }
  }, [deviceType]);

  useEffect(() => {
    // Optimize mouse tracking based on device type
    if (!animationConfig.mouseTracking) return;

    let animationFrame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move events using requestAnimationFrame
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Reduce mouse tracking intensity on tablets
        const intensity = deviceType === 'tablet' ? 10 : 20;
        
        setMousePosition({
          x: (clientX / innerWidth - 0.5) * intensity,
          y: (clientY / innerHeight - 0.5) * intensity,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [deviceType, animationConfig.mouseTracking]);

  const floatingBadges = useMemo(() => {
    // Adjust badge positions based on device type
    const positions = deviceType === 'mobile' 
      ? [
          { icon: Award, text: 'A+', color: 'from-green-400 to-emerald-500', position: { top: '15%', right: '10%' } },
          { icon: Star, text: '★', color: 'from-yellow-400 to-orange-500', position: { top: '65%', right: '5%' } },
          { icon: BookOpen, text: '📚', color: 'from-blue-400 to-purple-500', position: { top: '40%', right: '15%' } },
        ]
      : [
          { icon: Award, text: 'A+', color: 'from-green-400 to-emerald-500', position: { top: '20%', right: '15%' } },
          { icon: Star, text: '★', color: 'from-yellow-400 to-orange-500', position: { top: '60%', right: '5%' } },
          { icon: BookOpen, text: '📚', color: 'from-blue-400 to-purple-500', position: { top: '40%', right: '25%' } },
        ];
    return positions;
  }, [deviceType]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 w-full max-w-full">
      {/* Background Elements */}
      <FloatingBits />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={animationConfig.shouldAnimate ? { opacity: 0, x: deviceType === 'mobile' ? -10 : -20 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration, delay: animationConfig.delay } : { duration: 0 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={animationConfig.shouldAnimate ? { opacity: 0, y: deviceType === 'mobile' ? 8 : 15 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration, delay: animationConfig.delay + 0.1 } : { duration: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight"
            >
              Learn English the{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Fun Way
              </span>{' '}
              with LinguaLearn
            </motion.h1>
            
            <motion.p
              initial={animationConfig.shouldAnimate ? { opacity: 0, y: deviceType === 'mobile' ? 8 : 15 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration, delay: animationConfig.delay + 0.2 } : { duration: 0 }}
              className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Master English through interactive games, personalized learning paths, and 
              AI-powered practice sessions. Join thousands of learners worldwide.
            </motion.p>
            
            <motion.div
              initial={animationConfig.shouldAnimate ? { opacity: 0, y: deviceType === 'mobile' ? 8 : 15 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration, delay: animationConfig.delay + 0.3 } : { duration: 0 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={animationConfig.reducedMotion ? {} : { scale: 1.05 }}
                whileTap={animationConfig.reducedMotion ? {} : { scale: 0.95 }}
                className="btn-primary flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Start Free
                <Play className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={animationConfig.reducedMotion ? {} : { scale: 1.05 }}
                whileTap={animationConfig.reducedMotion ? {} : { scale: 0.95 }}
                className="btn-secondary flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Explore Features
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={animationConfig.shouldAnimate ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration, delay: animationConfig.delay + 0.4 } : { duration: 0 }}
              className="flex items-center justify-center lg:justify-start gap-8 mt-8 text-text-secondary"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">50K+</div>
                <div className="text-sm">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">4.9★</div>
                <div className="text-sm">App Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text-primary">30+</div>
                <div className="text-sm">Languages</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Mascot & Illustration */}
          <motion.div
            initial={animationConfig.shouldAnimate ? { opacity: 0, x: deviceType === 'mobile' ? 10 : 20 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration, delay: animationConfig.delay + 0.1 } : { duration: 0 }}
            className="relative flex items-center justify-center"
          >
            {/* 3D Background */}
            <div className="absolute inset-0 scale-110 sm:scale-125 lg:scale-150 overflow-hidden">
              <Mascot3D />
            </div>
            
            {/* Main Mascot Illustration */}
            <motion.div
              animate={animationConfig.mouseTracking ? {
                x: mousePosition.x * (deviceType === 'mobile' ? 0.2 : deviceType === 'tablet' ? 0.3 : 0.5),
                y: mousePosition.y * (deviceType === 'mobile' ? 0.2 : deviceType === 'tablet' ? 0.3 : 0.5),
              } : {}}
              transition={animationConfig.mouseTracking ? { type: "spring", stiffness: deviceType === 'tablet' ? 100 : 150, damping: deviceType === 'tablet' ? 20 : 15 } : {}}
              className="relative z-10"
            >
              {/* Owl Mascot SVG */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto relative max-w-full">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full drop-shadow-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Owl Body */}
                  <ellipse cx="100" cy="120" rx="45" ry="55" fill="#5865F2" opacity="0.9"/>
                  
                  {/* Owl Head */}
                  <circle cx="100" cy="70" r="40" fill="#5865F2"/>
                  
                  {/* Eyes */}
                  <circle cx="88" cy="65" r="12" fill="white"/>
                  <circle cx="112" cy="65" r="12" fill="white"/>
                  <circle cx="88" cy="65" r="8" fill="#0F172A"/>
                  <circle cx="112" cy="65" r="8" fill="#0F172A"/>
                  <circle cx="90" cy="63" r="3" fill="white"/>
                  <circle cx="114" cy="63" r="3" fill="white"/>
                  
                  {/* Glasses */}
                  <circle cx="88" cy="65" r="15" fill="none" stroke="#FFB86B" strokeWidth="3"/>
                  <circle cx="112" cy="65" r="15" fill="none" stroke="#FFB86B" strokeWidth="3"/>
                  <line x1="103" y1="65" x2="97" y2="65" stroke="#FFB86B" strokeWidth="3"/>
                  
                  {/* Beak */}
                  <polygon points="100,75 95,85 105,85" fill="#FFB86B"/>
                  
                  {/* Wings */}
                  <ellipse cx="70" cy="110" rx="15" ry="25" fill="#4C51BF" transform="rotate(-20 70 110)"/>
                  <ellipse cx="130" cy="110" rx="15" ry="25" fill="#4C51BF" transform="rotate(20 130 110)"/>
                  
                  {/* Feet */}
                  <ellipse cx="85" cy="165" rx="8" ry="12" fill="#FFB86B"/>
                  <ellipse cx="115" cy="165" rx="8" ry="12" fill="#FFB86B"/>
                </svg>
              </div>
            </motion.div>
            
            {/* Floating Badges */}
            {floatingBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={animationConfig.shouldAnimate ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={animationConfig.shouldAnimate ? { 
                  duration: animationConfig.duration * 1.2, 
                  delay: (deviceType === 'mobile' ? 0.8 : 1) + index * (deviceType === 'mobile' ? 0.1 : 0.2) 
                } : { duration: 0 }}
                className="absolute floating-element"
                style={badge.position}
              >
                <motion.div
                  animate={animationConfig.mouseTracking ? {
                    x: mousePosition.x * (deviceType === 'mobile' ? 0.1 : (0.2 + index * 0.1)),
                    y: mousePosition.y * (deviceType === 'mobile' ? 0.1 : (0.2 + index * 0.1)),
                  } : {}}
                  transition={animationConfig.mouseTracking ? { type: "spring", stiffness: deviceType === 'tablet' ? 80 : 100, damping: deviceType === 'tablet' ? 15 : 10 } : {}}
                  className={`
                    bg-gradient-to-br ${badge.color} 
                    text-white p-3 rounded-2xl shadow-lg 
                    backdrop-blur-sm border border-white/20
                    flex items-center gap-2 font-bold text-sm
                  `}
                >
                  <badge.icon className="w-4 h-4" />
                  <span>{badge.text}</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
