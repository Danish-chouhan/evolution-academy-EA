'use server';

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadVideoAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const resourceType = (formData.get('resource_type') as string) || 'auto';
    
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Upload to Cloudinary using stream
    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'portfolio-evolution',
          resource_type: resourceType as 'auto' | 'image' | 'video' | 'raw',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return { success: true, url: result.secure_url };
  } catch (error: any) {
    console.error('Cloudinary Upload Action Error:', error);
    return { success: false, error: error.message || 'Failed to upload file' };
  }
}
