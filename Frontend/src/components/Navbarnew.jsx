import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu, User, Zap } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, message: 'You have a new assignment: Algebra #7', time: '2h ago' },
    { id: 2, message: 'You earned 30 points!', time: '5h ago' },
    { id: 3, message: 'Reminder: Submit your Science report', time: '1d ago' },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              SNAPPYSTREAK
            </span>
          </Link>
        </div>

        <div className="relative flex items-center space-x-4" ref={notificationRef}>
          <button
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full border-2 border-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-72 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden z-50">
              <div className="p-4 border-b text-sm font-semibold text-gray-700">Notifications</div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.map((note) => (
                  <li key={note.id} className="px-4 py-3 hover:bg-gray-100 text-sm text-gray-800">
                    <p>{note.message}</p>
                    <span className="text-xs text-gray-500">{note.time}</span>
                  </li>
                ))}
              </ul>
              {notifications.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500">No new notifications</div>
              )}
            </div>
          )}

          <Link
            to="/profile1"
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;