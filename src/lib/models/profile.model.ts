export enum ExperienceLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface Profile {
  id: string;
  userId: string;
  
  // Personal details
  firstName: string;
  lastName: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  coverImageUrl?: string;
  
  // Contact information
  publicEmail?: string;
  phone?: string;
  website?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  
  // Professional details
  title?: string;
  company?: string;
  yearsOfExperience?: number;
  
  // Skills and expertise
  skills?: {
    name: string;
    level: ExperienceLevel;
    yearsOfExperience?: number;
    endorsed?: number;
  }[];
  
  // Development preferences
  devEnvironment?: {
    operatingSystem?: string[];
    editor?: string;
    languages?: string[];
    frameworks?: string[];
    tools?: string[];
    prefersDarkMode?: boolean;
  };
  
  // Portfolio and work
  portfolioLinks?: {
    title: string;
    url: string;
    description?: string;
    technologies?: string[];
    imageUrl?: string;
  }[];
  
  // Social profiles
  socialLinks?: {
    platform: 'github' | 'twitter' | 'linkedin' | 'stackoverflow' | 'dev' | 'medium' | 'other';
    url: string;
    username?: string;
  }[];
  
  // Career goals
  careerGoals?: {
    shortTerm?: string;
    longTerm?: string;
    interests?: string[];
    preferredWorkEnvironment?: ('remote' | 'hybrid' | 'office')[];
    openToOpportunities?: boolean;
  };
  
  // Learning paths
  learning?: {
    currentFocus?: string[];
    completedCourses?: {
      title: string;
      provider: string;
      completionDate: Date;
      certificateUrl?: string;
    }[];
    wishlist?: string[];
  };
  
  // Activity metrics
  metrics?: {
    contentCreated?: number;
    projectsCompleted?: number;
    tasksCompleted?: number;
    longestStreak?: number;
    currentStreak?: number;
    totalWorkHours?: number;
  };
  
  // Preferences for job matches
  jobPreferences?: {
    desiredRoles?: string[];
    desiredLocations?: string[];
    remoteOnly?: boolean;
    salaryExpectation?: {
      min?: number;
      max?: number;
      currency?: string;
      period?: 'hourly' | 'yearly';
    };
    availableFrom?: Date;
    noticePeriod?: number; // in days
  };
  
  // Privacy settings
  privacySettings?: {
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
    showSocialLinks: boolean;
    showSkills: boolean;
    showPortfolio: boolean;
    showMetrics: boolean;
    profileVisibility: 'public' | 'connections' | 'private';
  };
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
  lastResumeUpdate?: Date;
}
