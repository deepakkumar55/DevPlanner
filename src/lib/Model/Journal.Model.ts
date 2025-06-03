import mongoose, { Document, Schema } from 'mongoose';

export interface IJournal extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  date: Date;
  title?: string;
  content: string;
  mood: 'excellent' | 'good' | 'okay' | 'bad' | 'terrible';
  moodEmoji: string;
  keyLearnings: string[];
  challenges: string[];
  achievements: string[];
  gratitude: string[];
  tomorrowGoals: string[];
  energyLevel: 1 | 2 | 3 | 4 | 5;
  productivityLevel: 1 | 2 | 3 | 4 | 5;
  stressLevel: 1 | 2 | 3 | 4 | 5;
  sleepHours?: number;
  exerciseMinutes?: number;
  studyHours?: number;
  workHours?: number;
  socialTime?: number;
  tags: string[];
  isPrivate: boolean;
  weather?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JournalSchema = new Schema<IJournal>(
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
    title: {
      type: String,
      trim: true,
      maxlength: 100
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000
    },
    mood: {
      type: String,
      enum: ['excellent', 'good', 'okay', 'bad', 'terrible'],
      required: true
    },
    moodEmoji: {
      type: String,
      required: true,
      default: '😐'
    },
    keyLearnings: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    challenges: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    achievements: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    gratitude: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    tomorrowGoals: [{
      type: String,
      trim: true,
      maxlength: 200
    }],
    energyLevel: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 3
    },
    productivityLevel: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 3
    },
    stressLevel: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 3
    },
    sleepHours: {
      type: Number,
      min: 0,
      max: 24
    },
    exerciseMinutes: {
      type: Number,
      min: 0
    },
    studyHours: {
      type: Number,
      min: 0,
      max: 24
    },
    workHours: {
      type: Number,
      min: 0,
      max: 24
    },
    socialTime: {
      type: Number,
      min: 0
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    isPrivate: {
      type: Boolean,
      default: true
    },
    weather: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Indexes
JournalSchema.index({ userId: 1, date: -1 });
JournalSchema.index({ userId: 1, mood: 1 });
JournalSchema.index({ userId: 1, isPrivate: 1 });
JournalSchema.index({ tags: 1 });

// Compound unique index to prevent duplicate entries per user per day
JournalSchema.index({ userId: 1, date: 1 }, { unique: true });

// Virtual for word count
JournalSchema.virtual('wordCount').get(function() {
  return this.content.split(/\s+/).filter(word => word.length > 0).length;
});

export default mongoose.models.Journal || mongoose.model<IJournal>('Journal', JournalSchema);
