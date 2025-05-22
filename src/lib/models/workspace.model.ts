export enum WorkspaceType {
  PERSONAL = 'personal',
  TEAM = 'team',
  PROJECT = 'project',
  CLIENT = 'client'
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  type: WorkspaceType;
  ownerId: string;
  teamId?: string;
  
  // Organization
  icon?: string;
  color?: string;
  
  // Content
  tasks?: string[]; // Task IDs
  goals?: string[]; // Goal IDs
  projects?: string[]; // Project IDs
  content?: string[]; // Content IDs
  
  // Access control
  members?: {
    userId: string;
    role: 'owner' | 'editor' | 'viewer';
    addedAt: Date;
  }[];
  
  // Custom data
  templates?: {
    id: string;
    name: string;
    type: 'task' | 'goal' | 'project' | 'content';
    data: any;
  }[];
  
  dashboards?: {
    id: string;
    name: string;
    widgets: {
      id: string;
      type: string;
      position: { x: number; y: number; w: number; h: number };
      config: any;
    }[];
  }[];
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
  lastAccessedAt?: Date;
  isPinned?: boolean;
  isArchived?: boolean;
}
