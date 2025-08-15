import React from 'react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group"
    >
      <div className="card-glass p-8 h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        {/* Background Gradient Glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 5, scale: 1.1 }}
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
