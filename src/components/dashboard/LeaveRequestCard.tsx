
import React from 'react';
import { CalendarX, Check, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaveRequest {
  id: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
}

interface LeaveRequestCardProps {
  requests: LeaveRequest[];
  className?: string;
}

const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({ requests, className }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'approved':
        return <Check size={16} className="text-studenthub-success" />;
      case 'rejected':
        return <X size={16} className="text-studenthub-error" />;
      default:
        return <Clock size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <div className={cn("bg-studenthub-card rounded-lg border border-gray-700 shadow-lg", className)}>
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-medium text-lg">Leave Request Status</h3>
      </div>
      <div className="divide-y divide-gray-700">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="p-4 hover:bg-gray-800 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-studenthub-background rounded-md mt-1">
                    <CalendarX size={18} className="text-studenthub-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{request.reason}</h4>
                    <p className="text-sm text-studenthub-text-secondary">
                      {request.startDate === request.endDate 
                        ? request.startDate 
                        : `${request.startDate} - ${request.endDate}`}
                    </p>
                    <p className="text-xs text-studenthub-text-secondary mt-1">Applied on {request.appliedOn}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 rounded-full bg-opacity-20">
                  {getStatusIcon(request.status)}
                  <span className={cn(
                    "text-xs",
                    request.status === 'approved' && "text-studenthub-success",
                    request.status === 'rejected' && "text-studenthub-error",
                    request.status === 'pending' && "text-yellow-500"
                  )}>
                    {getStatusText(request.status)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-studenthub-text-secondary">
            <p>No leave requests found</p>
          </div>
        )}
      </div>
      <div className="p-3 border-t border-gray-700 text-center">
        <button className="text-sm text-studenthub-primary hover:underline">
          Apply for Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveRequestCard;
