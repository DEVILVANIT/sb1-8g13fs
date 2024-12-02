import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Greetings() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6">Share Your Wishes</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your New Year wish..."
          className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-yellow-400 focus:ring-0 text-white placeholder-white/50"
        />
        <button
          type="submit"
          className="mt-3 w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
          Share Wish
        </button>
      </form>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-3 rounded-lg"
          >
            {msg}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Greetings;