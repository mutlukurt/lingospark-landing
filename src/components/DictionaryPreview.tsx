import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Volume2, Star, Bookmark } from 'lucide-react';

const DictionaryPreview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const sampleWords = [
    { 
      word: 'serendipity', 
      pronunciation: '/ˌserənˈdipədē/', 
      definition: 'The occurrence of events by chance in a happy way',
      level: 'Advanced',
      saved: true,
      examples: ['Finding this book was pure serendipity.']
    },
    { 
      word: 'eloquent', 
      pronunciation: '/ˈeləkwənt/', 
      definition: 'Fluent and persuasive in speaking or writing',
      level: 'Intermediate',
      saved: false,
      examples: ['She gave an eloquent speech at the conference.']
    },
    { 
      word: 'ubiquitous', 
      pronunciation: '/yo͞oˈbikwədəs/', 
      definition: 'Present, appearing, or found everywhere',
      level: 'Advanced',
      saved: true,
      examples: ['Smartphones have become ubiquitous in modern society.']
    },
    { 
      word: 'ephemeral', 
      pronunciation: '/əˈfem(ə)rəl/', 
      definition: 'Lasting for a very short time',
      level: 'Advanced',
      saved: false,
      examples: ['The beauty of cherry blossoms is ephemeral.']
    }
  ];

  const filteredWords = sampleWords.filter(word => 
    word.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="dictionary" className="py-20 lg:py-32 bg-gradient-to-br from-blue-50/50 to-purple-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-6">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Dictionary
              </span>
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Build your vocabulary with our intelligent dictionary that uses spaced repetition 
              to help you remember words effectively. Save words, track your progress, and 
              master new vocabulary at your own pace.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-text-secondary">Smart spaced repetition algorithm</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-text-secondary">Audio pronunciations & examples</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-text-secondary">Progress tracking & analytics</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Create Your Dictionary
            </motion.button>
          </motion.div>

          {/* Right Content - Dictionary App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-glass p-6 max-w-md mx-auto">
              {/* App Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-lg text-text-primary">My Dictionary</h3>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>247 words</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search words..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/70 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              {/* Word List */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                <AnimatePresence>
                  {filteredWords.map((wordData, index) => (
                    <motion.div
                      key={wordData.word}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/60 rounded-lg p-4 hover:bg-white/80 transition-all cursor-pointer border border-white/20"
                      onClick={() => setSelectedWord(selectedWord === wordData.word ? null : wordData.word)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-text-primary">{wordData.word}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            wordData.level === 'Advanced' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {wordData.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-white/50 rounded">
                            <Volume2 className="w-4 h-4 text-text-secondary" />
                          </button>
                          <button className="p-1 hover:bg-white/50 rounded">
                            <Bookmark className={`w-4 h-4 ${
                              wordData.saved ? 'text-primary fill-current' : 'text-text-secondary'
                            }`} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-1">{wordData.pronunciation}</p>
                      <p className="text-sm text-text-primary">{wordData.definition}</p>
                      
                      <AnimatePresence>
                        {selectedWord === wordData.word && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-white/20"
                          >
                            <p className="text-sm text-text-secondary italic">
                              "{wordData.examples[0]}"
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DictionaryPreview;
