export enum ContentType {
  BLOG_POST = 'blog_post',
  YOUTUBE_VIDEO = 'youtube_video',
  TWEET = 'tweet',
  INSTAGRAM = 'instagram',
  CAROUSEL = 'carousel',
  NEWSLETTER = 'newsletter',
  OTHER = 'other'
}

export enum ContentStatus {
  IDEA = 'idea',
  RESEARCH = 'research',
  OUTLINE = 'outline',
  DRAFTING = 'drafting',
  IN_PROGRESS = 'in_progress',
  EDITING = 'editing',
  REVIEW = 'review',
  REVISION = 'revision',
  APPROVED = 'approved',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published',
  PROMOTED = 'promoted',
  ARCHIVED = 'archived'
}

export enum ContentPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Content {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  type: ContentType;
  status: ContentStatus;
  priority?: ContentPriority;
  
  // Enhanced content details
  audience?: string[];
  mainTopic?: string;
  subtopics?: string[];
  hook?: string;
  callToAction?: string;
  
  // Enhanced workflow tracking
  createdDate: Date;
  updatedDate?: Date;
  targetPublishDate?: Date;
  actualPublishDate?: Date;
  deadlineDate?: Date;
  
  // Enhanced versioning
  version?: string;
  versionHistory?: {
    version: string;
    date: Date;
    editorId?: string;
    changes?: string;
    fileUrl?: string;
  }[];
  
  // Enhanced publishing details
  platform?: string;
  platformDetails?: {
    [key: string]: {
      url?: string;
      accountName?: string;
      formatRequirements?: string;
      characterLimit?: number;
      imageRequirements?: string;
    }
  };
  url?: string;
  publishedUrls?: { platform: string; url: string }[];
  
  // SEO & discoverability
  keywords?: string[];
  tags?: string[];
  categories?: string[];
  seoTitle?: string;
  seoDescription?: string;
  focusKeyphrase?: string;
  
  // Media & assets
  featuredImage?: {
    url: string;
    altText?: string;
    caption?: string;
    credit?: string;
  };
  media?: {
    id: string;
    type: 'image' | 'video' | 'audio' | 'document';
    url: string;
    title?: string;
    description?: string;
    usage?: 'featured' | 'inline' | 'gallery' | 'social';
  }[];
  
  // Content planning
  contentPlan?: {
    goal?: string;
    keyPoints?: string[];
    structure?: string[];
    resources?: string[];
  };
  
  // Performance tracking
  performance?: {
    views?: number;
    likes?: number;
    shares?: number;
    comments?: number;
    clickThroughRate?: number;
    conversionRate?: number;
    revenue?: number;
    lastUpdated?: Date;
  };
  
  // Enhanced notes & collaboration
  notes?: string;
  internalComments?: {
    id: string;
    userId: string;
    date: Date;
    comment: string;
    resolved?: boolean;
  }[];
  
  // Repurposing
  repurposedFrom?: string; // ID of original content
  repurposedTo?: string[]; // IDs of content repurposed from this
  
  // Relationships
  relatedContent?: string[]; // IDs of related content pieces
  tasks?: string[]; // IDs of related tasks
  
  // Enhanced metadata
  wordCount?: number;
  duration?: number; // in seconds for video/audio
  readingTime?: number; // in minutes
  seriesName?: string;
  seriesPosition?: number;
  evergreen?: boolean;
  seasonal?: boolean;
  seasonalPeriod?: { startMonth: number; endMonth: number };
  
  // Publication scheduling
  publicationSchedule?: {
    scheduledDate: Date;
    scheduledTime?: string; // Format: "HH:MM"
    timeZone?: string;
    publishingUserId?: string;
    automationId?: string;
    status: 'pending' | 'success' | 'failed';
  };
  
  // Permissions & visibility
  visibility?: 'public' | 'private' | 'unlisted';
  accessControl?: {
    ownerId: string;
    editorIds?: string[];
    viewerIds?: string[];
  };
}
