import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AnalyticsEvent from '@/lib/models/AnalyticsEvent';

const PAGES = ['/', '/home', '/about', '/study-material', '/batches', '/test-series', '/results', '/free-library', '/mentorship'];
const DEVICES = ['Mobile', 'Desktop', 'Tablet'];
const BROWSERS = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Samsung Internet'];
const OS_LIST = ['Windows', 'MacOS', 'iOS', 'Android', 'Linux'];
const REFERRERS = ['Direct', 'Google', 'Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'];
const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'];

function getRandomItem(arr: any[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Clear existing data (optional, but good for a fresh start)
    await AnalyticsEvent.deleteMany({});

    const events = [];
    const now = new Date();
    
    // Generate 5000 fake events spread across the last 30 days
    for (let i = 0; i < 5000; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const eventDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (Math.random() * 24 * 60 * 60 * 1000));
      
      events.push({
        sessionId: `session_${Math.random().toString(36).substring(2, 10)}`,
        path: getRandomItem(PAGES),
        referrer: getRandomItem(REFERRERS),
        deviceType: getRandomItem(DEVICES),
        browser: getRandomItem(BROWSERS),
        os: getRandomItem(OS_LIST),
        country: getRandomItem(COUNTRIES),
        timestamp: eventDate,
      });
    }

    await AnalyticsEvent.insertMany(events);

    return NextResponse.json({ success: true, message: `Inserted ${events.length} fake analytics events.` });
  } catch (error) {
    console.error('Seeding Error:', error);
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 });
  }
}
