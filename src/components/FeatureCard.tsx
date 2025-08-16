import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  gradient, 
  index 
}) => {
  // Get the icon component dynamically
  const IconComponent = (Icons as any)[icon] as LucideIcon;

  // Optimize animations based on device type
  const animationConfig = useMemo(() => {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let deviceType: 'mobile' | 'tablet' | 'desktop';
    if (width < 768 || /Android.*Mobile|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'mobile';
    } else if (width < 1024 || /iPad|Android(?!.*Mobile)/i.test(userAgent)) {
      deviceType = 'tablet';
    } else {
      deviceType = 'desktop';
    }

    if (prefersReducedMotion) {
      return {
        shouldAnimate: false,
        duration: 0,
        delay: 0,
        hover: {},
        iconHover: {}
      };
    }

    switch (deviceType) {
      case 'mobile':
        return {
          shouldAnimate: true,
          duration: 0.3,
          delay: index * 0.05,
          hover: { scale: 1.01, y: -2 },
          iconHover: { rotate: 2, scale: 1.05 }
        };
      case 'tablet':
        return {
          shouldAnimate: true,
          duration: 0.35,
          delay: index * 0.05,
          hover: { scale: 1.015, y: -3 },
          iconHover: { rotate: 3, scale: 1.08 }
        };
      default:
        return {
          shouldAnimate: true,
          duration: 0.4,
          delay: index * 0.05,
          hover: { scale: 1.02, y: -5 },
          iconHover: { rotate: 5, scale: 1.1 }
        };
    }
  }, [index]);

  return (
    <motion.div
      initial={animationConfig.shouldAnimate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration, delay: animationConfig.delay } : { duration: 0 }}
      viewport={{ once: true }}
      whileHover={animationConfig.shouldAnimate ? { 
        ...animationConfig.hover,
        transition: { duration: 0.2 }
      } : {}}
      className="group"
    >
      <div className="card-glass p-8 h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Background Gradient Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Icon */}
        <motion.div
          whileHover={animationConfig.shouldAnimate ? animationConfig.iconHover : {}}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-6 shadow-lg`}
        >
          {IconComponent && (
            <IconComponent className="w-8 h-8 text-white" />
          )}
        </motion.div>
        
        {/* Content */}
        <h3 className="text-xl font-heading font-bold text-text-primary mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>
        
        {/* Hover Effect Border */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`} />
      </div>
    </motion.div>
  );
};

export default FeatureCard;
