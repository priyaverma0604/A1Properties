import { Request, Response } from 'express';
import Property from '../models/Property';
import { uploadImageToCloudinary } from '../config/cloudinary';

// Get properties with pagination, search, and rich filtering
export const getProperties = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      propertyType,
      type, // buy or rent
      minPrice,
      maxPrice,
      locality,
      search,
      featured,
      status,
      sort,
    } = req.query;

    const query: any = {};

    // Filter by Available status by default for public, admin can query anything
    if (status) {
      query.status = status;
    } else {
      // Default to showing everything for flexibility or filter based on client needs
      // Let's allow public to filter or show all active properties
    }

    if (featured) {
      query.featured = featured === 'true';
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    // Type of listing: buy (sale) vs rent
    if (type) {
      if (type === 'buy') {
        query.propertyType = { $ne: 'rent' }; // everything except rent, or specifically matching buying types
      } else if (type === 'rent') {
        query.propertyType = 'rent';
      }
    }

    // Locality filter (case insensitive matching)
    if (locality) {
      query.locality = { $regex: String(locality), $options: 'i' };
    }

    // Price range filters
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Text search (matches title, description, or locality)
    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { locality: searchRegex },
        { address: searchRegex },
      ];
    }

    // Setup Sorting
    let sortOptions: any = { createdAt: -1 }; // default newest first
    if (sort === 'price_asc') {
      sortOptions = { price: 1 };
    } else if (sort === 'price_desc') {
      sortOptions = { price: -1 };
    } else if (sort === 'views') {
      sortOptions = { views: -1 };
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const properties = await Property.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const total = await Property.countDocuments(query);

    return res.status(200).json({
      properties,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        totalProperties: total,
      },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return res.status(500).json({ message: 'Error retrieving properties.' });
  }
};

// Get a single property by slug and increment views
export const getPropertyBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const property = await Property.findOne({ slug });

    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    // Increment view counter asynchronously (don't block the response)
    property.views = (property.views || 0) + 1;
    await property.save();

    return res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return res.status(500).json({ message: 'Error retrieving property details.' });
  }
};

// Get property by ID (for admin dashboard edit loading)
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    return res.status(200).json(property);
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return res.status(500).json({ message: 'Error retrieving property.' });
  }
};

// Create a new property
export const createProperty = async (req: Request, res: Response) => {
  try {
    const propertyData = req.body;
    
    // Validate required fields
    const requiredFields = [
      'title', 'description', 'price', 'propertyType', 'plotSize',
      'address', 'locality', 'contactNumber', 'whatsappNumber'
    ];
    
    for (const field of requiredFields) {
      if (propertyData[field] === undefined || propertyData[field] === '') {
        return res.status(400).json({ message: `Field '${field}' is required.` });
      }
    }

    const newProperty = new Property(propertyData);
    await newProperty.save();

    return res.status(201).json({
      message: 'Property created successfully.',
      property: newProperty,
    });
  } catch (error: any) {
    console.error('Error creating property:', error);
    return res.status(500).json({
      message: 'Error creating property.',
      error: error.message,
    });
  }
};

// Update an existing property
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    // Update details
    Object.assign(property, updateData);
    
    // Explicitly validate slug auto-generation on title update
    await property.save();

    return res.status(200).json({
      message: 'Property updated successfully.',
      property,
    });
  } catch (error: any) {
    console.error('Error updating property:', error);
    return res.status(500).json({
      message: 'Error updating property.',
      error: error.message,
    });
  }
};

// Delete property
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Property.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    return res.status(200).json({ message: 'Property deleted successfully.' });
  } catch (error) {
    console.error('Error deleting property:', error);
    return res.status(500).json({ message: 'Error deleting property.' });
  }
};

// Upload multiple images to Cloudinary
export const uploadImages = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded.' });
    }

    const uploadPromises = files.map((file) =>
      uploadImageToCloudinary(file.buffer, 'agra_properties')
    );

    const imageUrls = await Promise.all(uploadPromises);

    return res.status(200).json({
      message: 'Images uploaded successfully.',
      urls: imageUrls,
    });
  } catch (error: any) {
    console.error('Cloudinary upload failure:', error);
    return res.status(500).json({
      message: 'Failed to upload images to Cloudinary.',
      error: error.message,
    });
  }
};
