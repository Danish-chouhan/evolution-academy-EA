'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FreeLibraryContent from '@/components/free-library/FreeLibraryContent';

export default function AdminEditFreeLibraryPage() {
  const router = useRouter();
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth
    if (!localStorage.getItem('admin_token')) {
      router.push('/auth/admin-login');
      return;
    }

    // Fetch content
    fetch('/api/admin/content?page=free-library')
      .then(res => res.json())
      .then(data => {
        // Flatten content blocks into a single key-value record
        const flattenedContent: Record<string, string> = {};
        if (data.content) {
          data.content.forEach((block: any) => {
            if (block.section === 'global') {
               Object.assign(flattenedContent, block.data);
            }
          });
        }
        setContent(flattenedContent);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading Visual Editor...</div>;
  }

  return (
    <ContentProvider initialContent={content} page="free-library" isAdmin={true}>
      <div className="w-full bg-red-600 text-white text-center py-2 z-[100] font-bold shadow-md flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 gap-2 text-xs sm:text-base">
        <span>Admin Visual Editor Mode - Click any text or image to edit!</span>
        <button onClick={() => router.push('/admin/dashboard')} className="underline hover:text-red-200">Exit to Dashboard</button>
      </div>
      
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />

        <main className="flex-grow pt-[72px]">
          <FreeLibraryContent />
        </main>

        <Footer />
      </div>
    </ContentProvider>
  );
}
