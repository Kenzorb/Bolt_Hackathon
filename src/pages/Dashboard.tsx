import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Trophy, Medal, Star, Award, TrendingUp, Target, Calendar, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState('assignments');

  const assignmentData = [
    { name: 'Completed', value: 28, color: '#22c55e' },
    { name: 'Pending', value: 5, color: '#f59e0b' },
    { name: 'Overdue', value: 2, color: '#ef4444' },
  ];

  const subjectProgress = [
    { subject: 'Math', score: 85, tasks: 12 },
    { subject: 'Science', score: 92, tasks: 8 },
    { subject: 'English', score: 78, tasks: 15 },
    { subject: 'History', score: 88, tasks: 10 },
    { subject: 'Art', score: 95, tasks: 6 },
  ];

  const weeklyProgress = [
    { day: 'Mon', tasks: 8, points: 120 },
    { day: 'Tue', tasks: 6, points: 90 },
    { day: 'Wed', tasks: 10, points: 150 },
    { day: 'Thu', tasks: 7, points: 105 },
    { day: 'Fri', tasks: 9, points: 135 },
    { day: 'Sat', tasks: 5, points: 75 },
    { day: 'Sun', tasks: 4, points: 60 },
  ];

  const badges = [
    { name: 'Math Master', icon: Star, color: 'from-yellow-400 to-yellow-600', earned: true },
    { name: 'Science Pro', icon: Award, color: 'from-blue-400 to-blue-600', earned: true },
    { name: 'Streak Legend', icon: Trophy, color: 'from-purple-400 to-purple-600', earned: true },
    { name: 'Team Player', icon: Medal, color: 'from-green-400 to-green-600', earned: false },
    { name: 'Speed Demon', icon: Clock, color: 'from-red-400 to-red-600', earned: false },
    { name: 'Perfect Week', icon: Target, color: 'from-indigo-400 to-indigo-600', earned: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Chen', points: 2845, avatar: '👩' },
    { rank: 2, name: 'Alex Johnson', points: 2247, avatar: '👨', isMe: true },
    { rank: 3, name: 'Maria Garcia', points: 2103, avatar: '👩' },
    { rank: 4, name: 'David Kim', points: 1987, avatar: '👨' },
    { rank: 5, name: 'Emma Wilson', points: 1856, avatar: '👩' },
  ];

  const chartOptions = [
    { id: 'assignments', label: 'Assignment Status', icon: Target },
    { id: 'subjects', label: 'Subject Progress', icon: TrendingUp },
    { id: 'weekly', label: 'Weekly Activity', icon: Calendar },
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'assignments':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assignmentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {assignmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'subjects':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'weekly':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#14b8a6" strokeWidth={3} />
              <Line type="monotone" dataKey="points" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Your Dashboard</h1>
        <p className="text-xl text-gray-600">Track your progress and achievements</p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl w-fit mx-auto mb-3">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl w-fit mx-auto mb-3">
              <Star className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2,247</p>
            <p className="text-sm text-gray-600">Total Points</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl w-fit mx-auto mb-3">
              <Target className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">35</p>
            <p className="text-sm text-gray-600">Tasks Done</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-success-500 to-success-600 rounded-xl w-fit mx-auto mb-3">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Badges Earned</p>
          </div>
        </div>
      </div>

      {/* Interactive Charts */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex flex-wrap gap-4 mb-6">
          {chartOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedChart(option.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                selectedChart === option.id
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <option.icon className="w-4 h-4" />
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
        {renderChart()}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Badges Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Achievement Badges</h3>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <div
                key={badge.name}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  badge.earned
                    ? 'border-transparent bg-gradient-to-r ' + badge.color + ' text-white hover:scale-105'
                    : 'border-gray-200 bg-gray-50 text-gray-400'
                }`}
              >
                <div className="text-center">
                  <badge.icon className={`w-8 h-8 mx-auto mb-2 ${badge.earned ? 'text-white' : 'text-gray-400'}`} />
                  <p className={`font-medium text-sm ${badge.earned ? 'text-white' : 'text-gray-500'}`}>
                    {badge.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Leaderboard</h3>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center space-x-4 p-3 rounded-xl ${
                  user.isMe ? 'bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200' : 'bg-gray-50'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                  user.rank === 1 ? 'bg-yellow-500' :
                  user.rank === 2 ? 'bg-gray-400' :
                  user.rank === 3 ? 'bg-amber-600' : 'bg-gray-300'
                }`}>
                  {user.rank}
                </div>
                <span className="text-2xl">{user.avatar}</span>
                <div className="flex-1">
                  <p className={`font-medium ${user.isMe ? 'text-primary-700' : 'text-gray-900'}`}>
                    {user.name} {user.isMe && '(You)'}
                  </p>
                  <p className="text-sm text-gray-600">{user.points} points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;