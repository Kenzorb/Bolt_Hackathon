import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, BookOpen, Users, CheckSquare, Gift, Wrench } from 'lucide-react';

const quickLinks = [
  {
    title: 'Dashboard',
    description: 'View your progress and statistics',
    href: '/dashboard1',
    icon: BarChart3,
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    title: 'Assignments',
    description: 'Submit and check your work',
    href: '/assignments1',
    icon: BookOpen,
    color: 'from-secondary-500 to-secondary-600',
    bgColor: 'bg-secondary-50',
  },
  {
    title: 'Community',
    description: 'Connect with other students',
    href: '/community1',
    icon: Users,
    color: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-50',
  },
  {
    title: 'Tasks',
    description: 'Manage your daily tasks',
    href: '/tasks1',
    icon: CheckSquare,
    color: 'from-success-500 to-success-600',
    bgColor: 'bg-success-50',
  },
  {
    title: 'Points & Rewards',
    description: 'Claim your rewards',
    href: '/points-rewards1',
    icon: Gift,
    color: 'from-error-500 to-error-600',
    bgColor: 'bg-error-50',
  },
  {
    title: 'Tools',
    description: 'Study tools and timers',
    href: '/tools1',
    icon: Wrench,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-50',
  },
];

const Home1 = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome back, <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Alex!</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ready to continue your learning streak? Let's make today count!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">12 days</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl">
              <CheckSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Tasks Completed</p>
              <p className="text-2xl font-bold text-gray-900">28/35</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={link.title}
              to={link.href}
              className="group block animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`${link.bgColor} rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 bg-gradient-to-r ${link.color} rounded-xl group-hover:scale-110 transition-transform`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {link.title}
                  </h3>
                </div>
                <p className="text-gray-600">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-success-50 rounded-lg">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Completed Math Assignment #5</p>
            <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Earned 50 points from daily tasks</p>
            <span className="text-xs text-gray-500 ml-auto">5 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-accent-50 rounded-lg">
            <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
            <p className="text-sm text-gray-700">Joined Science Study Group</p>
            <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
          </div>
        </div>
      </div>

      {/* Bolt Logo - Bottom Right Floating Link */}
      <a
        href="https://bolt.new"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50"
      >
        <img
          src="../../images/BoltLogo.png"
          alt="Bolt Logo"
          className="w-20 h-auto opacity-80 hover:opacity-100 hover:scale-105 transition-all"
        />
      </a>
    </div>
  );
};

export default Home1;