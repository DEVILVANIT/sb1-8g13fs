import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

function Resolutions() {
  const [resolution, setResolution] = useState('');
  const [resolutions, setResolutions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resolution.trim()) {
      setResolutions([...resolutions, { text: resolution, completed: false }]);
      setResolution('');
    }
  };

  const toggleResolution = (index) => {
    const newResolutions = [...resolutions];
    newResolutions[index].completed = !newResolutions[index].completed;
    setResolutions(newResolutions);
  };

  return (
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6">New Year Resolutions</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          placeholder="Add a resolution..."
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:ring-0 text-white placeholder-white/50"
        />
        <button
          type="submit"
          className="mt-3 w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Add Resolution
        </button>
      </form>

      <div className="space-y-3">
        {resolutions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
              item.completed ? 'bg-green-500/20' : 'bg-white/5'
            }`}
            onClick={() => toggleResolution(index)}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              item.completed ? 'border-green-400' : 'border-white/30'
            }`}>
              {item.completed && <FaCheck className="text-green-400 text-sm" />}
            </div>
            <span className={item.completed ? 'line-through opacity-50' : ''}>
              {item.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Resolutions;