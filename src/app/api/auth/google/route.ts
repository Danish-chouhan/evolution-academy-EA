import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'mock_google_client_id');

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json({ message: 'Google credential missing' }, { status: 400 });
    }

    let payload;

    // Verify token if real client ID exists, otherwise decode it (mock mode for testing)
    if (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } else {
      // Decode JWT payload for dev testing without verification
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      payload = JSON.parse(jsonPayload);
    }

    if (!payload || !payload.email) {
      return NextResponse.json({ message: 'Invalid Google token' }, { status: 400 });
    }

    await connectDB();

    // Find or create user
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      // Create new user with random password
      const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
      user = await User.create({
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        password: randomPassword, 
        avatar: payload.picture || null,
        role: 'user'
      });
    }

    // Generate custom JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      }
    });

  } catch (error: any) {
    console.error('Google Auth Error:', error);
    return NextResponse.json({ message: 'Authentication failed' }, { status: 500 });
  }
}
