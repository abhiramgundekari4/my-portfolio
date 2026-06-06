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
      color: 'text-gray-700',
      bg: 'bg-gray-100/70',
      border: 'border-gray-200',
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      color: 'text-blue-700',
      bg: 'bg-blue-50/70',
      border: 'border-blue-100',
    },
    {
      id: 'completed',
      title: 'Completed',
      color: 'text-green-700',
      bg: 'bg-green-50/70',
      border: 'border-green-100',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-700 border-red-200 bg-red-50';
      case 'medium':
        return 'text-amber-700 border-amber-200 bg-amber-50';
      default:
        return 'text-blue-700 border-blue-200 bg-blue-50';
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
            className={`rounded-2xl border ${col.border} ${col.bg} p-4 flex flex-col min-h-[500px]`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200/60 mb-4">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${
                  col.id === 'todo' ? 'bg-gray-400' : col.id === 'in_progress' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <h3 className={`font-bold text-sm tracking-wide ${col.color}`}>
                  {col.title}
                </h3>
                <span className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
                  {colTasks.length}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onAddTask(col.id)}
                className="h-7 w-7 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
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
                      className="bg-white border border-gray-200 p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm group relative overflow-hidden rounded-xl"
                    >
                      {/* Interactive edge color bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[3.5px] transition-all ${
                        task.status === 'completed'
                          ? 'bg-green-500'
                          : task.status === 'in_progress'
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`} />

                      <div className="space-y-3 pl-1">
                        {/* Header: Title and Options */}
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-gray-900 line-clamp-1 leading-snug group-hover:text-blue-600 transition-colors">
                            {task.title}
                          </h4>
                          <div className="flex gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEditTask(task)}
                              className="h-6 w-6 rounded text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDeleteTask(task.id)}
                              className="h-6 w-6 rounded text-gray-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Description */}
                        {task.description && (
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {task.description}
                          </p>
                        )}

                        {/* Subtasks checklist Progress */}
                        {subInfo && (
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] font-bold text-gray-500">
                              <span>Checklist</span>
                              <span>{subInfo.completed}/{subInfo.total} ({subInfo.percent}%)</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                              <div
                                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                                style={{ width: `${subInfo.percent}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Category & Priority Badge Grid */}
                        <div className="flex flex-wrap items-center gap-2 pt-1.5">
                          <Badge
                            variant="outline"
                            className="bg-gray-50 border-gray-200 text-gray-600 font-medium text-[10px] rounded px-1.5 py-0"
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
                            <span className="text-[10px] text-gray-500 font-medium ml-auto shrink-0 flex items-center gap-1">
                              ⏱️ {Math.round(task.timeSpent / 60)}m
                            </span>
                          )}
                        </div>

                        {/* Column Quick Navigation Trigger Buttons */}
                        <div className="flex justify-end gap-1.5 pt-2 border-t border-gray-100">
                          {col.id === 'todo' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateStatus(task.id, 'in_progress')}
                              className="h-7 text-[10px] uppercase tracking-wider text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold w-full flex items-center justify-center gap-1 border border-blue-100 rounded-lg"
                            >
                              <Play className="h-3 w-3" /> Start Task
                            </Button>
                          )}
                          {col.id === 'in_progress' && (
                            <div className="flex gap-1.5 w-full">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onUpdateStatus(task.id, 'todo')}
                                className="h-7 text-[10px] uppercase tracking-wider text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-bold flex-1 flex items-center justify-center gap-1 border border-gray-200 rounded-lg"
                              >
                                <ChevronLeft className="h-3 w-3" /> Stop
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onUpdateStatus(task.id, 'completed')}
                                className="h-7 text-[10px] uppercase tracking-wider text-green-600 hover:text-green-700 hover:bg-green-50 font-bold flex-1 flex items-center justify-center gap-1 border border-green-150 rounded-lg"
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
                              className="h-7 text-[10px] uppercase tracking-wider text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-bold w-full flex items-center justify-center gap-1 border border-gray-200 rounded-lg"
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
                <div className="h-32 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-4 bg-white/40">
                  <p className="text-xs text-gray-400 italic">No tasks here</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
