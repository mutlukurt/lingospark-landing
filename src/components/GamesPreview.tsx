import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Zap, Heart, Star } from 'lucide-react';

const GamesPreview: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState('matching');
  const [score] = useState(1250);
  const [lives] = useState(3);

  const games = [
    { id: 'matching', name: 'Word Match', icon: '🎯' },
    { id: 'typing', name: 'Speed Type', icon: '⚡' },
    { id: 'puzzle', name: 'Word Puzzle', icon: '🧩' },
  ];

  const matchingPairs = [
    { id: 1, word: 'Happy', definition: 'Feeling joy', matched: true },
    { id: 2, word: 'Beautiful', definition: 'Pleasing to look at', matched: true },
    { id: 3, word: 'Intelligent', definition: 'Having great mental capacity', matched: false },
    { id: 4, word: 'Generous', definition: 'Willing to give freely', matched: false },
  ];

  const typingWords = ['serendipity', 'eloquent', 'magnificent', 'extraordinary'];
  const [currentTypingWord] = useState(typingWords[0]);
  const [typedText, setTypedText] = useState('seren');

  return (
    <section id="games" className="py-20 lg:py-32 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
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
              Learn with{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Mini-Games
              </span>
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Make learning fun and engaging with our collection of interactive games. 
              From word matching to speed typing, each game is designed to reinforce 
              your vocabulary and improve your English skills naturally.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-text-secondary">Multiple game types for varied learning</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-text-secondary">Progressive difficulty levels</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-text-secondary">Real-time feedback & scoring</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2"
            >
              <Gamepad2 className="w-5 h-5" />
              Play & Learn
            </motion.button>
          </motion.div>

          {/* Right Content - Game Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="card-glass p-6 max-w-md mx-auto">
              {/* Game Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-text-primary">Word Games</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-text-primary">{score}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Heart 
                        key={i} 
                        className={`w-4 h-4 ${i < lives ? 'text-red-500 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Game Selection Tabs */}
              <div className="flex gap-2 mb-6">
                {games.map((game) => (
                  <motion.button
                    key={game.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedGame(game.id)}
                    className={`flex-1 p-3 rounded-xl text-sm font-medium transition-all ${
                      selectedGame === game.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/60 text-text-secondary hover:bg-white/80'
                    }`}
                  >
                    <div className="text-lg mb-1">{game.icon}</div>
                    {game.name}
                  </motion.button>
                ))}
              </div>

              {/* Game Content */}
              <AnimatePresence mode="wait">
                {selectedGame === 'matching' && (
                  <motion.div
                    key="matching"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-text-primary mb-1">Match words with definitions</h4>
                      <p className="text-sm text-text-secondary">2/4 completed</p>
                    </div>
                    
                    <div className="grid gap-2">
                      {matchingPairs.map((pair) => (
                        <motion.div
                          key={pair.id}
                          whileHover={{ scale: 1.02 }}
                          className={`p-3 rounded-lg border transition-all cursor-pointer ${
                            pair.matched
                              ? 'bg-green-100 border-green-300 text-green-800'
                              : 'bg-white/60 border-white/20 hover:bg-white/80'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{pair.word}</span>
                            <span className="text-sm text-text-secondary">{pair.definition}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {selectedGame === 'typing' && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-text-primary mb-1">Type the word</h4>
                      <p className="text-sm text-text-secondary">Speed: 45 WPM</p>
                    </div>
                    
                    <div className="bg-white/60 p-4 rounded-lg border border-white/20">
                      <div className="text-2xl font-mono text-center mb-4">
                        {currentTypingWord.split('').map((char, index) => (
                          <span
                            key={index}
                            className={`${
                              index < typedText.length
                                ? typedText[index] === char
                                  ? 'text-green-600 bg-green-100'
                                  : 'text-red-600 bg-red-100'
                                : 'text-gray-400'
                            } px-1 rounded`}
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                      
                      <input
                        type="text"
                        value={typedText}
                        onChange={(e) => setTypedText(e.target.value)}
                        className="w-full p-3 bg-white/70 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Start typing..."
                      />
                    </div>
                  </motion.div>
                )}

                {selectedGame === 'puzzle' && (
                  <motion.div
                    key="puzzle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-text-primary mb-1">Unscramble the word</h4>
                      <p className="text-sm text-text-secondary">Hint: Very smart person</p>
                    </div>
                    
                    <div className="bg-white/60 p-4 rounded-lg border border-white/20">
                      <div className="flex justify-center gap-2 mb-4">
                        {['G', 'E', 'N', 'I', 'U', 'S'].map((letter, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-white border-2 border-primary/20 rounded-lg flex items-center justify-center font-bold text-primary cursor-pointer hover:border-primary/50 transition-all"
                          >
                            {letter}
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5, 6].map((_, index) => (
                          <div
                            key={index}
                            className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                          >
                            {index < 2 && (
                              <span className="font-bold text-primary">
                                {index === 0 ? 'G' : 'E'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Game Actions */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-xl transition-all"
                >
                  Continue
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-white/60 text-text-secondary rounded-xl border border-white/20 transition-all hover:bg-white/80"
                >
                  <Zap className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GamesPreview;
