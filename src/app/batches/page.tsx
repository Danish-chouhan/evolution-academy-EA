import { Metadata } from 'next';
import { connectDB } from '@/lib/db';
import Content from '@/lib/models/Content';
import { ContentProvider } from '@/components/admin/ContentProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BatchesContent from '@/components/batches/BatchesContent';

export const metadata: Metadata = {
  title: 'Batches | Evolution Academy',
  description: 'Join India\'s most affordable live & recorded classes to crack JEE, NEET, and Board exams.',
};

export const dynamic = 'force-dynamic';

export default async function BatchesPage() {
  await connectDB();
  const pageContent = await Content.find({ page: 'batches', section: 'global' }).lean();
  
  // Extract global data
  const contentData = pageContent.length > 0 ? pageContent[0].data : {};

  return (
    <ContentProvider initialContent={contentData} page="batches" isAdmin={false}>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <BatchesContent />
        <Footer />
      </div>
    </ContentProvider>
  );
}
