
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface AttendanceData {
  month: string;
  'Data Structures': number;
  'Algorithm Design': number;
  'Computer Networks': number;
  'Operating Systems': number;
}

const data: AttendanceData[] = [
  { month: 'Jan', 'Data Structures': 90, 'Algorithm Design': 85, 'Computer Networks': 78, 'Operating Systems': 92 },
  { month: 'Feb', 'Data Structures': 88, 'Algorithm Design': 82, 'Computer Networks': 76, 'Operating Systems': 89 },
  { month: 'Mar', 'Data Structures': 92, 'Algorithm Design': 78, 'Computer Networks': 80, 'Operating Systems': 85 },
  { month: 'Apr', 'Data Structures': 85, 'Algorithm Design': 80, 'Computer Networks': 74, 'Operating Systems': 90 },
  { month: 'May', 'Data Structures': 80, 'Algorithm Design': 75, 'Computer Networks': 70, 'Operating Systems': 84 },
];

const AttendanceLineChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="month" stroke="#B0B0B0" />
        <YAxis domain={[50, 100]} stroke="#B0B0B0" />
        <Tooltip 
          contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333', color: '#FFFFFF' }}
          labelStyle={{ color: '#FFFFFF' }}
        />
        <Legend verticalAlign="bottom" height={36} />
        <Line 
          type="monotone" 
          dataKey="Data Structures" 
          stroke="#2979FF" 
          activeDot={{ r: 8 }} 
          strokeWidth={2} 
        />
        <Line 
          type="monotone" 
          dataKey="Algorithm Design" 
          stroke="#4CAF50" 
          strokeWidth={2} 
        />
        <Line 
          type="monotone" 
          dataKey="Computer Networks" 
          stroke="#FF3D00" 
          strokeWidth={2} 
        />
        <Line 
          type="monotone" 
          dataKey="Operating Systems" 
          stroke="#9C27B0" 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AttendanceLineChart;
