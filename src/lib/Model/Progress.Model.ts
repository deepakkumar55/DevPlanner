import mongoose, { Document, Schema } from 'mongoose';

export interface IProgress extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  date: Date;
  dayNumber: number;
  tasksCompleted: number;
  totalTasks: number;
  dailyRevenue: number;
  dsaProblemsCount: number;
  contentCreated: number;
  outreachCount: number;
  studyHours: number;
  exerciseMinutes: number;
  mood: 'excellent' | 'good' | 'okay' | 'bad' | 'terrible';
  notes?: string;
  achievements: string[];
  challenges: string[];
  learnings: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    dayNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 100
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
    dailyRevenue: {
      type: Number,
      default: 0,
      min: 0
    },
    dsaProblemsCount: {
      type: Number,
      default: 0,
      min: 0
    },
    contentCreated: {
      type: Number,
      default: 0,
      min: 0
    },
    outreachCount: {
      type: Number,
      default: 0,
      min: 0
    },
    studyHours: {
      type: Number,
      default: 0,
      min: 0,
      max: 24
    },
    exerciseMinutes: {
      type: Number,
      default: 0,
      min: 0
    },
    mood: {
      type: String,
      enum: ['excellent', 'good', 'okay', 'bad', 'terrible'],
      default: 'okay'
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 2000
    },
    achievements: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    challenges: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    learnings: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Indexes
ProgressSchema.index({ userId: 1, date: -1 });
ProgressSchema.index({ userId: 1, dayNumber: 1 });
ProgressSchema.index({ date: -1 });
ProgressSchema.index({ userId: 1, isPublished: 1 });

// Compound unique index to prevent duplicate entries per user per day
ProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

// Virtual for completion rate
ProgressSchema.virtual('completionRate').get(function() {
  if (this.totalTasks === 0) return 0;
  return Math.round((this.tasksCompleted / this.totalTasks) * 100);
});

export default mongoose.models.Progress || mongoose.model<IProgress>('Progress', ProgressSchema);
