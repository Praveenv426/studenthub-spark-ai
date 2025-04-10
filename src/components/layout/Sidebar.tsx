
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  CheckSquare, 
  Clock, 
  BookOpen, 
  Clipboard, 
  BarChart2, 
  FileText, 
  Bell, 
  PieChart, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  text: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, text, to, isActive, isCollapsed }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center rounded-md px-3 py-3 text-studenthub-text-secondary transition-colors",
        "hover:bg-studenthub-primary/10 hover:text-studenthub-text-primary",
        isActive && "bg-studenthub-primary/20 text-studenthub-primary"
      )}
    >
      <Icon size={20} className="mr-2" />
      {!isCollapsed && <span>{text}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { icon: Home, text: 'Dashboard', to: '/' },
    { icon: CheckSquare, text: 'Attendance', to: '/attendance' },
    { icon: Clock, text: 'Timetable', to: '/timetable' },
    { icon: BookOpen, text: 'Study Material', to: '/study-material' },
    { icon: Clipboard, text: 'Assignments', to: '/assignments' },
    { icon: BarChart2, text: 'Internal Marks', to: '/internal-marks' },
    { icon: FileText, text: 'Leave Requests', to: '/leave-requests' },
    { icon: Bell, text: 'Messaging', to: '/messaging' },
    { icon: PieChart, text: 'Reports', to: '/reports' },
    { icon: Settings, text: 'Profile & Settings', to: '/settings' },
  ];

  return (
    <aside
      className={cn(
        "bg-studenthub-card h-screen flex flex-col transition-all duration-300 border-r border-gray-800",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {!collapsed && (
          <h1 className="text-xl font-bold text-studenthub-text-primary">
            <span className="text-studenthub-primary">Student</span>Hub
          </h1>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-700 text-studenthub-text-secondary"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <SidebarItem
            key={item.to}
            icon={item.icon}
            text={item.text}
            to={item.to}
            isActive={location.pathname === item.to}
            isCollapsed={collapsed}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-studenthub-primary flex items-center justify-center text-white">
            JS
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-xs text-studenthub-text-secondary">Logged in as</p>
              <p className="text-sm font-medium">John Smith</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
