import mongoose, { Document, Schema } from 'mongoose';

export interface IOutreach extends Document {
  _id: string;
  userId: string;
  type: 'email' | 'dm' | 'call' | 'meeting';
  platform?: string;
  targetName: string;
  targetEmail?: string;
  targetCompany?: string;
  subject: string;
  message?: string;
  status: 'sent' | 'delivered' | 'opened' | 'replied' | 'bounced' | 'no-response';
  sentAt: Date;
  openedAt?: Date;
  repliedAt?: Date;
  response?: string;
  followUpDate?: Date;
  notes?: string;
  tags: string[];
  leadSource?: string;
  conversionValue?: number;
  createdAt: Date;
  updatedAt: Date;
}

const OutreachSchema = new Schema<IOutreach>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    type: {
      type: String,
      enum: ['email', 'dm', 'call', 'meeting'],
      required: true
    },
    platform: {
      type: String,
      trim: true
    },
    targetName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    targetEmail: {
      type: String,
      trim: true,
      lowercase: true
    },
    targetCompany: {
      type: String,
      trim: true,
      maxlength: 100
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
      maxlength: 5000
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'opened', 'replied', 'bounced', 'no-response'],
      default: 'sent'
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    openedAt: {
      type: Date,
      default: null
    },
    repliedAt: {
      type: Date,
      default: null
    },
    response: {
      type: String,
      trim: true,
      maxlength: 5000
    },
    followUpDate: {
      type: Date,
      default: null
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    tags: [{
      type: String,
      trim: true
    }],
    leadSource: {
      type: String,
      trim: true
    },
    conversionValue: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

OutreachSchema.index({ userId: 1, sentAt: -1 });
OutreachSchema.index({ userId: 1, status: 1 });
OutreachSchema.index({ userId: 1, type: 1 });

export default mongoose.models.Outreach || mongoose.model<IOutreach>('Outreach', OutreachSchema);
