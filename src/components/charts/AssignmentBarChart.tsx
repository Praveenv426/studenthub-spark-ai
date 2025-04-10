
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AssignmentData {
  subject: string;
  Completed: number;
  Pending: number;
}

const data: AssignmentData[] = [
  { subject: 'Data Structures', Completed: 4, Pending: 1 },
  { subject: 'Algorithm Design', Completed: 3, Pending: 2 },
  { subject: 'Computer Networks', Completed: 5, Pending: 0 },
  { subject: 'Operating Systems', Completed: 2, Pending: 3 },
  { subject: 'Database Systems', Completed: 4, Pending: 1 },
];

const AssignmentBarChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="subject" stroke="#B0B0B0" />
        <YAxis stroke="#B0B0B0" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: '#FFFFFF' }}
          labelStyle={{ color: '#FFFFFF' }}
        />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="Completed" fill="#4CAF50" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Pending" fill="#FF3D00" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AssignmentBarChart;
