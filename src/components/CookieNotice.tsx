import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CookieNotice: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('lingospark-cookies-accepted');
    if (!hasAcceptedCookies) {
      // Show notice after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('lingospark-cookies-accepted', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('lingospark-cookies-accepted', 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50"
        >
          <div className="card-glass p-4 shadow-lg border border-white/20">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Cookie className="w-6 h-6 text-accent" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-2">
                  We use cookies
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  We use cookies to enhance your learning experience and analyze site usage. 
                  By continuing, you agree to our use of cookies.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={acceptCookies}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={declineCookies}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              </div>
              
              <button
                onClick={declineCookies}
                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded transition-colors"
                aria-label="Close cookie notice"
              >
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
