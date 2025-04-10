
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  icon: ReactNode;
  value: string | number;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  icon,
  value,
  description,
  variant = 'default',
  className
}) => {
  const variantClasses = {
    default: 'border-gray-700',
    success: 'border-l-4 border-l-studenthub-success',
    warning: 'border-l-4 border-l-yellow-500',
    danger: 'border-l-4 border-l-studenthub-error'
  };

  return (
    <div className={cn(
      "bg-studenthub-card rounded-lg shadow-lg border p-4 card-hover",
      variantClasses[variant],
      className
    )}>
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-studenthub-background p-3 rounded-md">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-studenthub-text-secondary">{title}</h3>
          <div className="flex items-end">
            <span className="text-2xl font-semibold text-studenthub-text-primary">{value}</span>
            {description && (
              <span className="ml-2 text-xs text-studenthub-text-secondary">{description}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
