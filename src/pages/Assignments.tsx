
import React, { useState } from 'react';
import { CalendarDays, Clock, FileUp, Filter, Search, AlertCircle, CheckCircle, ClipboardList, ArrowUpCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  completionPercentage: number;
  marks?: {
    obtained: number;
    total: number;
  };
  description: string;
  attachments?: number;
}

const Assignments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Sample assignments data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Database Schema Design',
      subject: 'Database Systems',
      dueDate: 'Apr 15, 2025',
      status: 'pending',
      completionPercentage: 70,
      description: 'Design a normalized database schema for a university management system with at least 10 entities and appropriate relationships.',
      attachments: 0
    },
    {
      id: '2',
      title: 'TCP Socket Programming',
      subject: 'Computer Networks',
      dueDate: 'Apr 10, 2025',
      status: 'submitted',
      completionPercentage: 100,
      description: 'Implement a client-server application using TCP sockets that allows file transfer between the client and server.',
      attachments: 2
    },
    {
      id: '3',
      title: 'AVL Tree Implementation',
      subject: 'Data Structures',
      dueDate: 'Apr 5, 2025',
      status: 'graded',
      completionPercentage: 100,
      marks: {
        obtained: 18,
        total: 20
      },
      description: 'Implement an AVL tree with insert, delete, and search operations. Include rotation functions and test with various scenarios.',
      attachments: 1
    },
    {
      id: '4',
      title: 'Process Synchronization',
      subject: 'Operating Systems',
      dueDate: 'Mar 28, 2025',
      status: 'overdue',
      completionPercentage: 30,
      description: 'Solve the producer-consumer problem using semaphores and mutex locks. Demonstrate the solution with appropriate examples.',
      attachments: 0
    },
    {
      id: '5',
      title: 'Network Topology Design',
      subject: 'Computer Networks',
      dueDate: 'Apr 20, 2025',
      status: 'pending',
      completionPercentage: 20,
      description: 'Design a campus network topology for a university with 5 buildings, considering scalability, redundancy, and security requirements.',
      attachments: 1
    },
    {
      id: '6',
      title: 'SQL Query Optimization',
      subject: 'Database Systems',
      dueDate: 'Apr 25, 2025',
      status: 'pending',
      completionPercentage: 0,
      description: 'Analyze and optimize the given SQL queries for better performance. Explain your optimization techniques.',
      attachments: 0
    }
  ];

  // Get unique subjects for filtering
  const subjects = Array.from(new Set(assignments.map(assignment => assignment.subject)));

  // Filter assignments based on search query and filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || assignment.status === selectedStatus;
    const matchesSubject = !selectedSubject || assignment.subject === selectedSubject;
    
    return matchesSearch && matchesStatus && matchesSubject;
  });

  // Count statistics
  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === 'pending').length,
    submitted: assignments.filter(a => a.status === 'submitted').length,
    graded: assignments.filter(a => a.status === 'graded').length,
    overdue: assignments.filter(a => a.status === 'overdue').length,
  };

  // Function to get badge for assignment status
  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Pending</Badge>;
      case 'submitted':
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/50">Submitted</Badge>;
      case 'graded':
        return <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50">Graded</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/50">Overdue</Badge>;
      default:
        return null;
    }
  };

  // Function to get icon for assignment card
  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-400" size={20} />;
      case 'submitted':
        return <CheckCircle className="text-blue-400" size={20} />;
      case 'graded':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'overdue':
        return <AlertCircle className="text-red-400" size={20} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Assignments</h1>
          <Button>
            <ClipboardList className="mr-2" size={16} />
            New Assignment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-studenthub-text-secondary">Total</p>
                <span className="text-xl font-bold">{stats.total}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-yellow-500/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-yellow-400">Pending</p>
                <span className="text-xl font-bold text-yellow-400">{stats.pending}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-blue-500/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-blue-400">Submitted</p>
                <span className="text-xl font-bold text-blue-400">{stats.submitted}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-green-500/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-green-400">Graded</p>
                <span className="text-xl font-bold text-green-400">{stats.graded}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-red-500/10">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <p className="text-red-400">Overdue</p>
                <span className="text-xl font-bold text-red-400">{stats.overdue}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-studenthub-text-secondary" size={18} />
            <Input
              placeholder="Search assignments..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <select 
              className="bg-studenthub-background border border-gray-700 rounded-md px-3 py-2 text-studenthub-text-primary focus:outline-none focus:border-studenthub-primary"
              onChange={(e) => setSelectedStatus(e.target.value || null)}
              value={selectedStatus || ""}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="graded">Graded</option>
              <option value="overdue">Overdue</option>
            </select>
            <select 
              className="bg-studenthub-background border border-gray-700 rounded-md px-3 py-2 text-studenthub-text-primary focus:outline-none focus:border-studenthub-primary"
              onChange={(e) => setSelectedSubject(e.target.value || null)}
              value={selectedSubject || ""}
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>
        </div>
        
        {/* Assignment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.length === 0 ? (
            <div className="col-span-full text-center py-10 text-studenthub-text-secondary">
              No assignments found matching your criteria.
            </div>
          ) : (
            filteredAssignments.map(assignment => (
              <Card key={assignment.id} className="border-gray-800 hover:border-studenthub-primary/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{assignment.title}</CardTitle>
                      <p className="text-sm text-studenthub-text-secondary">{assignment.subject}</p>
                    </div>
                    {getStatusIcon(assignment.status)}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-studenthub-text-secondary mb-3 line-clamp-2">
                    {assignment.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="text-studenthub-text-secondary">Completion</span>
                    <span className={`font-medium ${
                      assignment.completionPercentage === 100 
                        ? 'text-green-400' 
                        : 'text-studenthub-text-secondary'
                    }`}>
                      {assignment.completionPercentage}%
                    </span>
                  </div>
                  <Progress 
                    value={assignment.completionPercentage} 
                    className={`h-1.5 ${
                      assignment.completionPercentage === 100 
                        ? 'bg-green-400/20' 
                        : 'bg-studenthub-primary/20'
                    }`}
                  />
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center text-studenthub-text-secondary">
                      <CalendarDays size={14} className="mr-1" />
                      <span className="text-xs">Due: {assignment.dueDate}</span>
                    </div>
                    {assignment.status === 'graded' && assignment.marks && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                        {assignment.marks.obtained}/{assignment.marks.total}
                      </Badge>
                    )}
                    {getStatusBadge(assignment.status)}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {assignment.status === 'pending' && (
                    <Button variant="default" className="w-full">
                      <FileUp size={16} className="mr-2" />
                      Submit Assignment
                    </Button>
                  )}
                  {assignment.status === 'submitted' && (
                    <Button variant="outline" className="w-full">
                      <ArrowUpCircle size={16} className="mr-2" />
                      Update Submission
                    </Button>
                  )}
                  {assignment.status === 'graded' && (
                    <Button variant="outline" className="w-full">
                      View Feedback
                    </Button>
                  )}
                  {assignment.status === 'overdue' && (
                    <Button variant="outline" className="w-full text-red-400">
                      Request Extension
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Assignments;
