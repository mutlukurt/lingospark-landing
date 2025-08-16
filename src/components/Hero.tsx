import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, BookOpen, Award } from 'lucide-react';
import FloatingBits from './FloatingBits';
import Mascot3D from './Mascot3D';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Check if device is mobile to disable mouse tracking
  const isMobile = useMemo(() => {
    return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    // Don't track mouse on mobile devices for better performance
    if (isMobile) return;

    let animationFrame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move events using requestAnimationFrame
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        setMousePosition({
          x: (clientX / innerWidth - 0.5) * 20,
          y: (clientY / innerHeight - 0.5) * 20,
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
  }, [isMobile]);

  const floatingBadges = [
    { icon: Award, text: 'A+', color: 'from-green-400 to-emerald-500', position: { top: '20%', right: '15%' } },
    { icon: Star, text: '★', color: 'from-yellow-400 to-orange-500', position: { top: '60%', right: '5%' } },
    { icon: BookOpen, text: '📚', color: 'from-blue-400 to-purple-500', position: { top: '40%', right: '25%' } },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <FloatingBits />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight"
            >
              Learn English the{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Fun Way
              </span>{' '}
              with LinguaLearn
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Master English through interactive games, personalized learning paths, and 
              AI-powered practice sessions. Join thousands of learners worldwide.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Start Free
                <Play className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center justify-center gap-2 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Explore Features
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
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
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            {/* 3D Background */}
            <div className="absolute inset-0 scale-150">
              <Mascot3D />
            </div>
            
            {/* Main Mascot Illustration */}
            <motion.div
              animate={{
                x: mousePosition.x * 0.5,
                y: mousePosition.y * 0.5,
              }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              className="relative z-10"
            >
              {/* Owl Mascot SVG */}
              <div className="w-80 h-80 sm:w-96 sm:h-96 mx-auto relative">
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
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="absolute floating-element"
                style={badge.position}
              >
                <motion.div
                  animate={{
                    x: mousePosition.x * (0.2 + index * 0.1),
                    y: mousePosition.y * (0.2 + index * 0.1),
                  }}
                  transition={{ type: "spring", stiffness: 100, damping: 10 }}
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
