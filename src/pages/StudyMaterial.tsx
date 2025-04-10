
import React, { useState } from 'react';
import { Search, Filter, Download, FileText, FileImage, Film, Clock, Book } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

// Define the type for study materials
type MaterialType = "pdf" | "ppt" | "video";

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  type: MaterialType;
  uploadedAt: string;
  size: string;
  description?: string;
  instructor?: string;
}

const StudyMaterial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<MaterialType | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);

  // Sample study materials data
  const studyMaterials: StudyMaterial[] = [
    { 
      id: '1', 
      title: 'Database Normalization', 
      subject: 'Database Systems', 
      type: 'pdf', 
      uploadedAt: 'Today, 10:30 AM', 
      size: '2.3 MB',
      description: 'Comprehensive guide on 1NF, 2NF, 3NF, and BCNF with examples and practice problems.',
      instructor: 'Dr. Robert Smith'
    },
    { 
      id: '2', 
      title: 'TCP/IP Protocol Suite', 
      subject: 'Computer Networks', 
      type: 'ppt', 
      uploadedAt: 'Yesterday, 2:15 PM', 
      size: '5.7 MB',
      description: 'Detailed presentation on TCP/IP protocols, their functions, and implementation in modern networks.',
      instructor: 'Prof. Maria Johnson'
    },
    { 
      id: '3', 
      title: 'Binary Search Trees', 
      subject: 'Data Structures', 
      type: 'video', 
      uploadedAt: '2 days ago', 
      size: '45 MB',
      description: 'Video lecture explaining BST operations, time complexity analysis, and implementation in C++.',
      instructor: 'Dr. Alan Chen'
    },
    { 
      id: '4', 
      title: 'Process Scheduling', 
      subject: 'Operating Systems', 
      type: 'pdf', 
      uploadedAt: '3 days ago', 
      size: '1.8 MB',
      description: 'Explanation of process scheduling algorithms like FCFS, SJF, Round Robin with examples.',
      instructor: 'Prof. Sarah Williams'
    },
    { 
      id: '5', 
      title: 'Entity Relationship Diagrams', 
      subject: 'Database Systems', 
      type: 'pdf', 
      uploadedAt: '4 days ago', 
      size: '3.2 MB',
      description: 'Guidelines for creating ERDs with cardinality, relationships, and database design examples.',
      instructor: 'Dr. Robert Smith'
    },
    { 
      id: '6', 
      title: 'Sorting Algorithms', 
      subject: 'Data Structures', 
      type: 'video', 
      uploadedAt: '5 days ago', 
      size: '38 MB',
      description: 'Visual explanation of Bubble Sort, Quick Sort, Merge Sort, and Heap Sort with time complexity analysis.',
      instructor: 'Dr. Alan Chen'
    },
    { 
      id: '7', 
      title: 'OSI Model & TCP/IP', 
      subject: 'Computer Networks', 
      type: 'ppt', 
      uploadedAt: '1 week ago', 
      size: '4.3 MB',
      description: 'Comparison between OSI and TCP/IP models with detailed explanation of each layer.',
      instructor: 'Prof. Maria Johnson'
    },
    { 
      id: '8', 
      title: 'Memory Management', 
      subject: 'Operating Systems', 
      type: 'pdf', 
      uploadedAt: '1 week ago', 
      size: '2.5 MB',
      description: 'Explanation of memory allocation strategies, paging, segmentation, and virtual memory.',
      instructor: 'Prof. Sarah Williams'
    },
  ];

  // Get unique subjects for filtering
  const subjects = Array.from(new Set(studyMaterials.map(material => material.subject)));
  
  // Filter materials based on search query and filters
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !selectedSubject || material.subject === selectedSubject;
    const matchesType = !selectedType || material.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  // Function to get icon based on material type
  const getMaterialIcon = (type: MaterialType) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-400" size={20} />;
      case 'ppt':
        return <FileImage className="text-orange-400" size={20} />;
      case 'video':
        return <Film className="text-blue-400" size={20} />;
      default:
        return <FileText className="text-studenthub-text-secondary" size={20} />;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Study Materials</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Clock size={16} className="mr-2" />
              Recent
            </Button>
            <Button variant="outline" size="sm">
              <Book size={16} className="mr-2" />
              Bookmarked
            </Button>
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-studenthub-text-secondary" size={18} />
            <Input
              placeholder="Search for study materials..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
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
            <select 
              className="bg-studenthub-background border border-gray-700 rounded-md px-3 py-2 text-studenthub-text-primary focus:outline-none focus:border-studenthub-primary"
              onChange={(e) => setSelectedType((e.target.value || null) as MaterialType | null)}
              value={selectedType || ""}
            >
              <option value="">All Types</option>
              <option value="pdf">PDF</option>
              <option value="ppt">PPT</option>
              <option value="video">Video</option>
            </select>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </div>
        </div>
        
        {/* Materials Table */}
        <Card className="border-gray-800">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-studenthub-card border-b border-gray-800">
                <TableRow>
                  <TableHead className="text-studenthub-text-primary font-semibold">Type</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold">Title</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold">Subject</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold">Uploaded</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold">Size</TableHead>
                  <TableHead className="text-studenthub-text-primary font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-studenthub-text-secondary">
                      No study materials found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMaterials.map(material => (
                    <TableRow key={material.id} className="hover:bg-studenthub-primary/5 transition-colors cursor-pointer">
                      <TableCell>{getMaterialIcon(material.type)}</TableCell>
                      <TableCell>
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="link" className="p-0 h-auto text-left justify-start" onClick={() => setSelectedMaterial(material)}>
                              {material.title}
                            </Button>
                          </DrawerTrigger>
                          <DrawerContent className="bg-studenthub-card border-t border-gray-800">
                            <DrawerHeader>
                              <DrawerTitle className="text-studenthub-text-primary">{material.title}</DrawerTitle>
                            </DrawerHeader>
                            <div className="px-4 pb-4 space-y-4">
                              <div className="flex items-center gap-2 text-studenthub-text-secondary">
                                {getMaterialIcon(material.type)}
                                <span className="capitalize">{material.type} Document • {material.size}</span>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-studenthub-text-secondary text-sm">Subject</p>
                                <p className="text-studenthub-text-primary">{material.subject}</p>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-studenthub-text-secondary text-sm">Instructor</p>
                                <p className="text-studenthub-text-primary">{material.instructor || 'Not specified'}</p>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-studenthub-text-secondary text-sm">Description</p>
                                <p className="text-studenthub-text-primary">{material.description || 'No description available'}</p>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-studenthub-text-secondary text-sm">Uploaded</p>
                                <p className="text-studenthub-text-primary">{material.uploadedAt}</p>
                              </div>
                              
                              <Button className="w-full mt-4">
                                <Download size={16} className="mr-2" />
                                Download
                              </Button>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      </TableCell>
                      <TableCell className="text-studenthub-text-secondary">{material.subject}</TableCell>
                      <TableCell className="text-studenthub-text-secondary">{material.uploadedAt}</TableCell>
                      <TableCell className="text-studenthub-text-secondary">{material.size}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Download size={18} />
                        </Button>
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

export default StudyMaterial;
