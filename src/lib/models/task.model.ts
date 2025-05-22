export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum TaskCategory {
  CODING = 'coding',
  CONTENT = 'content',
  CLIENT = 'client',
  PERSONAL = 'personal',
  OTHER = 'other'
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  completedDate?: Date;
  isCompleted: boolean;
  priority: TaskPriority;
  category: TaskCategory;
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
  tags?: string[];
  reminders: Reminder[];
}

export enum ReminderStatus {
  PENDING = 'pending',
  SENT = 'sent',
  ACKNOWLEDGED = 'acknowledged',
  SNOOZED = 'snoozed',
  CANCELLED = 'cancelled'
}

export enum ReminderType {
  PUSH = 'push',
  EMAIL = 'email',
  SMS = 'sms',
  DESKTOP = 'desktop',
  IN_APP = 'in_app'
}

export interface Reminder {
  id: string;
  title?: string;
  message?: string;
  time: Date;
  status: ReminderStatus;
  type: ReminderType | ReminderType[];
  priority?: TaskPriority;
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
    interval?: number; // Every X days/weeks/months
    endDate?: Date;
    daysOfWeek?: number[]; // 0-6, Sunday to Saturday
  };
  snoozeCount?: number;
  snoozeUntil?: Date;
  createdAt: Date;
  updatedAt?: Date;
}
