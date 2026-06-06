import mongoose from 'mongoose';

const analyticsEventSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  path: { type: String, required: true },
  referrer: { type: String, default: 'Direct' },
  deviceType: { type: String, default: 'Desktop' },
  browser: { type: String, default: 'Unknown' },
  os: { type: String, default: 'Unknown' },
  country: { type: String, default: 'Unknown' },
  timestamp: { type: Date, default: Date.now, index: true },
});

export default mongoose.models.AnalyticsEvent || mongoose.model('AnalyticsEvent', analyticsEventSchema);
