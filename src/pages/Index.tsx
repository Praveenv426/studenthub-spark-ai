
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import StudyMaterialCard from '@/components/dashboard/StudyMaterialCard';
import LeaveRequestCard from '@/components/dashboard/LeaveRequestCard';
import NotificationCard from '@/components/dashboard/NotificationCard';
import AttendanceLineChart from '@/components/charts/AttendanceLineChart';
import AssignmentBarChart from '@/components/charts/AssignmentBarChart';
import PerformanceScatterChart from '@/components/charts/PerformanceScatterChart';
import { BookOpen, CheckCircle, ClipboardList, Bell } from 'lucide-react';

const Index = () => {
  // Study materials data - explicitly type each "type" property as "pdf", "ppt", or "video"
  const studyMaterials = [
    { id: '1', title: 'Database Normalization', subject: 'Database Systems', type: 'pdf' as const, uploadedAt: 'Today, 10:30 AM', size: '2.3 MB' },
    { id: '2', title: 'TCP/IP Protocol Suite', subject: 'Computer Networks', type: 'ppt' as const, uploadedAt: 'Yesterday, 2:15 PM', size: '5.7 MB' },
    { id: '3', title: 'Binary Search Trees', subject: 'Data Structures', type: 'video' as const, uploadedAt: '2 days ago', size: '45 MB' },
    { id: '4', title: 'Process Scheduling', subject: 'Operating Systems', type: 'pdf' as const, uploadedAt: '3 days ago', size: '1.8 MB' },
  ];

  // Leave request data - remove readonly by creating a new non-readonly array
  const leaveRequests = [
    { id: '1', reason: 'Medical Leave', startDate: 'Apr 15, 2025', endDate: 'Apr 17, 2025', status: 'pending' as const, appliedOn: 'Apr 12, 2025' },
    { id: '2', reason: 'Family Function', startDate: 'Mar 25, 2025', endDate: 'Mar 25, 2025', status: 'approved' as const, appliedOn: 'Mar 20, 2025' },
    { id: '3', reason: 'Personal Emergency', startDate: 'Feb 10, 2025', endDate: 'Feb 12, 2025', status: 'rejected' as const, appliedOn: 'Feb 8, 2025' },
  ];

  // Notification data - explicitly type each "type" property
  const notifications = [
    { id: '1', title: 'Mid-Term Examinations', description: 'The mid-term exams will commence from April 20, 2025', time: '2 hours ago', type: 'exam' as const, isRead: false },
    { id: '2', title: 'Tech Symposium 2025', description: 'Register for the annual tech symposium by April 15', time: 'Yesterday', type: 'event' as const, isRead: true },
    { id: '3', title: 'Updated Curriculum', description: 'The curriculum for the next semester has been updated', time: '2 days ago', type: 'announcement' as const, isRead: true },
    { id: '4', title: 'Assignment Deadline Extended', description: 'Database assignment deadline extended to April 18', time: '3 days ago', type: 'alert' as const, isRead: true },
  ];

  return (
    <Layout>
      {/* Dashboard Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, John!</h1>
        <p className="text-studenthub-text-secondary">Here's what's happening with your academics today.</p>
      </div>

      {/* Top Row - Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Today's Lectures"
          icon={<BookOpen size={20} className="text-studenthub-primary" />}
          value="3"
          description="Next: Database Systems at 11:30 AM"
        />
        <StatCard
          title="Attendance Status"
          icon={<CheckCircle size={20} className="text-studenthub-success" />}
          value="85%"
          description="Warning: Low in Computer Networks (68%)"
          variant="warning"
        />
        <StatCard
          title="Pending Assignments"
          icon={<ClipboardList size={20} className="text-studenthub-error" />}
          value="2"
          description="Due Today: Algorithm Analysis"
          variant="danger"
        />
        <StatCard
          title="Unread Announcements"
          icon={<Bell size={20} className="text-yellow-500" />}
          value="3"
          description="Latest: Mid-term exam schedule"
        />
      </div>

      {/* Middle Row - Analytics & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartCard
          title="Attendance Report"
          description="Monthly attendance percentage by subject"
          className="lg:col-span-1"
        >
          <AttendanceLineChart />
        </ChartCard>
        <ChartCard
          title="Assignment Progress"
          description="Completed vs pending assignments"
          className="lg:col-span-1"
        >
          <AssignmentBarChart />
        </ChartCard>
        <ChartCard
          title="Performance Overview"
          description="Correlation between attendance and marks"
          className="lg:col-span-1"
        >
          <PerformanceScatterChart />
        </ChartCard>
      </div>

      {/* Bottom Row - Detailed Views */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StudyMaterialCard materials={studyMaterials} />
        <LeaveRequestCard requests={leaveRequests} />
        <NotificationCard notifications={notifications} />
      </div>
    </Layout>
  );
};

export default Index;
