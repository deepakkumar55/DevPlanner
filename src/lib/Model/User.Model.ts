import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  profileImage?: string;
  joinDate: Date;
  currentDay: number;
  totalDays: number;
  isPublicProfile: boolean;
  publicSlug?: string;
  targetRevenue: number;
  currentRevenue: number;
  streakCount: number;
  lastActiveDate: Date;
  settings: {
    notifications: boolean;
    emailUpdates: boolean;
    publicSharing: boolean;
  };
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
    instagram?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    avatar: {
      type: String,
      default: function(this: any) {
        const name = (this as IUser).name;
        return name ? name.charAt(0).toUpperCase() : 'U';
      }
    },
    profileImage: {
      type: String,
      default: null
    },
    joinDate: {
      type: Date,
      default: Date.now
    },
    currentDay: {
      type: Number,
      default: 1,
      min: 1,
      max: 100
    },
    totalDays: {
      type: Number,
      default: 100
    },
    isPublicProfile: {
      type: Boolean,
      default: false
    },
    publicSlug: {
      type: String,
      lowercase: true,
      trim: true
    },
    targetRevenue: {
      type: Number,
      default: 1500000 // 15 Lakh
    },
    currentRevenue: {
      type: Number,
      default: 0
    },
    streakCount: {
      type: Number,
      default: 0
    },
    lastActiveDate: {
      type: Date,
      default: Date.now
    },
    settings: {
      notifications: {
        type: Boolean,
        default: true
      },
      emailUpdates: {
        type: Boolean,
        default: true
      },
      publicSharing: {
        type: Boolean,
        default: false
      }
    },
    socialLinks: {
      twitter: { type: String, default: null },
      linkedin: { type: String, default: null },
      github: { type: String, default: null },
      youtube: { type: String, default: null },
      instagram: { type: String, default: null }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Only use schema.index() for the publicSlug index
UserSchema.index({ publicSlug: 1 }, { unique: true, sparse: true });

// Pre-save middleware to generate public slug
UserSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('name')) {
    this.publicSlug = this.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  next();
});

// Virtual for completion percentage
UserSchema.virtual('completionPercentage').get(function() {
  return Math.round((this.currentDay / this.totalDays) * 100);
});

// Virtual for revenue percentage
UserSchema.virtual('revenuePercentage').get(function() {
  return Math.round((this.currentRevenue / this.targetRevenue) * 100);
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
