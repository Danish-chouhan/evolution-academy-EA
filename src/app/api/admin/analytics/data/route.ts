import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import AnalyticsEvent from '@/lib/models/AnalyticsEvent';

export async function GET() {
  try {
    await connectDB();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filter events from the last 30 days
    const matchStage = { timestamp: { $gte: thirtyDaysAgo } };

    // 1. Total KPI
    const totalViews = await AnalyticsEvent.countDocuments(matchStage);
    const uniqueSessions = await AnalyticsEvent.distinct('sessionId', matchStage);
    const totalVisitors = uniqueSessions.length;

    // 2. Daily Traffic
    const dailyTrafficRaw = await AnalyticsEvent.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
          views: { $sum: 1 },
          sessions: { $addToSet: "$sessionId" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const dailyTraffic = dailyTrafficRaw.map(d => ({
      date: d._id,
      views: d.views,
      visitors: d.sessions.length
    }));

    // 3. Devices
    const devices = await AnalyticsEvent.aggregate([
      { $match: matchStage },
      { $group: { _id: "$deviceType", value: { $sum: 1 } } },
      { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    // 4. Browsers
    const browsers = await AnalyticsEvent.aggregate([
      { $match: matchStage },
      { $group: { _id: "$browser", value: { $sum: 1 } } },
      { $sort: { value: -1 } },
      { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    // 5. Operating Systems
    const os = await AnalyticsEvent.aggregate([
      { $match: matchStage },
      { $group: { _id: "$os", value: { $sum: 1 } } },
      { $sort: { value: -1 } },
      { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    // 6. Referrers
    const referrers = await AnalyticsEvent.aggregate([
      { $match: matchStage },
      { $group: { _id: "$referrer", value: { $sum: 1 } } },
      { $sort: { value: -1 } },
      { $limit: 10 },
      { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    // 7. Top Pages
    const topPages = await AnalyticsEvent.aggregate([
      { $match: matchStage },
      { $group: { _id: "$path", views: { $sum: 1 } } },
      { $sort: { views: -1 } },
      { $limit: 10 },
      { $project: { path: "$_id", views: 1, _id: 0 } }
    ]);

    // 8. Countries
    const countries = await AnalyticsEvent.aggregate([
      { $match: matchStage },
      { $group: { _id: "$country", value: { $sum: 1 } } },
      { $sort: { value: -1 } },
      { $limit: 10 },
      { $project: { name: "$_id", value: 1, _id: 0 } }
    ]);

    // Combine data
    const data = {
      kpi: {
        totalViews,
        totalVisitors,
      },
      dailyTraffic,
      devices,
      browsers,
      os,
      referrers,
      topPages,
      countries
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Analytics Data Error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}
