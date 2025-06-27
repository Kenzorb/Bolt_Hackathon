import React, { useState } from 'react';
import { User, Edit, Save, X, MapPin, Book, Star, Award } from 'lucide-react';

const PersonalInfo1 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Alex Johnson',
    age: 16,
    grade: '10th Grade',
    country: 'United States',
    gender: 'Non-binary',
    language: 'English',
    subjects: ['Mathematics', 'Science', 'English'],
    strengths: ['Problem-solving', 'Critical thinking', 'Team collaboration'],
    weaknesses: ['Time management', 'Public speaking'],
    bio: 'Passionate about learning and helping others. Love solving math problems and conducting science experiments.',
    avatar: '👤'
  });

  const [editForm, setEditForm] = useState(userInfo);

  const achievements = [
    { title: 'Math Wizard', description: 'Completed 50+ math assignments', icon: '🧮', earned: true },
    { title: 'Science Explorer', description: 'Perfect scores on 5 science quizzes', icon: '🔬', earned: true },
    { title: 'Team Player', description: 'Helped 10+ classmates', icon: '🤝', earned: true },
    { title: 'Streak Master', description: '30-day learning streak', icon: '🔥', earned: false },
    { title: 'Scholar', description: 'Maintain 90%+ average', icon: '🎓', earned: false },
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(userInfo);
  };

  const handleSave = () => {
    setUserInfo(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    if (typeof field !== 'string') return; // basic guard
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const addStrength = () => {
    const newStrength = prompt('Add a new strength:');
    if (newStrength && newStrength.trim()) {
      handleInputChange('strengths', [...editForm.strengths, newStrength.trim()]);
    }
  };

  const removeStrength = (index) => {
    const updatedStrengths = editForm.strengths.filter((_, i) => i !== index);
    handleInputChange('strengths', updatedStrengths);
  };

  const addWeakness = () => {
    const newWeakness = prompt('Add an area for improvement:');
    if (newWeakness && newWeakness.trim()) {
      handleInputChange('weaknesses', [...editForm.weaknesses, newWeakness.trim()]);
    }
  };

  const removeWeakness = (index) => {
    const updatedWeaknesses = editForm.weaknesses.filter((_, i) => i !== index);
    handleInputChange('weaknesses', updatedWeaknesses);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Personal Profile</h1>
        <p className="text-xl text-gray-600">Manage your personal information and achievements</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar and Basic Info */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-4xl text-white">
                {userInfo.avatar}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-2xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-primary-500 outline-none"
                    />
                    <div className="flex space-x-4">
                      <input
                        type="number"
                        value={editForm.age}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                        className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:border-primary-500 outline-none"
                      />
                      <input
                        type="text"
                        value={editForm.grade}
                        onChange={(e) => handleInputChange('grade', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-lg focus:border-primary-500 outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{userInfo.name}</h3>
                    <p className="text-gray-600">{userInfo.age} years old • {userInfo.grade}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 outline-none"
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-900">{userInfo.country}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  {isEditing ? (
                    <select
                      value={editForm.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  ) : (
                    <span className="text-gray-900">{userInfo.gender}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Language</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 outline-none"
                    />
                  ) : (
                    <span className="text-gray-900">{userInfo.language}</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Favorite Subjects</label>
                  <div className="flex flex-wrap gap-2">
                    {userInfo.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  {isEditing ? (
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 outline-none resize-none"
                    />
                  ) : (
                    <p className="text-gray-900">{userInfo.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Strengths</label>
                  {isEditing && (
                    <button
                      onClick={addStrength}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      + Add
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {(isEditing ? editForm.strengths : userInfo.strengths).map((strength, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-green-50 rounded-lg"
                    >
                      <span className="text-green-700">{strength}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeStrength(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Areas for Improvement</label>
                  {isEditing && (
                    <button
                      onClick={addWeakness}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      + Add
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {(isEditing ? editForm.weaknesses : userInfo.weaknesses).map((weakness, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg"
                    >
                      <span className="text-yellow-700">{weakness}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeWeakness(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Sidebar */}
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    achievement.earned
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${achievement.earned ? 'text-green-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Award className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Points Earned</span>
                <span className="font-bold text-primary-600">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current Streak</span>
                <span className="font-bold text-secondary-600">12 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Assignments Done</span>
                <span className="font-bold text-accent-600">35</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Community Help</span>
                <span className="font-bold text-success-600">8 students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo1;