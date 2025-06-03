import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  type: 'video' | 'blog' | 'product' | 'course' | 'ebook' | 'template';
  platform: 'YouTube' | 'Medium' | 'Dev.to' | 'Gumroad' | 'Personal Blog' | 'LinkedIn' | 'Twitter';
  url?: string;
  status: 'draft' | 'published' | 'live' | 'archived';
  publishDate?: Date;
  views?: number;
  likes?: number;
  shares?: number;
  revenue?: number;
  tags: string[];
  thumbnail?: string;
  content?: string; // For blog posts or descriptions
  price?: number; // For products
  salesCount?: number; // For products
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
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
    type: {
      type: String,
      enum: ['video', 'blog', 'product', 'course', 'ebook', 'template'],
      required: true
    },
    platform: {
      type: String,
      enum: ['YouTube', 'Medium', 'Dev.to', 'Gumroad', 'Personal Blog', 'LinkedIn', 'Twitter'],
      required: true
    },
    url: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'live', 'archived'],
      default: 'draft'
    },
    publishDate: {
      type: Date,
      default: null
    },
    views: {
      type: Number,
      default: 0,
      min: 0
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
    },
    shares: {
      type: Number,
      default: 0,
      min: 0
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    thumbnail: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      maxlength: 10000
    },
    price: {
      type: Number,
      min: 0
    },
    salesCount: {
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

// Indexes
ContentSchema.index({ userId: 1, createdAt: -1 });
ContentSchema.index({ userId: 1, type: 1 });
ContentSchema.index({ userId: 1, platform: 1 });
ContentSchema.index({ userId: 1, status: 1 });
ContentSchema.index({ publishDate: -1 });
ContentSchema.index({ tags: 1 });

// Pre-save middleware to set publish date
ContentSchema.pre('save', function(next) {
  if (this.isModified('status') && (this.status === 'published' || this.status === 'live') && !this.publishDate) {
    this.publishDate = new Date();
  }
  next();
});

// Virtual for engagement rate
ContentSchema.virtual('engagementRate').get(function() {
  if (this.views === 0) return 0;
  return Math.round(((this.likes + this.shares) / this.views) * 100);
});

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
