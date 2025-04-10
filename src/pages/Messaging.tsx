
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Send, User, Users, Bell, MessageSquare } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
  avatar?: string;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface Announcement {
  id: string;
  title: string;
  from: string;
  content: string;
  date: string;
  isImportant: boolean;
}

const Messaging: React.FC = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      lastMessage: "Please submit your assignment by tomorrow.",
      time: "10:45 AM",
      unread: 2,
      isGroup: false,
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      lastMessage: "Yes, the class is rescheduled to 3 PM.",
      time: "Yesterday",
      unread: 0,
      isGroup: false,
    },
    {
      id: "3",
      name: "Mathematics Department",
      lastMessage: "New study material has been uploaded.",
      time: "Apr 12",
      unread: 3,
      isGroup: true,
    },
    {
      id: "4",
      name: "Student Council",
      lastMessage: "Meeting tomorrow at 5 PM in the auditorium.",
      time: "Apr 10",
      unread: 0,
      isGroup: true,
    },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: "1",
      title: "End Semester Examination Schedule",
      from: "Examination Department",
      content: "The end semester examinations will commence from May 10th, 2025. Please check your hall ticket for detailed schedule.",
      date: "Apr 14, 2025",
      isImportant: true,
    },
    {
      id: "2",
      title: "Campus Recruitment Drive",
      from: "Placement Cell",
      content: "ABC Technologies will be conducting a campus recruitment drive on April 25th. All eligible students are requested to register before April 20th.",
      date: "Apr 13, 2025",
      isImportant: false,
    },
    {
      id: "3",
      title: "Library Book Return Notice",
      from: "Library",
      content: "All students are reminded to return the borrowed books before April 30th to avoid late fees.",
      date: "Apr 12, 2025",
      isImportant: false,
    },
  ]);

  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    
    // Mark conversation as read
    setConversations(
      conversations.map(c => 
        c.id === conversation.id ? { ...c, unread: 0 } : c
      )
    );

    // Load dummy messages for this conversation
    const dummyMessages = [
      {
        id: "m1",
        senderId: conversation.id,
        text: "Hello, how can I help you today?",
        time: "10:30 AM",
        isMe: false,
      },
      {
        id: "m2",
        senderId: "me",
        text: "I had a question about the upcoming assignment.",
        time: "10:32 AM",
        isMe: true,
      },
      {
        id: "m3",
        senderId: conversation.id,
        text: "Sure, what would you like to know?",
        time: "10:33 AM",
        isMe: false,
      },
      {
        id: "m4",
        senderId: "me",
        text: "Is there a specific format we need to follow?",
        time: "10:35 AM",
        isMe: true,
      },
      {
        id: "m5",
        senderId: conversation.id,
        text: conversation.lastMessage,
        time: conversation.time,
        isMe: false,
      },
    ];
    setMessages(dummyMessages);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg: Message = {
      id: `m${messages.length + 1}`,
      senderId: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Update last message in conversations list
    setConversations(
      conversations.map(c => 
        c.id === activeConversation.id 
          ? { ...c, lastMessage: newMessage, time: "Just now" } 
          : c
      )
    );

    // Simulate a response after a delay (for demo purposes)
    setTimeout(() => {
      const responseMsg: Message = {
        id: `m${messages.length + 2}`,
        senderId: activeConversation.id,
        text: "Thanks for your message. I'll get back to you shortly.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };
      setMessages(prev => [...prev, responseMsg]);
    }, 2000);
  };

  const filteredConversations = conversations.filter(
    conversation => conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAnnouncementAsRead = (announcement: Announcement) => {
    // In a real app, this would update the server
    toast({
      title: "Marked as read",
      description: `"${announcement.title}" has been marked as read.`,
    });
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-130px)]">
        <h1 className="text-2xl font-bold mb-6">Messages & Announcements</h1>
        
        <Tabs defaultValue="messages" className="h-full">
          <TabsList className="mb-4">
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Messages</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Announcements</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="h-[calc(100%-40px)] space-y-0">
            <div className="flex h-full border border-gray-700 rounded-lg overflow-hidden bg-studenthub-card">
              {/* Conversations List */}
              <div className="w-1/3 border-r border-gray-700 flex flex-col">
                <div className="p-3 border-b border-gray-700">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-studenthub-text-secondary" />
                    <Input 
                      placeholder="Search conversations..." 
                      className="pl-9 bg-studenthub-background border-gray-700"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map(conversation => (
                      <div
                        key={conversation.id}
                        className={`p-3 border-b border-gray-700 hover:bg-studenthub-background/50 cursor-pointer ${
                          activeConversation?.id === conversation.id ? 'bg-studenthub-background' : ''
                        }`}
                        onClick={() => handleSelectConversation(conversation)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-studenthub-primary/20 flex items-center justify-center text-studenthub-primary">
                            {conversation.isGroup ? <Users size={18} /> : <User size={18} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium truncate">{conversation.name}</h3>
                              <span className="text-xs text-studenthub-text-secondary">{conversation.time}</span>
                            </div>
                            <p className="text-sm text-studenthub-text-secondary truncate">{conversation.lastMessage}</p>
                          </div>
                          {conversation.unread > 0 && (
                            <div className="ml-2 w-5 h-5 rounded-full bg-studenthub-primary flex items-center justify-center text-xs text-white">
                              {conversation.unread}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-studenthub-text-secondary">
                      No conversations found.
                    </div>
                  )}
                </div>
              </div>
              
              {/* Message Content */}
              <div className="flex-1 flex flex-col">
                {activeConversation ? (
                  <>
                    <div className="p-3 border-b border-gray-700 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-studenthub-primary/20 flex items-center justify-center text-studenthub-primary">
                        {activeConversation.isGroup ? <Users size={16} /> : <User size={16} />}
                      </div>
                      <div>
                        <h3 className="font-medium">{activeConversation.name}</h3>
                        <p className="text-xs text-studenthub-text-secondary">
                          {activeConversation.isGroup ? 'Group conversation' : 'Direct message'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex-1 p-4 overflow-y-auto">
                      {messages.map(message => (
                        <div 
                          key={message.id} 
                          className={`mb-4 flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.isMe 
                                ? 'bg-studenthub-primary text-white' 
                                : 'bg-studenthub-background'
                            }`}
                          >
                            <p>{message.text}</p>
                            <div className={`text-xs mt-1 ${message.isMe ? 'text-white/70' : 'text-studenthub-text-secondary'}`}>
                              {message.time}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-3 border-t border-gray-700 flex gap-2">
                      <Input 
                        placeholder="Type a message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="bg-studenthub-background border-gray-700"
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        className="bg-studenthub-primary hover:bg-studenthub-primary/90"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-studenthub-text-secondary">
                    <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">Select a conversation</h3>
                    <p className="text-sm">Choose a contact from the left to start messaging</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="announcements" className="space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-studenthub-text-secondary" />
              <Input 
                placeholder="Search announcements..." 
                className="pl-9 bg-studenthub-background border-gray-700"
              />
            </div>
            
            {announcements.map(announcement => (
              <Card key={announcement.id} className="p-5 bg-studenthub-card border-gray-700 shadow-md">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{announcement.title}</h3>
                        {announcement.isImportant && (
                          <span className="bg-studenthub-error/20 text-studenthub-error text-xs px-2 py-0.5 rounded">
                            Important
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-studenthub-text-secondary">From: {announcement.from}</p>
                    </div>
                    <span className="text-xs text-studenthub-text-secondary">{announcement.date}</span>
                  </div>
                  
                  <p className="text-studenthub-text-secondary">{announcement.content}</p>
                  
                  <div className="pt-2 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs border-gray-700 hover:bg-studenthub-background"
                      onClick={() => markAnnouncementAsRead(announcement)}
                    >
                      Mark as Read
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            {announcements.length === 0 && (
              <div className="text-center p-10 text-studenthub-text-secondary">
                <p>No announcements found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Messaging;
