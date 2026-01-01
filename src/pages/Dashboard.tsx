import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { CheckSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import TableSkeleton from '@/components/ui/TableSkeleton';
import EmptyState from '@/components/ui/EmptyState';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [recentTasks, setRecentTasks] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setRecentTasks([
        { id: 1, title: 'Design landing page', status: 'In Progress', priority: 'High' },
        { id: 2, title: 'Set up API endpoints', status: 'Pending', priority: 'Medium' },
        { id: 3, title: 'Write documentation', status: 'Completed', priority: 'Low' },
        { id: 4, title: 'Code review', status: 'In Progress', priority: 'High' },
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Total Tasks', value: 12, icon: CheckSquare, color: 'bg-primary/10 text-primary' },
    { label: 'In Progress', value: 5, icon: Clock, color: 'bg-warning/10 text-warning' },
    { label: 'Completed', value: 4, icon: CheckCircle, color: 'bg-success/10 text-success' },
    { label: 'Pending', value: 3, icon: AlertCircle, color: 'bg-accent/10 text-accent' },
  ];

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

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's an overview of your tasks.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="dashboard-card animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Tasks */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Recent Tasks</h2>
          <Link to="/tasks" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>

        {isLoading ? (
          <TableSkeleton rows={4} columns={3} />
        ) : recentTasks.length === 0 ? (
          <EmptyState
            icon={CheckSquare}
            title="No tasks yet"
            description="Create your first task to get started with TaskFlow."
            action={{
              label: 'Create Task',
              onClick: () => window.location.href = '/tasks',
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Task</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Priority</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="py-4 px-4">
                      <p className="font-medium text-foreground">{task.title}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={getStatusBadge(task.status)}>{task.status}</span>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell">
                      <span className="text-sm text-muted-foreground">{task.priority}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
