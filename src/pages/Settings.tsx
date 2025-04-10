
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Key, 
  Camera, 
  X,
  Check
} from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  
  // Profile information
  const [profile, setProfile] = useState({
    fullName: "John Smith",
    studentId: "21CS234",
    email: "john.smith@example.edu",
    phone: "+1 (555) 123-4567",
    department: "Computer Science",
    yearOfStudy: "2nd Year",
    dateOfBirth: "1998-05-12",
    address: "123 Campus Street, College Town, CT 56789",
    about: "Computer Science student with interests in AI and machine learning. Active member of the coding club and robotics team."
  });
  
  // Settings
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    darkMode: true,
    highContrastMode: false,
    allowDataCollection: true,
    twoFactorAuth: false,
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
    setProfileSaved(false);
  };
  
  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings({
      ...settings,
      [setting]: value
    });
    
    toast({
      title: "Setting updated",
      description: `${setting} has been ${value ? 'enabled' : 'disabled'}.`
    });
  };
  
  const saveProfile = () => {
    // In a real app, this would save to a backend
    setProfileSaved(true);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    setPasswordDialogOpen(false);
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Profile & Settings</h1>
          {!profileSaved ? (
            <Button 
              className="bg-studenthub-primary hover:bg-studenthub-primary/90"
              onClick={saveProfile}
            >
              <Check className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          ) : (
            <span className="text-studenthub-success flex items-center">
              <Check className="mr-2 h-4 w-4" />
              Profile Saved
            </span>
          )}
        </div>
        
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile" className="gap-2">
              <User size={16} /> Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <SettingsIcon size={16} /> Preferences
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell size={16} /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield size={16} /> Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-studenthub-primary">
                      <AvatarImage src="https://i.pravatar.cc/128?u=123" />
                      <AvatarFallback className="bg-studenthub-primary text-2xl">
                        JS
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 bg-studenthub-primary text-white p-2 rounded-full hover:bg-studenthub-primary/90">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-lg">{profile.fullName}</h3>
                    <p className="text-sm text-studenthub-text-secondary">{profile.studentId}</p>
                  </div>
                </div>
                
                <div className="flex-1 grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                      className="bg-studenthub-background border-gray-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="bg-studenthub-background border-gray-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className="bg-studenthub-background border-gray-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={profile.department}
                      onChange={handleProfileChange}
                      className="bg-studenthub-background border-gray-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="yearOfStudy">Year of Study</Label>
                    <Input
                      id="yearOfStudy"
                      name="yearOfStudy"
                      value={profile.yearOfStudy}
                      onChange={handleProfileChange}
                      className="bg-studenthub-background border-gray-700 mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={handleProfileChange}
                      className="bg-studenthub-background border-gray-700 mt-1"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                      className="bg-studenthub-background border-gray-700 mt-1"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="about">About</Label>
                    <Textarea
                      id="about"
                      name="about"
                      value={profile.about}
                      onChange={handleProfileChange}
                      className="bg-studenthub-background border-gray-700 mt-1 resize-none h-24"
                      placeholder="Tell us a bit about yourself"
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Academic Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Current CGPA</Label>
                  <div className="bg-studenthub-background border border-gray-700 rounded-md p-2 mt-1">
                    <span className="text-studenthub-primary font-semibold">8.75</span>
                  </div>
                </div>
                <div>
                  <Label>Current Semester</Label>
                  <div className="bg-studenthub-background border border-gray-700 rounded-md p-2 mt-1">
                    <span>4th Semester</span>
                  </div>
                </div>
                <div>
                  <Label>Enrollment Year</Label>
                  <div className="bg-studenthub-background border border-gray-700 rounded-md p-2 mt-1">
                    <span>2023</span>
                  </div>
                </div>
                <div>
                  <Label>Expected Graduation</Label>
                  <div className="bg-studenthub-background border border-gray-700 rounded-md p-2 mt-1">
                    <span>2027</span>
                  </div>
                </div>
                <div>
                  <Label>Faculty Advisor</Label>
                  <div className="bg-studenthub-background border border-gray-700 rounded-md p-2 mt-1">
                    <span>Dr. Robert Williams</span>
                  </div>
                </div>
                <div>
                  <Label>Student Status</Label>
                  <div className="bg-studenthub-background border border-gray-700 rounded-md p-2 mt-1">
                    <span className="text-green-500">Active</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-4">
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Appearance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-studenthub-text-secondary">Use dark theme for the interface</p>
                  </div>
                  <Switch 
                    checked={settings.darkMode} 
                    onCheckedChange={(value) => handleSettingChange('darkMode', value)} 
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">High Contrast</h4>
                    <p className="text-sm text-studenthub-text-secondary">Increase contrast for better readability</p>
                  </div>
                  <Switch 
                    checked={settings.highContrastMode} 
                    onCheckedChange={(value) => handleSettingChange('highContrastMode', value)} 
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Privacy</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data Collection</h4>
                    <p className="text-sm text-studenthub-text-secondary">Allow anonymous usage data collection to improve the service</p>
                  </div>
                  <Switch 
                    checked={settings.allowDataCollection} 
                    onCheckedChange={(value) => handleSettingChange('allowDataCollection', value)} 
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Language & Region</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language"
                    className="w-full mt-1 bg-studenthub-background border border-gray-700 rounded-md p-2 text-studenthub-text-primary"
                    defaultValue="en"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Time Zone</Label>
                  <select 
                    id="timezone"
                    className="w-full mt-1 bg-studenthub-background border border-gray-700 rounded-md p-2 text-studenthub-text-primary"
                    defaultValue="utc-5"
                  >
                    <option value="utc-12">UTC-12:00</option>
                    <option value="utc-11">UTC-11:00</option>
                    <option value="utc-10">UTC-10:00</option>
                    <option value="utc-9">UTC-09:00</option>
                    <option value="utc-8">UTC-08:00</option>
                    <option value="utc-7">UTC-07:00</option>
                    <option value="utc-6">UTC-06:00</option>
                    <option value="utc-5">UTC-05:00 (Eastern Time)</option>
                    <option value="utc-4">UTC-04:00</option>
                    <option value="utc-3">UTC-03:00</option>
                    <option value="utc-2">UTC-02:00</option>
                    <option value="utc-1">UTC-01:00</option>
                    <option value="utc">UTC+00:00</option>
                    <option value="utc+1">UTC+01:00</option>
                    <option value="utc+2">UTC+02:00</option>
                    <option value="utc+3">UTC+03:00</option>
                    <option value="utc+4">UTC+04:00</option>
                    <option value="utc+5">UTC+05:00</option>
                    <option value="utc+6">UTC+06:00</option>
                    <option value="utc+7">UTC+07:00</option>
                    <option value="utc+8">UTC+08:00</option>
                    <option value="utc+9">UTC+09:00</option>
                    <option value="utc+10">UTC+10:00</option>
                    <option value="utc+11">UTC+11:00</option>
                    <option value="utc+12">UTC+12:00</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <select 
                    id="dateFormat"
                    className="w-full mt-1 bg-studenthub-background border border-gray-700 rounded-md p-2 text-studenthub-text-primary"
                    defaultValue="mdy"
                  >
                    <option value="mdy">MM/DD/YYYY (04/15/2025)</option>
                    <option value="dmy">DD/MM/YYYY (15/04/2025)</option>
                    <option value="ymd">YYYY-MM-DD (2025-04-15)</option>
                  </select>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-studenthub-text-secondary">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications} 
                    onCheckedChange={(value) => handleSettingChange('emailNotifications', value)} 
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Push Notifications</h4>
                    <p className="text-sm text-studenthub-text-secondary">Receive push notifications in browser</p>
                  </div>
                  <Switch 
                    checked={settings.pushNotifications} 
                    onCheckedChange={(value) => handleSettingChange('pushNotifications', value)} 
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-studenthub-text-secondary">Receive important notifications via SMS</p>
                  </div>
                  <Switch 
                    checked={settings.smsNotifications} 
                    onCheckedChange={(value) => handleSettingChange('smsNotifications', value)} 
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Notification Categories</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Academic Updates</h4>
                    <p className="text-sm text-studenthub-text-secondary">Grades, assignments, and course materials</p>
                  </div>
                  <Switch 
                    defaultChecked={true}
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Administrative</h4>
                    <p className="text-sm text-studenthub-text-secondary">Fee payments, registration deadlines</p>
                  </div>
                  <Switch 
                    defaultChecked={true}
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Events & Activities</h4>
                    <p className="text-sm text-studenthub-text-secondary">Campus events, clubs, workshops</p>
                  </div>
                  <Switch 
                    defaultChecked={false}
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Announcements</h4>
                    <p className="text-sm text-studenthub-text-secondary">General announcements from institution</p>
                  </div>
                  <Switch 
                    defaultChecked={true}
                    className="data-[state=checked]:bg-studenthub-primary"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Password</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-studenthub-text-secondary">Update your account password</p>
                  </div>
                  <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-studenthub-primary hover:bg-studenthub-primary/90">
                        <Key className="mr-2 h-4 w-4" />
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-studenthub-card border-gray-700 text-white">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                        <DialogDescription className="text-studenthub-text-secondary">
                          Enter your current password and a new password.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={changePassword}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="current">Current Password</Label>
                            <Input
                              id="current"
                              type="password"
                              className="bg-studenthub-background border-gray-700"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new">New Password</Label>
                            <Input
                              id="new"
                              type="password"
                              className="bg-studenthub-background border-gray-700"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm">Confirm New Password</Label>
                            <Input
                              id="confirm"
                              type="password"
                              className="bg-studenthub-background border-gray-700"
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setPasswordDialogOpen(false)}
                            className="border-gray-700 hover:bg-studenthub-background"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-studenthub-primary hover:bg-studenthub-primary/90">
                            <Check className="mr-2 h-4 w-4" />
                            Update Password
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-studenthub-text-secondary">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={settings.twoFactorAuth} 
                      onCheckedChange={(value) => handleSettingChange('twoFactorAuth', value)} 
                      className="data-[state=checked]:bg-studenthub-primary"
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg">
              <h3 className="text-lg font-medium mb-4">Sessions</h3>
              <div className="space-y-4">
                <div className="bg-studenthub-background rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Current Session</h4>
                      <p className="text-sm text-studenthub-text-secondary">Windows 11 • Chrome • NY, US</p>
                    </div>
                    <span className="text-green-500 text-sm">Active now</span>
                  </div>
                </div>
                
                <div className="bg-studenthub-background rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Previous Session</h4>
                      <p className="text-sm text-studenthub-text-secondary">MacOS • Safari • NY, US</p>
                    </div>
                    <span className="text-studenthub-text-secondary text-sm">2 days ago</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="border-gray-700 hover:bg-studenthub-background text-studenthub-error">
                    Sign out of all sessions
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-studenthub-card border-gray-700 shadow-lg border-l-4 border-l-studenthub-error">
              <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Deactivate Account</h4>
                  <p className="text-sm text-studenthub-text-secondary mb-4">
                    Temporarily disable your account. You can reactivate anytime.
                  </p>
                  <Button variant="outline" className="border-studenthub-error text-studenthub-error hover:bg-studenthub-error/10">
                    Deactivate Account
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
