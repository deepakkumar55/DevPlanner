import mongoose, { Document, Schema } from 'mongoose';

export interface IOutreach extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  type: 'email' | 'dm' | 'linkedin' | 'twitter' | 'phone' | 'meeting';
  target: string; // Company/Person name
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  platform?: string;
  subject: string;
  message?: string;
  status: 'sent' | 'opened' | 'replied' | 'interested' | 'rejected' | 'no-response';
  responseMessage?: string;
  responseDate?: Date;
  followUpDate?: Date;
  followUpCount: number;
  leadQuality: 'hot' | 'warm' | 'cold';
  estimatedValue?: number;
  actualValue?: number;
  tags: string[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OutreachSchema = new Schema<IOutreach>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['email', 'dm', 'linkedin', 'twitter', 'phone', 'meeting'],
      required: true
    },
    target: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    contactPerson: {
      type: String,
      trim: true,
      maxlength: 100
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true
    },
    contactPhone: {
      type: String,
      trim: true
    },
    platform: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    message: {
      type: String,
      trim: true,
      maxlength: 2000
    },
    status: {
      type: String,
      enum: ['sent', 'opened', 'replied', 'interested', 'rejected', 'no-response'],
      default: 'sent'
    },
    responseMessage: {
      type: String,
      trim: true,
      maxlength: 2000
    },
    responseDate: {
      type: Date,
      default: null
    },
    followUpDate: {
      type: Date,
      default: null
    },
    followUpCount: {
      type: Number,
      default: 0,
      min: 0
    },
    leadQuality: {
      type: String,
      enum: ['hot', 'warm', 'cold'],
      default: 'cold'
    },
    estimatedValue: {
      type: Number,
      min: 0
    },
    actualValue: {
      type: Number,
      min: 0
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    notes: {
      type: String,
      trim: true,
      maxlength: 1000
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Indexes
OutreachSchema.index({ userId: 1, createdAt: -1 });
OutreachSchema.index({ userId: 1, type: 1 });
OutreachSchema.index({ userId: 1, status: 1 });
OutreachSchema.index({ userId: 1, leadQuality: 1 });
OutreachSchema.index({ followUpDate: 1 });
OutreachSchema.index({ responseDate: -1 });

export default mongoose.models.Outreach || mongoose.model<IOutreach>('Outreach', OutreachSchema);
