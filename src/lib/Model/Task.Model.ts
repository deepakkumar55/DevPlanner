import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  category: 'Learning' | 'Health' | 'Content' | 'Outreach' | 'Personal';
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
      type: String,
      required: true,
      ref: 'User'
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
      enum: ['Learning', 'Health', 'Content', 'Outreach', 'Personal'],
      default: 'Learning'
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
      trim: true
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

TaskSchema.index({ userId: 1, createdAt: -1 });
TaskSchema.index({ userId: 1, completed: 1 });

export default mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
