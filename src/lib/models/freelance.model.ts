export enum ProjectStatus {
  LEAD = 'lead',
  PROPOSAL_DRAFTING = 'proposal_drafting',
  PROPOSAL_SENT = 'proposal_sent',
  NEGOTIATION = 'negotiation',
  CONTRACT_DRAFTING = 'contract_drafting',
  CONTRACT_SENT = 'contract_sent',
  CONTRACT_SIGNED = 'contract_signed',
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  MILESTONE_REVIEW = 'milestone_review',
  FINAL_REVIEW = 'final_review',
  REVISION = 'revision',
  COMPLETED = 'completed',
  MAINTENANCE = 'maintenance',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled',
  ARCHIVED = 'archived'
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  VIEWED = 'viewed',
  PARTIALLY_PAID = 'partially_paid',
  PAID = 'paid',
  OVERDUE = 'overdue',
  LATE = 'late',
  DISPUTED = 'disputed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum ClientSource {
  REFERRAL = 'referral',
  WEBSITE = 'website',
  SOCIAL_MEDIA = 'social_media',
  CONFERENCE = 'conference',
  COLD_OUTREACH = 'cold_outreach',
  RETURNING = 'returning',
  MARKETPLACE = 'marketplace',
  OTHER = 'other'
}

export enum ClientPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VIP = 'vip'
}

export interface Client {
  id: string;
  
  // Enhanced client identification
  name: string;
  company?: string;
  position?: string;
  industry?: string;
  size?: 'solo' | 'small' | 'medium' | 'large' | 'enterprise';
  logo?: string;
  
  // Enhanced contact information
  email: string;
  secondaryEmail?: string;
  phone?: string;
  mobile?: string;
  preferredContactMethod?: 'email' | 'phone' | 'message' | 'other';
  timezone?: string;
  language?: string;
  
  // Enhanced location information
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  billingAddress?: {
    sameAsAddress?: boolean;
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  
  // Online presence
  website?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    github?: string;
    other?: { [key: string]: string };
  };
  
  // Enhanced relationship data
  source?: ClientSource;
  referredBy?: string;
  priority?: ClientPriority;
  dateAcquired: Date;
  lastContactDate?: Date;
  nextContactDate?: Date;
  lifetimeValue?: number;
  budget?: { min: number; max: number; currency: string };
  paymentTerms?: string;
  preferredPaymentMethod?: string;
  taxInformation?: {
    taxId?: string;
    taxExempt?: boolean;
    taxRate?: number;
  };
  
  // Team & contacts
  contacts?: {
    id: string;
    name: string;
    position?: string;
    email?: string;
    phone?: string;
    isPrimary?: boolean;
    notes?: string;
  }[];
  
  // Notes and documents
  notes?: string;
  documents?: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadDate: Date;
    tags?: string[];
  }[];
  
  // Client history
  projects: Project[];
  
  // Communication preferences
  communicationPreferences?: {
    newsletter?: boolean;
    updates?: boolean;
    marketing?: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'never';
  };
  
  // Metadata
  createdAt: Date;
  updatedAt?: Date;
  isActive: boolean;
  tags?: string[];
  customFields?: { [key: string]: any };
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status: ProjectStatus;
  rate?: number;
  rateType?: 'hourly' | 'fixed' | 'monthly';
  estimatedHours?: number;
  actualHours?: number;
  invoices: Invoice[];
  communications: Communication[];
}

export interface Invoice {
  id: string;
  projectId: string;
  number: string;
  issueDate: Date;
  dueDate: Date;
  amount: number;
  status: InvoiceStatus;
  paidDate?: Date;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Communication {
  id: string;
  date: Date;
  type: 'email' | 'call' | 'meeting' | 'other';
  notes: string;
  followUpDate?: Date;
}
