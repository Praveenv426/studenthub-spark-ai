
import React, { useState } from 'react';
import { BarChart3, Search, Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Mark {
  subjectCode: string;
  subject: string;
  internalMarks: {
    test1: number;
    test2: number;
    assignments: number;
    attendance: number;
    total: number;
  };
  grade: string;
  credits: number;
}

const InternalMarks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<string>("current");

  // Sample marks data
  const marksData: Mark[] = [
    {
      subjectCode: 'CS301',
      subject: 'Database Systems',
      internalMarks: {
        test1: 18,
        test2: 19,
        assignments: 9,
        attendance: 10,
        total: 56,
      },
      grade: 'A',
      credits: 4
    },
    {
      subjectCode: 'CS302',
      subject: 'Computer Networks',
      internalMarks: {
        test1: 15,
        test2: 17,
        assignments: 8,
        attendance: 8,
        total: 48,
      },
      grade: 'B+',
      credits: 4
    },
    {
      subjectCode: 'CS303',
      subject: 'Data Structures',
      internalMarks: {
        test1: 20,
        test2: 19,
        assignments: 10,
        attendance: 9,
        total: 58,
      },
      grade: 'A+',
      credits: 4
    },
    {
      subjectCode: 'CS304',
      subject: 'Operating Systems',
      internalMarks: {
        test1: 17,
        test2: 16,
        assignments: 9,
        attendance: 10,
        total: 52,
      },
      grade: 'A',
      credits: 4
    },
    {
      subjectCode: 'CS305',
      subject: 'Web Technologies',
      internalMarks: {
        test1: 13,
        test2: 15,
        assignments: 8,
        attendance: 7,
        total: 43,
      },
      grade: 'B',
      credits: 3
    },
  ];

  // Filter subjects based on search query
  const filteredMarks = marksData.filter(mark => 
    mark.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mark.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Prepare chart data
  const chartData = marksData.map(mark => ({
    name: mark.subject,
    'Test 1': mark.internalMarks.test1,
    'Test 2': mark.internalMarks.test2,
    'Assignments': mark.internalMarks.assignments,
    'Attendance': mark.internalMarks.attendance,
  }));

  // Calculate total GPA
  const totalCredits = marksData.reduce((acc, mark) => acc + mark.credits, 0);
  const gradePoints = {
    'A+': 10, 'A': 9, 'A-': 8.5, 'B+': 8, 'B': 7, 'B-': 6.5, 
    'C+': 6, 'C': 5.5, 'C-': 5, 'D': 4, 'F': 0
  };
  
  const weightedGradePoints = marksData.reduce((acc, mark) => {
    return acc + (gradePoints[mark.grade as keyof typeof gradePoints] * mark.credits);
  }, 0);
  
  const gpa = (weightedGradePoints / totalCredits).toFixed(2);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Internal Marks</h1>
          
          <div className="flex gap-2">
            <select
              className="bg-studenthub-background border border-gray-700 rounded-md px-3 py-2 text-studenthub-text-primary focus:outline-none focus:border-studenthub-primary"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
            >
              <option value="current">Current Semester</option>
              <option value="previous">Previous Semester</option>
              <option value="all">All Semesters</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-gray-800">
            <CardContent className="p-4">
              <div className="space-y-0.5">
                <p className="text-studenthub-text-secondary text-sm">Current GPA</p>
                <p className="text-2xl font-bold">{gpa}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800">
            <CardContent className="p-4">
              <div className="space-y-0.5">
                <p className="text-studenthub-text-secondary text-sm">Highest Mark</p>
                <p className="text-2xl font-bold text-studenthub-primary">
                  {Math.max(...marksData.map(m => m.internalMarks.total))}/60
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800">
            <CardContent className="p-4">
              <div className="space-y-0.5">
                <p className="text-studenthub-text-secondary text-sm">Average</p>
                <p className="text-2xl font-bold">
                  {(marksData.reduce((acc, m) => acc + m.internalMarks.total, 0) / marksData.length).toFixed(1)}/60
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800">
            <CardContent className="p-4">
              <div className="space-y-0.5">
                <p className="text-studenthub-text-secondary text-sm">Total Credits</p>
                <p className="text-2xl font-bold">{totalCredits}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="mr-2" size={18} />
              Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#B0B0B0" fontSize={12} />
                  <YAxis stroke="#B0B0B0" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1E1E1E",
                      border: "1px solid #333",
                      borderRadius: "6px",
                      color: "#B0B0B0",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "10px" }} />
                  <Bar dataKey="Test 1" fill="#2979FF" />
                  <Bar dataKey="Test 2" fill="#00BFA5" />
                  <Bar dataKey="Assignments" fill="#FF9800" />
                  <Bar dataKey="Attendance" fill="#E91E63" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-studenthub-text-secondary" size={18} />
            <Input
              placeholder="Search subjects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>

        {/* Marks Table */}
        <Card className="border-gray-800">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-studenthub-card border-b border-gray-800">
                <TableRow>
                  <TableHead className="text-studenthub-text-primary font-semibold">Code</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold">Subject</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold text-center">Test 1 (20)</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold text-center">Test 2 (20)</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold text-center">Assignments (10)</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold text-center">Attendance (10)</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold text-center">Total (60)</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold text-center">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMarks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-studenthub-text-secondary">
                      No subjects found matching your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMarks.map(mark => (
                    <TableRow key={mark.subjectCode} className="hover:bg-studenthub-primary/5 transition-colors">
                      <TableCell className="font-medium">{mark.subjectCode}</TableCell>
                      <TableCell>{mark.subject}</TableCell>
                      <TableCell className="text-center">
                        <span className={mark.internalMarks.test1 >= 14 ? "text-green-400" : 
                          mark.internalMarks.test1 >= 10 ? "text-studenthub-text-primary" : "text-red-400"}>
                          {mark.internalMarks.test1}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={mark.internalMarks.test2 >= 14 ? "text-green-400" : 
                          mark.internalMarks.test2 >= 10 ? "text-studenthub-text-primary" : "text-red-400"}>
                          {mark.internalMarks.test2}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={mark.internalMarks.assignments >= 7 ? "text-green-400" : 
                          mark.internalMarks.assignments >= 5 ? "text-studenthub-text-primary" : "text-red-400"}>
                          {mark.internalMarks.assignments}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={mark.internalMarks.attendance >= 7 ? "text-green-400" : 
                          mark.internalMarks.attendance >= 5 ? "text-studenthub-text-primary" : "text-red-400"}>
                          {mark.internalMarks.attendance}
                        </span>
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        <span className={mark.internalMarks.total >= 42 ? "text-green-400" : 
                          mark.internalMarks.total >= 30 ? "text-studenthub-text-primary" : "text-red-400"}>
                          {mark.internalMarks.total}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={
                          mark.grade === 'A+' || mark.grade === 'A' ? "text-green-400 font-medium" :
                          mark.grade === 'B+' || mark.grade === 'B' ? "text-blue-400 font-medium" :
                          mark.grade === 'C+' || mark.grade === 'C' ? "text-yellow-400 font-medium" :
                          "text-red-400 font-medium"
                        }>
                          {mark.grade}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InternalMarks;
