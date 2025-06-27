import React, { useState } from 'react';
import { Star, Gift, Pin, ShoppingCart, Award, Trophy } from 'lucide-react';

const PointsRewards: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPoints] = useState(1247);

  const pointsHistory = [
    { id: 1, activity: 'Completed Math Assignment', points: 50, date: '2024-01-14', type: 'earned' },
    { id: 2, activity: 'Daily Task Streak (7 days)', points: 35, date: '2024-01-13', type: 'earned' },
    { id: 3, activity: 'Claimed: Extra Screen Time', points: -100, date: '2024-01-12', type: 'spent' },
    { id: 4, activity: 'Science Quiz Perfect Score', points: 75, date: '2024-01-11', type: 'earned' },
    { id: 5, activity: 'Helped Classmate with Homework', points: 25, date: '2024-01-10', type: 'earned' },
  ];

  const rewards = [
    {
      id: 1,
      title: 'Extra Screen Time',
      description: '1 hour of additional screen time',
      points: 100,
      category: 'entertainment',
      pinned: true,
      available: true,
      image: '📱'
    },
    {
      id: 2,
      title: 'Favorite Meal Choice',
      description: 'Choose dinner for the family',
      points: 150,
      category: 'food',
      pinned: true,
      available: true,
      image: '🍕'
    },
    {
      id: 3,
      title: 'Movie Night Pick',
      description: 'Choose the family movie night film',
      points: 120,
      category: 'entertainment',
      pinned: false,
      available: true,
      image: '🎬'
    },
    {
      id: 4,
      title: 'Weekend Outing',
      description: 'Special trip to your favorite place',
      points: 500,
      category: 'experience',
      pinned: false,
      available: true,
      image: '🎢'
    },
    {
      id: 5,
      title: 'New Book',
      description: 'Any book of your choice',
      points: 200,
      category: 'education',
      pinned: false,
      available: true,
      image: '📚'
    },
    {
      id: 6,
      title: 'Art Supplies',
      description: 'Premium art supply set',
      points: 300,
      category: 'education',
      pinned: false,
      available: false,
      image: '🎨'
    },
    {
      id: 7,
      title: 'Gaming Session',
      description: '2 hours of uninterrupted gaming',
      points: 180,
      category: 'entertainment',
      pinned: false,
      available: true,
      image: '🎮'
    },
    {
      id: 8,
      title: 'Ice Cream Trip',
      description: 'Visit to your favorite ice cream shop',
      points: 80,
      category: 'food',
      pinned: false,
      available: true,
      image: '🍦'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Rewards', icon: Gift },
    { id: 'entertainment', label: 'Entertainment', icon: Star },
    { id: 'food', label: 'Food & Treats', icon: Gift },
    { id: 'experience', label: 'Experiences', icon: Trophy },
    { id: 'education', label: 'Educational', icon: Award }
  ];

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const pinnedRewards = rewards.filter(reward => reward.pinned);
  const canAfford = (points: number) => userPoints >= points;

  const claimReward = (rewardId: number) => {
    // In a real app, this would handle the transaction
    alert('Reward claimed! 🎉');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Points & Rewards</h1>
        <p className="text-xl text-gray-600">Earn points and claim awesome rewards!</p>
      </div>

      {/* Points Summary */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{userPoints.toLocaleString()} Points</h2>
            <p className="text-primary-100">Your current balance</p>
          </div>
          <div className="p-4 bg-white/20 rounded-2xl">
            <Star className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">285</p>
            <p className="text-primary-100 text-sm">This Week</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-primary-100 text-sm">Total Earned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">650</p>
            <p className="text-primary-100 text-sm">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Pinned Rewards */}
      {pinnedRewards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Pin className="w-5 h-5 text-accent-600" />
            <h2 className="text-2xl font-bold text-gray-900">Pinned Rewards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pinnedRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-gradient-to-br from-accent-50 to-accent-100 border-2 border-accent-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{reward.image}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{reward.title}</h3>
                      <p className="text-gray-600 text-sm">{reward.description}</p>
                    </div>
                  </div>
                  <Pin className="w-5 h-5 text-accent-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-accent-600" />
                    <span className="font-bold text-accent-700">{reward.points} points</span>
                  </div>
                  <button
                    onClick={() => claimReward(reward.id)}
                    disabled={!canAfford(reward.points) || !reward.available}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      canAfford(reward.points) && reward.available
                        ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Claim</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                : 'bg-white/70 text-gray-700 border border-gray-200 hover:bg-white'
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <div
            key={reward.id}
            className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
              !reward.available ? 'opacity-60' : 'border-gray-200'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{reward.image}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="w-5 h-5 text-accent-600" />
                <span className="font-bold text-accent-700">{reward.points} points</span>
              </div>
              
              <button
                onClick={() => claimReward(reward.id)}
                disabled={!canAfford(reward.points) || !reward.available}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  canAfford(reward.points) && reward.available
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  {!reward.available ? 'Unavailable' : 
                   !canAfford(reward.points) ? 'Not Enough Points' : 'Claim Reward'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Points History */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Points Activity</h3>
        <div className="space-y-3">
          {pointsHistory.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  entry.type === 'earned' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {entry.type === 'earned' ? 
                    <Star className="w-5 h-5" /> : 
                    <ShoppingCart className="w-5 h-5" />
                  }
                </div>
                <div>
                  <p className="font-medium text-gray-900">{entry.activity}</p>
                  <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
              </div>
              <span className={`font-bold ${
                entry.type === 'earned' ? 'text-green-600' : 'text-red-600'
              }`}>
                {entry.type === 'earned' ? '+' : ''}{entry.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PointsRewards;