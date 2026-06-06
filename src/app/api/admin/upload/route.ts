import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Extract optional resource_type parameter
    const resourceType = (formData.get('resource_type') as string) || 'auto';

    // Convert file to base64 data URI
    const bytes = await file.arrayBuffer();
    const base64Data = Buffer.from(bytes).toString('base64');
    const fileUri = `data:${file.type};base64,${base64Data}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'portfolio-evolution',
      resource_type: resourceType as 'auto' | 'image' | 'video' | 'raw',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
