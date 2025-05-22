export enum NotificationType {
  TASK_DUE = 'task_due',
  TASK_ASSIGNED = 'task_assigned',
  GOAL_COMPLETED = 'goal_completed',
  STREAK_ALERT = 'streak_alert',
  JOB_STATUS_CHANGE = 'job_status_change',
  TEAM_INVITE = 'team_invite',
  CONTENT_PUBLISHED = 'content_published',
  COMMENT_ADDED = 'comment_added',
  MENTION = 'mention',
  PAYMENT_RECEIVED = 'payment_received',
  INVOICE_DUE = 'invoice_due',
  SYSTEM = 'system'
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  
  // Related items
  relatedItemId?: string;
  relatedItemType?: string;
  actionUrl?: string;
  
  // Status
  isRead: boolean;
  isArchived: boolean;
  readAt?: Date;
  
  // Delivery
  createdAt: Date;
  scheduledFor?: Date;
  expireAt?: Date;
  deliveryChannels?: ('app' | 'email' | 'push' | 'sms')[];
  deliveryStatus?: {
    app?: 'pending' | 'delivered' | 'failed';
    email?: 'pending' | 'sent' | 'delivered' | 'opened' | 'failed';
    push?: 'pending' | 'delivered' | 'opened' | 'failed';
    sms?: 'pending' | 'sent' | 'delivered' | 'failed';
  };
  
  // Grouping
  category?: string;
  groupId?: string;
  
  // Metadata
  source?: string;
  icon?: string;
  color?: string;
  actions?: {
    label: string;
    url?: string;
    action?: string;
    data?: any;
  }[];
}

export interface NotificationPreferences {
  userId: string;
  
  // Global settings
  notificationsEnabled: boolean;
  quietHoursEnabled?: boolean;
  quietHoursStart?: string; // "HH:MM" format
  quietHoursEnd?: string; // "HH:MM" format
  
  // Channel preferences
  channels: {
    app: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  
  // Type preferences
  typePreferences: {
    [key in NotificationType]?: {
      enabled: boolean;
      channels?: ('app' | 'email' | 'push' | 'sms')[];
      minPriority?: NotificationPriority;
    }
  };
  
  // Digest settings
  digestEnabled?: boolean;
  digestFrequency?: 'daily' | 'weekly';
  digestDay?: number; // 0-6 for weekly (0 = Sunday)
  digestTime?: string; // "HH:MM" format
  
  // Updates
  updatedAt: Date;
}
