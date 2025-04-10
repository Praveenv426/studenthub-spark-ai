
import React, { useState } from 'react';
import { PlusCircle, CalendarCheck, CalendarX } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

interface LeaveRequest {
  id: string;
  reason: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  description?: string;
}

const formSchema = z.object({
  reason: z.string().min(3, {
    message: "Reason must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
  endDate: z.string().min(1, {
    message: "End date is required.",
  }),
});

const LeaveRequest: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      reason: "Medical Leave",
      startDate: "Apr 15, 2025",
      endDate: "Apr 17, 2025",
      status: "pending",
      appliedOn: "Apr 12, 2025",
      description: "Doctor's appointment and follow-up visits"
    },
    {
      id: "2",
      reason: "Family Function",
      startDate: "Mar 22, 2025",
      endDate: "Mar 24, 2025",
      status: "approved",
      appliedOn: "Mar 10, 2025",
      description: "Sister's wedding"
    },
    {
      id: "3",
      reason: "Personal Leave",
      startDate: "Feb 08, 2025",
      endDate: "Feb 08, 2025",
      status: "rejected",
      appliedOn: "Feb 05, 2025",
      description: "Important personal matter to attend to"
    },
  ]);

  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newRequest: LeaveRequest = {
      id: (leaveRequests.length + 1).toString(),
      reason: values.reason,
      description: values.description,
      startDate: formatDate(new Date(values.startDate)),
      endDate: formatDate(new Date(values.endDate)),
      status: 'pending',
      appliedOn: formatDate(new Date()),
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setOpen(false);
    form.reset();
    toast({
      title: "Leave request submitted",
      description: "Your leave request has been sent for approval.",
    });
  };

  const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />;
      case 'approved':
        return <CalendarCheck className="w-4 h-4 text-studenthub-success mr-2" />;
      case 'rejected':
        return <CalendarX className="w-4 h-4 text-studenthub-error mr-2" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Leave Requests</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-studenthub-primary hover:bg-studenthub-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Apply for Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-studenthub-card border-gray-700 text-white sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
                <DialogDescription className="text-studenthub-text-secondary">
                  Fill out the form below to submit a leave request.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Brief reason for leave"
                            className="bg-studenthub-background border-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="bg-studenthub-background border-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              className="bg-studenthub-background border-gray-700"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Provide more details about your leave request"
                            className="min-h-[100px] bg-studenthub-background border-gray-700"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-studenthub-text-secondary">
                          Please provide sufficient details to help in the approval process.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" className="bg-studenthub-primary hover:bg-studenthub-primary/90">
                      Submit Request
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-4">
          {leaveRequests.map((request) => (
            <Card key={request.id} className="p-5 bg-studenthub-card border-gray-700 shadow-md hover:shadow-lg transition-all">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{request.reason}</h3>
                    <p className="text-sm text-studenthub-text-secondary">
                      {request.startDate === request.endDate 
                        ? `Date: ${request.startDate}` 
                        : `From: ${request.startDate} To: ${request.endDate}`}
                    </p>
                  </div>
                  <div className={`flex items-center px-3 py-1 rounded-full text-sm 
                    ${request.status === 'approved' ? 'bg-studenthub-success/20 text-studenthub-success' : 
                      request.status === 'rejected' ? 'bg-studenthub-error/20 text-studenthub-error' : 
                      'bg-yellow-500/20 text-yellow-500'}`}>
                    {getStatusIcon(request.status)}
                    <span className="capitalize">{request.status}</span>
                  </div>
                </div>
                
                {request.description && (
                  <p className="text-studenthub-text-secondary text-sm">{request.description}</p>
                )}
                
                <div className="flex justify-between items-center pt-2 text-xs text-studenthub-text-secondary">
                  <span>Applied on: {request.appliedOn}</span>
                  <span>ID: #{request.id}</span>
                </div>
              </div>
            </Card>
          ))}
          {leaveRequests.length === 0 && (
            <div className="text-center p-10 text-studenthub-text-secondary">
              <p>No leave requests found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LeaveRequest;
