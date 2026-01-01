import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus, Search, Edit2, Trash2, CheckSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Input from '@/components/ui/FormInput';
import Button from '@/components/ui/FormButton';
import Select from '@/components/ui/FormSelect';
import Textarea from '@/components/ui/FormTextarea';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';
import TableSkeleton from '@/components/ui/TableSkeleton';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const Tasks: React.FC = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<Task['status']>('Pending');
  const [formErrors, setFormErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setTasks([
        { id: 1, title: 'Design landing page', description: 'Create a modern landing page design', status: 'In Progress' },
        { id: 2, title: 'Set up API endpoints', description: 'Build REST API for user authentication', status: 'Pending' },
        { id: 3, title: 'Write documentation', description: 'Document the API endpoints and usage', status: 'Completed' },
        { id: 4, title: 'Code review', description: 'Review pull requests from team members', status: 'In Progress' },
        { id: 5, title: 'Database optimization', description: 'Optimize database queries for better performance', status: 'Pending' },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCreateModal = () => {
    setEditingTask(null);
    setFormTitle('');
    setFormDescription('');
    setFormStatus('Pending');
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormDescription(task.description);
    setFormStatus(task.status);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const validateForm = (): boolean => {
    const errors: { title?: string } = {};
    
    if (!formTitle.trim()) {
      errors.title = 'Title is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, title: formTitle, description: formDescription, status: formStatus }
          : task
      ));
      toast({
        title: 'Task updated',
        description: 'Your task has been updated successfully.',
      });
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now(),
        title: formTitle,
        description: formDescription,
        status: formStatus,
      };
      setTasks([newTask, ...tasks]);
      toast({
        title: 'Task created',
        description: 'Your new task has been created successfully.',
      });
    }

    setIsSubmitting(false);
    closeModal();
  };

  const handleDelete = async (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: 'Task deleted',
      description: 'The task has been removed.',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'status-badge status-pending';
      case 'In Progress':
        return 'status-badge status-in-progress';
      case 'Completed':
        return 'status-badge status-completed';
      default:
        return 'status-badge';
    }
  };

  const statusOptions = [
    { value: 'All', label: 'All Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  const taskStatusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and track your tasks efficiently.
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          leftIcon={<Plus className="w-4 h-4" />}
          className="self-start sm:self-auto"
        >
          New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="dashboard-card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
              placeholder="Search tasks..."
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            className="w-full sm:w-48"
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="dashboard-card">
        {isLoading ? (
          <TableSkeleton rows={5} columns={4} />
        ) : filteredTasks.length === 0 ? (
          tasks.length === 0 ? (
            <EmptyState
              icon={CheckSquare}
              title="No tasks yet"
              description="Create your first task to start managing your work efficiently."
              action={{
                label: 'Create Task',
                onClick: openCreateModal,
              }}
            />
          ) : (
            <EmptyState
              icon={Search}
              title="No results found"
              description="Try adjusting your search or filter to find what you're looking for."
            />
          )
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Task</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium text-foreground">{task.title}</p>
                      <p className="text-sm text-muted-foreground md:hidden mt-1">{task.description}</p>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={getStatusBadge(task.status)}>{task.status}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(task)}
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingTask ? 'Edit Task' : 'Create Task'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="taskTitle"
            label="Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Enter task title"
            error={formErrors.title}
            disabled={isSubmitting}
          />

          <Textarea
            id="taskDescription"
            label="Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder="Enter task description"
            disabled={isSubmitting}
          />

          <Select
            id="taskStatus"
            label="Status"
            value={formStatus}
            onChange={(e) => setFormStatus(e.target.value as Task['status'])}
            options={taskStatusOptions}
            disabled={isSubmitting}
          />

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              isLoading={isSubmitting}
              className="flex-1"
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default Tasks;
