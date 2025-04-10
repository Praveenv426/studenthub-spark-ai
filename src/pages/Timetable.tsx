
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin, User } from 'lucide-react';

const Timetable = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [currentDay, setCurrentDay] = useState(days[0]);
  
  const timetableData = {
    Monday: [
      { id: 1, subject: 'Data Structures', time: '09:00 AM - 10:30 AM', room: 'CS-201', instructor: 'Dr. Alan Smith' },
      { id: 2, subject: 'Operating Systems', time: '11:00 AM - 12:30 PM', room: 'CS-105', instructor: 'Dr. Maria Johnson' },
      { id: 3, subject: 'Computer Networks', time: '02:00 PM - 03:30 PM', room: 'CS-302', instructor: 'Prof. Robert Chen' },
    ],
    Tuesday: [
      { id: 1, subject: 'Algorithm Design', time: '10:00 AM - 11:30 AM', room: 'CS-201', instructor: 'Dr. Emily Davis' },
      { id: 2, subject: 'Database Systems', time: '12:00 PM - 01:30 PM', room: 'CS-305', instructor: 'Prof. Michael Brown' },
    ],
    Wednesday: [
      { id: 1, subject: 'Data Structures Lab', time: '09:00 AM - 12:00 PM', room: 'Lab-101', instructor: 'Dr. Alan Smith' },
      { id: 2, subject: 'Computer Networks', time: '02:00 PM - 03:30 PM', room: 'CS-302', instructor: 'Prof. Robert Chen' },
    ],
    Thursday: [
      { id: 1, subject: 'Operating Systems', time: '11:00 AM - 12:30 PM', room: 'CS-105', instructor: 'Dr. Maria Johnson' },
      { id: 2, subject: 'Database Systems Lab', time: '02:00 PM - 05:00 PM', room: 'Lab-102', instructor: 'Prof. Michael Brown' },
    ],
    Friday: [
      { id: 1, subject: 'Algorithm Design', time: '10:00 AM - 11:30 AM', room: 'CS-201', instructor: 'Dr. Emily Davis' },
      { id: 2, subject: 'Technical Writing', time: '01:00 PM - 02:30 PM', room: 'LH-201', instructor: 'Dr. Sarah Wilson' },
    ],
    Saturday: [
      { id: 1, subject: 'Project Work', time: '10:00 AM - 01:00 PM', room: 'Project Lab', instructor: 'Prof. David Lee' },
    ],
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Class Timetable</h1>
        <p className="text-studenthub-text-secondary">
          View your daily and weekly lecture schedules
        </p>
      </div>

      <Card className="bg-studenthub-card border-gray-700 mb-6">
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timetableData.Monday.map(lecture => (
              <div 
                key={lecture.id} 
                className="p-4 bg-studenthub-background rounded-lg border border-gray-700 hover-effect"
              >
                <h3 className="font-medium text-lg">{lecture.subject}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-studenthub-text-secondary">
                    <Clock size={16} className="mr-2" />
                    <span className="text-sm">{lecture.time}</span>
                  </div>
                  <div className="flex items-center text-studenthub-text-secondary">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">Room: {lecture.room}</span>
                  </div>
                  <div className="flex items-center text-studenthub-text-secondary">
                    <User size={16} className="mr-2" />
                    <span className="text-sm">{lecture.instructor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-studenthub-card border-gray-700">
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Monday" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
              {days.map(day => (
                <TabsTrigger 
                  key={day} 
                  value={day}
                  onClick={() => setCurrentDay(day)}
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {days.map(day => (
              <TabsContent key={day} value={day} className="mt-0">
                <div className="space-y-4">
                  {timetableData[day as keyof typeof timetableData].length > 0 ? (
                    timetableData[day as keyof typeof timetableData].map(lecture => (
                      <div 
                        key={lecture.id} 
                        className="p-4 bg-studenthub-background rounded-lg border border-gray-700 hover-effect"
                      >
                        <h3 className="font-medium text-lg">{lecture.subject}</h3>
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="flex items-center text-studenthub-text-secondary">
                            <Clock size={16} className="mr-2" />
                            <span className="text-sm">{lecture.time}</span>
                          </div>
                          <div className="flex items-center text-studenthub-text-secondary">
                            <MapPin size={16} className="mr-2" />
                            <span className="text-sm">Room: {lecture.room}</span>
                          </div>
                          <div className="flex items-center text-studenthub-text-secondary">
                            <User size={16} className="mr-2" />
                            <span className="text-sm">{lecture.instructor}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-studenthub-text-secondary bg-studenthub-background rounded-lg">
                      <p>No classes scheduled for this day</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Timetable;
