
import React from 'react';
import Layout from '@/components/layout/Layout';
import AttendanceLineChart from '@/components/charts/AttendanceLineChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Attendance = () => {
  const subjects = [
    { id: 1, name: 'Data Structures', total: 45, present: 42, percentage: 93 },
    { id: 2, name: 'Algorithm Design', total: 40, present: 32, percentage: 80 },
    { id: 3, name: 'Computer Networks', total: 38, present: 26, percentage: 68 },
    { id: 4, name: 'Operating Systems', total: 42, present: 38, percentage: 90 },
    { id: 5, name: 'Database Systems', total: 36, present: 33, percentage: 92 },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Attendance Tracker</h1>
        <p className="text-studenthub-text-secondary">
          Monitor your subject-wise attendance and trends
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-studenthub-card border-gray-700 col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <AttendanceLineChart />
          </CardContent>
        </Card>
        
        <Card className="bg-studenthub-card border-gray-700">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-studenthub-text-secondary">Total Classes</span>
                <span className="font-medium">201</span>
              </div>
              <div className="flex justify-between">
                <span className="text-studenthub-text-secondary">Classes Attended</span>
                <span className="font-medium">171</span>
              </div>
              <div className="flex justify-between">
                <span className="text-studenthub-text-secondary">Overall Percentage</span>
                <span className="font-medium text-studenthub-primary">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-studenthub-text-secondary">Minimum Required</span>
                <span className="font-medium text-studenthub-error">75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-studenthub-text-secondary">Classes to Attend</span>
                <span className="font-medium">5 more</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-studenthub-card border-gray-700">
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs uppercase border-b border-gray-700">
                <tr>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Total Classes</th>
                  <th className="px-6 py-3">Present</th>
                  <th className="px-6 py-3">Percentage</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map(subject => (
                  <tr key={subject.id} className="border-b border-gray-700">
                    <td className="px-6 py-4 font-medium">{subject.name}</td>
                    <td className="px-6 py-4">{subject.total}</td>
                    <td className="px-6 py-4">{subject.present}</td>
                    <td className="px-6 py-4">{subject.percentage}%</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        subject.percentage >= 75 ? 'bg-green-900/20 text-studenthub-success' : 'bg-red-900/20 text-studenthub-error'
                      }`}>
                        {subject.percentage >= 75 ? 'Good' : 'At Risk'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Attendance;
