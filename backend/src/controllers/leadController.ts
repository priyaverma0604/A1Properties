import { Request, Response } from 'express';
import Lead from '../models/Lead';
import { uploadImageToCloudinary } from '../config/cloudinary';

// Submit a new lead (inquiry or sell property form)
export const createLead = async (req: Request, res: Response) => {
  try {
    const { type, name, phone, email, location, propertyType, description, propertyId } = req.body;

    if (!type || !name || !phone) {
      return res.status(400).json({ message: 'Type, Name, and Phone number are required.' });
    }

    let imageUrls: string[] = [];
    const files = req.files as Express.Multer.File[];

    if (files && files.length > 0) {
      const uploadPromises = files.map((file) =>
        uploadImageToCloudinary(file.buffer, 'seller_leads')
      );
      imageUrls = await Promise.all(uploadPromises);
    }

    const newLead = new Lead({
      type,
      name,
      phone,
      email,
      location,
      propertyType,
      description,
      images: imageUrls,
      propertyId: propertyId || undefined,
    });

    await newLead.save();

    return res.status(201).json({
      message: 'Inquiry submitted successfully. We will get back to you shortly!',
      lead: newLead,
    });
  } catch (error: any) {
    console.error('Error submitting lead:', error);
    return res.status(500).json({ message: 'Failed to submit inquiry.', error: error.message });
  }
};

// Get all leads (Admin only)
export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find()
      .populate('propertyId', 'title slug price')
      .sort({ createdAt: -1 });
    return res.status(200).json(leads);
  } catch (error) {
    console.error('Error retrieving leads:', error);
    return res.status(500).json({ message: 'Failed to retrieve leads.' });
  }
};

// Delete a lead (Admin only)
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Lead.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Lead not found.' });
    }

    return res.status(200).json({ message: 'Lead deleted successfully.' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return res.status(500).json({ message: 'Failed to delete lead.' });
  }
};
