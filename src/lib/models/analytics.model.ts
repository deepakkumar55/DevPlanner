export enum TimeRange {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
  CUSTOM = 'custom'
}

export enum ActivityType {
  TASK_CREATED = 'task_created',
  TASK_COMPLETED = 'task_completed',
  GOAL_PROGRESS = 'goal_progress',
  CONTENT_CREATED = 'content_created',
  CONTENT_PUBLISHED = 'content_published',
  PROJECT_UPDATED = 'project_updated',
  TIME_TRACKED = 'time_tracked',
  JOB_APPLIED = 'job_applied',
  STREAK_MAINTAINED = 'streak_maintained'
}

export interface UserActivity {
  id: string;
  userId: string;
  timestamp: Date;
  activityType: ActivityType;
  metadata?: any;
  sessionId?: string;
  durationMs?: number;
}

export interface ProductivityMetrics {
  userId: string;
  timeRange: TimeRange;
  startDate: Date;
  endDate: Date;
  
  // Task metrics
  tasksCreated: number;
  tasksCompleted: number;
  taskCompletionRate: number;
  averageTaskCompletionTime: number;
  
  // Time tracking
  totalTimeTracked: number; // in minutes
  timeByCategory: {
    category: string;
    minutes: number;
    percentage: number;
  }[];
  
  // Streak metrics
  currentStreaks: number;
  longestStreak: number;
  
  // Goal metrics
  goalsCreated: number;
  goalsCompleted: number;
  goalProgress: number; // average percentage
  
  // Content metrics
  contentCreated: number;
  contentPublished: number;
  
  // Productivity scores
  focusScore?: number; // 0-100
  consistencyScore?: number; // 0-100
  balanceScore?: number; // 0-100
  overallProductivityScore?: number; // 0-100
  
  // Comparisons
  comparedToPrevious?: {
    tasksCompletedChange: number; // percentage
    timeTrackedChange: number; // percentage
    goalProgressChange: number; // percentage
    productivityScoreChange: number; // percentage
  };
  
  // Usage patterns
  mostProductiveDay?: number; // 0-6, Sunday to Saturday
  mostProductiveTime?: string; // "HH:MM" format
  
  // Generated
  generatedAt: Date;
}

export interface WorkspaceAnalytics {
  workspaceId: string;
  timeRange: TimeRange;
  startDate: Date;
  endDate: Date;
  
  // Workspace metrics
  activeMembers: number;
  totalActivities: number;
  
  // Contribution metrics
  memberContributions: {
    userId: string;
    displayName?: string;
    tasksCreated: number;
    tasksCompleted: number;
    commentsAdded: number;
    totalTimeContributed: number; // in minutes
    percentageOfTotal: number;
  }[];
  
  // Project metrics
  projectProgress: {
    projectId: string;
    projectName: string;
    completionPercentage: number;
    tasksCompleted: number;
    tasksRemaining: number;
    onTrack: boolean;
  }[];
  
  // Resource usage
  resourceUtilization: {
    resourceType: string;
    count: number;
    usagePercentage: number;
  }[];
  
  // Generated
  generatedAt: Date;
}
