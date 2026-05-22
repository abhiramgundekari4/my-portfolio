'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Tag, AlertCircle, Check, X } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Task, SubTask, TaskPriority, TaskStatus } from './types';

interface TaskFormProps {
  taskToEdit?: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
}

const CATEGORIES = ['Coding', 'Database', 'Math', 'ML / AI', 'Personal', 'Other'];

export function TaskForm({ taskToEdit, onSave, onClose }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState('Coding');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [estimatedPomodoros, setEstimatedPomodoros] = useState(1);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      if (CATEGORIES.includes(taskToEdit.category)) {
        setCategory(taskToEdit.category);
        setIsCustomCategory(false);
      } else {
        setCategory('Other');
        setCustomCategory(taskToEdit.category);
        setIsCustomCategory(true);
      }
      setDueDate(taskToEdit.dueDate);
      setEstimatedPomodoros(taskToEdit.estimatedPomodoros);
      setSubtasks(taskToEdit.subtasks);
    } else {
      // Set tomorrow's date as default
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [taskToEdit]);

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    const newSub: SubTask = {
      id: Math.random().toString(36).substr(2, 9),
      title: newSubtaskTitle.trim(),
      completed: false,
    };

    setSubtasks([...subtasks, newSub]);
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter((sub) => sub.id !== id));
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks(
      subtasks.map((sub) =>
        sub.id === id ? { ...sub, completed: !sub.completed } : sub
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalCategory = isCustomCategory ? (customCategory.trim() || 'Other') : category;

    const savedTask: Task = {
      id: taskToEdit?.id || Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      category: finalCategory,
      dueDate,
      subtasks,
      timeSpent: taskToEdit?.timeSpent || 0,
      estimatedPomodoros: Number(estimatedPomodoros) || 1,
      createdAt: taskToEdit?.createdAt || new Date().toISOString(),
    };

    onSave(savedTask);
  };

  return (
    <DialogContent className="glass-card border-white/[0.08] max-w-lg text-foreground max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="font-headline text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {taskToEdit ? '✏️ Edit Task' : '🚀 Create New Task'}
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-5 pt-3">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="task-title" className="text-sm font-semibold tracking-wide">
            Task Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="task-title"
            placeholder="e.g., Implement DB Indexing"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-white/[0.03] border-white/[0.08] focus:border-primary/50 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="task-desc" className="text-sm font-semibold tracking-wide">
            Description
          </Label>
          <Textarea
            id="task-desc"
            placeholder="Outline task details or requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/[0.03] border-white/[0.08] min-h-[80px] focus:border-primary/50 focus:ring-primary/20 transition-all resize-none"
          />
        </div>

        {/* Priority & Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold tracking-wide">Priority</Label>
            <div className="flex bg-white/[0.03] rounded-lg p-1 border border-white/[0.06] w-full">
              {(['low', 'medium', 'high'] as TaskPriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md uppercase tracking-wider transition-all ${
                    priority === p
                      ? p === 'high'
                        ? 'bg-destructive text-destructive-foreground shadow-md shadow-destructive/20'
                        : p === 'medium'
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                        : 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.02]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-semibold tracking-wide">Status</Label>
            <div className="flex bg-white/[0.03] rounded-lg p-1 border border-white/[0.06] w-full">
              {(['todo', 'in_progress', 'completed'] as TaskStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-md uppercase tracking-wide transition-all ${
                    status === s
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.02]'
                  }`}
                >
                  {s === 'in_progress' ? 'Active' : s === 'todo' ? 'To Do' : 'Done'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category & Due Date */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-sm font-semibold tracking-wide">Category</Label>
            {!isCustomCategory ? (
              <select
                value={category}
                onChange={(e) => {
                  if (e.target.value === 'Other') {
                    setIsCustomCategory(true);
                  } else {
                    setCategory(e.target.value);
                  }
                }}
                className="w-full h-10 px-3 rounded-md bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 focus:ring-primary/20 transition-all text-sm text-foreground outline-none"
              >
                {CATEGORIES.filter(c => c !== 'Other').map((c) => (
                  <option key={c} value={c} className="bg-card text-foreground">
                    {c}
                  </option>
                ))}
                <option value="Other" className="bg-card text-foreground">Custom (+)</option>
              </select>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Custom label..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="bg-white/[0.03] border-white/[0.08]"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsCustomCategory(false);
                    setCategory('Coding');
                  }}
                  className="h-10 w-10 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="due-date" className="text-sm font-semibold tracking-wide">
              Due Date
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="date"
                id="due-date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full h-10 pl-10 pr-3 rounded-md bg-white/[0.03] border border-white/[0.08] focus:border-primary/50 focus:ring-primary/20 transition-all text-sm text-foreground outline-none"
              />
            </div>
          </div>
        </div>

        {/* Estimated Pomodoro Sessions */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <Label htmlFor="estimated-pomodoros" className="text-sm font-semibold tracking-wide">
              Estimated Pomodoros (25m sessions)
            </Label>
            <span className="text-xs text-accent font-bold">{estimatedPomodoros} 🍅</span>
          </div>
          <input
            id="estimated-pomodoros"
            type="range"
            min="1"
            max="10"
            value={estimatedPomodoros}
            onChange={(e) => setEstimatedPomodoros(Number(e.target.value))}
            className="w-full accent-primary bg-white/[0.08] h-1 rounded-lg cursor-pointer"
          />
        </div>

        {/* Subtask Checklist Builder */}
        <div className="space-y-2 border-t border-white/[0.05] pt-3">
          <Label className="text-sm font-semibold tracking-wide flex items-center gap-1.5">
            📋 Subtasks / Checklist ({subtasks.filter(s => s.completed).length}/{subtasks.length})
          </Label>

          <div className="flex gap-2">
            <Input
              placeholder="Add checklist subtask..."
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSubtask(e);
                }
              }}
              className="bg-white/[0.03] border-white/[0.08] flex-1"
            />
            <Button
              type="button"
              onClick={handleAddSubtask}
              className="bg-accent hover:bg-accent/80 text-background font-bold shadow-md shadow-accent/15"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Checklist View */}
          {subtasks.length > 0 ? (
            <div className="max-h-[150px] overflow-y-auto space-y-1.5 pr-1 mt-2">
              {subtasks.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/[0.04] group hover:border-white/[0.08] transition-all"
                >
                  <div
                    onClick={() => handleToggleSubtask(sub.id)}
                    className="flex items-center gap-2 cursor-pointer flex-1 select-none text-xs"
                  >
                    <div
                      className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-colors ${
                        sub.completed
                          ? 'border-accent bg-accent text-background'
                          : 'border-white/20 hover:border-accent'
                      }`}
                    >
                      {sub.completed && <Check className="h-3 w-3 stroke-[3]" />}
                    </div>
                    <span
                      className={`transition-all leading-none ${
                        sub.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {sub.title}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSubtask(sub.id)}
                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic text-center py-2">
              No checklist items yet. Add one above!
            </p>
          )}
        </div>

        {/* Footer Actions */}
        <DialogFooter className="border-t border-white/[0.05] pt-4 flex gap-2 justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="border-white/[0.06] hover:bg-white/[0.04]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/80 text-foreground font-bold shadow-lg shadow-primary/20 px-6"
          >
            Save Task
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
