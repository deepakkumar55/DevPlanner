export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  PREMIUM = 'premium',
  TEAM_MEMBER = 'team_member',
  TEAM_ADMIN = 'team_admin'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_VERIFICATION = 'pending_verification'
}

export enum SubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  TEAM = 'team',
  ENTERPRISE = 'enterprise'
}

export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  salt?: string;

  // Authentication
  isEmailVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  
  // Authorization
  role: UserRole;
  status: UserStatus;
  permissions?: string[];
  
  // Account management
  username: string;
  createdAt: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
  lastActiveAt?: Date;
  loginCount?: number;
  
  // Subscription details
  subscriptionTier: SubscriptionTier;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  subscriptionAutoRenew?: boolean;
  paymentMethod?: {
    type: 'credit_card' | 'paypal' | 'bank_transfer' | 'other';
    lastFour?: string;
    expiryDate?: string;
  };
  
  // Relationships
  profileId: string;
  teamIds?: string[];
  
  // Settings
  settings?: {
    theme: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
      emailDigestFrequency?: 'daily' | 'weekly' | 'monthly' | 'never';
    };
    timezone?: string;
    language?: string;
    dateFormat?: string;
    timeFormat?: '12h' | '24h';
  };
  
  // Activity
  lastSeenFeatures?: {
    [featureKey: string]: Date;
  };
  featureFlags?: {
    [flagKey: string]: boolean;
  };
  
  // External accounts
  externalAccounts?: {
    github?: {
      id: string;
      username: string;
      accessToken?: string;
    };
    linkedin?: {
      id: string;
      profileUrl?: string;
    };
    google?: {
      id: string;
      email?: string;
    };
    [key: string]: any;
  };
}
