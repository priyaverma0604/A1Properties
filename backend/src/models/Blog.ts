import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    coverImage: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Pre-validate hook to generate SEO-friendly slugs
BlogSchema.pre('validate', async function (next) {
  const blog = this as any;
  if (!blog.isModified('title') && blog.slug) {
    return next();
  }

  let slugBase = blog.title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  let uniqueSlug = slugBase;
  let counter = 1;
  const BlogModel = mongoose.model('Blog');

  while (await BlogModel.findOne({ slug: uniqueSlug, _id: { $ne: blog._id } })) {
    uniqueSlug = `${slugBase}-${counter}`;
    counter++;
  }

  blog.slug = uniqueSlug;
  next();
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
