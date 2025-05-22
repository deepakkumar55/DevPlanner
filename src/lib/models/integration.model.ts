export enum IntegrationType {
  GITHUB = 'github',
  GITLAB = 'gitlab',
  TRELLO = 'trello',
  JIRA = 'jira',
  SLACK = 'slack',
  DISCORD = 'discord',
  GOOGLE_CALENDAR = 'google_calendar',
  OUTLOOK = 'outlook',
  NOTION = 'notion',
  FIGMA = 'figma',
  ZAPIER = 'zapier',
  CUSTOM_API = 'custom_api'
}

export enum IntegrationStatus {
  ACTIVE = 'active',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
  PENDING = 'pending'
}

export enum SyncDirection {
  IMPORT = 'import',
  EXPORT = 'export',
  BIDIRECTIONAL = 'bidirectional'
}

export interface Integration {
  id: string;
  userId: string;
  workspaceId?: string;
  
  // Integration details
  name: string;
  type: IntegrationType;
  description?: string;
  
  // Connection status
  status: IntegrationStatus;
  lastSyncedAt?: Date;
  errorMessage?: string;
  
  // Authentication
  credentials?: {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
    apiKey?: string;
    webhookUrl?: string;
    // Additional credentials stored securely
  };
  
  // Configuration
  config?: {
    baseUrl?: string;
    projects?: string[];
    repositories?: string[];
    boards?: string[];
    channels?: string[];
    calendars?: string[];
    syncInterval?: number; // in minutes
    customMapping?: any;
  };
  
  // Sync settings
  syncDirection: SyncDirection;
  syncSettings?: {
    syncTasks?: boolean;
    syncEvents?: boolean;
    syncComments?: boolean;
    syncFiles?: boolean;
    syncProjects?: boolean;
    createNewItemsInDevPlanner?: boolean;
    updateExistingItems?: boolean;
    syncItemTypes?: string[];
  };
  
  // Mappings for entities
  mappings?: {
    [externalId: string]: {
      devPlannerId: string;
      type: string;
      lastSynced: Date;
    }
  };
  
  // Usage
  usageStats?: {
    itemsImported: number;
    itemsExported: number;
    lastUsed: Date;
    syncCount: number;
  };
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
}

export interface Webhook {
  id: string;
  integrationId: string;
  
  // Webhook details
  url: string;
  secret?: string;
  events: string[];
  description?: string;
  
  // Status
  isActive: boolean;
  
  // History
  lastTriggeredAt?: Date;
  successCount: number;
  failureCount: number;
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
}
