import React, { useState } from 'react';
import { Plus, Check, Trash2, Clock, User, Star, Calendar } from 'lucide-react';

const Tasks1 = () => {
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete math homework',
      completed: false,
      category: 'academic',
      points: 20,
      dueDate: '2024-01-15',
      assignedBy: 'self',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Read 20 pages of science book',
      completed: true,
      category: 'academic',
      points: 15,
      dueDate: '2024-01-14',
      assignedBy: 'parent',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Practice piano for 30 minutes',
      completed: false,
      category: 'personal',
      points: 25,
      dueDate: '2024-01-15',
      assignedBy: 'parent',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Clean study desk',
      completed: false,
      category: 'chores',
      points: 10,
      dueDate: '2024-01-16',
      assignedBy: 'parent',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Review history notes',
      completed: true,
      category: 'academic',
      points: 15,
      dueDate: '2024-01-13',
      assignedBy: 'self',
      priority: 'high'
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Tasks', color: 'gray' },
    { id: 'academic', label: 'Academic', color: 'blue' },
    { id: 'personal', label: 'Personal', color: 'green' },
    { id: 'chores', label: 'Chores', color: 'yellow' }
  ];

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        category: 'personal',
        points: 10,
        dueDate: new Date().toISOString().split('T')[0],
        assignedBy: 'self',
        priority: 'medium'
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalPoints = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.points, 0);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic': return 'text-blue-600 bg-blue-100';
      case 'personal': return 'text-green-600 bg-green-100';
      case 'chores': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Tasks</h1>
        <p className="text-xl text-gray-600">Manage your daily tasks and goals</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl w-fit mx-auto mb-3">
              <Check className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedTasks}/{tasks.length}</p>
            <p className="text-sm text-gray-600">Tasks Completed</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl w-fit mx-auto mb-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
            <p className="text-sm text-gray-600">Points Earned</p>
          </div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="p-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl w-fit mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{tasks.filter(t => !t.completed).length}</p>
            <p className="text-sm text-gray-600">Pending Tasks</p>
          </div>
        </div>
      </div>

      {/* Add New Task */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <button
            onClick={addTask}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-xl transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                : 'bg-white/70 text-gray-700 border border-gray-200 hover:bg-white'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`border-l-4 rounded-2xl p-6 ${getPriorityColor(task.priority)} ${
              task.completed ? 'opacity-60' : ''
            } hover:shadow-lg transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-primary-500'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 text-white" />}
                </button>
                <div>
                  <h4 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>{task.assignedBy === 'parent' ? 'Parent' : 'Self'}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm font-medium text-primary-600">
                      <Star className="w-4 h-4" />
                      <span>{task.points} pts</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">
            {selectedCategory === 'all' 
              ? 'Add your first task to get started!' 
              : `No tasks in the ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()} category.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Tasks1;