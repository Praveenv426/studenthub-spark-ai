
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from 'recharts';

interface DataPoint {
  subject: string;
  attendance: number;
  marks: number;
  z: number;
}

const data: DataPoint[] = [
  { subject: "Data Structures", attendance: 92, marks: 85, z: 100 },
  { subject: "Algorithm Design", attendance: 78, marks: 73, z: 100 },
  { subject: "Computer Networks", attendance: 85, marks: 80, z: 100 },
  { subject: "Operating Systems", attendance: 90, marks: 88, z: 100 },
  { subject: "Database Systems", attendance: 95, marks: 92, z: 100 },
  { subject: "Web Development", attendance: 76, marks: 65, z: 100 },
  { subject: "Software Engineering", attendance: 88, marks: 81, z: 100 },
  { subject: "Computer Architecture", attendance: 70, marks: 60, z: 100 },
];

const PerformanceScatterChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis 
          type="number" 
          dataKey="attendance" 
          name="Attendance" 
          unit="%" 
          domain={[50, 100]} 
          stroke="#B0B0B0"
          label={{ value: 'Attendance %', position: 'insideBottom', offset: -5, fill: '#B0B0B0' }}
        />
        <YAxis 
          type="number" 
          dataKey="marks" 
          name="Marks" 
          unit="/100" 
          domain={[50, 100]} 
          stroke="#B0B0B0"
          label={{ value: 'Marks', angle: -90, position: 'insideLeft', fill: '#B0B0B0' }}
        />
        <ZAxis range={[60, 400]} />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }} 
          contentStyle={{ backgroundColor: '#1E1E1E', borderColor: '#333' }}
          formatter={(value: number, name: string) => {
            return [
              `${value}${name === 'Attendance' ? '%' : '/100'}`, 
              name
            ];
          }}
          labelFormatter={(value: number, data: any[]) => {
            if (data && data[0] && data[0].payload) {
              return data[0].payload.subject;
            }
            return '';
          }}
        />
        <Legend />
        <Scatter 
          name="Subject Performance" 
          data={data} 
          fill="#2979FF" 
          shape="circle"
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default PerformanceScatterChart;
