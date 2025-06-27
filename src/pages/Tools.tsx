import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, Grid, Lightbulb } from 'lucide-react';

const Tools: React.FC = () => {
  const [activeTimer, setActiveTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [timerType, setTimerType] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setActiveTimer(false);
      // Switch between work and break
      if (timerType === 'work') {
        setTimerType('break');
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        setTimerType('work');
        setTimeLeft(25 * 60); // 25 minute work session
      }
    }
    return () => clearInterval(interval);
  }, [activeTimer, timeLeft, timerType]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setActiveTimer(false);
    setTimerType('work');
    setTimeLeft(25 * 60);
  };

  const priorities = [
    { id: 1, title: 'Complete Math Assignment', urgency: 'high', importance: 'high', quadrant: 1 },
    { id: 2, title: 'Read Science Chapter', urgency: 'low', importance: 'high', quadrant: 2 },
    { id: 3, title: 'Organize Study Notes', urgency: 'high', importance: 'low', quadrant: 3 },
    { id: 4, title: 'Check Social Media', urgency: 'low', importance: 'low', quadrant: 4 },
  ];

  const suggestions = [
    {
      title: 'Study Technique: Pomodoro Method',
      description: 'Break your study time into 25-minute focused sessions with 5-minute breaks.',
      category: 'productivity'
    },
    {
      title: 'Memory Tip: Spaced Repetition',
      description: 'Review material at increasing intervals to improve long-term retention.',
      category: 'learning'
    },
    {
      title: 'Focus Tip: Environment Setup',
      description: 'Create a dedicated study space free from distractions.',
      category: 'focus'
    },
    {
      title: 'Health Tip: Regular Breaks',
      description: 'Take breaks every hour to prevent mental fatigue and maintain concentration.',
      category: 'wellness'
    }
  ];

  const getQuadrantColor = (quadrant: number) => {
    switch (quadrant) {
      case 1: return 'bg-red-100 border-red-300 text-red-800';
      case 2: return 'bg-green-100 border-green-300 text-green-800';
      case 3: return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 4: return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getQuadrantTitle = (quadrant: number) => {
    switch (quadrant) {
      case 1: return 'Do First (Urgent & Important)';
      case 2: return 'Schedule (Important, Not Urgent)';
      case 3: return 'Delegate (Urgent, Not Important)';
      case 4: return 'Eliminate (Neither Urgent nor Important)';
      default: return '';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Study Tools</h1>
        <p className="text-xl text-gray-600">Productivity tools to enhance your learning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pomodoro Timer */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Clock className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Pomodoro Timer</h2>
            </div>
            
            <div className={`w-48 h-48 rounded-full flex items-center justify-center mx-auto mb-8 ${
              timerType === 'work' 
                ? 'bg-gradient-to-br from-primary-500 to-secondary-500' 
                : 'bg-gradient-to-br from-green-500 to-green-600'
            } shadow-2xl`}>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-white/80 font-medium">
                  {timerType === 'work' ? 'Work Time' : 'Break Time'}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTimer(!activeTimer)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-white transition-all duration-300 ${
                  activeTimer
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:shadow-lg'
                }`}
              >
                {activeTimer ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span>{activeTimer ? 'Pause' : 'Start'}</span>
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Priority Matrix */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center space-x-2 mb-6">
            <Grid className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Priority Matrix</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((quadrant) => (
              <div
                key={quadrant}
                className={`p-4 rounded-xl border-2 ${getQuadrantColor(quadrant)}`}
              >
                <h3 className="font-semibold text-sm mb-3">
                  {getQuadrantTitle(quadrant)}
                </h3>
                <div className="space-y-2">
                  {priorities
                    .filter(p => p.quadrant === quadrant)
                    .map(priority => (
                      <div
                        key={priority.id}
                        className="text-xs p-2 bg-white/50 rounded-lg"
                      >
                        {priority.title}
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Suggestions */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <Lightbulb className="w-6 h-6 text-accent-600" />
          <h2 className="text-2xl font-bold text-gray-900">Study Suggestions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{suggestion.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{suggestion.description}</p>
                  <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {suggestion.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Productivity Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold text-gray-900 mb-1">Set Clear Goals</h4>
            <p className="text-sm text-gray-600">Define specific, measurable objectives for each study session.</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">⏰</div>
            <h4 className="font-semibold text-gray-900 mb-1">Time Blocking</h4>
            <p className="text-sm text-gray-600">Allocate specific time slots for different subjects or tasks.</p>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl mb-2">🧘</div>
            <h4 className="font-semibold text-gray-900 mb-1">Take Breaks</h4>
            <p className="text-sm text-gray-600">Regular breaks help maintain focus and prevent burnout.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;