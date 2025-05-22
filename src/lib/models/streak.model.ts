export enum StreakStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  BROKEN = 'broken'
}

export enum StreakCategory {
  CODING = 'coding',
  CONTENT_CREATION = 'content_creation',
  LEARNING = 'learning',
  EXERCISE = 'exercise',
  READING = 'reading',
  MEDITATION = 'meditation',
  CUSTOM = 'custom'
}

export enum ReminderChannel {
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms',
  DESKTOP = 'desktop',
  IN_APP = 'in_app'
}

export interface Streak {
  id: string;
  name: string;
  description?: string;
  status: StreakStatus;
  currentCount: number;
  longestCount: number;
  startDate: Date;
  lastActivityDate?: Date;
  category: StreakCategory;
  customCategory?: string;
  dailyTarget: number; // Minimum daily activities to maintain streak
  weeklyTarget?: number; // Optional weekly goal
  
  // Streak recovery features
  gracePeriodDays: number; // Number of days allowed to miss before breaking streak
  freezeDaysRemaining: number; // Allows pausing streak without breaking
  freezeDaysUsed: number;
  
  // Analytics
  successRate: number; // Percentage of successful days
  averageActivitiesPerDay: number;
  
  notificationSettings: NotificationSettings;
  history: StreakDay[];
  
  // Additional metadata
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  color?: string; // For UI customization
  icon?: string;
}

export interface StreakDay {
  date: Date;
  count: number;
  completed: boolean;
  notes?: string;
  activities?: {
    id: string;
    description: string;
    completedAt: Date;
    duration?: number; // in minutes
  }[];
  mood?: number; // 1-5 scale to track satisfaction
  isFreezeDay?: boolean;
  isGracePeriodUsed?: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  reminderTime?: Date; // Time of day to send reminder
  reminderChannels: ReminderChannel[]; // Support multiple notification methods
  missedDayAlert: boolean; // Alert when streak is about to break
  
  // Enhanced notification options
  customMessages?: {
    reminder?: string;
    success?: string;
    warning?: string;
    broken?: string;
    milestone?: string;
  };
  
  quietHoursStart?: string; // Format: "HH:MM" - Don't send notifications during these hours
  quietHoursEnd?: string;
  
  // Escalation settings
  escalation?: {
    enabled: boolean;
    thresholdDays: number; // Days before escalating notifications
    escalationChannels: ReminderChannel[];
  };
  
  // Milestone notifications
  milestoneAlerts?: boolean; // Special notifications for streak milestones
  milestones?: number[]; // Custom milestone days (e.g., [7, 30, 100])
}
