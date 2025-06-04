import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  _id: string;
  userId: string;
  name: string;
  email?: string;
  company?: string;
  projectTitle: string;
  projectDescription?: string;
  budget: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled' | 'on-hold';
  startDate?: Date;
  endDate?: Date;
  deadlineDate?: Date;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'overdue';
  paidAmount: number;
  contactInfo?: {
    phone?: string;
    website?: string;
    linkedin?: string;
  };
  projectDetails?: {
    technologies?: string[];
    requirements?: string[];
    deliverables?: string[];
  };
  communications: Array<{
    date: Date;
    type: 'email' | 'call' | 'meeting' | 'message';
    subject: string;
    notes?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    company: {
      type: String,
      trim: true,
      maxlength: 100
    },
    projectTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    projectDescription: {
      type: String,
      trim: true,
      maxlength: 2000
    },
    budget: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed', 'cancelled', 'on-hold'],
      default: 'pending'
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    deadlineDate: {
      type: Date,
      default: null
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'overdue'],
      default: 'pending'
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    contactInfo: {
      phone: { type: String, trim: true },
      website: { type: String, trim: true },
      linkedin: { type: String, trim: true }
    },
    projectDetails: {
      technologies: [{ type: String, trim: true }],
      requirements: [{ type: String, trim: true }],
      deliverables: [{ type: String, trim: true }]
    },
    communications: [{
      date: { type: Date, default: Date.now },
      type: {
        type: String,
        enum: ['email', 'call', 'meeting', 'message'],
        required: true
      },
      subject: { type: String, required: true, trim: true },
      notes: { type: String, trim: true }
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ClientSchema.index({ userId: 1, createdAt: -1 });
ClientSchema.index({ userId: 1, status: 1 });

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);
