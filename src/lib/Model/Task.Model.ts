import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  category: 'Learning' | 'Health' | 'Content' | 'Outreach' | 'Personal' | 'Work';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  completedAt?: Date;
  dueDate?: Date;
  estimatedTime?: number; // in minutes
  actualTime?: number; // in minutes
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    category: {
      type: String,
      enum: ['Learning', 'Health', 'Content', 'Outreach', 'Personal', 'Work'],
      required: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date,
      default: null
    },
    dueDate: {
      type: Date,
      default: null
    },
    estimatedTime: {
      type: Number,
      min: 0
    },
    actualTime: {
      type: Number,
      min: 0
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Indexes
TaskSchema.index({ userId: 1, createdAt: -1 });
TaskSchema.index({ userId: 1, completed: 1 });
TaskSchema.index({ userId: 1, category: 1 });
TaskSchema.index({ userId: 1, priority: 1 });
TaskSchema.index({ dueDate: 1 });

// Pre-save middleware to set completedAt
TaskSchema.pre('save', function(next) {
  if (this.isModified('completed')) {
    if (this.completed && !this.completedAt) {
      this.completedAt = new Date();
    } else if (!this.completed) {
      this.completedAt = null;
    }
  }
  next();
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
