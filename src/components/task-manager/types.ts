export type TaskStatus = 'todo' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  dueDate: string;
  subtasks: SubTask[];
  timeSpent: number; // in seconds
  estimatedPomodoros: number;
  createdAt: string;
}

export interface ProductivityStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  completionRate: number;
  overdueTasks: number;
  totalFocusTime: number; // in seconds
}
