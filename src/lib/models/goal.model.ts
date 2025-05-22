export enum GoalTimeframe {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly'
}

export enum GoalCategory {
  CODING = 'coding',
  LEARNING = 'learning',
  CAREER = 'career',
  CONTENT = 'content',
  PERSONAL = 'personal',
  OTHER = 'other'
}

export enum GoalStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  ON_TRACK = 'on_track',
  AT_RISK = 'at_risk',
  BEHIND = 'behind',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  ON_HOLD = 'on_hold'
}

export enum GoalPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  timeframe: GoalTimeframe;
  category: GoalCategory;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  completedDate?: Date;
  
  // Enhanced status tracking
  status: GoalStatus;
  priority: GoalPriority;
  
  // Enhanced progress tracking
  progress: number; // 0-100
  progressHistory?: {
    date: Date;
    value: number;
    note?: string;
  }[];
  
  // Enhanced milestones
  milestones?: {
    id: string;
    title: string;
    description?: string;
    dueDate: Date;
    isCompleted: boolean;
    completedDate?: Date;
  }[];
  
  // Enhanced metrics
  metrics?: {
    name: string;
    target: number;
    current: number;
    unit?: string;
  }[];
  
  // Enhanced hierarchical relationships
  parentGoalId?: string; // For sub-goals
  subGoals?: string[]; // IDs of sub-goals
  depth?: number; // Depth in goal hierarchy (0 for top-level)
  path?: string[]; // Array of parent goal IDs from root to this goal
  
  // Enhanced reminders
  reminders?: {
    id: string;
    date: Date;
    message?: string;
    isSent: boolean;
    type: 'start' | 'milestone' | 'deadline' | 'check-in' | 'custom';
  }[];
  
  // Enhanced reflections
  reflections?: {
    id: string;
    date: Date;
    content: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
    learnings?: string[];
  }[];
  
  // Enhanced metadata
  createdAt: Date;
  updatedAt?: Date;
  createdBy?: string;
  visibility?: 'private' | 'team' | 'public';
  tags?: string[];
  color?: string;
  icon?: string;
  
  // Enhanced linking
  relatedGoals?: string[]; // IDs of related goals
  tasks: string[]; // IDs of related tasks
  resources?: {
    id: string;
    title: string;
    type: 'link' | 'file' | 'note' | 'contact';
    url?: string;
    notes?: string;
  }[];
  
  // Smart tracking
  isRecurring?: boolean;
  recurrencePattern?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    endAfterOccurrences?: number;
    daysOfWeek?: number[]; // 0-6 for Sunday-Saturday
  };
  
  // Analytics
  successRate?: number;
  averageCompletionTime?: number; // in days
  streakCount?: number;
}
