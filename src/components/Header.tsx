import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Detect mobile and tablet for performance optimizations
  const isMobileOrTablet = window.innerWidth < 1024 || /Android|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Dictionary', href: '#dictionary' },
    { label: 'Calendar', href: '#calendar' },
    { label: 'Games', href: '#games' },
    { label: 'Courses', href: '#courses' },
  ];

  const scrollToSection = (href: string) => {
    // Close mobile menu first for better UX
    setIsMenuOpen(false);
    
    // Small delay to let menu close animation complete
    setTimeout(() => {
      const element = document.querySelector(href);
      
      if (element) {
        const isMobile = window.innerWidth < 1024;
        const headerHeight = isMobile ? 70 : 80;
        
        // Universal method that works on all devices and DevTools
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const scrollToPosition = Math.max(0, absoluteElementTop - headerHeight);
        
        // Try multiple scroll methods for maximum compatibility
        try {
          // First try modern smooth scroll
          window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
          });
        } catch (error) {
          try {
            // Fallback to basic scrollTo
            window.scrollTo(0, scrollToPosition);
          } catch (error2) {
            try {
              // Fallback to element scrollIntoView
              element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            } catch (error3) {
              // Last resort: direct DOM manipulation
              document.documentElement.scrollTop = scrollToPosition;
              document.body.scrollTop = scrollToPosition;
            }
          }
        }
        
        // Additional debugging for DevTools
        if (import.meta.env.DEV) {
          console.log('Scrolling to:', href, 'Position:', scrollToPosition);
        }
      } else {
        console.warn('Element not found:', href);
      }
    }, isMobileOrTablet ? 200 : 100); // Reduced delay for better responsiveness
  };

  return (
    <motion.header
      initial={isMobileOrTablet ? { y: 0 } : { y: -50 }}
      animate={{ y: 0 }}
      transition={isMobileOrTablet ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMenuOpen(false);
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LS</span>
            </div>
            <span className="text-xl font-heading font-bold text-text-primary">
              LinguaLearn
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToSection(item.href);
                }}
                className="text-text-secondary hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="text-text-secondary hover:text-primary transition-colors duration-200 font-medium">
              Sign In
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 border border-white/20 shadow-lg backdrop-blur-sm"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-text-primary" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden mobile-menu mobile-menu-backdrop shadow-xl border-b border-white/20"
            >
            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex flex-col space-y-3 sm:space-y-5">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollToSection(item.href);
                    }}
                    onTouchStart={(e) => {
                      // Improve touch responsiveness
                      e.preventDefault();
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-left text-text-primary hover:text-primary transition-colors duration-200 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-primary/5 border-l-4 border-transparent hover:border-primary text-base sm:text-lg touch-manipulation cursor-pointer select-none"
                    style={{ 
                      WebkitTapHighlightColor: 'transparent',
                      WebkitTouchCallout: 'none',
                      WebkitUserSelect: 'none',
                      userSelect: 'none'
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="pt-4 border-t border-gray-200 flex flex-col space-y-4"
                >
                  <button className="text-left text-text-secondary hover:text-primary transition-colors duration-200 font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-gray-50 text-base sm:text-lg">
                    Sign In
                  </button>
                  <button className="btn-primary text-center py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg">
                    Get Started
                  </button>
                </motion.div>
              </div>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
