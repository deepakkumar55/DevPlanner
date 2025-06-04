import mongoose, { Document, Schema } from 'mongoose';

export interface IJournal extends Document {
  _id: string;
  userId: string;
  date: Date;
  title?: string;
  content: string;
  mood: string;
  energyLevel: number; // 1-10
  keyLearnings: string[];
  challenges: string[];
  wins: string[];
  goals: string[];
  gratitude: string[];
  tomorrowFocus: string[];
  isPublic: boolean;
  tags: string[];
  wordCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const JournalSchema = new Schema<IJournal>(
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
    title: {
      type: String,
      trim: true,
      maxlength: 200
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000
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
    keyLearnings: [{
      type: String,
      trim: true,
      maxlength: 500
    }],
    challenges: [{
      type: String,
      trim: true,
      maxlength: 500
    }],
    wins: [{
      type: String,
      trim: true,
      maxlength: 500
    }],
    goals: [{
      type: String,
      trim: true,
      maxlength: 500
    }],
    gratitude: [{
      type: String,
      trim: true,
      maxlength: 500
    }],
    tomorrowFocus: [{
      type: String,
      trim: true,
      maxlength: 500
    }],
    isPublic: {
      type: Boolean,
      default: false
    },
    tags: [{
      type: String,
      trim: true
    }],
    wordCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

JournalSchema.index({ userId: 1, date: -1 });
JournalSchema.index({ userId: 1, date: 1 }, { unique: true });

// Pre-save middleware to calculate word count
JournalSchema.pre('save', function(next) {
  this.wordCount = this.content.split(/\s+/).filter(word => word.length > 0).length;
  next();
});

export default mongoose.models.Journal || mongoose.model<IJournal>('Journal', JournalSchema);
