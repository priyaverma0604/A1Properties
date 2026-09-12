import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  type: 'seller' | 'inquiry';
  name: string;
  phone: string;
  email?: string;
  location?: string;
  propertyType?: string;
  description?: string;
  images?: string[];
  propertyId?: mongoose.Types.ObjectId; // References specific property for inquiries
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    type: { type: String, required: true, enum: ['seller', 'inquiry'] },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    location: { type: String },
    propertyType: { type: String },
    description: { type: String },
    images: [{ type: String }],
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property' },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
