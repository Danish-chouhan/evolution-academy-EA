import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AnalyticsEvent from '@/lib/models/AnalyticsEvent';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectDB();

    // Create a new event
    await AnalyticsEvent.create({
      sessionId: data.sessionId,
      path: data.path,
      referrer: data.referrer || 'Direct',
      deviceType: data.deviceType || 'Desktop',
      browser: data.browser || 'Unknown',
      os: data.os || 'Unknown',
      country: data.country || 'Unknown',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}
