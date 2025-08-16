import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame, Target, Trophy } from 'lucide-react';

const CalendarPreview: React.FC = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();

  // Generate calendar days
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const calendarDays = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Sample streak data
  const completedDays = [1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 19, 20, 21, 22, today];
  const currentStreak = 7;
  const longestStreak = 15;

  const getDayStatus = (day: number | null) => {
    if (!day) return 'empty';
    if (day === today) return 'today';
    if (completedDays.includes(day)) return 'completed';
    if (day > today) return 'future';
    return 'missed';
  };

  const getDayClasses = (status: string) => {
    switch (status) {
      case 'today':
        return 'bg-primary text-white font-bold ring-2 ring-primary/50';
      case 'completed':
        return 'bg-green-500 text-white';
      case 'missed':
        return 'bg-red-100 text-red-500';
      case 'future':
        return 'bg-gray-100 text-gray-400';
      default:
        return '';
    }
  };

  return (
    <section id="calendar" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Calendar Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="card-glass p-4 sm:p-6 max-w-md mx-auto">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-lg text-text-primary">Practice Calendar</h3>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-500">{currentStreak}</span>
                </div>
              </div>

              {/* Month/Year */}
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-text-primary">
                  {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </h4>
              </div>

              {/* Days of the week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-sm font-medium text-text-secondary py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const status = getDayStatus(day);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01 }}
                      className={`
                        aspect-square flex items-center justify-center text-sm rounded-lg
                        transition-all duration-200 cursor-pointer
                        ${getDayClasses(status)}
                        ${day ? 'hover:scale-110' : ''}
                      `}
                    >
                      {day}
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="text-lg font-bold text-text-primary">{currentStreak}</div>
                  <div className="text-xs text-text-secondary">Current</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="text-lg font-bold text-text-primary">{longestStreak}</div>
                  <div className="text-xs text-text-secondary">Best</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Target className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-lg font-bold text-text-primary">87%</div>
                  <div className="text-xs text-text-secondary">Success</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
              Keep Your{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Streak Alive
              </span>
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Build consistent learning habits with our streak system. Track your daily progress, 
              set goals, and stay motivated with visual feedback that celebrates your dedication 
              to mastering English.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Flame className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Daily Streak Tracking</div>
                  <div className="text-sm text-text-secondary">Never miss a day of learning</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Personalized Goals</div>
                  <div className="text-sm text-text-secondary">Set and achieve your targets</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">Achievement Rewards</div>
                  <div className="text-sm text-text-secondary">Earn badges and unlock content</div>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Start Your Streak
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CalendarPreview;
