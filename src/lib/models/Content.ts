import mongoose, { Schema, Document } from 'mongoose';

export interface IContent extends Document {
  page: string;
  section: string;
  data: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const contentSchema = new Schema(
  {
    page: {
      type: String,
      required: true,
      index: true,
    },
    section: {
      type: String,
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Ensure page+section is unique
contentSchema.index({ page: 1, section: 1 }, { unique: true });

export default mongoose.models.Content ||
  mongoose.model<IContent>('Content', contentSchema);
