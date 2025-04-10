
import React from 'react';
import { Bell, AlertCircle, Calendar, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'exam' | 'event' | 'announcement' | 'alert';
  isRead: boolean;
}

interface NotificationCardProps {
  notifications: Notification[];
  className?: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notifications, className }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'exam':
        return <Award size={18} className="text-purple-500" />;
      case 'event':
        return <Calendar size={18} className="text-blue-500" />;
      case 'announcement':
        return <Bell size={18} className="text-yellow-500" />;
      case 'alert':
        return <AlertCircle size={18} className="text-studenthub-error" />;
      default:
        return <Bell size={18} />;
    }
  };

  return (
    <div className={cn("bg-studenthub-card rounded-lg border border-gray-700 shadow-lg", className)}>
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-medium text-lg">Notification Panel</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={cn(
              "p-4 hover:bg-gray-800 transition-colors",
              !notification.isRead && "bg-studenthub-primary/5 border-l-2 border-l-studenthub-primary"
            )}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-studenthub-background rounded-md mt-1">
                {getIcon(notification.type)}
              </div>
              <div>
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-studenthub-text-secondary">{notification.description}</p>
                <p className="text-xs text-studenthub-text-secondary mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700 text-center">
        <button className="text-sm text-studenthub-primary hover:underline">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
