import React, { useState } from 'react';
import Confetti from 'react-confetti';
import Countdown from 'react-countdown';
import { motion } from 'framer-motion';
import { FaGift, FaCalendarAlt, FaGamepad } from 'react-icons/fa';
import Activities from './components/Activities';
import Greetings from './components/Greetings';
import Resolutions from './components/Resolutions';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const newYear = new Date('2025-01-01T00:00:00');

  const onComplete = () => {
    setShowConfetti(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {showConfetti && <Confetti />}
      
      <header className="py-8 text-center">
        <motion.h1 
          className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Happy New Year 2025!
        </motion.h1>
        
        <div className="countdown-wrapper my-8">
          <Countdown 
            date={newYear}
            onComplete={onComplete}
            renderer={({ days, hours, minutes, seconds }) => (
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Days', value: days },
                  { label: 'Hours', value: hours },
                  { label: 'Minutes', value: minutes },
                  { label: 'Seconds', value: seconds }
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-4xl font-bold">{value}</div>
                    <div className="text-sm opacity-75">{label}</div>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Activities />
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Greetings />
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Resolutions />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App;