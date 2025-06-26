import React, { useState, useEffect } from 'react';
import { Calendar, Code, Trophy, Heart, Zap, Star } from 'lucide-react';

const DigitalPet = () => {
  const [petStats, setPetStats] = useState({
    health: 85,
    happiness: 90,
    level: 3,
    experience: 650,
    age: 12 // days
  });

  const [codingStats, setCodingStats] = useState({
    commits: 47,
    linesOfCode: 2834,
    streak: 5,
    languagesUsed: ['TypeScript', 'React', 'CSS'],
    hoursToday: 3.2
  });

  const [petMood, setPetMood] = useState('happy');
  const [showStats, setShowStats] = useState(false);

  // Calculate pet evolution stage based on coding activity
  const getEvolutionStage = () => {
    if (petStats.level >= 10) return 'master';
    if (petStats.level >= 5) return 'advanced';
    if (petStats.level >= 2) return 'growing';
    return 'baby';
  };

  // Pet appearance based on stats and mood
  const getPetEmoji = () => {
    const stage = getEvolutionStage();
    if (petMood === 'sleeping') return '😴';
    if (petStats.health < 30) return '🤒';
    
    switch (stage) {
      case 'master': return petMood === 'excited' ? '🦄' : '🐲';
      case 'advanced': return petMood === 'excited' ? '🦊' : '🐺';
      case 'growing': return petMood === 'excited' ? '🐱' : '🐰';
      default: return petMood === 'excited' ? '🐣' : '🥚';
    }
  };

  // Simulate coding activity effect
  const simulateCoding = () => {
    setCodingStats(prev => ({
      ...prev,
      commits: prev.commits + 1,
      linesOfCode: prev.linesOfCode + Math.floor(Math.random() * 50) + 10,
      hoursToday: prev.hoursToday + 0.5
    }));

    setPetStats(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 5),
      happiness: Math.min(100, prev.happiness + 8),
      experience: prev.experience + 25,
      level: prev.experience > 1000 ? prev.level + 1 : prev.level
    }));

    setPetMood('excited');
    setTimeout(() => setPetMood('happy'), 2000);
  };

  // Pet gets hungry/tired over time
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats(prev => ({
        ...prev,
        health: Math.max(0, prev.health - 1),
        happiness: Math.max(0, prev.happiness - 2)
      }));
      
      if (Math.random() < 0.1) {
        setPetMood('sleeping');
        setTimeout(() => setPetMood('happy'), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (value) => {
    if (value > 70) return 'bg-green-500';
    if (value > 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getHappinessColor = (value) => {
    if (value > 70) return 'bg-pink-500';
    if (value > 40) return 'bg-orange-500';
    return 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">CodePet 🚀</h1>
          <p className="text-sm opacity-90">Your coding companion</p>
        </div>

        {/* Pet Display */}
        <div className="p-8 text-center bg-gradient-to-b from-blue-50 to-indigo-100">
          <div className="text-8xl mb-4 animate-bounce">{getPetEmoji()}</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {getEvolutionStage().charAt(0).toUpperCase() + getEvolutionStage().slice(1)} CodePet
          </h2>
          <p className="text-gray-600">Level {petStats.level} • {petStats.age} days old</p>
        </div>

        {/* Pet Stats */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="font-medium">Health</span>
            </div>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${getHealthColor(petStats.health)} transition-all duration-500`}
                style={{width: `${petStats.health}%`}}
              ></div>
            </div>
            <span className="text-sm font-bold">{petStats.health}%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Happiness</span>
            </div>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${getHappinessColor(petStats.happiness)} transition-all duration-500`}
                style={{width: `${petStats.happiness}%`}}
              ></div>
            </div>
            <span className="text-sm font-bold">{petStats.happiness}%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Experience</span>
            </div>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                style={{width: `${(petStats.experience % 1000) / 10}%`}}
              ></div>
            </div>
            <span className="text-sm font-bold">{petStats.experience}</span>
          </div>
        </div>

        {/* Coding Stats Toggle */}
        <div className="px-6 pb-4">
          <button 
            onClick={() => setShowStats(!showStats)}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Code className="w-5 h-5" />
            <span>{showStats ? 'Hide' : 'Show'} Coding Stats</span>
          </button>
        </div>

        {/* Coding Stats */}
        {showStats && (
          <div className="px-6 pb-6 space-y-3 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-green-600">{codingStats.commits}</div>
                <div className="text-sm text-gray-600">Commits</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{codingStats.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-lg font-bold text-purple-600">{codingStats.linesOfCode.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Lines of Code</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="text-lg font-bold text-orange-600">{codingStats.hoursToday}h</div>
                <div className="text-sm text-gray-600">Today</div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-2">Languages</div>
              <div className="flex flex-wrap gap-2">
                {codingStats.languagesUsed.map(lang => (
                  <span key={lang} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-6 bg-gray-50 border-t">
          <button 
            onClick={simulateCoding}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🔥 Code Session Complete!
          </button>
          <p className="text-center text-sm text-gray-500 mt-3">
            Click to simulate finishing a coding session
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalPet;