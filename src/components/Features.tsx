import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { features } from '../data/features';

const Features: React.FC = () => {
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
        buttonHover: {}
      };
    }

    switch (deviceType) {
      case 'mobile':
        return {
          shouldAnimate: true,
          duration: 0.3,
          delay: 0,
          buttonHover: { scale: 1.02 }
        };
      case 'tablet':
        return {
          shouldAnimate: true,
          duration: 0.4,
          delay: 0,
          buttonHover: { scale: 1.03 }
        };
      default:
        return {
          shouldAnimate: true,
          duration: 0.5,
          delay: 0,
          buttonHover: { scale: 1.05 }
        };
    }
  }, []);

  return (
    <section id="features" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={animationConfig.shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
            Why Learn with{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LinguaLearn
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
            Experience the future of language learning with our innovative approach 
            that makes mastering English engaging, effective, and enjoyable.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={animationConfig.shouldAnimate ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationConfig.shouldAnimate ? { duration: animationConfig.duration, delay: 0.2 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={animationConfig.shouldAnimate ? animationConfig.buttonHover : {}}
            whileTap={animationConfig.shouldAnimate ? { scale: 0.98 } : {}}
            className="btn-primary text-lg px-8 py-4"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Features;
