'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, LayoutGrid, ListTodo, BarChart3, Clock, Plus, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { TaskDashboard } from '@/components/task-manager/task-dashboard';
import { TaskBoard } from '@/components/task-manager/task-board';
import { TaskList } from '@/components/task-manager/task-list';
import { PomodoroTimer } from '@/components/task-manager/pomodoro-timer';
import { TaskForm } from '@/components/task-manager/task-form';
import type { Task, TaskStatus } from '@/components/task-manager/types';

// Gorgeous pre-populated mock tasks for immediate high-quality visual showcasing
const MOCK_TASKS: Task[] = [
  {
    id: 'mock-1',
    title: 'Implement DB Indexing & Query Optimizations',
    description: 'Optimize PostgreSQL queries by introducing proper indexes on foreign keys and compound fields for the student analytics table.',
    status: 'todo',
    priority: 'high',
    category: 'Database',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days later
    subtasks: [
      { id: 'sub-1', title: 'Audit query execution plan in console', completed: true },
      { id: 'sub-2', title: 'Add compound indexes to user_activity', completed: false },
      { id: 'sub-3', title: 'Measure query latency differences', completed: false }
    ],
    timeSpent: 1200, // 20 mins
    estimatedPomodoros: 3,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-2',
    title: 'Refactor MERN Context and State Architecture',
    description: 'Clean up nested state hooks. Relocate API requests to centralized Redux/Zustand slices or custom React Hooks for better dashboard response times.',
    status: 'in_progress',
    priority: 'medium',
    category: 'Coding',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4 days later
    subtasks: [
      { id: 'sub-4', title: 'Map existing state relationships', completed: true },
      { id: 'sub-5', title: 'Establish global state provider', completed: true },
      { id: 'sub-6', title: 'Migrate active dashboard panels to global hook', completed: false }
    ],
    timeSpent: 3600, // 1 hour
    estimatedPomodoros: 4,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-3',
    title: 'Solve LeetCode Tree Traversals & DFS Patterns',
    description: 'Complete 5 medium/hard problems covering pre-order, post-order, and level-order traversal optimization techniques.',
    status: 'completed',
    priority: 'low',
    category: 'Math',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // yesterday
    subtasks: [
      { id: 'sub-7', title: 'Solve LC 102: Level Order Traversal', completed: true },
      { id: 'sub-8', title: 'Solve LC 98: Validate Binary Search Tree', completed: true }
    ],
    timeSpent: 2700, // 45 mins
    estimatedPomodoros: 2,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mock-4',
    title: 'Fine-tune TensorFlow Classification Model',
    description: 'Adjust hidden dense node counts, learning rates, and regularizers to cross 92% validation accuracy on the student activity set.',
    status: 'in_progress',
    priority: 'high',
    category: 'ML / AI',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 day later
    subtasks: [
      { id: 'sub-9', title: 'Log accuracy changes in tensorboard', completed: false }
    ],
    timeSpent: 4800, // 80 mins
    estimatedPomodoros: 5,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export default function TaskManagerPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'board' | 'list' | 'timer'>('board');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [defaultStatusForNew, setDefaultStatusForNew] = useState<TaskStatus>('todo');

  const { toast } = useToast();

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('smart_task_manager_tasks');
      if (stored) {
        setTasks(JSON.parse(stored));
      } else {
        // Hydrate with gorgeous mock data immediately so it is instantly visually stunning
        setTasks(MOCK_TASKS);
        localStorage.setItem('smart_task_manager_tasks', JSON.stringify(MOCK_TASKS));
      }
    } catch (e) {
      console.error('Error reading localStorage tasks', e);
    }
  }, []);

  const saveTasksToLocalStorage = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    try {
      localStorage.setItem('smart_task_manager_tasks', JSON.stringify(updatedTasks));
    } catch (e) {
      console.error('Error writing localStorage tasks', e);
    }
  };

  const handleAddTask = (status?: TaskStatus) => {
    setDefaultStatusForNew(status || 'todo');
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    const updated = tasks.filter((t) => t.id !== id);
    saveTasksToLocalStorage(updated);
    toast({
      title: '🗑️ Task Deleted',
      description: `Task "${taskToDelete?.title}" has been successfully removed.`,
    });
  };

  const handleSaveTask = (savedTask: Task) => {
    let updated: Task[];
    const exists = tasks.some((t) => t.id === savedTask.id);

    if (exists) {
      updated = tasks.map((t) => (t.id === savedTask.id ? savedTask : t));
      toast({
        title: '✏️ Task Updated',
        description: `Task "${savedTask.title}" details were successfully updated.`,
      });
    } else {
      // Overwrite default status if it was set via column trigger
      savedTask.status = defaultStatusForNew;
      updated = [...tasks, savedTask];
      toast({
        title: '🚀 Task Created',
        description: `Task "${savedTask.title}" has been added to your board.`,
      });
    }

    saveTasksToLocalStorage(updated);
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  const handleUpdateStatus = (id: string, status: TaskStatus) => {
    const task = tasks.find(t => t.id === id);
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, status } : t
    );
    saveTasksToLocalStorage(updated);
    
    const statusLabel = status === 'completed' ? 'Finished' : status === 'in_progress' ? 'Active' : 'To Do';
    toast({
      title: '🔄 Status Changed',
      description: `"${task?.title}" shifted to ${statusLabel}.`,
    });
  };

  const handleAccumulateTime = (taskId: string, seconds: number) => {
    const updated = tasks.map((t) =>
      t.id === taskId ? { ...t, timeSpent: (t.timeSpent || 0) + seconds } : t
    );
    saveTasksToLocalStorage(updated);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#09070f]">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/4 h-96 w-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Dynamic Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#09070f]/75 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 shadow-md">
              <Sparkles className="h-3 w-3" />
              Live Demo Show
            </span>
          </div>
        </div>
      </header>

      {/* Main Container Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl z-10 relative">
        
        {/* Title Hub */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="space-y-1.5">
            <h1 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-foreground flex items-center gap-2.5">
              <span>Smart Task Manager</span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              An elegant, student-centric academic planner designed to track workloads, review productivity analytics, and maintain deep focus using a built-in Pomodoro timer.
            </p>
          </div>

          <Button
            onClick={() => handleAddTask()}
            className="bg-primary hover:bg-primary/95 text-foreground font-bold shadow-lg shadow-primary/25 rounded-xl px-5 h-11 self-start sm:self-center flex items-center gap-2"
          >
            <Plus className="h-5 w-5" /> Add New Task
          </Button>
        </div>

        {/* Tab Selection Navigation Bar */}
        <div className="flex border-b border-white/[0.06] mb-8 overflow-x-auto scrollbar-none pb-0.5 gap-2">
          {[
            { id: 'board', label: 'Kanban Board', icon: LayoutGrid },
            { id: 'list', label: 'List View', icon: ListTodo },
            { id: 'dashboard', label: 'Analytics', icon: BarChart3 },
            { id: 'timer', label: 'Focus Timer', icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                  active
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Panels */}
        <div className="min-h-[400px]">
          {activeTab === 'dashboard' && <TaskDashboard tasks={tasks} />}
          {activeTab === 'board' && (
            <TaskBoard
              tasks={tasks}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
          {activeTab === 'list' && (
            <TaskList
              tasks={tasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
          {activeTab === 'timer' && (
            <PomodoroTimer tasks={tasks} onAccumulateTime={handleAccumulateTime} />
          )}
        </div>
      </main>

      {/* Task Creation & Modification Form Dialog Overlay */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        {isFormOpen && (
          <TaskForm
            taskToEdit={taskToEdit}
            onSave={handleSaveTask}
            onClose={() => {
              setIsFormOpen(false);
              setTaskToEdit(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}
