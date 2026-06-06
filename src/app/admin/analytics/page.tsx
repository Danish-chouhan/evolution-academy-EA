'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import TrafficChart from '@/components/admin/analytics/TrafficChart';
import DeviceChart from '@/components/admin/analytics/DeviceChart';
import { 
  BrowserChart, TopPagesChart, OSChart, 
  ReferrerChart, CountryChart, EngagementChart 
} from '@/components/admin/analytics/AnalyticsCharts';
import { Users, BookOpen, Eye, ArrowUpRight } from 'lucide-react';

export default function AdminAnalytics() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('admin_token');
    const adminUser = localStorage.getItem('admin_user');
    
    if (!token || !adminUser) {
      router.push('/auth/admin-login');
      return;
    }
    
    try {
      setUser(JSON.parse(adminUser));
    } catch (e) {
      router.push('/auth/admin-login');
    }

    // Fetch analytics data
    const fetchData = async () => {
      try {
        const res = await fetch('/api/admin/analytics/data');
        const data = await res.json();
        setAnalyticsData(data);
      } catch (err) {
        console.error('Failed to fetch analytics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading || !analyticsData) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Crunching Real-Time Analytics...</div>;
  }

  const { kpi, dailyTraffic, devices, browsers, os, referrers, topPages, countries } = analyticsData;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar user={user} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Real-Time Analytics</h1>
            <p className="text-gray-500 mt-1 md:mt-2 font-medium">Live traffic and engagement data from the last 30 days.</p>
          </header>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-purple-100 text-brand-purple"><Eye size={24} /></div>
                <span className="flex items-center text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">LIVE</span>
              </div>
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Total Pageviews</h3>
              <p className="text-3xl font-black text-gray-900 mt-1">{kpi.totalViews.toLocaleString()}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-orange-100 text-brand-orange"><Users size={24} /></div>
                <span className="flex items-center text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">30 Days</span>
              </div>
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Unique Visitors</h3>
              <p className="text-3xl font-black text-gray-900 mt-1">{kpi.totalVisitors.toLocaleString()}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-500"><BookOpen size={24} /></div>
                <span className="flex items-center text-sm font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg">+12% <ArrowUpRight size={16} /></span>
              </div>
              <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider">Avg Pages / Session</h3>
              <p className="text-3xl font-black text-gray-900 mt-1">{kpi.totalVisitors ? (kpi.totalViews / kpi.totalVisitors).toFixed(1) : 0}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Daily Traffic (Area Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 mb-1">1. Traffic & Views</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Daily visitors vs pageviews</p>
              <TrafficChart data={dailyTraffic} />
            </div>

            {/* 2. Top Pages (Bar Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">2. Top Pages</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Most visited routes</p>
              <div className="h-80"><TopPagesChart data={topPages} /></div>
            </div>

            {/* 3. Device Types (Pie Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">3. Device Usage</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Mobile vs Desktop</p>
              <DeviceChart data={devices} />
            </div>

            {/* 4. Browsers (Pie Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">4. Browsers</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Chrome, Safari, etc.</p>
              <div className="h-64"><BrowserChart data={browsers} /></div>
            </div>

            {/* 5. Operating Systems (Bar Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">5. Operating Systems</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Windows vs Mac vs iOS</p>
              <div className="h-64"><OSChart data={os} /></div>
            </div>

            {/* 6. Referrers (Donut Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">6. Traffic Sources</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Where users come from</p>
              <div className="h-64"><ReferrerChart data={referrers} /></div>
            </div>

            {/* 7. Countries (Bar Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">7. Demographics</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Top countries</p>
              <div className="h-64"><CountryChart data={countries} /></div>
            </div>

            {/* 8. Engagement (Composed Chart) */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">8. Daily Engagement</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Visitors vs Views Trend</p>
              <div className="h-64"><EngagementChart data={dailyTraffic} /></div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
