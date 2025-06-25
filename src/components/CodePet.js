import React, { useState, useEffect } from 'react';
import { Heart, Code, Trophy, Star, Zap, BookOpen, GitBranch } from 'lucide-react';

const CodePet = () => {
  const [pet, setPet] = useState({
    name: 'CodeBuddy',
    level: 1,
    xp: 0,
    happiness: 100,
    energy: 100,
    intelligence: 10,
    creativity: 10,
    stage: 'egg', // egg -> baby -> teen -> adult -> master
    lastFed: Date.now(),
    stats: {
      totalCommits: 0,
      codingHours: 0,
      bugsFixed: 0,
      languagesLearned: 0,
      projectsCompleted: 0
    }
  });

  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');

  const petStages = {
    egg: { emoji: '🥚', name: 'Mysterious Egg', minLevel: 1 },
    baby: { emoji: '🐣', name: 'Code Chick', minLevel: 2 },
    teen: { emoji: '🐦', name: 'Script Sparrow', minLevel: 5 },
    adult: { emoji: '🦅', name: 'Code Eagle', minLevel: 10 },
    master: { emoji: '🔥', name: 'Debug Dragon', minLevel: 20 }
  };

  const codingActivities = [
    { id: 'commit', label: 'Made a commit', xp: 15, effect: { intelligence: 2 } },
    { id: 'debug', label: 'Fixed a bug', xp: 25, effect: { intelligence: 3, happiness: 5 } },
    { id: 'learn', label: 'Learned something new', xp: 30, effect: { intelligence: 5, creativity: 3 } },
    { id: 'code1h', label: 'Coded for 1 hour', xp: 20, effect: { energy: -10, intelligence: 3 } },
    { id: 'project', label: 'Completed a project', xp: 50, effect: { happiness: 15, creativity: 5, intelligence: 5 } },
    { id: 'refactor', label: 'Refactored code', xp: 35, effect: { intelligence: 4, creativity: 2 } }
  ];

  const getCurrentStage = (level) => {
    if (level >= 20) return 'master';
    if (level >= 10) return 'adult';
    if (level >= 5) return 'teen';
    if (level >= 2) return 'baby';
    return 'egg';
  };

  const getXpForNextLevel = (level) => level * 100;

  const performActivity = (activityId) => {
    const activity = codingActivities.find(a => a.id === activityId);
    if (!activity) return;

    setPet(prev => {
      const newXp = prev.xp + activity.xp;
      const xpNeeded = getXpForNextLevel(prev.level);
      const newLevel = newXp >= xpNeeded ? prev.level + 1 : prev.level;
      const remainingXp = newXp >= xpNeeded ? newXp - xpNeeded : newXp;

      const newStats = { ...prev.stats };
      if (activityId === 'commit') newStats.totalCommits++;
      if (activityId === 'code1h') newStats.codingHours++;
      if (activityId === 'debug') newStats.bugsFixed++;
      if (activityId === 'learn') newStats.languagesLearned++;
      if (activityId === 'project') newStats.projectsCompleted++;

      return {
        ...prev,
        xp: newLevel > prev.level ? remainingXp : newXp,
        level: newLevel,
        stage: getCurrentStage(newLevel),
        happiness: Math.min(100, prev.happiness + (activity.effect.happiness || 0)),
        energy: Math.max(0, prev.energy + (activity.effect.energy || 0)),
        intelligence: prev.intelligence + (activity.effect.intelligence || 0),
        creativity: prev.creativity + (activity.effect.creativity || 0),
        stats: newStats,
        lastFed: Date.now()
      };
    });

    setActivities(prev => [...prev, {
      id: Date.now(),
      activity: activity.label,
      xp: activity.xp,
      timestamp: new Date().toLocaleTimeString()
    }]);

    setSelectedActivity('');
  };

  const feedPet = () => {
    setPet(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.min(100, prev.energy + 15),
      lastFed: Date.now()
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPet(prev => ({
        ...prev,
        happiness: Math.max(0, prev.happiness - 1),
        energy: Math.max(0, prev.energy - 0.5)
      }));
    }, 30000); // Decrease every 30 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const currentStageInfo = petStages[pet.stage];
  const progressToNext = (pet.xp / getXpForNextLevel(pet.level)) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">CodePet</h1>
        <p className="text-gray-600">Your digital companion that grows with your coding journey!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pet Display */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">{currentStageInfo.emoji}</div>
            <h2 className="text-2xl font-bold text-gray-800">{pet.name}</h2>
            <p className="text-gray-600">{currentStageInfo.name}</p>
            <p className="text-sm text-gray-500">Level {pet.level}</p>
          </div>

          {/* Stats */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium">
                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                XP
              </span>
              <span className="text-sm">{pet.xp}/{getXpForNextLevel(pet.level)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full transition-all duration-300" style={{width: `${progressToNext}%`}}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Happiness
              </span>
              <span className="text-sm">{pet.happiness}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full transition-all duration-300" style={{width: `${pet.happiness}%`}}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm font-medium">
                <Star className="w-4 h-4 mr-2 text-blue-500" />
                Energy
              </span>
              <span className="text-sm">{Math.round(pet.energy)}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{width: `${pet.energy}%`}}></div>
            </div>
          </div>

          {/* Pet Care */}
          <button 
            onClick={feedPet}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            🍎 Feed Pet (+20 Happiness, +15 Energy)
          </button>
        </div>

        {/* Activities & Stats */}
        <div className="space-y-6">
          {/* Coding Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Log Coding Activity
            </h3>
            
            <select 
              value={selectedActivity} 
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select an activity...</option>
              {codingActivities.map(activity => (
                <option key={activity.id} value={activity.id}>
                  {activity.label} (+{activity.xp} XP)
                </option>
              ))}
            </select>

            <button 
              onClick={() => performActivity(selectedActivity)}
              disabled={!selectedActivity}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Complete Activity
            </button>
          </div>

          {/* Pet Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Pet Stats
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>Intelligence: {pet.intelligence}</div>
              <div>Creativity: {pet.creativity}</div>
              <div>Total Commits: {pet.stats.totalCommits}</div>
              <div>Coding Hours: {pet.stats.codingHours}</div>
              <div>Bugs Fixed: {pet.stats.bugsFixed}</div>
              <div>Projects Done: {pet.stats.projectsCompleted}</div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2" />
              Recent Activities
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {activities.length === 0 ? (
                <p className="text-gray-500 text-sm">No activities yet. Start coding to see your pet grow!</p>
              ) : (
                activities.slice(-5).reverse().map(activity => (
                  <div key={activity.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                    <span>{activity.activity}</span>
                    <span className="text-green-600">+{activity.xp} XP</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePet;