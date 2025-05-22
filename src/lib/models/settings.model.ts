export interface AppSettings {
  id: string;
  userId: string;
  
  // UI preferences
  theme: 'light' | 'dark' | 'system' | 'custom';
  customTheme?: {
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
  };
  compactMode?: boolean;
  sidebarCollapsed?: boolean;
  defaultView?: 'list' | 'kanban' | 'calendar' | 'gantt' | 'timeline';
  
  // Time & date preferences
  timezone: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'custom';
  customDateFormat?: string;
  timeFormat: '12h' | '24h';
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  
  // Language & accessibility
  language: string;
  textSize?: 'small' | 'medium' | 'large';
  highContrast?: boolean;
  reducedMotion?: boolean;
  
  // Workflow preferences
  defaultTaskDuration?: number; // in minutes
  defaultTaskPriority?: string;
  defaultTaskReminder?: number; // in minutes before due
  autoStartTimers?: boolean;
  showCompletedTasks?: boolean;
  
  // Notification preferences
  desktopNotifications?: boolean;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  notificationSounds?: boolean;
  
  // Default templates
  defaultTaskTemplate?: string;
  defaultProjectTemplate?: string;
  defaultInvoiceTemplate?: string;
  
  // Dashboard configuration
  dashboardWidgets?: {
    id: string;
    type: string;
    position: { x: number; y: number; w: number; h: number };
    config: any;
  }[];
  
  // Keyboard shortcuts
  keyboardShortcutsEnabled?: boolean;
  customShortcuts?: {
    [action: string]: string;
  };
  
  // Integration defaults
  defaultCalendar?: string;
  defaultRepository?: string;
  
  // Updates
  updatedAt: Date;
}
