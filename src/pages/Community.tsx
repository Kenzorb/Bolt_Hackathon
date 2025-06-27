import React, { useState } from 'react';
import { Users, MessageCircle, Plus, Search, BookOpen, Calculator, Beaker, Globe } from 'lucide-react';

const Community: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('groups');

  const studyGroups = [
    {
      id: 1,
      name: 'Math Masters',
      subject: 'Mathematics',
      members: 12,
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      description: 'Advanced algebra and geometry discussions',
      lastActivity: '2 hours ago',
      joined: true
    },
    {
      id: 2,
      name: 'Science Squad',
      subject: 'Science',
      members: 8,
      icon: Beaker,
      color: 'from-green-500 to-green-600',
      description: 'Physics, chemistry, and biology study group',
      lastActivity: '5 hours ago',
      joined: true
    },
    {
      id: 3,
      name: 'Literature Circle',
      subject: 'English',
      members: 15,
      icon: BookOpen,
      color: 'from-purple-500 to-purple-600',
      description: 'Book discussions and essay writing help',
      lastActivity: '1 day ago',
      joined: false
    },
    {
      id: 4,
      name: 'World Explorers',
      subject: 'History',
      members: 6,
      icon: Globe,
      color: 'from-orange-500 to-orange-600',
      description: 'History discussions and project collaboration',
      lastActivity: '3 hours ago',
      joined: false
    }
  ];

  const suggestions = [
    {
      id: 1,
      name: 'Emma Wilson',
      grade: '10th Grade',
      subjects: ['Math', 'Science'],
      avatar: '👩',
      commonInterests: 2,
      mutualFriends: 3
    },
    {
      id: 2,
      name: 'David Chen',
      grade: '10th Grade',
      subjects: ['English', 'History'],
      avatar: '👨',
      commonInterests: 1,
      mutualFriends: 2
    },
    {
      id: 3,
      name: 'Sarah Kim',
      grade: '9th Grade',
      subjects: ['Science', 'Math'],
      avatar: '👩',
      commonInterests: 3,
      mutualFriends: 1
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Help with Quadratic Equations',
      author: 'Alex Johnson',
      group: 'Math Masters',
      replies: 5,
      lastReply: '30 min ago',
      solved: false
    },
    {
      id: 2,
      title: 'Newton\'s Laws Study Guide',
      author: 'Maria Garcia',
      group: 'Science Squad',
      replies: 8,
      lastReply: '1 hour ago',
      solved: true
    },
    {
      id: 3,
      title: 'Essay Writing Tips?',
      author: 'John Smith',
      group: 'Literature Circle',
      replies: 12,
      lastReply: '2 hours ago',
      solved: false
    }
  ];

  const joinGroup = (groupId: number) => {
    // In a real app, this would handle joining the group
    alert('Joined group successfully! 🎉');
  };

  const connectWithStudent = (studentId: number) => {
    // In a real app, this would send a connection request
    alert('Connection request sent! 👋');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Community</h1>
        <p className="text-xl text-gray-600">Connect, collaborate, and learn together</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl w-fit mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-600">Groups Joined</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl w-fit mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">15</p>
            <p className="text-sm text-gray-600">Discussions</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl w-fit mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-600">Connections</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-success-500 to-success-600 rounded-xl w-fit mx-auto mb-3">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-600">Help Given</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-white/50 backdrop-blur-sm p-2 rounded-2xl border border-gray-200">
        {[
          { id: 'groups', label: 'Study Groups', icon: Users },
          { id: 'discussions', label: 'Discussions', icon: MessageCircle },
          { id: 'suggestions', label: 'Suggestions', icon: Search }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 flex-1 justify-center ${
              selectedTab === tab.id
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-white/70'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content based on selected tab */}
      {selectedTab === 'groups' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Study Groups</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all duration-300">
              <Plus className="w-4 h-4" />
              <span>Create Group</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 bg-gradient-to-r ${group.color} rounded-xl`}>
                      <group.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                      <p className="text-gray-600 text-sm">{group.subject}</p>
                    </div>
                  </div>
                  {group.joined && (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      Joined
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{group.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{group.members} members</span>
                    <span>Active {group.lastActivity}</span>
                  </div>
                  {!group.joined && (
                    <button
                      onClick={() => joinGroup(group.id)}
                      className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      Join
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'discussions' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all duration-300">
              <Plus className="w-4 h-4" />
              <span>New Discussion</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {discussions.map((discussion) => (
              <div
                key={discussion.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{discussion.title}</h3>
                      {discussion.solved && (
                        <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                          Solved
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>by {discussion.author}</span>
                      <span>in {discussion.group}</span>
                      <span>{discussion.replies} replies</span>
                      <span>Last reply {discussion.lastReply}</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'suggestions' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Connect with Students</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((student) => (
              <div
                key={student.id}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{student.avatar}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{student.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{student.grade}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {student.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-primary-100 text-primary-600 rounded-full text-xs"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4">
                    <p>{student.commonInterests} common interests</p>
                    <p>{student.mutualFriends} mutual connections</p>
                  </div>
                  
                  <button
                    onClick={() => connectWithStudent(student.id)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;