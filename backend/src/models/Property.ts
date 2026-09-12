import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  propertyType: 'buy' | 'rent' | 'plot' | 'flat' | 'house' | 'commercial';
  bhk?: number;
  plotSize: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbySchools: string[];
  nearbyHospitals: string[];
  nearbyMarkets: string[];
  parking: boolean;
  waterSupply: string;
  contactNumber: string;
  whatsappNumber: string;
  images: string[];
  status: 'available' | 'sold' | 'rented';
  featured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    propertyType: {
      type: String,
      required: true,
      enum: ['buy', 'rent', 'plot', 'flat', 'house', 'commercial'],
    },
    bhk: { type: Number },
    plotSize: { type: String, required: true }, // e.g. "150 Sq Yards" or "1200 Sq Ft"
    address: { type: String, required: true },
    locality: { type: String, required: true, trim: true },
    city: { type: String, default: 'Agra' },
    state: { type: String, default: 'Uttar Pradesh' },
    coordinates: {
      lat: { type: Number, required: true, default: 27.1767 }, // Defaults to Agra lat
      lng: { type: Number, required: true, default: 78.0081 }, // Defaults to Agra lng
    },
    nearbySchools: [{ type: String }],
    nearbyHospitals: [{ type: String }],
    nearbyMarkets: [{ type: String }],
    parking: { type: Boolean, default: false },
    waterSupply: { type: String, default: '24 Hours' },
    contactNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    images: [{ type: String }],
    status: {
      type: String,
      required: true,
      enum: ['available', 'sold', 'rented'],
      default: 'available',
    },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Pre-validate hook to generate SEO-friendly unique slugs
PropertySchema.pre('validate', async function (next) {
  const property = this as any;
  if (!property.isModified('title') && property.slug) {
    return next();
  }

  // Create slug base: title + locality + city
  let slugBase = `${property.title} ${property.locality} ${property.city}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // remove special characters
    .trim()
    .replace(/\s+/g, '-'); // replace spaces with hyphens

  // Check uniqueness and append counter if necessary
  let uniqueSlug = slugBase;
  let counter = 1;
  const PropertyModel = mongoose.model('Property');

  while (await PropertyModel.findOne({ slug: uniqueSlug, _id: { $ne: property._id } })) {
    uniqueSlug = `${slugBase}-${counter}`;
    counter++;
  }

  property.slug = uniqueSlug;
  next();
});

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
