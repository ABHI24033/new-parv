"use client";

import React, { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  useTasks,
  useCreateTask,
  useUpdateTask,
  useAddTaskRemark,
  useDeleteTask,
  useUsersByRole
} from '@/hooks/useTask';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, RefreshCw, ClipboardList, List, SlidersHorizontal, MoreHorizontal, Edit, Trash } from 'lucide-react';

const STATUS_STYLES = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800'
};

const PRIORITY_STYLES = {
  Low: 'bg-slate-100 text-slate-700',
  Medium: 'bg-orange-100 text-orange-800',
  High: 'bg-rose-100 text-rose-800'
};

const ROLE_OPTIONS = ['RM', 'Telecaller', 'Field_staff'];

export default function TaskManagement() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'Admin';
  const [viewMode, setViewMode] = useState('table');

  const [form, setForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    role: 'RM',
    priority: 'Medium',
    dueDate: '',
    googleSheetLink: ''
  });

  const [remarkMap, setRemarkMap] = useState({});
  const [dialogOpen, setDialogOpen] = useState({});
  const [selectedTaskForRemarks, setSelectedTaskForRemarks] = useState(null);

  const { data, isLoading, isFetching, refetch } = useTasks();
  const tasks = data?.data || [];

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const addRemark = useAddTaskRemark();
  const deleteTask = useDeleteTask();

  const { data: usersData } = useUsersByRole(form.role);
  const users = usersData?.data || [];

  const remainingTasks = useMemo(() => tasks, [tasks]);

  const handleFormChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submitTask = async (event) => {
    event.preventDefault();
    if (!form.title || !form.assignedTo || !form.role) {
      return;
    }

    createTask.mutate({ ...form, dueDate: form.dueDate || undefined });
    setForm({
      title: '',
      description: '',
      assignedTo: '',
      role: 'RM',
      priority: 'Medium',
      dueDate: '',
      googleSheetLink: ''
    });
  };

  const updateStatus = async (taskId, status) => {
    updateTask.mutate({ taskId, data: { status } });
  };

  const addNote = async (taskId) => {
    const text = remarkMap[taskId]?.trim();
    if (!text) return;
    addRemark.mutate({ taskId, text });
    setRemarkMap((prev) => ({ ...prev, [taskId]: '' }));
  };

  const onDelete = (taskId) => {
    deleteTask.mutate(taskId);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Management</h1>
          <p className="text-sm text-slate-500">Centralized tasks for RM, Telecaller, and Field Staff</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
          <Button size="sm" variant="outline" onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}>
            {viewMode === 'table' ? <List className="w-4 h-4 mr-1" /> : <SlidersHorizontal className="w-4 h-4 mr-1" />}
            {viewMode === 'table' ? 'Card View' : 'Table View'}
          </Button>
        </div>
      </div>

      {isAdmin && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Create & Assign Task</CardTitle>
            <CardDescription>Tasks appear for selected role and user.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              placeholder="Task Title"
              value={form.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
            />
            <Select value={form.assignedTo} onValueChange={(value) => handleFormChange('assignedTo', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.username} value={user.username}>
                    {user.username} - {user.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              className="col-span-1 md:col-span-2"
              placeholder="Description"
              value={form.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
            />
            <Select value={form.role} onValueChange={(value) => {
              handleFormChange('role', value);
              handleFormChange('assignedTo', ''); // Reset assignedTo when role changes
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Assign Role" />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={form.priority} onValueChange={(value) => handleFormChange('priority', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                {['Low', 'Medium', 'High'].map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={form.dueDate}
              onChange={(e) => handleFormChange('dueDate', e.target.value)}
            />
            <Input
              placeholder="Google Sheet / Excel Link"
              value={form.googleSheetLink}
              onChange={(e) => handleFormChange('googleSheetLink', e.target.value)}
            />
            <Button className="col-span-1 md:col-span-2" onClick={submitTask}>
              <Plus className="w-4 h-4 mr-1" /> Create Task
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge className="bg-slate-100 text-slate-700">{tasks.length} task(s)</Badge>
        {isFetching && <Badge className="bg-blue-100 text-blue-700">Syncing...</Badge>}
      </div>

      {isLoading ? (
        <div className="text-center p-10">Loading tasks...</div>
      ) : viewMode === 'table' ? (
        <div className="grid lg:grid-cols-[1fr_320px] gap-4">
          <Card>
            <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {remainingTasks.map((task) => (
                  <TableRow key={task._id} className="hover:bg-slate-50">
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.role}</TableCell>
                    <TableCell>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${STATUS_STYLES[task.status] || 'bg-slate-100 text-slate-700'}`}>
                        {task.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${PRIORITY_STYLES[task.priority] || 'bg-slate-100 text-slate-700'}`}>
                        {task.priority}
                      </span>
                    </TableCell>
                    <TableCell>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</TableCell>
                    <TableCell>
                      {task.googleSheetLink ? (
                        <a href={task.googleSheetLink} target="_blank" rel="noreferrer" className="text-blue-600 underline">Open</a>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className="space-y-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Edit className="w-4 h-4 mr-2" />
                              Change Status
                            </DropdownMenuSubTrigger>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem onClick={() => updateStatus(task._id, 'Pending')}>Pending</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateStatus(task._id, 'In Progress')}>In Progress</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateStatus(task._id, 'Completed')}>Completed</DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuSub>
                          <Dialog open={dialogOpen[task._id]} onOpenChange={(open) => setDialogOpen((prev) => ({ ...prev, [task._id]: open }))}>
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Edit className="w-4 h-4 mr-2" />
                                Add Remark
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Remark</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-2">
                                <Input
                                  value={remarkMap[task._id] || ''}
                                  onChange={(e) => setRemarkMap((prev) => ({ ...prev, [task._id]: e.target.value }))}
                                  placeholder="Add remark"
                                />
                                <Button onClick={() => { addNote(task._id); setDialogOpen((prev) => ({ ...prev, [task._id]: false })); }}>Add</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <DropdownMenuItem onClick={() => setSelectedTaskForRemarks(task)}>
                            <ClipboardList className="w-4 h-4 mr-2" />
                            View Remarks
                          </DropdownMenuItem>
                          {isAdmin && <DropdownMenuItem onClick={() => onDelete(task._id)}>
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>}
                        </DropdownMenuContent>
                      </DropdownMenu>


                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Remarks</CardTitle>
            <CardDescription>
              {selectedTaskForRemarks ? `Showing remarks for ${selectedTaskForRemarks.title}` : 'Use Actions > View Remarks to select a task.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedTaskForRemarks ? (
              selectedTaskForRemarks.remarks?.length ? (
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  {selectedTaskForRemarks.remarks.map((remark, index) => (
                    <li key={`${selectedTaskForRemarks._id}-${index}`}>
                      <div className="font-medium text-slate-700">
                        {remark.createdBy?.full_name || remark.createdBy?.username || 'User'} @ {new Date(remark.createdAt).toLocaleString()}
                      </div>
                      <div className="text-slate-600">{remark.text}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">No remarks yet for this task.</p>
              )
            ) : (
              <p className="text-sm text-slate-500">No task selected.</p>
            )}
          </CardContent>
        </Card>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {remainingTasks.map((task) => (
            <Card key={task._id} className="shadow-sm border">
              <CardHeader>
                <CardTitle className="text-base">{task.title}</CardTitle>
                <CardDescription>{task.description || 'No description'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={STATUS_STYLES[task.status]}>{task.status}</Badge>
                  <Badge className={PRIORITY_STYLES[task.priority]}>{task.priority}</Badge>
                </div>
                <p><strong>Role:</strong> {task.role}</p>
                <p><strong>Assignee:</strong> {task.assignedTo?.full_name || task.assignedTo?.username || '-'}</p>
                <p><strong>Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</p>
                <p className="text-sm text-blue-600"><a href={task.googleSheetLink} target="_blank" rel="noreferrer">Open Sheet</a></p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
