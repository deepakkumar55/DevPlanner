export enum JobApplicationStatus {
  WISHLIST = 'wishlist',
  APPLIED = 'applied',
  PHONE_SCREEN = 'phone_screen',
  INTERVIEW = 'interview',
  OFFER = 'offer',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  DECLINED = 'declined'
}

export enum JobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  FREELANCE = 'freelance',
  INTERNSHIP = 'internship',
  REMOTE = 'remote',
  HYBRID = 'hybrid'
}

export enum JobPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  DREAM = 'dream'
}

export enum InterviewStage {
  SCREENING = 'screening',
  TECHNICAL = 'technical',
  BEHAVIORAL = 'behavioral', 
  ONSITE = 'onsite',
  FINAL = 'final',
  TEAM_MATCH = 'team_match'
}

export enum FollowUpMethod {
  EMAIL = 'email',
  PHONE = 'phone',
  IN_PERSON = 'in-person',
  VIDEO = 'video',
  LINKEDIN = 'linkedin',
  OTHER = 'other'
}

export enum FollowUpOutcome {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
  NO_RESPONSE = 'no_response'
}

export interface JobApplication {
  id: string;
  companyName: string;
  positionTitle: string;
  location: string;
  locationType?: 'remote' | 'hybrid' | 'onsite';
  
  // Enhanced salary information
  salary?: {
    amount?: number | string;
    currency?: string;
    period?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    min?: number;
    max?: number;
    benefits?: string[];
    negotiable?: boolean;
  };
  
  // Enhanced job details
  jobType?: JobType[];
  priority?: JobPriority;
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  skills?: {
    name: string;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    match?: boolean; // Do I match this requirement?
  }[];
  
  // Application tracking
  applicationUrl?: string;
  applicationPortal?: string;
  applicationId?: string;
  applicationUsername?: string;
  referredBy?: string;
  dateFound: Date;
  dateApplied: Date;
  deadlineDate?: Date;
  status: JobApplicationStatus;
  
  // Important dates
  interviewDates?: {
    stage: InterviewStage;
    date: Date;
    location?: string;
    notes?: string;
    completed?: boolean;
    feedback?: string;
  }[];
  
  // Company information
  companyWebsite?: string;
  companySize?: string;
  companyIndustry?: string;
  companyDescription?: string;
  
  // Contact information
  contacts?: {
    id: string;
    name: string;
    role?: string;
    email?: string;
    phone?: string;
    linkedIn?: string;
    isPrimary?: boolean;
    notes?: string;
  }[];
  
  // Documents
  documents?: {
    type: 'resume' | 'cover_letter' | 'portfolio' | 'reference' | 'other';
    version: string;
    filename: string;
    url?: string;
    dateSubmitted?: Date;
    notes?: string;
  }[];
  
  // Notes and follow-ups
  notes?: string;
  pros?: string[];
  cons?: string[];
  questions?: string[];
  followUps: FollowUp[];
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
  archivedAt?: Date;
  isArchived?: boolean;
  isFavorite?: boolean;
  tags?: string[];
}

export interface FollowUp {
  id: string;
  date: Date;
  scheduledTime?: string;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
  method: FollowUpMethod;
  methodDetails?: string;
  
  // Enhanced reminder system
  reminder?: {
    date: Date;
    sent: boolean;
    channels?: ('email' | 'push' | 'sms')[];
    message?: string;
  };
  
  // Enhanced tracking
  subject?: string;
  message?: string;
  templateUsed?: string;
  outcome?: FollowUpOutcome;
  responseReceived?: boolean;
  responseDate?: Date;
  responseNotes?: string;
  
  // Related contacts
  contactId?: string;
  contactName?: string;
  
  // Preparation
  preparationNotes?: string;
  preparationCompleted?: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
  priority?: 'low' | 'medium' | 'high';
}
