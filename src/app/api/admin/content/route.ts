import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (!page) {
      return NextResponse.json({ message: 'Page parameter is required' }, { status: 400 });
    }

    const contentBlocks = await Content.find({ page });
    return NextResponse.json({ content: contentBlocks }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch Content error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    // TODO: Verify Admin JWT token here in a real app
    // For now, we assume the frontend sends the token and we could verify it
    
    const body = await request.json();
    const { page, section, data } = body;

    if (!page || !section || !data) {
      return NextResponse.json({ message: 'Page, section, and data are required' }, { status: 400 });
    }

    const updatedContent = await Content.findOneAndUpdate(
      { page, section },
      { data },
      { new: true, upsert: true }
    );

    return NextResponse.json({ message: 'Content updated successfully', content: updatedContent }, { status: 200 });
  } catch (error: any) {
    console.error('Update Content error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
