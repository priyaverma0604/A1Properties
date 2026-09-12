import { Request, Response } from 'express';
import Blog from '../models/Blog';

// Fetch all blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ message: 'Error retrieving blogs.' });
  }
};

// Fetch blog by slug and increment views
export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return res.status(404).json({ message: 'Blog article not found.' });
    }

    blog.views = (blog.views || 0) + 1;
    await blog.save();

    return res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return res.status(500).json({ message: 'Error retrieving blog details.' });
  }
};

// Fetch blog by ID (for admin edit loading)
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found.' });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    return res.status(500).json({ message: 'Error retrieving blog.' });
  }
};

// Create new blog article
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, coverImage } = req.body;

    if (!title || !content || !excerpt || !coverImage) {
      return res.status(400).json({ message: 'All fields (title, content, excerpt, coverImage) are required.' });
    }

    const newBlog = new Blog({ title, content, excerpt, coverImage });
    await newBlog.save();

    return res.status(201).json({
      message: 'Blog post created successfully.',
      blog: newBlog,
    });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return res.status(500).json({ message: 'Error creating blog post.', error: error.message });
  }
};

// Update blog article
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    Object.assign(blog, updateData);
    await blog.save();

    return res.status(200).json({
      message: 'Blog post updated successfully.',
      blog,
    });
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return res.status(500).json({ message: 'Error updating blog post.', error: error.message });
  }
};

// Delete blog article
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Blog.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }

    return res.status(200).json({ message: 'Blog post deleted successfully.' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(500).json({ message: 'Error deleting blog post.' });
  }
};
