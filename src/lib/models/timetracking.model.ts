export enum TimeEntryCategory {
  CODING = 'coding',
  DESIGN = 'design',
  RESEARCH = 'research',
  MEETING = 'meeting',
  LEARNING = 'learning',
  CONTENT_CREATION = 'content_creation',
  PLANNING = 'planning',
  DEBUGGING = 'debugging',
  TESTING = 'testing',
  DOCUMENTATION = 'documentation',
  OTHER = 'other'
}

export interface TimeEntry {
  id: string;
  userId: string;
  
  // Time data
  startTime: Date;
  endTime?: Date;
  duration?: number; // in minutes (calculated field or manually entered)
  isRunning: boolean;
  
  // Classification
  category: TimeEntryCategory;
  tags?: string[];
  
  // Related items
  relatedItemId?: string;
  relatedItemType?: 'task' | 'project' | 'goal' | 'content';
  workspaceId?: string;
  
  // Details
  description?: string;
  notes?: string;
  
  // Billing
  billable?: boolean;
  billingRate?: number;
  billingCurrency?: string;
  invoiceId?: string;
  
  // Location
  location?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
  manuallyLogged?: boolean;
}

export interface TimeReport {
  id: string;
  userId: string;
  name: string;
  description?: string;
  
  // Time range
  startDate: Date;
  endDate: Date;
  
  // Filters
  workspaceIds?: string[];
  projectIds?: string[];
  categories?: TimeEntryCategory[];
  tags?: string[];
  billableOnly?: boolean;
  
  // Grouping
  groupBy?: 'day' | 'week' | 'month' | 'project' | 'category' | 'tag';
  
  // Generated report data
  totalDuration: number; // in minutes
  entries?: string[]; // TimeEntry IDs
  summary?: {
    [key: string]: {
      duration: number;
      percentage: number;
      entryCount: number;
    }
  };
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
  lastGeneratedAt?: Date;
}
