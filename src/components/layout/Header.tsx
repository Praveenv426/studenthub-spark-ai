
import React, { useState, useEffect } from 'react';
import { Search, Bell, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <header className="bg-studenthub-card h-16 border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-studenthub-text-secondary" />
          <input
            type="text"
            placeholder="Search subjects, assignments, or faculty..."
            className="w-full pl-10 pr-4 py-2 bg-studenthub-background border border-gray-700 rounded-md text-studenthub-text-primary focus:outline-none focus:border-studenthub-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="hidden md:block text-center">
        <p className="text-studenthub-text-primary">{formatDate(currentDateTime)}</p>
        <p className="text-sm text-studenthub-text-secondary">{formatTime(currentDateTime)}</p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-700 text-studenthub-text-secondary">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-studenthub-primary rounded-full"></span>
        </button>
        <button className="relative p-2 rounded-full hover:bg-gray-700 text-studenthub-text-secondary">
          <Mail size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-studenthub-primary rounded-full"></span>
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-studenthub-primary text-white flex items-center justify-center font-medium">
            JS
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">John Smith</p>
            <p className="text-xs text-studenthub-text-secondary">Computer Science</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
