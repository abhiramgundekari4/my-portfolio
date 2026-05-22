'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Edit2, Trash2, CheckCircle2, Circle, AlertCircle, Clock } from 'lucide-react';
import type { Task, TaskPriority, TaskStatus } from './types';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

export function TaskList({
  tasks,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
}: TaskListProps) {
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-rose-400 border-rose-500/25 bg-rose-500/5';
      case 'medium':
        return 'text-amber-400 border-amber-500/25 bg-amber-500/5';
      default:
        return 'text-cyan-400 border-cyan-500/25 bg-cyan-500/5';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-accent/10 border-accent/25 text-accent';
      case 'in_progress':
        return 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400';
      default:
        return 'bg-indigo-500/10 border-indigo-500/25 text-indigo-400';
    }
  };

  // Get all unique categories for the filter
  const categories = Array.from(new Set(tasks.map((t) => t.category || 'Other'))).filter(Boolean);

  const isOverdue = (task: Task) => {
    if (task.status === 'completed') return false;
    if (!task.dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate < today;
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {/* Filtering Actions Bar */}
      <div className="grid gap-3 sm:grid-cols-12 items-center bg-white/[0.02] border border-white/[0.04] p-3.5 rounded-xl backdrop-blur-sm">
        {/* Search */}
        <div className="relative sm:col-span-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white/[0.03] border-white/[0.08]"
          />
        </div>

        {/* Priority Filter */}
        <div className="sm:col-span-2.5">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="w-full h-10 px-3 rounded-md bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 text-sm text-foreground outline-none cursor-pointer"
          >
            <option value="all" className="bg-card text-foreground">All Priorities</option>
            <option value="high" className="bg-card text-rose-400">High</option>
            <option value="medium" className="bg-card text-amber-400">Medium</option>
            <option value="low" className="bg-card text-cyan-400">Low</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="sm:col-span-2.5">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full h-10 px-3 rounded-md bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 text-sm text-foreground outline-none cursor-pointer"
          >
            <option value="all" className="bg-card text-foreground">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-card text-foreground">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full h-10 px-3 rounded-md bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 text-sm text-foreground outline-none cursor-pointer"
          >
            <option value="all" className="bg-card text-foreground">All Statuses</option>
            <option value="todo" className="bg-card text-indigo-400">To Do</option>
            <option value="in_progress" className="bg-card text-cyan-400">In Progress</option>
            <option value="completed" className="bg-card text-accent">Completed</option>
          </select>
        </div>
      </div>

      {/* Task Count Summary */}
      <div className="text-xs text-muted-foreground font-bold flex justify-between items-center px-1">
        <span>Showing {filteredTasks.length} of {tasks.length} tasks</span>
      </div>

      {/* Responsive Table / Cards */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const overdue = isOverdue(task);
            const completedSubs = task.subtasks.filter(s => s.completed).length;
            const totalSubs = task.subtasks.length;

            return (
              <div
                key={task.id}
                className="glass-card border-white/[0.05] hover:border-white/[0.1] p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
              >
                {/* Checkbox Trigger & Info Group */}
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => onUpdateStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')}
                    className="mt-1 shrink-0 h-5 w-5 rounded-full border border-white/20 flex items-center justify-center text-accent hover:border-accent transition-colors"
                  >
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="h-4.5 w-4.5 fill-accent stroke-background" />
                    ) : (
                      <Circle className="h-4.5 w-4.5 text-muted-foreground hover:text-accent" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4
                        className={`font-headline font-bold text-sm leading-snug transition-all ${
                          task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {task.title}
                      </h4>
                      <Badge
                        variant="outline"
                        className={`font-bold text-[9px] uppercase tracking-wide rounded px-1.5 py-0 ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`font-medium text-[9px] uppercase tracking-wide rounded px-1.5 py-0 ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status === 'in_progress' ? 'Active' : task.status === 'todo' ? 'To Do' : 'Done'}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {/* Tags and stats */}
                    <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground flex-wrap pt-1">
                      <span className="flex items-center gap-1">🏷️ {task.category}</span>
                      {totalSubs > 0 && (
                        <span>📋 Checklist: {completedSubs}/{totalSubs} completed</span>
                      )}
                      {task.timeSpent > 0 && (
                        <span className="flex items-center gap-1 text-accent">
                          <Clock className="h-3 w-3" /> {Math.round(task.timeSpent / 60)}m spent
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date & Actions Block */}
                <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto shrink-0 border-t md:border-t-0 border-white/[0.04] pt-3 md:pt-0">
                  {/* Due Date Indicator */}
                  {task.dueDate && (
                    <div className={`text-[11px] font-bold flex items-center gap-1.5 ${
                      overdue ? 'text-rose-400' : 'text-muted-foreground'
                    }`}>
                      <AlertCircle className={`h-3.5 w-3.5 ${overdue ? 'animate-pulse' : 'opacity-60'}`} />
                      <span className="flex flex-col">
                        <span className="text-[8px] uppercase tracking-wider text-muted-foreground/60 leading-none">Due</span>
                        <span className="leading-none mt-0.5">{formatDate(task.dueDate)}</span>
                      </span>
                    </div>
                  )}

                  {/* Operational Buttons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditTask(task)}
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDeleteTask(task.id)}
                      className="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-40 rounded-2xl border border-dashed border-white/[0.05] flex flex-col items-center justify-center text-center p-6 bg-white/[0.01]">
            <p className="text-sm text-muted-foreground italic">No matching tasks found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
