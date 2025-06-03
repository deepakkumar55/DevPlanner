import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  website?: string;
  projectTitle: string;
  projectDescription?: string;
  projectType: 'web-development' | 'mobile-app' | 'api-development' | 'consulting' | 'design' | 'other';
  status: 'lead' | 'negotiating' | 'active' | 'completed' | 'cancelled' | 'on-hold';
  priority: 'high' | 'medium' | 'low';
  budget?: number;
  agreedAmount?: number;
  paidAmount: number;
  startDate?: Date;
  endDate?: Date;
  deadline?: Date;
  milestones: Array<{
    title: string;
    description?: string;
    amount?: number;
    dueDate?: Date;
    completed: boolean;
    completedDate?: Date;
  }>;
  paymentTerms?: string;
  contractSigned: boolean;
  contractDate?: Date;
  notes?: string;
  tags: string[];
  communicationHistory: Array<{
    date: Date;
    type: 'email' | 'call' | 'meeting' | 'message';
    summary: string;
    nextAction?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const ClientSchema = new Schema<IClient>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
    phone: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true,
      maxlength: 100
    },
    website: {
      type: String,
      trim: true
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
    projectType: {
      type: String,
      enum: ['web-development', 'mobile-app', 'api-development', 'consulting', 'design', 'other'],
      required: true
    },
    status: {
      type: String,
      enum: ['lead', 'negotiating', 'active', 'completed', 'cancelled', 'on-hold'],
      default: 'lead'
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    budget: {
      type: Number,
      min: 0
    },
    agreedAmount: {
      type: Number,
      min: 0
    },
    paidAmount: {
      type: Number,
      default: 0,
      min: 0
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    deadline: {
      type: Date,
      default: null
    },
    milestones: [{
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      },
      description: {
        type: String,
        trim: true,
        maxlength: 500
      },
      amount: {
        type: Number,
        min: 0
      },
      dueDate: {
        type: Date
      },
      completed: {
        type: Boolean,
        default: false
      },
      completedDate: {
        type: Date,
        default: null
      }
    }],
    paymentTerms: {
      type: String,
      trim: true,
      maxlength: 500
    },
    contractSigned: {
      type: Boolean,
      default: false
    },
    contractDate: {
      type: Date,
      default: null
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    communicationHistory: [{
      date: {
        type: Date,
        default: Date.now
      },
      type: {
        type: String,
        enum: ['email', 'call', 'meeting', 'message'],
        required: true
      },
      summary: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500
      },
      nextAction: {
        type: String,
        trim: true,
        maxlength: 200
      }
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Indexes
ClientSchema.index({ userId: 1, createdAt: -1 });
ClientSchema.index({ userId: 1, status: 1 });
ClientSchema.index({ userId: 1, priority: 1 });
ClientSchema.index({ userId: 1, projectType: 1 });
ClientSchema.index({ deadline: 1 });
ClientSchema.index({ 'milestones.dueDate': 1 });

// Virtual for remaining payment
ClientSchema.virtual('remainingPayment').get(function() {
  return (this.agreedAmount || 0) - this.paidAmount;
});

// Virtual for project progress
ClientSchema.virtual('projectProgress').get(function() {
  if (this.milestones.length === 0) return 0;
  const completedMilestones = this.milestones.filter(m => m.completed).length;
  return Math.round((completedMilestones / this.milestones.length) * 100);
});

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema);
