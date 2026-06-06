import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@evolution.com' });
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin already exists', email: 'admin@evolution.com', password: 'You already set it (try admin123)' });
    }

    // Create admin user
    const adminUser = new User({
      name: 'Super Admin',
      email: 'admin@evolution.com',
      password: 'admin123', // Will be hashed by the User model's pre-save hook
      role: 'admin',
    });

    await adminUser.save();

    return NextResponse.json({ 
      message: 'Admin created successfully', 
      email: 'admin@evolution.com', 
      password: 'admin123' 
    });
  } catch (error: any) {
    console.error('Seed Admin error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
