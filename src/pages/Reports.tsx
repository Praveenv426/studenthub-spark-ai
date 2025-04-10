
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Download, FileText, BarChart, PieChart, BarChart2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const Reports: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState("all");
  
  // Attendance data for charts
  const attendanceData = [
    { subject: "Mathematics", present: 85, absent: 15 },
    { subject: "Physics", present: 75, absent: 25 },
    { subject: "Chemistry", present: 90, absent: 10 },
    { subject: "Computer Science", present: 95, absent: 5 },
    { subject: "English", present: 80, absent: 20 },
  ];
  
  // Performance data for charts
  const performanceData = [
    { subject: "Mathematics", internal: 78, mid: 82, final: 85 },
    { subject: "Physics", internal: 65, mid: 72, final: 76 },
    { subject: "Chemistry", internal: 85, mid: 88, final: 92 },
    { subject: "Computer Science", internal: 90, mid: 92, final: 94 },
    { subject: "English", internal: 75, mid: 80, final: 82 },
  ];
  
  // CGPA trend data
  const cgpaTrendData = [
    { semester: "Sem 1", cgpa: 8.2 },
    { semester: "Sem 2", cgpa: 8.5 },
    { semester: "Sem 3", cgpa: 8.7 },
    { semester: "Sem 4", cgpa: 8.4 },
    { semester: "Sem 5", cgpa: 8.8 },
    { semester: "Sem 6", cgpa: 9.1 },
  ];
  
  // Overall grade distribution
  const gradeDistributionData = [
    { name: "A+", value: 4 },
    { name: "A", value: 6 },
    { name: "B+", value: 3 },
    { name: "B", value: 2 },
    { name: "C", value: 1 },
  ];
  
  const COLORS = [
    "#2979FF", "#4CAF50", "#FFC107", "#9C27B0", "#FF5722", 
    "#03A9F4", "#8BC34A", "#FF9800", "#673AB7", "#F44336"
  ];
  
  const GRADE_COLORS = ["#2979FF", "#4CAF50", "#FFC107", "#FF9800", "#F44336"];
  
  const downloadReport = (type: string) => {
    // In a real application, this would generate and download a report
    alert(`Downloading ${type} report...`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Academic Reports & Analytics</h1>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-gray-700 hover:bg-studenthub-background gap-2"
              onClick={() => downloadReport("performance")}
            >
              <Download size={16} /> Download Report
            </Button>
            <Select 
              defaultValue="all" 
              onValueChange={setSelectedSemester}
            >
              <SelectTrigger className="w-[180px] bg-studenthub-background border-gray-700">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent className="bg-studenthub-card border-gray-700">
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
                <SelectItem value="3">Semester 3</SelectItem>
                <SelectItem value="4">Semester 4</SelectItem>
                <SelectItem value="5">Semester 5</SelectItem>
                <SelectItem value="6">Semester 6</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="mb-2">
            <TabsTrigger value="overview" className="gap-2">
              <FileText size={16} /> Overview
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2">
              <BarChart size={16} /> Attendance
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <BarChart2 size={16} /> Performance
            </TabsTrigger>
            <TabsTrigger value="grades" className="gap-2">
              <PieChart size={16} /> Grades
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">CGPA Trend</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={cgpaTrendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="semester" stroke="#B0B0B0" />
                        <YAxis domain={[7, 10]} stroke="#B0B0B0" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                          labelStyle={{ color: '#FFF' }}
                          itemStyle={{ color: '#FFF' }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="cgpa"
                          stroke="#2979FF"
                          strokeWidth={3}
                          dot={{ r: 6, fill: '#2979FF' }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={gradeDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {gradeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={GRADE_COLORS[index % GRADE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                          labelStyle={{ color: '#FFF' }}
                        />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-studenthub-card border-gray-700 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Semester Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-studenthub-background p-4 rounded-lg">
                    <h3 className="text-studenthub-text-secondary mb-1">Current CGPA</h3>
                    <div className="text-3xl font-bold text-studenthub-primary">9.1</div>
                  </div>
                  <div className="bg-studenthub-background p-4 rounded-lg">
                    <h3 className="text-studenthub-text-secondary mb-1">Attendance</h3>
                    <div className="text-3xl font-bold text-green-500">88%</div>
                  </div>
                  <div className="bg-studenthub-background p-4 rounded-lg">
                    <h3 className="text-studenthub-text-secondary mb-1">Assignments</h3>
                    <div className="text-3xl font-bold text-blue-500">18/20</div>
                  </div>
                  <div className="bg-studenthub-background p-4 rounded-lg">
                    <h3 className="text-studenthub-text-secondary mb-1">Class Rank</h3>
                    <div className="text-3xl font-bold text-purple-500">4/60</div>
                  </div>
                  <div className="bg-studenthub-background p-4 rounded-lg">
                    <h3 className="text-studenthub-text-secondary mb-1">Best Subject</h3>
                    <div className="text-3xl font-bold text-amber-500">Computer Science</div>
                  </div>
                  <div className="bg-studenthub-background p-4 rounded-lg">
                    <h3 className="text-studenthub-text-secondary mb-1">Need Improvement</h3>
                    <div className="text-3xl font-bold text-red-500">Physics</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendance" className="space-y-4">
            <Card className="bg-studenthub-card border-gray-700 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Subject-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={attendanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="subject" stroke="#B0B0B0" angle={-45} textAnchor="end" height={70} />
                      <YAxis stroke="#B0B0B0" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                        labelStyle={{ color: '#FFF' }}
                      />
                      <Legend />
                      <Bar dataKey="present" name="Present (%)" fill="#4CAF50" />
                      <Bar dataKey="absent" name="Absent (%)" fill="#FF3D00" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg">Overall Attendance</h3>
                    <span className="text-3xl font-bold text-green-500">85%</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg">Classes Attended</h3>
                    <span className="text-3xl font-bold text-studenthub-primary">320/376</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg">Low Attendance Alert</h3>
                    <span className="text-3xl font-bold text-red-500">Physics</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
            <Card className="bg-studenthub-card border-gray-700 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="subject" stroke="#B0B0B0" angle={-45} textAnchor="end" height={70} />
                      <YAxis stroke="#B0B0B0" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                        labelStyle={{ color: '#FFF' }}
                      />
                      <Legend />
                      <Bar dataKey="internal" name="Internal Marks" fill="#2979FF" />
                      <Bar dataKey="mid" name="Mid Term" fill="#9C27B0" />
                      <Bar dataKey="final" name="Final Exam" fill="#FFC107" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Top Performing Subject</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-studenthub-background">
                    <h3 className="text-xl font-medium">Computer Science</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Internal:</span>
                        <span className="font-semibold text-studenthub-primary">90/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Mid Term:</span>
                        <span className="font-semibold text-studenthub-primary">92/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Final Exam:</span>
                        <span className="font-semibold text-studenthub-primary">94/100</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                        <span>Overall:</span>
                        <span className="font-bold text-studenthub-primary">92/100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Needs Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-studenthub-background">
                    <h3 className="text-xl font-medium">Physics</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Internal:</span>
                        <span className="font-semibold text-studenthub-error">65/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Mid Term:</span>
                        <span className="font-semibold text-amber-500">72/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Final Exam:</span>
                        <span className="font-semibold text-amber-500">76/100</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                        <span>Overall:</span>
                        <span className="font-bold text-amber-500">71/100</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="grades" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Grade Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={gradeDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {gradeDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={GRADE_COLORS[index % GRADE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }} 
                          labelStyle={{ color: '#FFF' }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-studenthub-card border-gray-700 shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Semester-wise GPA</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 p-4 bg-studenthub-background rounded-lg">
                    {cgpaTrendData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span>{item.semester}</span>
                        <div className="flex items-center">
                          <div className="w-40 bg-gray-700 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-studenthub-primary h-2.5 rounded-full" 
                              style={{ width: `${(item.cgpa / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="font-medium">{item.cgpa}</span>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                      <span className="font-bold">CGPA</span>
                      <span className="font-bold text-xl text-studenthub-primary">8.6</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-studenthub-card border-gray-700 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Subject-wise Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-studenthub-background rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-700 font-medium">
                    <div>Subject</div>
                    <div>Credits</div>
                    <div>Grade</div>
                    <div>Grade Points</div>
                    <div>Remarks</div>
                  </div>
                  
                  <div className="divide-y divide-gray-700">
                    <div className="grid grid-cols-5 gap-4 p-4">
                      <div>Mathematics</div>
                      <div>4</div>
                      <div className="text-blue-400">A</div>
                      <div>8.5</div>
                      <div>Excellent</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4">
                      <div>Physics</div>
                      <div>4</div>
                      <div className="text-green-400">B+</div>
                      <div>7.5</div>
                      <div>Good</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4">
                      <div>Chemistry</div>
                      <div>4</div>
                      <div className="text-blue-400">A</div>
                      <div>8.7</div>
                      <div>Excellent</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4">
                      <div>Computer Science</div>
                      <div>4</div>
                      <div className="text-blue-600">A+</div>
                      <div>9.2</div>
                      <div>Outstanding</div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 p-4">
                      <div>English</div>
                      <div>2</div>
                      <div className="text-blue-400">A</div>
                      <div>8.8</div>
                      <div>Excellent</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
