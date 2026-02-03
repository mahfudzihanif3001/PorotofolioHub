import mongoose from 'mongoose';

export interface IAttachment {
  fileType: 'IMAGE' | 'PDF' | 'LINK' | 'VIDEO';
  url: string;
  publicId?: string;
  label?: string;
}

export interface IPortfolioItem {
  _id: string;
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  descriptions?: string[]; // Multiple descriptions for experience/education
  category: 'PROJECT' | 'CERTIFICATE' | 'RESUME' | 'EXPERIENCE' | 'EDUCATION';
  attachments: IAttachment[];
  techStack: string[];
  startDate?: Date;
  endDate?: Date;
  order: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AttachmentSchema = new mongoose.Schema<IAttachment>(
  {
    fileType: {
      type: String,
      enum: ['IMAGE', 'PDF', 'LINK', 'VIDEO'],
      required: true,
    },
    url: {
      type: String,
      required: [true, 'Attachment URL is required'],
    },
    publicId: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  { _id: false }
);

const PortfolioItemSchema = new mongoose.Schema<IPortfolioItem>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    descriptions: [{
      type: String,
      trim: true,
      maxlength: [500, 'Each description cannot exceed 500 characters'],
    }],
    category: {
      type: String,
      enum: ['PROJECT', 'CERTIFICATE', 'RESUME', 'EXPERIENCE', 'EDUCATION'],
      required: [true, 'Category is required'],
    },
    attachments: {
      type: [AttachmentSchema],
      validate: {
        validator: function (v: IAttachment[]) {
          return v.length <= 10;
        },
        message: 'Maximum 10 attachments allowed per item',
      },
    },
    techStack: [{
      type: String,
      trim: true,
    }],
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
PortfolioItemSchema.index({ userId: 1, order: 1 });
PortfolioItemSchema.index({ userId: 1, category: 1 });

export default mongoose.models.PortfolioItem || mongoose.model<IPortfolioItem>('PortfolioItem', PortfolioItemSchema);
