export interface Comment {
  id: string;
  userId: string;
  
  // Comment target
  itemId: string;
  itemType: 'task' | 'goal' | 'project' | 'content' | 'job' | 'timeEntry';
  
  // Content
  content: string;
  attachments?: {
    id: string;
    filename: string;
    fileType: string;
    url: string;
    size?: number;
  }[];
  
  // Collaboration
  mentions?: string[]; // User IDs
  
  // Threading
  parentCommentId?: string;
  isResolved?: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  
  // Reactions
  reactions?: {
    [reaction: string]: string[]; // Reaction type: array of user IDs
  };
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
  isEdited: boolean;
  isPrivate?: boolean;
}
