'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Edit2, Play, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import type { Task, TaskStatus } from './types';

interface TaskBoardProps {
  tasks: Task[];
  onAddTask: (status?: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

export function TaskBoard({
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
}: TaskBoardProps) {
  const columns: { id: TaskStatus; title: string; color: string; bg: string; border: string }[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/5',
      border: 'border-indigo-500/10',
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/5',
      border: 'border-cyan-500/10',
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'text-accent',
      bg: 'bg-accent/5',
      border: 'border-accent/10',
    },
  ];

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

  const getSubtasksStatus = (task: Task) => {
    if (!task.subtasks || task.subtasks.length === 0) return null;
    const completed = task.subtasks.filter((s) => s.completed).length;
    const total = task.subtasks.length;
    const percent = Math.round((completed / total) * 100);
    return { completed, total, percent };
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.id);

        return (
          <div
            key={col.id}
            className={`rounded-2xl border ${col.border} ${col.bg} p-4 flex flex-col min-h-[500px] backdrop-blur-sm`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] mb-4">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${
                  col.id === 'todo' ? 'bg-indigo-400' : col.id === 'in_progress' ? 'bg-cyan-400' : 'bg-accent'
                }`} />
                <h3 className={`font-headline font-bold text-sm tracking-wide ${col.color}`}>
                  {col.title}
                </h3>
                <span className="text-[10px] bg-white/[0.04] border border-white/[0.08] text-muted-foreground px-2 py-0.5 rounded-full font-bold">
                  {colTasks.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddTask(col.id)}
                className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Column Cards */}
            <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[600px] pr-1.5 scrollbar-thin">
              {colTasks.length > 0 ? (
                colTasks.map((task) => {
                  const subInfo = getSubtasksStatus(task);
                  return (
                    <Card
                      key={task.id}
                      className="glass-card border-white/[0.05] p-4 transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-0.5 shadow-lg group relative overflow-hidden"
                    >
                      {/* Interactive edge glow */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all ${
                        task.status === 'completed'
                          ? 'bg-accent'
                          : task.status === 'in_progress'
                          ? 'bg-cyan-400'
                          : 'bg-indigo-500'
                      }`} />

                      <div className="space-y-3">
                        {/* Header: Title and Options */}
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-headline font-bold text-sm text-foreground line-clamp-1 leading-snug group-hover:text-accent transition-colors">
                            {task.title}
                          </h4>
                          <div className="flex gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEditTask(task)}
                              className="h-6 w-6 rounded text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDeleteTask(task.id)}
                              className="h-6 w-6 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Description */}
                        {task.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>
                        )}

                        {/* Subtasks checklist Progress */}
                        {subInfo && (
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                              <span>Checklist</span>
                              <span>{subInfo.completed}/{subInfo.total} ({subInfo.percent}%)</span>
                            </div>
                            <div className="w-full bg-white/[0.05] h-1 rounded-full overflow-hidden">
                              <div
                                className="bg-accent h-full rounded-full transition-all duration-500"
                                style={{ width: `${subInfo.percent}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Category & Priority Badge Grid */}
                        <div className="flex flex-wrap items-center gap-2 pt-1.5">
                          <Badge
                            variant="outline"
                            className="bg-white/[0.02] border-white/[0.06] text-muted-foreground font-medium text-[10px] rounded px-1.5 py-0"
                          >
                            {task.category}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`font-semibold text-[9px] uppercase tracking-wide rounded px-1.5 py-0 ${getPriorityColor(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </Badge>
                          {task.timeSpent > 0 && (
                            <span className="text-[10px] text-muted-foreground font-bold ml-auto shrink-0 flex items-center gap-1">
                              ⏱️ {Math.round(task.timeSpent / 60)}m
                            </span>
                          )}
                        </div>

                        {/* Column Quick Navigation Trigger Buttons for neat interactions */}
                        <div className="flex justify-end gap-1.5 pt-2 border-t border-white/[0.04]">
                          {col.id === 'todo' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateStatus(task.id, 'in_progress')}
                              className="h-6.5 text-[9px] uppercase tracking-wider text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 font-bold w-full flex items-center justify-center gap-1"
                            >
                              <Play className="h-3 w-3" /> Start Task
                            </Button>
                          )}
                          {col.id === 'in_progress' && (
                            <div className="flex gap-1 w-full">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onUpdateStatus(task.id, 'todo')}
                                className="h-6.5 text-[9px] uppercase tracking-wider text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 font-bold flex-1 flex items-center justify-center gap-1"
                              >
                                <ChevronLeft className="h-3 w-3" /> Stop
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onUpdateStatus(task.id, 'completed')}
                                className="h-6.5 text-[9px] uppercase tracking-wider text-accent hover:text-accent/90 hover:bg-accent/10 font-bold flex-1 flex items-center justify-center gap-1"
                              >
                                <CheckCircle2 className="h-3 w-3" /> Finish
                              </Button>
                            </div>
                          )}
                          {col.id === 'completed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateStatus(task.id, 'in_progress')}
                              className="h-6.5 text-[9px] uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-white/[0.04] font-bold w-full flex items-center justify-center gap-1"
                            >
                              <RotateCcw className="h-3 w-3" /> Re-open Task
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <div className="h-32 rounded-xl border border-dashed border-white/[0.04] flex flex-col items-center justify-center text-center p-4">
                  <p className="text-xs text-muted-foreground italic">No tasks here</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
