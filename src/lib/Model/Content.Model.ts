import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  _id: string;
  userId: string;
  type: 'video' | 'blog' | 'product';
  title: string;
  description?: string;
  platform: string;
  url?: string;
  status: 'draft' | 'published' | 'live' | 'archived';
  views?: number;
  revenue?: number;
  thumbnail?: string;
  tags: string[];
  publishedAt?: Date;
  metrics: {
    likes?: number;
    comments?: number;
    shares?: number;
    downloads?: number;
    sales?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    type: {
      type: String,
      enum: ['video', 'blog', 'product'],
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
      maxlength: 2000
    },
    platform: {
      type: String,
      required: true,
      trim: true
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
    views: {
      type: Number,
      default: 0,
      min: 0
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0
    },
    thumbnail: {
      type: String,
      trim: true
    },
    tags: [{
      type: String,
      trim: true
    }],
    publishedAt: {
      type: Date,
      default: null
    },
    metrics: {
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      sales: { type: Number, default: 0 }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ContentSchema.index({ userId: 1, createdAt: -1 });
ContentSchema.index({ userId: 1, type: 1 });
ContentSchema.index({ userId: 1, status: 1 });

export default mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
