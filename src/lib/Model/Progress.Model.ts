import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  _id: string;
  userId: string;
  date: Date;
  dailyRevenue: number;
  cumulativeRevenue: number;
  dsaProblems: number;
  tasksCompleted: number;
  totalTasks: number;
  workHours: number;
  mood: string;
  energyLevel: number; // 1-10
  notes?: string;
  achievements: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    date: {
      type: Date,
      required: true
    },
    dailyRevenue: {
      type: Number,
      default: 0,
      min: 0
    },
    cumulativeRevenue: {
      type: Number,
      default: 0,
      min: 0
    },
    dsaProblems: {
      type: Number,
      default: 0,
      min: 0
    },
    tasksCompleted: {
      type: Number,
      default: 0,
      min: 0
    },
    totalTasks: {
      type: Number,
      default: 0,
      min: 0
    },
    workHours: {
      type: Number,
      default: 0,
      min: 0
    },
    mood: {
      type: String,
      default: '😐'
    },
    energyLevel: {
      type: Number,
      default: 5,
      min: 1,
      max: 10
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 1000
    },
    achievements: [{
      type: String,
      trim: true
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ProgressSchema.index({ userId: 1, date: -1 });
ProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
