import React from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaMusic, FaGlassCheers } from 'react-icons/fa';

function Activities() {
  const activities = [
    {
      icon: <FaGamepad className="text-3xl" />,
      title: "New Year Games",
      description: "Fun party games and challenges"
    },
    {
      icon: <FaMusic className="text-3xl" />,
      title: "Virtual Concert",
      description: "Live music performances"
    },
    {
      icon: <FaGlassCheers className="text-3xl" />,
      title: "Celebration Ideas",
      description: "Creative ways to celebrate"
    }
  ];

  return (
    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6">Fun Activities</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.title}
            className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-yellow-400">{activity.icon}</div>
            <div>
              <h3 className="font-semibold">{activity.title}</h3>
              <p className="text-sm opacity-75">{activity.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Activities;