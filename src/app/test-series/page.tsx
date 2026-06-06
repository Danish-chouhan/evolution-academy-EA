import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TestSeriesContent from '@/components/test-series/TestSeriesContent';

export const metadata: Metadata = {
  title: 'Test Series | Evolution Academy',
  description: 'Benchmark your preparation with India\'s most authentic mock tests designed by expert faculty.',
};

export default async function TestSeriesPage() {
  await connectDB();
  const pageContent = await Content.find({ page: 'test-series', section: 'global' }).lean();
  
  const contentData = pageContent.length > 0 ? pageContent[0].data : {};

  return (
    <ContentProvider initialContent={contentData} page="test-series" isAdmin={false}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />

        <main className="flex-grow pt-[72px]">
          <TestSeriesContent />
        </main>

        <Footer />
      </div>
    </ContentProvider>
  );
}
