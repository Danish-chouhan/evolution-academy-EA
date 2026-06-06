'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ContentEditor from '@/components/admin/ContentEditor';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

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
      setLoading(false);
    } catch (e) {
      router.push('/auth/admin-login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/auth/admin-login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminSidebar user={user} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden w-full">
        <div className="max-w-7xl mx-auto">
          <header className="mb-6 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Visual UI Editor</h1>
              <p className="text-gray-500 mt-2 font-medium">Select a page below to edit its text and images directly on the live UI.</p>
            </div>
            <a href="/" target="_blank" className="bg-brand-purple hover:bg-brand-purple/90 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-purple-500/20">
              View Live Site ↗
            </a>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              { id: 'home', name: 'Home Page', icon: '🏠', desc: 'Main landing page UI' },
              { id: 'study-material', name: 'Study Material', icon: '📚', desc: 'Study notes & books' },
              { id: 'batches', name: 'Batches', icon: '🎓', desc: 'Live & recorded batches' },
              { id: 'test-series', name: 'Test Series', icon: '📝', desc: 'Mock tests & exams' },
              { id: 'results', name: 'Results', icon: '🏆', desc: 'Student success stories' },
              { id: 'free-library', name: 'Free Library', icon: '📖', desc: 'Free educational resources' },
              { id: 'mentorship', name: 'Mentorship', icon: '🤝', desc: '1-on-1 guidance' },
              { id: 'about', name: 'About Us', icon: 'ℹ️', desc: 'Company mission & values' },
            ].map((page) => (
              <a key={page.id} href={`/admin/edit/${page.id}`} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl overflow-hidden group hover:border-brand-purple/50 transition-all block">
                 <div className="h-40 bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center border-b border-gray-100 group-hover:scale-105 transition-transform duration-500 origin-bottom">
                    <span className="text-6xl drop-shadow-md">{page.icon}</span>
                 </div>
                 <div className="p-5 relative bg-white z-10 flex flex-col h-full">
                   <h3 className="text-lg font-bold text-gray-900 mb-1">{page.name}</h3>
                   <p className="text-gray-500 text-xs font-medium">{page.desc}</p>
                   <span className="inline-block mt-4 text-brand-purple font-bold text-xs group-hover:text-purple-700">Open Visual Editor →</span>
                 </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
